// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CHAT_URL = "http://pf.kakao.com/_fECQn"; // 운명테라피 카카오톡 채널

// 환경 변수는 파일 최상단에서 상수로 선언 (빌드 시 인라인됨)
const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

// 스크롤 애니메이션을 위한 커스텀 훅
function useFadeIn() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// 비디오 배경 컴포넌트
function VideoBackground({
  videoSrc,
  overlayOpacity = 60,
  className = "",
}: {
  videoSrc: string;
  overlayOpacity?: number;
  className?: string;
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 모바일 감지 (768px 이하는 영상 비활성화로 성능 개선)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 비디오 강제 재생 시도 (데스크톱만)
    if (videoRef.current && !isMobile) {
      videoRef.current.play().catch((err) => {
        console.log("영상 자동 재생 실패:", err);
      });
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* 배경 영상 - 데스크톱만, 에러나 로딩 실패 시 숨김 */}
      {!isMobile && !hasError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            console.log(`✅ 영상 로딩 완료: ${videoSrc}`);
            setIsVideoLoaded(true);
          }}
          onError={(e) => {
            console.error(`❌ 영상 로딩 실패: ${videoSrc}`, e);
            setHasError(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* 폴백 배경 (영상 로딩 중, 모바일, 또는 에러 시 항상 표시) */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#07080b] via-[#0f1014] to-[#1a1a1f] transition-opacity duration-1000 ${
          isVideoLoaded && !hasError && !isMobile ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 오버레이 (텍스트 가독성) */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(to bottom, rgba(7, 8, 11, ${overlayOpacity / 100}), rgba(7, 8, 11, ${
            overlayOpacity / 100 + 0.2
          }))`,
        }}
      />
    </div>
  );
}

const packages = [
  {
    name: "신년운세",
    price: "19,900원",
    badge: "2026 집중",
    desc: "월별 흐름 + 중요한 달 + 조심 포인트\n+ 활용 전략",
    points: [
      { text: "2026 월별 운세", included: true },
      { text: "사주 핵심 요약", included: true },
      { text: "운세 총평", included: true },
      { text: "재물 흐름", included: true },
      { text: "직업·사업", included: true },
      { text: "연애·가정", included: true },
      { text: "건강 관리", included: true },
      { text: "인간관계·귀인", included: true },
      { text: "주의점·가이드", included: true },
    ],
  },
  {
    name: "기본 분석",
    price: "9,800원",
    badge: "입문/빠른 파악",
    desc: "5페이지 분량 · 내 사주 구조 타입을\n빠르게 파악하고 싶은 분",
    points: [
      { text: "인생 전반 상승·하강 흐름", included: false },
      { text: "연애운·결혼운", included: false },
      { text: "돈이 들어오는 시기와 방향", included: false },
      { text: "나에게 맞는 일의 형태", included: false },
      { text: "건강 주의 시기", included: false },
      { text: "향후 10년 대운 분석", included: false },
      { text: "추가 질문 무제한 + PDF 평생 소장", included: false },
      { text: "2인 이상 신청 시 궁합 분석 무료", included: false },
    ],
  },
  {
    name: "프리미엄 종합 분석",
    price: "29,900원",
    badge: "100페이지+",
    desc: "인생 전체 흐름을 한 번에\n정리하고 싶은 분",
    points: [
      { text: "인생 전반 상승·하강 흐름", included: true },
      { text: "연애운·결혼운", included: true },
      { text: "돈이 들어오는 시기와 방향", included: true },
      { text: "나에게 맞는 일의 형태", included: true },
      { text: "건강 주의 시기", included: true },
      { text: "향후 10년 대운 분석", included: true },
      { text: "추가 질문 무제한 + PDF 평생 소장", included: true },
      { text: "2인 이상 신청 시 궁합 분석 무료", included: true },
    ],
    highlight: true,
  },
];

const faqs = [
  {
    q: "정말 환불해주나요?",
    a: '네, "성의 없다"고 느끼시면 100% 전액 환불해드립니다. 다만 지금까지 한 번도 환불 요청이 없었습니다. 그만큼 퀄리티에 자신 있습니다.',
  },
  {
    q: "얼마나 걸리나요?",
    a: "결제 후 24~48시간 내로 PDF를 이메일로 보내드립니다. 급하시면 말씀해주세요. 최대한 빠르게 작업해드립니다.",
  },
  {
    q: "PDF만 받는 건가요?",
    a: "네, PDF 리포트 형태입니다. 하지만 읽고 추가로 궁금한 부분은 카카오톡으로 질문하실 수 있습니다. 프리미엄 패키지는 무제한 질문이 가능합니다.",
  },
  {
    q: "신점이나 역술인과 다른가요?",
    a: "네, 만세력 기반 정통 명리 분석입니다. 신점처럼 '대박 난다' 같은 막연한 이야기가 아니라, 사주 구조를 객관적으로 해석하고, 언제·무엇을·어떻게 해야 하는지 구체적으로 정리해드립니다.",
  },
  {
    q: "가족이나 연인 것도 함께 받고 싶어요.",
    a: "2인 이상 신청하시면 궁합 분석을 무료로 추가해드립니다. 각자의 사주와 함께, 두 사람의 타이밍이 어떻게 맞물리는지까지 분석해드립니다.",
  },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <div className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
        {title}
      </h2>
    </div>
  );
}

// 모달 컴포넌트
function OrderModal({
  package: pkg,
  isOpen,
  onClose,
}: {
  package: typeof packages[0];
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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 입력 검증
    if (!formData.name || !formData.birthDate || !formData.gender || !formData.email) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    try {
      // 토스페이먼츠 결제 위젯 로드
      const { loadTossPayments } = await import('@tosspayments/payment-sdk');
      
      const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);

      // 주문 ID 생성 (고유값)
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
      // 금액 추출 (쉼표와 '원' 제거)
      const amount = parseInt(pkg.price.replace(/,|원/g, ''));

      // 결제 요청
      // 환경 변수에서 앱 URL 가져오기 (프로덕션), 없으면 현재 도메인 사용 (개발)
      // window.location.origin은 런타임에만 사용 가능하므로 함수 내에서 처리
      const appUrl = APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');
      
      await tossPayments.requestPayment('카드', {
        amount,
        orderId,
        orderName: pkg.name,
        customerName: formData.name,
        customerEmail: formData.email,
        successUrl: `${appUrl}/payment/success?name=${encodeURIComponent(formData.name)}&birthDate=${formData.birthDate}&calendarType=${formData.calendarType}&birthTime=${encodeURIComponent(formData.birthTime)}&gender=${formData.gender}&email=${encodeURIComponent(formData.email)}&package=${encodeURIComponent(pkg.name)}`,
        failUrl: `${appUrl}/payment/fail`,
      });

    } catch (error) {
      console.error('결제 오류:', error);
      if (error instanceof Error) {
        alert(`결제 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert('결제 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
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
              <span className="rounded-full bg-blue-100 text-blue-600 px-3 py-1 text-xs font-semibold">
                {pkg.badge}
              </span>
              {pkg.highlight && <span className="text-xl">⭐</span>}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {pkg.name}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">{pkg.desc}</p>
          </div>

          {/* 포함 내용 */}
          <div className="mb-6 p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 text-base">📋 포함 내용</h4>
            <ul className="space-y-2">
              {pkg.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-base text-gray-700">
                  <span className={`mt-0.5 flex-shrink-0 ${point.included ? 'text-blue-600' : 'text-gray-400'}`}>
                    {point.included ? '✓' : '✕'}
                  </span>
                  <span className={point.included ? '' : 'text-gray-400 line-through'}>{point.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 결제 금액 */}
          <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-base">총 결제 금액</span>
              <span className="text-3xl md:text-4xl font-bold text-blue-600">
                {pkg.price}
              </span>
            </div>
          </div>

          {/* 개인정보 입력 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 text-base">📝 정보 입력</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="홍길동"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      생년월일 *
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      required
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      양력/음력/윤달 *
                    </label>
                    <select
                      name="calendarType"
                      required
                      value={formData.calendarType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-white text-gray-500">선택</option>
                      <option value="solar" className="bg-white">양력</option>
                      <option value="lunar" className="bg-white">음력</option>
                      <option value="leap" className="bg-white">윤달</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      생시 *
                    </label>
                    <select
                      name="birthTime"
                      required
                      value={formData.birthTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
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
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      성별 *
                    </label>
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-white text-gray-500">선택</option>
                      <option value="male" className="bg-white">남성</option>
                      <option value="female" className="bg-white">여성</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    이메일 (PDF 수령용) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 touch-manipulation shadow-lg shadow-blue-600/30"
            >
              {pkg.price} 결제하기 →
            </button>

            {/* 안내 문구 */}
            <p className="text-center text-sm text-gray-500">
              버튼을 누르면 카카오톡으로 제공받을 PDF를 발송해드립니다.
              <br />
              입력하신 정보를 복사해 복사해서 사전에 신청해주세요.
            </p>

            <p className="text-center text-xs text-gray-500">
              버튼을 누르면 카카오톡 채널로 이동합니다.
              <br />
              입력하신 정보를 복사해서 전달해주세요.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const { ref: heroRef, isVisible: heroVisible } = useFadeIn();
  const { ref: storyRef, isVisible: storyVisible } = useFadeIn();
  const { ref: hookingRef, isVisible: hookingVisible } = useFadeIn();
  const { ref: packagesRef, isVisible: packagesVisible } = useFadeIn();
  const { ref: faqRef, isVisible: faqVisible } = useFadeIn();
  const { ref: ctaRef, isVisible: ctaVisible } = useFadeIn();

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    // 부드러운 스크롤 활성화
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const openModal = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
    // 모달 열 때 스크롤 방지
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    // 모달 닫을 때 스크롤 복구
    document.body.style.overflow = "auto";
  };

  return (
    <main className="min-h-screen bg-[#07080b] text-white">
      {/* Top Notice */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#07080b]/90 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-center">
          <div className="text-sm text-white/80">
            <span className="font-semibold text-lg text-white">50명 한정 29,900원</span>{" "}
            <span className="text-lg text-white/60">· 40명 마감 / 10명 남음 · 마감 후 정가 49,800원</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* 영상 배경 */}
        <VideoBackground videoSrc="/videos/seoul.mp4" overlayOpacity={70} />
        
        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-14 pb-12 md:pt-20 md:pb-24 min-h-[600px] md:min-h-[700px] flex items-center">
          <div
            ref={heroRef}
            className={`grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-center w-full transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm md:text-base text-white/80 animate-pulse">
                <span className="text-[#d4af37]">●</span> 
                <span className="hidden sm:inline">만세력 기반 정통 명리 분석 · PDF 평생 소장</span>
                <span className="sm:hidden">정통 명리 분석 · PDF 소장</span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15]">
                단순 운세가 아닙니다.
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <span className="text-[#d4af37]">당신의 '선택'을 바꾸는 타이밍 분석</span>입니다.
              </h1>

              <p className="mt-5 text-lg md:text-xl text-white/75 leading-relaxed">
                요즘 들어 자꾸 같은 고민이 맴도시나요?
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                뭔가 해야 할 것 같은데 확신이 없고, 기다려야 할 것 같은데 조급하고,
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                결정을 내려야 하는데 자꾸 미루게 되고.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#packages"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-center font-semibold text-lg md:text-xl text-white hover:bg-white/10 hover:scale-105 transition-all active:scale-95 touch-manipulation"
                >
                  상품 구성 보기
                </a>
              </div>

              <p className="mt-4 text-sm md:text-base text-white/50">
                새벽 문의도 괜찮습니다. 편하실 때 메시지 주세요.
              </p>
            </div>

            {/* Trust card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
              <div className="text-lg font-semibold text-white/90">상담자 이력</div>
              <ul className="mt-3 space-y-2 text-lg text-white/70">
                <li>· 사주팔자 명리심리상담사 1급</li>
                <li>· 가족심리상담사 1급</li>
                <li>· 신점이 아닌 만세력 기반 정통 명리 분석</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hooking Section */}
      <section className="mx-auto max-w-5xl px-4 py-14 border-t border-white/10">
        <div
          ref={hookingRef}
          className={`text-center w-full mx-auto transition-all duration-1000 ${
            hookingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 mb-6">
            <span className="text-[#d4af37]">✨</span> 
            <span>이미 수백명이 선택했습니다</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            고민만 하다 <span className="text-[#d4af37]">타이밍을 놓치지 마세요</span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed">
            "그때 결정했더라면..."이라는 후회를 하지 않으려면,
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            지금 당신에게 필요한 것은 <span className="text-white font-semibold">정확한 타이밍과 방향</span>입니다.
          </p>

          {/* 실제 상담 사례 - review1.jpg 바로 위 */}
          <div className="mt-10 mb-8">
            <div className="text-center mb-6">
              <div className="text-base font-semibold uppercase tracking-wider text-[#d4af37]">
                실제 상담 사례
              </div>
              <h3 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-white">
                이런 고민, 혹시 당신도 있으신가요?
              </h3>
            </div>

            <div
              ref={storyRef}
              className={`grid gap-6 md:grid-cols-2 transition-all duration-1000 ${
                storyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                {
                  question: "연애/결혼",
                  text: "지금 만나는 사람과 결혼해도 괜찮을까?\n언제쯤 좋은 인연이 올까?",
                },
                {
                  question: "돈/재물",
                  text: "언제쯤 돈이 들어올까?\n지금 투자해도 될까, 아니면 더 기다려야 할까?",
                },
                {
                  question: "일/커리어",
                  text: "지금 직장을 그만두고 새로운 도전을 해도 될까?\n내게 맞는 일은 뭘까?",
                },
                {
                  question: "건강/관계",
                  text: "가족 관계가 자꾸 꼬인다.\n건강도 신경 쓰이고, 언제쯤 좋아질까?",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-base font-semibold text-[#d4af37]">
                    {item.question}
                  </div>
                  <p className="mt-3 text-lg leading-relaxed text-white/75 whitespace-pre-line">
                    "{item.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 리뷰 이미지 1 - 상단 */}
          <div className="mt-10 mb-6">
            <Image
              src="/images/review1.jpg"
              alt="고객 리뷰 1"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
              priority={false}
            />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3 text-center">
            {[
              { icon: "⏰", label: "타이밍", desc: "언제가 최적기인지" },
              { icon: "🎯", label: "방향성", desc: "어떤 선택을 해야 하는지" },
              { icon: "💡", label: "실전전략", desc: "구체적으로 무엇을 해야 하는지" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-white/20 hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-semibold text-white mb-1">{item.label}</div>
                <div className="text-sm text-white/60">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* 리뷰 이미지 2 - 하단 */}
          <div className="mt-10">
            <Image
              src="/images/review2.jpg"
              alt="고객 리뷰 2"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
              priority={false}
            />
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 border border-[#d4af37]/20">
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              <span className="font-semibold text-[#d4af37]">100페이지 이상의 상세한 PDF 리포트</span>로
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>
              당신의 인생 지도를 명확하게 정리해드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="mx-auto max-w-5xl px-4 py-14 border-t border-white/10">
        <SectionTitle eyebrow="상품 구성" title="당신에게 맞는 분석을 선택하세요" />

        <div
          ref={packagesRef}
          className={`mt-8 grid gap-6 md:grid-cols-3 transition-all duration-1000 ${
            packagesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {packages.map((pkg, i) => (
            <div
              key={i}
              onClick={() => openModal(pkg)}
              className={`group cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl touch-manipulation flex flex-col ${
                pkg.highlight
                  ? "border-[#d4af37] bg-gradient-to-b from-[#d4af37]/10 to-transparent shadow-lg shadow-[#d4af37]/20"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    pkg.highlight
                      ? "bg-[#d4af37] text-black"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {pkg.badge}
                </span>
                {pkg.highlight && (
                  <span className="text-2xl">⭐</span>
                )}
              </div>

              <h3
                className={`text-2xl font-bold ${
                  pkg.highlight ? "text-[#d4af37]" : "text-white"
                }`}
              >
                {pkg.name}
              </h3>

              <p className="mt-2 text-base text-white/60 leading-relaxed whitespace-pre-line">
                {pkg.desc}
              </p>

              <ul className="mt-4 space-y-2 flex-grow">
                {pkg.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 text-base text-white/75">
                    <span className={`mt-0.5 ${point.included ? 'text-[#d4af37]' : 'text-white/30'}`}>
                      {point.included ? '✓' : '✕'}
                    </span>
                    <span className={point.included ? '' : 'text-white/30 line-through'}>{point.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between gap-3">
                <span className={`text-2xl font-bold ${pkg.highlight ? 'text-[#d4af37]' : 'text-white'}`}>
                  {pkg.price}
                </span>
                <button className={`flex-1 rounded-xl py-3 text-base font-semibold transition-all group-hover:scale-105 ${
                  pkg.highlight
                    ? "bg-[#d4af37] text-black hover:opacity-90"
                    : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                }`}>
                  선택하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mid Hooking Section - 패키지와 FAQ 사이 */}
      <section className="mx-auto max-w-5xl px-4 py-14 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-8 text-white">
            혹시 이런 생각 하고 계신가요?
          </h2>

          <div className="space-y-4 mb-8">
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
              <p className="text-lg md:text-xl text-white/90 italic">
                "나중에 해도 되지 않을까?"
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
              <p className="text-lg md:text-xl text-white/90 italic">
                "진짜 도움이 될까?"
              </p>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8">
            근데요, 그 <span className="text-[#d4af37] font-semibold">'나중'</span>이 언제인지
            <br />
            아는 게 사주 분석이에요.
          </p>

          <div className="border-t border-white/20 my-10"></div>

          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 border border-[#d4af37]/20 mb-8">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">⏰</span>
              <p className="text-lg md:text-xl text-white/90 font-semibold">
                10자리 남음
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-[#d4af37] px-8 py-4 text-lg md:text-xl font-bold text-black hover:opacity-90 hover:scale-105 transition-all active:scale-95 hover:shadow-lg hover:shadow-[#d4af37]/30 touch-manipulation"
            >
              내 타이밍 확인하기 →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 py-14 border-t border-white/10">
        <SectionTitle eyebrow="자주 묻는 질문" title="FAQ" />

        <div
          ref={faqRef}
          className={`mt-8 space-y-4 transition-all duration-1000 ${
            faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="flex w-full items-center justify-between p-5 text-left transition-all hover:bg-white/5 touch-manipulation"
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <span
                  className={`text-2xl text-[#d4af37] transition-transform duration-300 flex-shrink-0 ${
                    openFAQ === i ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openFAQ === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-white/75 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        {/* 영상 배경 */}
        <VideoBackground videoSrc="/videos/hwasung.mp4" overlayOpacity={75} />
        
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 md:py-24 text-center">
          <div
            ref={ctaRef}
            className={`transition-all duration-1000 ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              당신의 인생, 이제 <span className="text-[#d4af37]">명확한 방향</span>으로
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>
              선택하세요
            </h2>

            <p className="mt-6 text-xl md:text-2xl text-white/80">
              50명 한정 29,900원 · 10명 남음 · 마감 후 정가 49,800원
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#packages"
                className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 hover:scale-105 transition-all active:scale-95 touch-manipulation"
              >
                상품 다시 보기
              </a>
            </div>

            <p className="mt-6 text-sm text-white/60">
              24시간 내 답변 · PDF 평생 소장 · 2026년 신년 특별가
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0f1014] px-4 py-8">
        <div className="mx-auto max-w-5xl text-center text-sm text-white/50">
          <p>© 2026 운명테라피. 정통 명리 기반 사주 분석 서비스.</p>
          <p className="mt-2">문의: 카카오톡 채널 · 24시간 답변</p>
        </div>
      </footer>

      {/* 모달 */}
      {selectedPackage && (
        <OrderModal package={selectedPackage} isOpen={isModalOpen} onClose={closeModal} />
      )}

      {/* 플로팅 채팅문의 버튼 */}
      <Link
        href={CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FEE500] hover:bg-[#FDD835] shadow-2xl hover:shadow-[#FEE500]/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group animate-bounce-subtle"
        aria-label="카카오톡 채팅문의"
      >
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-[#3C1E1E]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
        </svg>
        <span className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold animate-pulse">
          !
        </span>
      </Link>
    </main>
  );
}
