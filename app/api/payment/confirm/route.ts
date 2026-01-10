import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
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
    } = await request.json();

    // 필수 파라미터 검증
    if (!orderId || !amount || !paymentKey) {
      return NextResponse.json(
        { success: false, message: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // Supabase 연결 확인 및 디버깅
    if (!supabaseAdmin) {
      console.warn('⚠️ Supabase가 설정되지 않았습니다. DB 저장 건너뜀.');
      console.warn('환경 변수 확인:', {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ 설정됨' : '❌ 없음',
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ 설정됨' : '❌ 없음',
        serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ 설정됨' : '❌ 없음',
      });
    } else {
      console.log('✅ Supabase 클라이언트 초기화 완료');
    }

    // 토스페이먼츠 시크릿 키
    const secretKey = process.env.TOSS_SECRET_KEY || 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R';
    
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
      console.error('토스페이먼츠 승인 실패:', data);
      
      // 실패 정보도 DB에 저장 (추적용)
      if (supabaseAdmin) {
        try {
          await supabaseAdmin.from('orders').insert({
            order_id: orderId,
            amount: parseInt(amount),
            customer_name: customerName,
            customer_email: customerEmail,
            birth_date: birthDate,
            calendar_type: calendarType,
            birth_time: birthTime,
            gender: gender,
            package_name: packageName,
            status: 'failed',
          });
        } catch (dbError) {
          console.error('실패 정보 DB 저장 오류:', dbError);
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
      console.log('결제 승인 성공, DB 저장 시작...');
      console.log('저장할 데이터:', {
        order_id: data.orderId,
        amount: data.totalAmount,
        customer_name: customerName,
        customer_email: customerEmail,
        package_name: packageName,
      });
      
      try {
        const { data: orderData, error: dbError } = await supabaseAdmin
          .from('orders')
          .insert({
            order_id: data.orderId,
            payment_key: paymentKey,
            amount: data.totalAmount,
            method: data.method,
            approved_at: data.approvedAt,
            customer_name: customerName,
            customer_email: customerEmail,
            birth_date: birthDate,
            calendar_type: calendarType,
            birth_time: birthTime,
            gender: gender,
            package_name: packageName,
            status: 'completed',
          })
          .select()
          .single();

        if (dbError) {
          console.error('❌ DB 저장 오류 발생:');
          console.error('오류 코드:', dbError.code);
          console.error('오류 메시지:', dbError.message);
          console.error('오류 상세:', dbError.details);
          console.error('오류 힌트:', dbError.hint);
          
          // 특정 오류 타입별 안내
          if (dbError.code === 'PGRST116' || dbError.message?.includes('does not exist')) {
            console.error('💡 해결 방법: Supabase Dashboard에서 "orders" 테이블을 생성하세요.');
            console.error('   SQL Editor에서 SUPABASE_GUIDE.md의 SQL을 실행하세요.');
          } else if (dbError.code === '23505') {
            console.error('💡 해결 방법: 이미 같은 order_id가 존재합니다. 중복 결제일 수 있습니다.');
          } else if (dbError.code === 'PGRST301' || dbError.message?.includes('permission')) {
            console.error('💡 해결 방법: Row Level Security (RLS) 정책을 확인하세요.');
            console.error('   service_role 키를 사용하고 있는지 확인하세요.');
          }
          
          // DB 저장 실패해도 결제는 성공했으므로 성공 응답 (중요!)
          // 하지만 관리자에게 알림을 보내야 함
        } else {
          console.log('✅ 결제 정보 DB 저장 성공!');
          console.log('저장된 주문 ID:', orderData?.id);
          console.log('저장된 order_id:', orderData?.order_id);
        }
      } catch (insertError) {
        console.error('❌ DB 저장 중 예외 발생:', insertError);
        if (insertError instanceof Error) {
          console.error('예외 메시지:', insertError.message);
          console.error('예외 스택:', insertError.stack);
        }
      }
    } else {
      console.warn('⚠️ Supabase 미설정 - DB 저장 건너뜀');
      console.warn('환경 변수를 확인하고 서버를 재시작하세요.');
    }

    // 결제 성공 로그
    console.log('결제 완료:', {
      orderId: data.orderId,
      orderName: data.orderName,
      method: data.method,
      totalAmount: data.totalAmount,
      customerName,
      customerEmail,
      packageName,
    });

    // TODO: 이메일 발송 (선택사항)
    // await sendConfirmationEmail(customerEmail, { packageName, orderName: data.orderName });

    return NextResponse.json({
      success: true,
      data: {
        orderId: data.orderId,
        orderName: data.orderName,
        approvedAt: data.approvedAt,
        totalAmount: data.totalAmount,
        method: data.method,
      },
    });

  } catch (error) {
    console.error('결제 승인 API 오류:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : '서버 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
