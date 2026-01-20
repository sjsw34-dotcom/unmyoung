'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentFailClient() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  // 사용자 취소인지 확인
  const isUserCanceled = code === 'PAY_PROCESS_CANCELED' || code === 'USER_CANCEL';

  const getErrorInfo = () => {
    if (message) {
      return {
        title: '결제 오류',
        message: decodeURIComponent(message),
        suggestion: '다시 시도해주세요.'
      };
    }

    switch (code) {
      case 'PAY_PROCESS_CANCELED':
      case 'USER_CANCEL':
        return {
          title: '결제 취소',
          message: '결제가 취소되었습니다.',
          suggestion: '원하실 때 언제든 다시 결제하실 수 있습니다.'
        };
      case 'PAY_PROCESS_ABORTED':
        return {
          title: '결제 중단',
          message: '결제가 중단되었습니다.',
          suggestion: '잠시 후 다시 시도해주세요.'
        };
      case 'REJECT_CARD_COMPANY':
        return {
          title: '카드 승인 거부',
          message: '카드사에서 승인을 거부했습니다.',
          suggestion: '다른 카드로 시도하시거나 카드사에 문의해주세요.'
        };
      case 'INVALID_CARD_NUMBER':
        return {
          title: '카드 정보 오류',
          message: '카드 번호가 올바르지 않습니다.',
          suggestion: '카드 정보를 확인 후 다시 시도해주세요.'
        };
      case 'EXCEED_MAX_AMOUNT':
        return {
          title: '한도 초과',
          message: '카드 결제 한도를 초과했습니다.',
          suggestion: '다른 카드로 시도하시거나 한도를 확인해주세요.'
        };
      default:
        return {
          title: '결제 오류',
          message: '결제 처리 중 오류가 발생했습니다.',
          suggestion: '잠시 후 다시 시도해주세요.'
        };
    }
  };

  const errorInfo = getErrorInfo();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080b] text-white p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">{isUserCanceled ? '🔙' : '❌'}</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isUserCanceled ? '결제가 취소되었습니다' : '결제에 실패했습니다'}
        </h1>

        <div className={`my-8 p-6 rounded-2xl text-left ${
          isUserCanceled
            ? 'bg-white/5 border border-white/10'
            : 'bg-red-500/10 border border-red-500/20'
        }`}>
          <h2 className={`text-lg font-semibold mb-3 ${
            isUserCanceled ? 'text-white/80' : 'text-red-400'
          }`}>
            {errorInfo.title}
          </h2>
          <p className="text-base md:text-lg text-white/80 leading-relaxed">
            {errorInfo.message}
          </p>
          <p className="text-sm md:text-base text-white/60 mt-3">
            💡 {errorInfo.suggestion}
          </p>
          {code && !isUserCanceled && (
            <p className="text-xs text-white/40 mt-4 pt-3 border-t border-white/10">
              오류 코드: {code}
            </p>
          )}
        </div>

        {!isUserCanceled && (
          <p className="text-white/70 mb-8 text-base md:text-lg">
            문제가 지속되면 카카오톡 채널로 문의해주세요.
            <br />
            신속하게 도와드리겠습니다.
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/#packages"
            className="w-full px-6 py-4 bg-[#d4af37] text-black rounded-xl font-semibold text-lg md:text-xl hover:opacity-90 hover:scale-105 transition-all active:scale-95"
          >
            {isUserCanceled ? '상품 다시 보기' : '다시 시도하기'} →
          </Link>
          {!isUserCanceled && (
            <Link
              href="http://pf.kakao.com/_fECQn"
              target="_blank"
              className="w-full px-6 py-4 bg-[#FEE500] text-[#3C1E1E] rounded-xl font-semibold text-lg md:text-xl hover:opacity-90 transition-all"
            >
              카카오톡 문의하기
            </Link>
          )}
          <Link
            href="/"
            className="w-full px-6 py-4 bg-white/10 text-white rounded-xl font-semibold text-lg md:text-xl hover:bg-white/20 transition-all"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
