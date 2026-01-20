import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import {
  checkRateLimit,
  getClientIp,
  validateApiKey,
  validateEmail,
  validateOrderId,
  createSecureErrorResponse,
  addSecurityHeaders,
  maskSensitiveData,
} from '@/lib/security';

// GET /api/orders - 주문 목록 조회 (관리자 전용)
export async function GET(request: NextRequest) {
  try {
    // Rate limiting 체크
    const ip = getClientIp(request);
    if (!checkRateLimit(ip, 30, 60000)) {
      // 1분에 30회 제한
      return NextResponse.json(
        { success: false, message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
        { status: 429 }
      );
    }

    // API 키 검증 (관리자 전용)
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { success: false, message: '인증되지 않은 요청입니다.' },
        { status: 401 }
      );
    }

    // Supabase 연결 확인
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: '서비스를 일시적으로 사용할 수 없습니다.',
        },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100); // 최대 100개로 제한
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);
    const status = searchParams.get('status');
    const email = searchParams.get('email');

    // 이메일 검증
    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: '잘못된 이메일 형식입니다.' },
        { status: 400 }
      );
    }

    let query = supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // 상태 필터 (화이트리스트 방식)
    if (status && ['completed', 'failed', 'pending', 'refunded'].includes(status)) {
      query = query.eq('status', status);
    }

    // 이메일 필터
    if (email) {
      query = query.eq('customer_email', email);
    }

    // 페이지네이션
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    // 민감한 정보 마스킹
    const maskedData = data?.map((order) => maskSensitiveData(order));

    const response = NextResponse.json({
      success: true,
      data: maskedData,
      total: count || 0,
      limit,
      offset,
    });

    return addSecurityHeaders(response);
  } catch (error) {
    return createSecureErrorResponse(error, '주문 조회 중 오류가 발생했습니다.');
  }
}

// POST /api/orders - 특정 주문 조회
export async function POST(request: NextRequest) {
  try {
    // Rate limiting 체크
    const ip = getClientIp(request);
    if (!checkRateLimit(ip, 10, 60000)) {
      // 1분에 10회 제한
      return NextResponse.json(
        { success: false, message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
        { status: 429 }
      );
    }

    // Supabase 연결 확인
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: '서비스를 일시적으로 사용할 수 없습니다.',
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'orderId가 필요합니다.' },
        { status: 400 }
      );
    }

    // orderId 검증
    if (!validateOrderId(orderId)) {
      return NextResponse.json(
        { success: false, message: '잘못된 주문 ID 형식입니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, message: '주문을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      throw error;
    }

    // 민감한 정보 마스킹
    const maskedData = maskSensitiveData(data);

    const response = NextResponse.json({
      success: true,
      data: maskedData,
    });

    return addSecurityHeaders(response);
  } catch (error) {
    return createSecureErrorResponse(error, '주문 조회 중 오류가 발생했습니다.');
  }
}
