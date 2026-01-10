'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

// 동적 렌더링 강제 (빌드 시 pre-rendering 방지)
export const dynamic = 'force-dynamic';

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  const getErrorMessage = () => {
    if (message) return decodeURIComponent(message);
    
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '사용자가 결제를 취소했습니다.';
      case 'PAY_PROCESS_ABORTED':
        return '결제가 중단되었습니다.';
      case 'REJECT_CARD_COMPANY':
        return '카드사에서 승인을 거부했습니다.';
      default:
        return '결제 처리 중 오류가 발생했습니다.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080b] text-white p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">❌</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">결제에 실패했습니다</h1>
        
        <div className="my-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-left">
          <h2 className="text-lg font-semibold text-red-400 mb-3">오류 정보</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            {getErrorMessage()}
          </p>
          {code && (
            <p className="text-xs text-white/50 mt-3">
              오류 코드: {code}
            </p>
          )}
        </div>

        <p className="text-white/70 mb-8">
          문제가 지속되면 카카오톡 채널로 문의해주세요.
          <br />
          신속하게 도와드리겠습니다.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full px-6 py-3 bg-[#d4af37] text-black rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            다시 시도하기
          </Link>
          <Link
            href="http://pf.kakao.com/_fECQn"
            target="_blank"
            className="w-full px-6 py-3 bg-[#FEE500] text-[#3C1E1E] rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            카카오톡 문의하기
          </Link>
          <Link
            href="/"
            className="w-full px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

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
      <PaymentFailContent />
    </Suspense>
  );
}
