"use client";

import { useState } from "react";
import Link from "next/link";

// 토스페이먼츠 관련 코드는 제거됨 (현재는 구글 시트로만 저장)

// 패키지 타입 정의
interface Package {
  name: string;
  price: string;
  originalPrice?: string;
  badge: string;
  desc: string;
  points: { text: string; included: boolean }[];
  highlight?: boolean;
  pricing?: { people: number; price: number; originalPrice: number; discount: number }[];
}

// 에러 타입 정의
interface FormErrors {
  name?: string;
  birthDate?: string;
  calendarType?: string;
  birthTime?: string;
  gender?: string;
  email?: string;
  numberOfPeople?: string;
  agreements?: string;
}

// 동의 항목 타입
interface Agreements {
  all: boolean;
  privacy: boolean;      // 개인정보 수집·이용 동의 (필수)
  thirdParty: boolean;   // 개인정보 제3자 제공 동의 (필수)
  terms: boolean;        // 이용약관 동의 (필수)
  marketing: boolean;    // 마케팅 정보 수신 동의 (선택)
}

// 모달 컴포넌트
export function OrderModal({
  package: pkg,
  isOpen,
  onClose,
}: {
  package: Package;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    calendarType: "", // 양력/음력/윤달
    birthTime: "", // 생시
    gender: "",
    email: "",
    numberOfPeople: pkg.pricing ? "1" : "", // 프리미엄 패키지의 경우 기본 1인
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreements, setAgreements] = useState<Agreements>({
    all: false,
    privacy: false,
    thirdParty: false,
    terms: false,
    marketing: false,
  });
  const [expandedAgreement, setExpandedAgreement] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 입력 시 해당 필드 에러 클리어
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 동의 항목 변경 처리
  const handleAgreementChange = (key: keyof Agreements) => {
    if (key === 'all') {
      // 전체 동의
      const newValue = !agreements.all;
      setAgreements({
        all: newValue,
        privacy: newValue,
        thirdParty: newValue,
        terms: newValue,
        marketing: newValue,
      });
    } else {
      // 개별 동의
      const newAgreements = {
        ...agreements,
        [key]: !agreements[key],
      };
      // 필수 항목이 모두 체크되었는지 확인
      const allRequiredChecked = newAgreements.privacy && newAgreements.thirdParty && newAgreements.terms;
      newAgreements.all = allRequiredChecked && newAgreements.marketing;
      setAgreements(newAgreements);
    }
    // 동의 에러 클리어
    if (errors.agreements) {
      setErrors((prev) => ({ ...prev, agreements: undefined }));
    }
  };

  // 동의 내용 토글
  const toggleAgreementContent = (key: string) => {
    setExpandedAgreement(expandedAgreement === key ? null : key);
  };

  // 이메일 유효성 검사
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "생년월일을 선택해주세요.";
    }
    if (!formData.calendarType) {
      newErrors.calendarType = "양력/음력을 선택해주세요.";
    }
    if (!formData.birthTime) {
      newErrors.birthTime = "생시를 선택해주세요.";
    }
    if (!formData.gender) {
      newErrors.gender = "성별을 선택해주세요.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    // 프리미엄 패키지의 경우 인원 선택 필수
    if (pkg.pricing && !formData.numberOfPeople) {
      newErrors.numberOfPeople = "분석 인원을 선택해주세요.";
    }

    // 필수 동의 항목 체크
    if (!agreements.privacy || !agreements.thirdParty || !agreements.terms) {
      newErrors.agreements = "필수 동의 항목에 모두 동의해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // (임시) 토스 결제 대신 구글 시트로 기본 정보만 저장
      const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

      if (!googleSheetUrl) {
        alert("구글 시트 URL이 설정되지 않았습니다.\n\n환경 변수 NEXT_PUBLIC_GOOGLE_SHEET_URL을 확인해주세요.\n\n현재 값: " + (googleSheetUrl || "없음"));
        setIsLoading(false);
        return;
      }

      // 주문 ID 생성 (고유값)
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      // 금액 계산 (프리미엄 패키지의 경우 선택한 인원에 따라)
      let amount: number;
      if (pkg.pricing && formData.numberOfPeople) {
        const selectedPricing = pkg.pricing.find(p => p.people.toString() === formData.numberOfPeople);
        amount = selectedPricing ? selectedPricing.price : parseInt(pkg.price.replace(/,|원/g, ""));
      } else {
        amount = parseInt(pkg.price.replace(/,|원/g, ""));
      }

      // 인원 수 설정
      const personCount = pkg.pricing && formData.numberOfPeople ? parseInt(formData.numberOfPeople) : 1;
      const personsData = [
        {
          name: formData.name,
          birthDate: formData.birthDate,
          calendarType: formData.calendarType,
          birthTime: formData.birthTime,
          gender: formData.gender,
          email: formData.email,
        },
      ];

      console.log("구글 시트 저장 시작:", { googleSheetUrl, personCount, personsData });

      const response = await fetch(googleSheetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          packageName: pkg.name,
          amount,
          personCount,
          personsData,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("구글 시트 저장 실패 (HTTP):", response.status, errorText);
        throw new Error(`서버 오류 (${response.status}): ${errorText}`);
      }

      const result = await response.json();
      console.log("구글 시트 응답:", result);

      if (result.success) {
        alert("✅ 기본 정보가 정상적으로 접수되었습니다.\n\n구글 시트 저장 완료!");
        onClose();
      } else {
        console.error("구글 시트 저장 실패:", result.message);
        alert(`❌ 정보 저장 중 오류가 발생했습니다.\n\n오류 내용: ${result.message || "알 수 없는 오류"}\n\n잠시 후 다시 시도해주세요.`);
      }
    } catch (error) {
      console.error("구글 시트 전송 오류:", error);
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";
      alert(`❌ 정보 저장 중 오류가 발생했습니다.\n\n오류 내용: ${errorMessage}\n\n브라우저 콘솔(F12)을 확인해주세요.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 rounded-t-3xl md:rounded-3xl shadow-2xl animate-slide-up md:animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle for mobile bottom sheet */}
        <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full mt-3 cursor-grab"></div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all z-20"
        >
          <span className="text-gray-600 text-2xl">×</span>
        </button>

        <div className="p-6 md:p-8 pt-8 md:pt-8">
          {/* 패키지 정보 */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-full bg-blue-100 text-blue-600 px-3 py-1 text-sm md:text-base font-semibold">
                {pkg.badge}
              </span>
              {pkg.highlight && <span className="text-2xl md:text-3xl">⭐</span>}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {pkg.name}
            </h3>
            <p className="text-gray-600 text-base md:text-lg">{pkg.desc}</p>
          </div>

          {/* 포함 내용 */}
          <div className="mb-6 p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 text-lg md:text-xl">📋 포함 내용</h4>
            <ul className="space-y-2">
              {pkg.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-lg md:text-xl text-gray-700">
                  <span className={`mt-0.5 flex-shrink-0 ${point.included ? 'text-blue-600' : 'text-gray-400'}`}>
                    {point.included ? '✓' : '✕'}
                  </span>
                  <span className={point.included ? '' : 'text-gray-400 line-through'}>{point.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 인원별 가격표 (프리미엄 패키지만 표시) */}
          {pkg.pricing && (
            <div className="mb-6 p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 text-lg md:text-xl">
                💰 인원별 할인 가격 <span className="text-sm font-normal text-gray-600">(클릭하여 선택)</span>
              </h4>
              <div className="space-y-2">
                {pkg.pricing.map((priceInfo) => (
                  <button
                    key={priceInfo.people}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, numberOfPeople: priceInfo.people.toString() }));
                      if (errors.numberOfPeople) {
                        setErrors(prev => ({ ...prev, numberOfPeople: undefined }));
                      }
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      formData.numberOfPeople === priceInfo.people.toString()
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.numberOfPeople === priceInfo.people.toString()
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.numberOfPeople === priceInfo.people.toString() && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-semibold text-gray-900 text-lg">{priceInfo.people}인</span>
                        <span className="text-sm text-gray-500 line-through">
                          {priceInfo.originalPrice.toLocaleString()}원
                        </span>
                        <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                          {priceInfo.discount}% OFF
                        </span>
                      </div>
                      <span className="text-xl md:text-2xl font-bold text-blue-600">
                        {priceInfo.price.toLocaleString()}원
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {errors.numberOfPeople && (
                <p className="mt-2 text-sm text-red-500" role="alert">
                  {errors.numberOfPeople}
                </p>
              )}
            </div>
          )}

          {/* 결제 금액 */}
          <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-700 text-lg md:text-xl block font-semibold">총 결제 금액</span>
                {pkg.pricing && formData.numberOfPeople && (
                  <div className="mt-1">
                    <span className="text-sm text-gray-600">
                      {formData.numberOfPeople}인 선택
                    </span>
                    <span className="mx-2 text-gray-400">·</span>
                    <span className="text-sm text-gray-500 line-through">
                      {pkg.pricing.find(p => p.people.toString() === formData.numberOfPeople)?.originalPrice.toLocaleString()}원
                    </span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <span className="text-4xl md:text-5xl font-bold text-blue-600 block">
                  {pkg.pricing && formData.numberOfPeople
                    ? pkg.pricing.find(p => p.people.toString() === formData.numberOfPeople)?.price.toLocaleString() + '원'
                    : pkg.price}
                </span>
                {pkg.pricing && formData.numberOfPeople && (
                  <span className="text-sm font-semibold text-red-600 mt-1 block">
                    {pkg.pricing.find(p => p.people.toString() === formData.numberOfPeople)?.discount}% 할인
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 개인정보 입력 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg md:text-xl">📝 정보 입력</h4>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-lg md:text-xl font-medium text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    aria-label="이름 입력"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-gray-900 text-lg md:text-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="홍길동"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="birthDate" className="block text-lg md:text-xl font-medium text-gray-700 mb-2">
                      생년월일 *
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      required
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      aria-label="생년월일 선택"
                      aria-invalid={!!errors.birthDate}
                      aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-gray-900 text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.birthDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.birthDate && (
                      <p id="birthDate-error" className="mt-1 text-sm text-red-500" role="alert">
                        {errors.birthDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="calendarType" className="block text-lg md:text-xl font-medium text-gray-700 mb-2">
                      양력/음력/윤달 *
                    </label>
                    <select
                      id="calendarType"
                      name="calendarType"
                      required
                      value={formData.calendarType}
                      onChange={handleInputChange}
                      aria-label="양력/음력 선택"
                      aria-invalid={!!errors.calendarType}
                      aria-describedby={errors.calendarType ? "calendarType-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-gray-900 text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer ${
                        errors.calendarType ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="" className="bg-white text-gray-500">선택</option>
                      <option value="solar" className="bg-white">양력</option>
                      <option value="lunar" className="bg-white">음력</option>
                      <option value="leap" className="bg-white">윤달</option>
                    </select>
                    {errors.calendarType && (
                      <p id="calendarType-error" className="mt-1 text-sm text-red-500" role="alert">
                        {errors.calendarType}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="birthTime" className="block text-lg md:text-xl font-medium text-gray-700 mb-2">
                      생시 *
                    </label>
                    <select
                      id="birthTime"
                      name="birthTime"
                      required
                      value={formData.birthTime}
                      onChange={handleInputChange}
                      aria-label="생시 선택"
                      aria-invalid={!!errors.birthTime}
                      aria-describedby={errors.birthTime ? "birthTime-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-gray-900 text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer ${
                        errors.birthTime ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="" className="bg-white text-gray-500">선택</option>
                      <option value="unknown" className="bg-white">모름</option>
                      <option value="23:30-01:30" className="bg-white">자시 (23:30-01:30)</option>
                      <option value="01:30-03:30" className="bg-white">축시 (01:30-03:30)</option>
                      <option value="03:30-05:30" className="bg-white">인시 (03:30-05:30)</option>
                      <option value="05:30-07:30" className="bg-white">묘시 (05:30-07:30)</option>
                      <option value="07:30-09:30" className="bg-white">진시 (07:30-09:30)</option>
                      <option value="09:30-11:30" className="bg-white">사시 (09:30-11:30)</option>
                      <option value="11:30-13:30" className="bg-white">오시 (11:30-13:30)</option>
                      <option value="13:30-15:30" className="bg-white">미시 (13:30-15:30)</option>
                      <option value="15:30-17:30" className="bg-white">신시 (15:30-17:30)</option>
                      <option value="17:30-19:30" className="bg-white">유시 (17:30-19:30)</option>
                      <option value="19:30-21:30" className="bg-white">술시 (19:30-21:30)</option>
                      <option value="21:30-23:30" className="bg-white">해시 (21:30-23:30)</option>
                    </select>
                    {errors.birthTime && (
                      <p id="birthTime-error" className="mt-1 text-sm text-red-500" role="alert">
                        {errors.birthTime}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-lg md:text-xl font-medium text-gray-700 mb-2">
                      성별 *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      aria-label="성별 선택"
                      aria-invalid={!!errors.gender}
                      aria-describedby={errors.gender ? "gender-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-gray-900 text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer ${
                        errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="" className="bg-white text-gray-500">선택</option>
                      <option value="male" className="bg-white">남성</option>
                      <option value="female" className="bg-white">여성</option>
                    </select>
                    {errors.gender && (
                      <p id="gender-error" className="mt-1 text-sm text-red-500" role="alert">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg md:text-xl font-medium text-gray-700 mb-2">
                    이메일 (PDF 수령용) *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-label="이메일 입력"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    autoComplete="email"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-gray-900 text-lg md:text-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 동의 항목 섹션 */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg md:text-xl">📋 약관 동의</h4>

              {/* 전체 동의 */}
              <div className="pb-4 mb-4 border-b border-gray-200">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreements.all}
                    onChange={() => handleAgreementChange('all')}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    전체 동의하기
                  </span>
                </label>
                <p className="mt-1 ml-8 text-sm text-gray-500">
                  필수 및 선택 항목에 모두 동의합니다.
                </p>
              </div>

              {/* 개별 동의 항목들 */}
              <div className="space-y-3">
                {/* 개인정보 수집·이용 동의 (필수) */}
                <div className={`rounded-xl border transition-all ${expandedAgreement === 'privacy' ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between p-3">
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={agreements.privacy}
                        onChange={() => handleAgreementChange('privacy')}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-base text-gray-800">
                        <span className="text-red-500 font-semibold">[필수]</span> 개인정보 수집·이용 동의
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleAgreementContent('privacy')}
                      className="text-gray-500 hover:text-blue-600 transition-colors p-1"
                    >
                      <span className={`text-lg transition-transform inline-block ${expandedAgreement === 'privacy' ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                  </div>
                  {expandedAgreement === 'privacy' && (
                    <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-200 pt-3 mx-3 mb-1">
                      <table className="w-full text-left">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold w-24">수집 항목</td>
                            <td className="py-2">이름, 생년월일, 생시, 성별, 이메일</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold">수집 목적</td>
                            <td className="py-2">사주 분석 서비스 제공, PDF 리포트 발송, 고객 상담</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold">보유 기간</td>
                            <td className="py-2">서비스 제공 완료 후 3년 (전자상거래법)</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="mt-2 text-xs text-gray-500">
                        * 동의를 거부할 수 있으나, 거부 시 서비스 이용이 제한됩니다.
                      </p>
                    </div>
                  )}
                </div>

                {/* 개인정보 제3자 제공 동의 (필수) */}
                <div className={`rounded-xl border transition-all ${expandedAgreement === 'thirdParty' ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between p-3">
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={agreements.thirdParty}
                        onChange={() => handleAgreementChange('thirdParty')}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-base text-gray-800">
                        <span className="text-red-500 font-semibold">[필수]</span> 개인정보 제3자 제공 동의
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleAgreementContent('thirdParty')}
                      className="text-gray-500 hover:text-blue-600 transition-colors p-1"
                    >
                      <span className={`text-lg transition-transform inline-block ${expandedAgreement === 'thirdParty' ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                  </div>
                  {expandedAgreement === 'thirdParty' && (
                    <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-200 pt-3 mx-3 mb-1">
                      <table className="w-full text-left">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold w-24">제공 받는 자</td>
                            <td className="py-2">토스페이먼츠(주)</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold">제공 항목</td>
                            <td className="py-2">이름, 이메일</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold">제공 목적</td>
                            <td className="py-2">결제 처리 및 결제 내역 확인</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold">보유 기간</td>
                            <td className="py-2">결제 완료 후 5년 (전자금융거래법)</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="mt-2 text-xs text-gray-500">
                        * 동의를 거부할 수 있으나, 거부 시 결제가 불가합니다.
                      </p>
                    </div>
                  )}
                </div>

                {/* 이용약관 동의 (필수) */}
                <div className={`rounded-xl border transition-all ${expandedAgreement === 'terms' ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between p-3">
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={agreements.terms}
                        onChange={() => handleAgreementChange('terms')}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-base text-gray-800">
                        <span className="text-red-500 font-semibold">[필수]</span> 서비스 이용약관 동의
                      </span>
                    </label>
                    <Link
                      href="/terms"
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 text-sm underline mr-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      전문 보기
                    </Link>
                  </div>
                </div>

                {/* 마케팅 정보 수신 동의 (선택) */}
                <div className={`rounded-xl border transition-all ${expandedAgreement === 'marketing' ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between p-3">
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={agreements.marketing}
                        onChange={() => handleAgreementChange('marketing')}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-base text-gray-800">
                        <span className="text-gray-500 font-semibold">[선택]</span> 마케팅 정보 수신 동의
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleAgreementContent('marketing')}
                      className="text-gray-500 hover:text-blue-600 transition-colors p-1"
                    >
                      <span className={`text-lg transition-transform inline-block ${expandedAgreement === 'marketing' ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                  </div>
                  {expandedAgreement === 'marketing' && (
                    <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-200 pt-3 mx-3 mb-1">
                      <p>이메일을 통해 신규 서비스, 이벤트, 할인 정보를 받아보실 수 있습니다.</p>
                      <p className="mt-2 text-xs text-gray-500">
                        * 동의하지 않아도 서비스 이용이 가능합니다. 수신 동의 후 언제든 철회할 수 있습니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 동의 에러 메시지 */}
              {errors.agreements && (
                <p className="mt-3 text-sm text-red-500" role="alert">
                  {errors.agreements}
                </p>
              )}
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className={`w-full py-4 rounded-xl font-semibold text-xl md:text-2xl transition-all touch-manipulation shadow-lg flex items-center justify-center gap-3 ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-blue-600/30'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-white">결제 처리 중...</span>
                </>
              ) : (
                <span>{pkg.price} 결제하기 →</span>
              )}
            </button>

            {/* 안내 문구 */}
            <div className="mt-6 p-5 rounded-2xl bg-blue-50 border border-blue-100">
              <p className="text-center text-lg md:text-xl font-semibold text-gray-800 leading-relaxed">
                기본 정보 입력 후 결제하시면
                <br className="hidden md:block" />
                <span className="md:hidden"> </span>
                <span className="text-blue-600">24시간 이내</span>에 정밀 분석한 PDF 파일을 보내드립니다.
              </p>
              <p className="mt-3 text-center text-base md:text-lg text-gray-600 leading-relaxed">
                💡 이메일로 발송되며, 다운로드 후 평생 보관하실 수 있습니다.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
