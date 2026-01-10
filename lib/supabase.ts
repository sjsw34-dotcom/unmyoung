import { createClient } from '@supabase/supabase-js';

// 환경 변수 체크 및 검증
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// 환경 변수 검증 함수
function validateSupabaseConfig() {
  const missing: string[] = [];
  
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (!supabaseServiceKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  
  if (missing.length > 0) {
    console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다:', missing.join(', '));
    return false;
  }
  
  // URL 형식 검증
  if (!supabaseUrl.startsWith('https://')) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL은 https://로 시작해야 합니다:', supabaseUrl);
    return false;
  }
  
  return true;
}

// 서버 사이드에서만 로그 출력 (빌드 타임 체크 방지)
if (typeof window === 'undefined') {
  validateSupabaseConfig();
}

// 클라이언트용 (브라우저에서 사용)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

// 서버용 (API Routes에서 사용) - 더 강력한 권한
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Supabase 연결 상태 확인 함수 (디버깅용)
export async function testSupabaseConnection() {
  if (!supabaseAdmin) {
    return {
      connected: false,
      error: 'Supabase 클라이언트가 초기화되지 않았습니다. 환경 변수를 확인하세요.',
      env: {
        url: supabaseUrl ? '✅ 설정됨' : '❌ 없음',
        anonKey: supabaseAnonKey ? '✅ 설정됨 (길이: ' + supabaseAnonKey.length + ')' : '❌ 없음',
        serviceKey: supabaseServiceKey ? '✅ 설정됨 (길이: ' + supabaseServiceKey.length + ')' : '❌ 없음',
      },
    };
  }

  try {
    // 간단한 쿼리로 연결 테스트
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('id')
      .limit(1);

    if (error) {
      // 테이블이 없거나 RLS 오류일 수 있음
      if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
        return {
          connected: true,
          error: '연결은 성공했지만 "orders" 테이블이 존재하지 않습니다. SQL Editor에서 테이블을 생성하세요.',
          env: {
            url: supabaseUrl ? '✅ 설정됨' : '❌ 없음',
            anonKey: supabaseAnonKey ? '✅ 설정됨' : '❌ 없음',
            serviceKey: supabaseServiceKey ? '✅ 설정됨' : '❌ 없음',
          },
        };
      }
      
      return {
        connected: false,
        error: error.message || '알 수 없는 오류',
        env: {
          url: supabaseUrl ? '✅ 설정됨' : '❌ 없음',
          anonKey: supabaseAnonKey ? '✅ 설정됨' : '❌ 없음',
          serviceKey: supabaseServiceKey ? '✅ 설정됨' : '❌ 없음',
        },
      };
    }

    return {
      connected: true,
      message: 'Supabase 연결 성공!',
      env: {
        url: supabaseUrl ? '✅ 설정됨' : '❌ 없음',
        anonKey: supabaseAnonKey ? '✅ 설정됨' : '❌ 없음',
        serviceKey: supabaseServiceKey ? '✅ 설정됨' : '❌ 없음',
      },
    };
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      env: {
        url: supabaseUrl ? '✅ 설정됨' : '❌ 없음',
        anonKey: supabaseAnonKey ? '✅ 설정됨' : '❌ 없음',
        serviceKey: supabaseServiceKey ? '✅ 설정됨' : '❌ 없음',
      },
    };
  }
}

// TypeScript 타입 정의
export interface Order {
  id?: string;
  created_at?: string;
  order_id: string;
  payment_key?: string;
  amount: number;
  method?: string;
  approved_at?: string;
  customer_name: string;
  customer_email: string;
  birth_date: string;
  calendar_type: 'solar' | 'lunar' | 'leap';
  birth_time: string;
  gender: 'male' | 'female';
  package_name: string;
  status?: 'pending' | 'completed' | 'failed' | 'refunded';
}

// Database 타입 정의
export interface Database {
  public: {
    Tables: {
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at'>>;
      };
    };
  };
}
