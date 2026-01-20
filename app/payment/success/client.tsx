'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PersonData {
  name: string;
  birthDate: string;
  calendarType: string;
  birthTime: string;
  gender: string;
  email: string;
}

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const [isConfirming, setIsConfirming] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL 파라미터에서 정보 추출
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const paymentKey = searchParams.get('paymentKey');
  const packageName = searchParams.get('package');
  const personCountStr = searchParams.get('personCount');
  const personsDataStr = searchParams.get('personsData');

  // 다인 분석 데이터 파싱
  const personCount = personCountStr ? parseInt(personCountStr) : 1;
  let personsData: PersonData[] = [];
  
  if (personsDataStr) {
    try {
      personsData = JSON.parse(decodeURIComponent(personsDataStr));
    } catch (e) {
      console.error('personsData 파싱 오류:', e);
    }
  }

  // personsData가 비어있으면 URL 파라미터에서 개별 정보로 구성
  if (personsData.length === 0) {
    const name = searchParams.get('name');
    const birthDate = searchParams.get('birthDate');
    const calendarType = searchParams.get('calendarType');
    const birthTime = searchParams.get('birthTime');
    const gender = searchParams.get('gender');
    const email = searchParams.get('email');
    
    if (name && birthDate && calendarType && birthTime && gender && email) {
      personsData = [{
        name,
        birthDate,
        calendarType,
        birthTime,
        gender,
        email,
      }];
    }
  }

  // 첫 번째 사람 정보 (표시용)
  const firstPerson = personsData[0] || {};

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
            customerName: firstPerson.name,
            customerEmail: firstPerson.email,
            packageName,
            birthDate: firstPerson.birthDate,
            calendarType: firstPerson.calendarType,
            birthTime: firstPerson.birthTime,
            gender: firstPerson.gender,
            personCount: personCount,
            personsData: personsData,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || '결제 승인에 실패했습니다.');
        }

        // 성공
        setIsConfirming(false);

        // 결제 승인 성공 후 구글 시트로 데이터 전송 (비동기, 실패해도 사용자에게는 성공 표시)
        sendToGoogleSheet({
          orderId: data.data?.orderId || orderId,
          packageName: packageName || '',
          amount: data.data?.totalAmount || parseInt(amount || '0'),
          personCount,
          personsData,
        }).catch((err) => {
          console.error('구글 시트 전송 오류 (결제는 성공):', err);
        });
      } catch (err) {
        console.error('결제 승인 오류:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        setIsConfirming(false);
      }
    };

    confirmPayment();
  }, [orderId, amount, paymentKey, packageName, personCount, personsData, firstPerson.name, firstPerson.email, firstPerson.birthDate, firstPerson.calendarType, firstPerson.birthTime, firstPerson.gender]);

  // 구글 시트로 데이터 전송
  const sendToGoogleSheet = async (orderData: {
    orderId: string;
    packageName: string;
    amount: number;
    personCount: number;
    personsData: PersonData[];
  }) => {
    const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

    if (!googleSheetUrl) {
      console.warn('구글 시트 URL이 설정되지 않았습니다.');
      return;
    }

    try {
      const response = await fetch(googleSheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('구글 시트 저장 성공');
      } else {
        console.error('구글 시트 저장 실패:', result.message);
      }
    } catch (err) {
      console.error('구글 시트 전송 오류:', err);
      // 구글 시트 전송 실패해도 사용자에게는 성공 메시지 표시 (결제는 완료됨)
    }
  };

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
      <div className="max-w-2xl w-full text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">결제가 완료되었습니다!</h1>

        <div className="my-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
          <h2 className="text-lg font-semibold text-[#d4af37] mb-4">주문 정보</h2>
          <div className="space-y-2 text-sm text-white/80 mb-4">
            <div className="flex justify-between">
              <span>상품명:</span>
              <span className="font-semibold text-white">{packageName}</span>
            </div>
            <div className="flex justify-between">
              <span>결제 금액:</span>
              <span className="font-semibold text-white">{parseInt(amount || '0').toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span>분석 인원:</span>
              <span className="font-semibold text-white">{personCount}인</span>
            </div>
          </div>

          {/* 분석 대상자 정보 */}
          {personsData.map((person, index) => (
            <div key={index} className="mt-4 pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-[#d4af37] mb-3">
                {personCount > 1 ? `${index + 1}번째 분석 대상자` : '분석 대상자'}
              </h3>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex justify-between">
                  <span>이름:</span>
                  <span className="font-semibold text-white">{person.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>생년월일:</span>
                  <span className="font-semibold text-white">{person.birthDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>양/음력:</span>
                  <span className="font-semibold text-white">
                    {person.calendarType === 'solar'
                      ? '양력'
                      : person.calendarType === 'lunar'
                      ? '음력'
                      : person.calendarType === 'leap'
                      ? '윤달'
                      : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>생시:</span>
                  <span className="font-semibold text-white">
                    {person.birthTime === 'unknown' ? '모름' : person.birthTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>성별:</span>
                  <span className="font-semibold text-white">
                    {person.gender === 'male' ? '남성' : '여성'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>이메일:</span>
                  <span className="font-semibold text-white">{person.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/70 mb-8 leading-relaxed">
          입력하신 <span className="font-semibold text-[#d4af37]">{firstPerson.email}</span>로<br />
          <span className="font-semibold text-white">24~48시간 내</span>에 PDF 리포트를 발송해드립니다.
          <br />
          <br />
          {personCount > 1 && (
            <>
              <span className="font-semibold text-[#d4af37]">궁합 분석</span>도 함께
              제공됩니다.
              <br />
              <br />
            </>
          )}
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
