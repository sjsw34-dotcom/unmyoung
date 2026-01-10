// 서버 컴포넌트 래퍼 - 동적 렌더링 강제
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import { Suspense } from 'react';
import PaymentFailClient from './client';

export default function PaymentFail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#07080b] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d4af37] mx-auto mb-6"></div>
          <p className="text-xl text-white/80">로딩 중...</p>
        </div>
      </div>
    }>
      <PaymentFailClient />
    </Suspense>
  );
}
