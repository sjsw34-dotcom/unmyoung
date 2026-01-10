import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/orders - 주문 목록 조회
export async function GET(request: NextRequest) {
  try {
    // Supabase 연결 확인
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: 'Supabase가 설정되지 않았습니다.',
        },
        { status: 503 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status'); // 'completed', 'failed', 'pending', 'refunded'
    const email = searchParams.get('email'); // 특정 이메일로 필터링
    
    let query = supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });
    
    // 상태 필터
    if (status) {
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

    return NextResponse.json({
      success: true,
      data,
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('주문 조회 오류:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : '조회 실패',
      },
      { status: 500 }
    );
  }
}

// POST /api/orders - 특정 주문 조회 (orderId로)
export async function POST(request: NextRequest) {
  try {
    // Supabase 연결 확인
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: 'Supabase가 설정되지 않았습니다.',
        },
        { status: 503 }
      );
    }
    
    const { orderId } = await request.json();
    
    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'orderId가 필요합니다.' },
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

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('주문 조회 오류:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : '조회 실패',
      },
      { status: 500 }
    );
  }
}
