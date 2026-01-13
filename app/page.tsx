// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

// 분리된 컴포넌트 import
import { useFadeIn } from "@/hooks/useFadeIn";
import { VideoBackground } from "@/components/common/VideoBackground";
import { SectionTitle } from "@/components/common/SectionTitle";
import { OrderModal } from "@/components/modals/OrderModal";
import { packages, faqs, CHAT_URL, PROMO } from "@/lib/data";

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
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

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

  const openModal = useCallback((pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
    // 모달 열 때 스크롤 방지
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    // 모달 닫을 때 스크롤 복구
    document.body.style.overflow = "auto";
  }, []);

  const openSampleModal = useCallback(() => {
    setIsSampleModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeSampleModal = useCallback(() => {
    setIsSampleModalOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isModalOpen) {
          closeModal();
        }
        if (isSampleModalOpen) {
          closeSampleModal();
        }
      }
    };

    if (isModalOpen || isSampleModalOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isModalOpen, isSampleModalOpen, closeModal, closeSampleModal]);

  return (
    <main className="min-h-screen bg-[#07080b] text-white">
      {/* Top Notice */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#07080b]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center">
          <div className="text-sm text-white/80">
            <span className="font-semibold text-lg text-white">{PROMO.TOTAL_SLOTS}명 한정 {PROMO.PROMO_PRICE.toLocaleString()}원</span>{" "}
            <span className="text-lg text-white/60">· {PROMO.TOTAL_SLOTS - PROMO.REMAINING_SLOTS}명 마감 / {PROMO.REMAINING_SLOTS}명 남음 · 마감 후 정가 {PROMO.ORIGINAL_PRICE.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* 영상 배경 */}
        <VideoBackground videoSrc="/videos/seoul.mp4" overlayOpacity={70} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-12 md:pt-20 md:pb-24 min-h-[600px] md:min-h-[700px] flex items-center">
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
                <span className="text-[#d4af37]">당신의 '선택'을 바꾸는</span> 타이밍 분석입니다.
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
                  aria-label="상품 구성 섹션으로 이동"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-center font-semibold text-lg md:text-xl text-white hover:bg-white/10 hover:scale-105 transition-all active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#07080b]"
                >
                  상품 구성 보기
                </a>
              </div>

              <p className="mt-4 text-base md:text-lg text-white/70">
                새벽 문의도 괜찮습니다. 편하실 때 메시지 주세요.
              </p>
            </div>

            {/* Trust card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
              <div className="text-lg md:text-xl font-semibold text-white">상담자 이력</div>
              <ul className="mt-3 space-y-2 text-lg md:text-xl text-white/85">
                <li>· 사주팔자 명리심리상담사 1급</li>
                <li>· 가족심리상담사 1급</li>
                <li>· 신점이 아닌 만세력 기반 정통 명리 분석</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hooking Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 border-t border-white/10">
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

          {/* 구분선 */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

          {/* 실제 상담 사례 */}
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
                  <p className="mt-3 text-lg md:text-xl leading-relaxed text-white/90 whitespace-pre-line">
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
                <div className="text-base md:text-lg text-white/80">{item.desc}</div>
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

          {/* 운세 이미지 섹션 */}
          <div className="mt-12">
            <div className="text-center mb-6">
              <div className="text-base font-semibold uppercase tracking-wider text-[#d4af37]">
                분석 영역
              </div>
              <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
                이런 운세를 확인할 수 있습니다
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {/* 배우자운 */}
              <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/lover.png"
                    alt="배우자운"
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">배우자운</h3>
                    <p className="text-sm text-white/80">인연과 결혼 타이밍</p>
                  </div>
                </div>
              </div>

              {/* 재물운 */}
              <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/rich.png"
                    alt="재물운"
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">재물운</h3>
                    <p className="text-sm text-white/80">돈이 들어오는 시기</p>
                  </div>
                </div>
              </div>

              {/* 건강운 */}
              <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/health.png"
                    alt="건강운"
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">건강운</h3>
                    <p className="text-sm text-white/80">건강 관리 시기</p>
                  </div>
                </div>
              </div>

              {/* 직장운 */}
              <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/owner.png"
                    alt="직장운"
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">직장운</h3>
                    <p className="text-sm text-white/80">커리어와 일의 방향</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 신뢰 배지 섹션 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#d4af37]/30 hover:bg-white/10 transition-all">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">100% 환불 보장</h3>
            <p className="text-sm md:text-base text-white/70">성의 없다고 느끼시면 전액 환불</p>
          </div>
          <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#d4af37]/30 hover:bg-white/10 transition-all">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">24시간 내 발송</h3>
            <p className="text-sm md:text-base text-white/70">결제 후 빠른 분석 및 전송</p>
          </div>
          <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#d4af37]/30 hover:bg-white/10 transition-all">
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">PDF 평생 소장</h3>
            <p className="text-sm md:text-base text-white/70">다운로드 후 평생 보관 가능</p>
          </div>
          <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#d4af37]/30 hover:bg-white/10 transition-all">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">정통 만세력 기반</h3>
            <p className="text-sm md:text-base text-white/70">신점이 아닌 객관적 분석</p>
          </div>
        </div>
      </section>

      {/* 프로세스 설명 섹션 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-white/10">
        <div className="text-center mb-8">
          <div className="text-sm font-semibold uppercase tracking-wider text-[#d4af37] mb-2">
            간단한 3단계
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            이렇게 진행됩니다
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4af37] flex items-center justify-center text-3xl font-bold text-black">
              1
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">정보 입력</h3>
            <p className="text-base md:text-lg text-white/80">
              이름, 생년월일, 생시 등<br />
              기본 정보를 입력해주세요
            </p>
          </div>
          <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4af37] flex items-center justify-center text-3xl font-bold text-black">
              2
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">결제</h3>
            <p className="text-base md:text-lg text-white/80">
              안전한 결제 시스템으로<br />
              간편하게 결제하세요
            </p>
          </div>
          <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4af37] flex items-center justify-center text-3xl font-bold text-black">
              3
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">PDF 수령</h3>
            <p className="text-base md:text-lg text-white/80">
              24시간 이내 이메일로<br />
              정밀 분석 PDF 전송
            </p>
          </div>
        </div>
      </section>

      {/* PDF 샘플 미리보기 섹션 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
        <div className="text-center">
          <button
            onClick={openSampleModal}
            aria-label="PDF 샘플 미리보기"
            className="inline-flex items-center gap-3 rounded-2xl border-2 border-[#d4af37] bg-[#d4af37]/20 hover:bg-[#d4af37]/30 px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#07080b]"
          >
            <span className="text-2xl md:text-3xl" aria-hidden="true">📄</span>
            <span>PDF 샘플 미리보기</span>
          </button>
          <p className="mt-3 text-sm md:text-base text-white/60">
            실제 받으실 PDF의 품질을 미리 확인하세요
          </p>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 border-t border-white/10">
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

              <div className="flex items-center justify-between gap-3 mb-2">
                <h3
                  className={`text-2xl font-bold ${
                    pkg.highlight ? "text-[#d4af37]" : "text-white"
                  }`}
                >
                  {pkg.name}
                </h3>
                <span className={`text-xl font-bold ${pkg.highlight ? 'text-[#d4af37]' : 'text-white'}`}>
                  {pkg.price}
                </span>
              </div>

              <p className="mt-2 text-base md:text-lg text-white/80 leading-relaxed whitespace-pre-line">
                {pkg.desc}
              </p>

              <ul className="mt-4 space-y-2 flex-grow">
                {pkg.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 text-base md:text-lg text-white/90">
                    <span className={`mt-0.5 ${point.included ? 'text-[#d4af37]' : 'text-white/30'}`}>
                      {point.included ? '✓' : '✕'}
                    </span>
                    <span className={point.included ? '' : 'text-white/30 line-through'}>{point.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(pkg);
                  }}
                  aria-label={`${pkg.name} 패키지 선택하기`}
                  className={`w-full rounded-xl py-3 text-base font-semibold transition-all group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-transparent ${
                    pkg.highlight
                      ? "bg-[#d4af37] text-black hover:opacity-90"
                      : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  선택하기
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 패키지 섹션 직후 강력한 CTA */}
        <div className="mt-12 text-center">
          <a
            href="#packages"
            aria-label="상품 구성 섹션으로 이동하여 시작하기"
            className="inline-block rounded-xl bg-[#d4af37] px-10 py-5 text-xl md:text-2xl font-bold text-black hover:opacity-90 hover:scale-105 transition-all active:scale-95 hover:shadow-lg hover:shadow-[#d4af37]/30 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#07080b]"
          >
            지금 바로 시작하기 →
          </a>
          <p className="mt-4 text-base md:text-lg text-white/70">
            ⏰ {PROMO.REMAINING_SLOTS}자리 남음 · 마감 후 정가 {PROMO.ORIGINAL_PRICE.toLocaleString()}원
          </p>
        </div>
      </section>

      {/* Mid Hooking Section - 패키지와 FAQ 사이 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 border-t border-white/10">
          <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-8 text-white">
            혹시 이런 생각 하고 계신가요?
          </h2>

          <div className="space-y-6 mb-8">
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
                {PROMO.REMAINING_SLOTS}자리 남음
              </p>
            </div>
          </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#packages"
                aria-label="상품 구성 섹션으로 이동하여 시작하기"
                className="inline-block rounded-xl bg-[#d4af37] px-8 py-4 text-lg md:text-xl font-bold text-black hover:opacity-90 hover:scale-105 transition-all active:scale-95 hover:shadow-lg hover:shadow-[#d4af37]/30 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#07080b]"
              >
                지금 바로 시작하기 →
              </a>
              <Link
                href={CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="카카오톡 채널로 이동하여 상담 문의하기 (새 창)"
                className="inline-block rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg md:text-xl font-semibold text-white hover:bg-white/10 hover:scale-105 transition-all active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#07080b]"
              >
                상담 문의하기
              </Link>
            </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 border-t border-white/10">
        <SectionTitle eyebrow="자주 묻는 질문" title="FAQ" />

        <div
          ref={faqRef}
          className={`mt-8 space-y-6 transition-all duration-1000 ${
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
                aria-expanded={openFAQ === i}
                aria-controls={`faq-answer-${i}`}
                className="flex w-full items-center justify-between p-5 md:p-6 text-left transition-all hover:bg-white/5 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-inset"
              >
                <span className="font-semibold text-lg md:text-xl text-white pr-4">{faq.q}</span>
                <span
                  className={`text-2xl md:text-3xl text-[#d4af37] transition-transform duration-300 flex-shrink-0 ${
                    openFAQ === i ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  ↓
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`grid transition-all duration-300 ease-in-out ${
                  openFAQ === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 md:px-6 pb-6 md:pb-7 text-lg md:text-xl text-white/90 leading-relaxed">
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

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
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
              {PROMO.TOTAL_SLOTS}명 한정 {PROMO.PROMO_PRICE.toLocaleString()}원 · {PROMO.REMAINING_SLOTS}명 남음 · 마감 후 정가 {PROMO.ORIGINAL_PRICE.toLocaleString()}원
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#packages"
                aria-label="상품 구성 섹션으로 이동하여 다시 보기"
                className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 hover:scale-105 transition-all active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#07080b]"
              >
                상품 다시 보기
              </a>
            </div>

            <p className="mt-6 text-base md:text-lg text-white/70">
              24시간 내 답변 · PDF 평생 소장 · 2026년 신년 특별가
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0f1014] px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-7xl">
          {/* 법률 페이지 링크 */}
          <div className="text-center text-base md:text-lg text-white/70 pb-6">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/terms" className="hover:text-white transition-colors">
                이용약관
              </Link>
              <span>·</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                개인정보처리방침
              </Link>
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t border-white/10 my-6"></div>

          {/* 로고 & 사업자 정보 */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            {/* 왼쪽: 로고 */}
            <div className="flex justify-center md:justify-start">
              <Image
                src="/logo/logo.png"
                alt="운명테라피 로고"
                width={200}
                height={120}
                className="object-contain brightness-0 invert"
                priority={false}
              />
            </div>

            {/* 오른쪽: 사업자 정보 */}
            <div className="flex-1 text-center md:text-right text-sm md:text-base text-white/60 space-y-2">
              <div className="space-y-1">
                <p>대표자: [대표자명] | 사업자등록번호: [000-00-00000]</p>
                <p>통신판매업 신고번호: [제0000-서울강남-00000호]</p>
                <p>주소: [서울특별시 강남구 ○○로 ○○, ○○빌딩 ○층]</p>
                <p>이메일: [contact@example.com] | 고객센터: 카카오톡 채널</p>
              </div>
              <p className="mt-4 text-white/70">© 2026 운명테라피. 정통 명리 기반 사주 분석 서비스.</p>
              <p className="text-xs md:text-sm text-yellow-500/70 mt-3">
                ⚠️ 주의: 위 사업자 정보는 플레이스홀더입니다. 실제 사업자 정보로 반드시 교체하세요.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* 모달 */}
      {selectedPackage && (
        <OrderModal package={selectedPackage} isOpen={isModalOpen} onClose={closeModal} />
      )}

      {/* PDF 샘플 모달 */}
      {isSampleModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closeSampleModal}
          role="presentation"
        >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="sample-modal-title"
            >
            {/* 닫기 버튼 */}
            <button
              onClick={closeSampleModal}
              aria-label="모달 닫기"
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              <span className="text-gray-600 text-2xl" aria-hidden="true">×</span>
            </button>

            {/* 샘플 이미지 */}
            <div className="p-8 overflow-y-auto max-h-[90vh]">
              <h3 id="sample-modal-title" className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                프리미엄 종합 분석 PDF 샘플
              </h3>
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-gray-300">
                <div className="text-center p-8">
                  <div className="text-8xl mb-6">📄</div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
                    PDF 샘플 이미지
                  </p>
                  <p className="text-base md:text-lg text-gray-600">
                    실제 샘플 이미지를 여기에 추가하세요
                  </p>
                  <p className="mt-4 text-sm text-gray-500">
                    public/images/sample-pdf.png 또는 sample-pdf.jpg
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm md:text-base text-gray-700 text-center">
                  💡 실제 받으실 PDF는 이보다 훨씬 더 상세하고 전문적인 분석 내용을 포함합니다.
                  <br />
                  100페이지 이상의 깊이 있는 인생 지도를 제공해드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
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
