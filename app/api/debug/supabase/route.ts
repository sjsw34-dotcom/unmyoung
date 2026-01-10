import { NextResponse } from 'next/server';
import { testSupabaseConnection } from '@/lib/supabase';

// GET /api/debug/supabase - Supabase 연결 상태 확인 (디버깅용)
export async function GET() {
  try {
    const result = await testSupabaseConnection();
    
    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    }, {
      status: result.connected ? 200 : 503,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
