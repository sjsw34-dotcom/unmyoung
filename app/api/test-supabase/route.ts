import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * Supabase 연결 상태 테스트 API
 * GET /api/test-supabase
 */
export async function GET(request: NextRequest) {
  try {
    // 환경 변수 확인
    const envStatus = {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    };

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: false,
        connected: false,
        message: 'Supabase 클라이언트가 초기화되지 않았습니다.',
        env: envStatus,
        timestamp: new Date().toISOString(),
      }, { status: 503 });
    }

    // 실제 DB 연결 테스트 - orders 테이블에서 count 조회
    const { count, error } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({
        success: false,
        connected: false,
        message: `Supabase 연결 오류: ${error.message}`,
        error: error.code || 'UNKNOWN',
        env: envStatus,
        timestamp: new Date().toISOString(),
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      connected: true,
      message: 'Supabase 연결 성공!',
      database: {
        ordersTable: {
          exists: true,
          recordCount: count || 0,
        },
      },
      env: envStatus,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Supabase 테스트 오류:', error);
    return NextResponse.json({
      success: false,
      connected: false,
      message: `테스트 중 오류 발생: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
