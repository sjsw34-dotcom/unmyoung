import { NextRequest, NextResponse } from 'next/server';

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
      return NextResponse.json(
        {
          success: false,
          message: data.message || '결제 승인에 실패했습니다.',
          code: data.code,
        },
        { status: response.status }
      );
    }

    // 결제 성공 - 여기서 추가 작업 수행 가능
    console.log('결제 승인 성공:', {
      orderId: data.orderId,
      orderName: data.orderName,
      method: data.method,
      totalAmount: data.totalAmount,
      customerName,
      customerEmail,
      packageName,
      birthDate,
      calendarType,
      birthTime,
      gender,
    });

    // TODO: 구글 시트에 결제 정보 저장 (선택사항)
    // await saveToGoogleSheet({ ...data, customerName, customerEmail, packageName, birthDate, calendarType, birthTime, gender });

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
