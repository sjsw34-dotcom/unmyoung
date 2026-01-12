'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const [isConfirming, setIsConfirming] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // URL 파라미터에서 정보 추출
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const paymentKey = searchParams.get('paymentKey');
  const customerName = searchParams.get('name');
  const customerEmail = searchParams.get('email');
  const packageName = searchParams.get('package');
  const birthDate = searchParams.get('birthDate');
  const calendarType = searchParams.get('calendarType');
  const birthTime = searchParams.get('birthTime');
  const gender = searchParams.get('gender');

  useEffect(() => {
    const confirmPayment = async () => {
      if (!orderId || !amount || !paymentKey) {
        setError('결제 정보가 올바르지 않습니다.');
        setIsConfirming(false);
        return;
      }

      try {
        // 결제 승인 API 호출
        const response = await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || '결제 승인에 실패했습니다.');
        }

        // 성공
        setIsConfirming(false);
      } catch (err) {
        console.error('결제 승인 오류:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        setIsConfirming(false);
      }
    };

    confirmPayment();
  }, [orderId, amount, paymentKey, customerName, customerEmail, packageName, birthDate, calendarType, birthTime, gender]);

  if (isConfirming) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07080b] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d4af37] mx-auto mb-6"></div>
          <p className="text-xl text-white/80">결제를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07080b] text-white p-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-3xl font-bold mb-4">결제 승인 실패</h1>
          <p className="text-white/70 mb-8">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080b] text-white p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">결제가 완료되었습니다!</h1>
        
        <div className="my-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
          <h2 className="text-lg font-semibold text-[#d4af37] mb-4">주문 정보</h2>
          <div className="space-y-2 text-sm text-white/80">
            <div className="flex justify-between">
              <span>상품명:</span>
              <span className="font-semibold text-white">{packageName}</span>
            </div>
            <div className="flex justify-between">
              <span>결제 금액:</span>
              <span className="font-semibold text-white">{parseInt(amount || '0').toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span>이름:</span>
              <span className="font-semibold text-white">{customerName}</span>
            </div>
            <div className="flex justify-between">
              <span>생년월일:</span>
              <span className="font-semibold text-white">{birthDate}</span>
            </div>
            <div className="flex justify-between">
              <span>양/음력:</span>
              <span className="font-semibold text-white">
                {calendarType === 'solar' ? '양력' : calendarType === 'lunar' ? '음력' : calendarType === 'leap' ? '윤달' : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>생시:</span>
              <span className="font-semibold text-white">{birthTime === 'unknown' ? '모름' : birthTime}</span>
            </div>
            <div className="flex justify-between">
              <span>성별:</span>
              <span className="font-semibold text-white">{gender === 'male' ? '남성' : '여성'}</span>
            </div>
            <div className="flex justify-between">
              <span>이메일:</span>
              <span className="font-semibold text-white">{customerEmail}</span>
            </div>
          </div>
        </div>

        {/* PDF 전송 안내 - 강조된 박스 */}
        <div className="mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#d4af37]/20 via-[#d4af37]/10 to-transparent border-2 border-[#d4af37]/30 shadow-lg shadow-[#d4af37]/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#d4af37] flex items-center justify-center">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                📧 PDF 리포트 전송 안내
              </h3>
              <div className="space-y-2 text-base md:text-lg text-white/90 leading-relaxed">
                <p>
                  입력하신 <span className="font-bold text-[#d4af37]">{customerEmail}</span>로
                </p>
                <p className="text-xl md:text-2xl font-bold text-white">
                  <span className="text-[#d4af37]">24시간 이내</span>에
                </p>
                <p className="text-lg md:text-xl font-semibold text-white">
                  평생 소장할 수 있는 PDF 파일이 전송됩니다
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm md:text-base text-white/70">
                  💡 PDF 파일은 이메일로 발송되며, 다운로드 후 평생 보관하실 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-white/60 mb-8 text-sm md:text-base leading-relaxed">
          추가 문의사항은 카카오톡 채널로 연락주세요.
        </p>

        <div className="flex flex-col gap-3">
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
