import { createClient } from '@supabase/supabase-js';

// 환경 변수 체크
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// 클라이언트용 (브라우저에서 사용)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// 서버용 (API Routes에서 사용) - 더 강력한 권한
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

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
