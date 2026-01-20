import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import {
  checkRateLimit,
  getClientIp,
  sanitizeInput,
  validateEmail,
  validateDate,
  validateAmount,
  validateOrderId,
  createSecureErrorResponse,
  addSecurityHeaders,
  maskSensitiveData,
} from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting 체크 (결제는 더 엄격하게)
    const ip = getClientIp(request);
    if (!checkRateLimit(ip, 5, 60000)) {
      // 1분에 5회 제한
      return NextResponse.json(
        { success: false, message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      orderId,
      amount,
      paymentKey,
      customerName,
      customerEmail,
      packageName,
      birthDate,
      calendarType,
      birthTime,
      gender,
    } = body;

    // 필수 파라미터 검증
    if (!orderId || !amount || !paymentKey) {
      return NextResponse.json(
        { success: false, message: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 입력 검증
    if (!validateOrderId(orderId)) {
      return NextResponse.json(
        { success: false, message: '잘못된 주문 ID 형식입니다.' },
        { status: 400 }
      );
    }

    if (!validateAmount(amount)) {
      return NextResponse.json(
        { success: false, message: '잘못된 금액입니다.' },
        { status: 400 }
      );
    }

    if (customerEmail && !validateEmail(customerEmail)) {
      return NextResponse.json(
        { success: false, message: '잘못된 이메일 형식입니다.' },
        { status: 400 }
      );
    }

    if (birthDate && !validateDate(birthDate)) {
      return NextResponse.json(
        { success: false, message: '잘못된 생년월일 형식입니다.' },
        { status: 400 }
      );
    }

    // calendarType 화이트리스트 검증
    if (calendarType && !['solar', 'lunar', 'leap'].includes(calendarType)) {
      return NextResponse.json(
        { success: false, message: '잘못된 달력 타입입니다.' },
        { status: 400 }
      );
    }

    // gender 화이트리스트 검증
    if (gender && !['male', 'female'].includes(gender)) {
      return NextResponse.json(
        { success: false, message: '잘못된 성별 값입니다.' },
        { status: 400 }
      );
    }

    // 입력 sanitization
    const sanitizedName = sanitizeInput(customerName || '');
    const sanitizedPackageName = sanitizeInput(packageName || '');
    const sanitizedBirthTime = sanitizeInput(birthTime || '');

    // Supabase 연결 확인
    if (!supabaseAdmin) {
      console.warn('[Security] Supabase가 설정되지 않았습니다. DB 저장 건너뜀.');
    }

    // 토스페이먼츠 시크릿 키 (하드코딩 제거)
    const secretKey = process.env.TOSS_SECRET_KEY;

    if (!secretKey) {
      console.error('[Security] TOSS_SECRET_KEY가 설정되지 않았습니다.');
      return NextResponse.json(
        { success: false, message: '결제 시스템 설정 오류입니다.' },
        { status: 500 }
      );
    }

    // Base64 인코딩
    const encodedKey = Buffer.from(secretKey + ':').toString('base64');

    // 토스페이먼츠 결제 승인 API 호출
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        amount,
        paymentKey,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Payment] 토스페이먼츠 승인 실패:', {
        orderId,
        code: data.code,
        // 민감한 정보 제외
      });

      // 실패 정보도 DB에 저장 (추적용)
      if (supabaseAdmin) {
        try {
          await supabaseAdmin.from('orders').insert({
            order_id: orderId,
            amount: parseInt(amount),
            customer_name: sanitizedName,
            customer_email: customerEmail,
            birth_date: birthDate,
            calendar_type: calendarType,
            birth_time: sanitizedBirthTime,
            gender: gender,
            package_name: sanitizedPackageName,
            status: 'failed',
          });
        } catch (dbError) {
          console.error('[Security] 실패 정보 DB 저장 오류');
        }
      }

      return NextResponse.json(
        {
          success: false,
          message: data.message || '결제 승인에 실패했습니다.',
          code: data.code,
        },
        { status: response.status }
      );
    }

    // ✅ 결제 성공 - Supabase에 주문 정보 저장
    if (supabaseAdmin) {
      const { data: orderData, error: dbError } = await supabaseAdmin
        .from('orders')
        .insert({
          order_id: data.orderId,
          payment_key: paymentKey,
          amount: data.totalAmount,
          method: data.method,
          approved_at: data.approvedAt,
          customer_name: sanitizedName,
          customer_email: customerEmail,
          birth_date: birthDate,
          calendar_type: calendarType,
          birth_time: sanitizedBirthTime,
          gender: gender,
          package_name: sanitizedPackageName,
          status: 'completed',
        })
        .select()
        .single();

      if (dbError) {
        console.error('[Security] DB 저장 오류 (결제는 성공)');
        // DB 저장 실패해도 결제는 성공했으므로 성공 응답 (중요!)
      } else {
        console.log('[Payment] 결제 정보 DB 저장 성공:', orderData?.id);
      }
    }

    // 결제 성공 로그 (민감한 정보 마스킹)
    console.log('[Payment] 결제 완료:', maskSensitiveData({
      orderId: data.orderId,
      orderName: data.orderName,
      method: data.method,
      totalAmount: data.totalAmount,
      customer_name: sanitizedName,
      customer_email: customerEmail,
      package_name: sanitizedPackageName,
    }));

    // TODO: 이메일 발송 (선택사항)
    // await sendConfirmationEmail(customerEmail, { packageName, orderName: data.orderName });

    const response2 = NextResponse.json({
      success: true,
      data: {
        orderId: data.orderId,
        orderName: data.orderName,
        approvedAt: data.approvedAt,
        totalAmount: data.totalAmount,
        method: data.method,
      },
    });

    return addSecurityHeaders(response2);
  } catch (error) {
    return createSecureErrorResponse(error, '결제 처리 중 오류가 발생했습니다.');
  }
}
