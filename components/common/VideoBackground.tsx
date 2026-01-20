"use client";

import { useEffect, useRef, useState } from "react";

// 비디오 배경 컴포넌트
export function VideoBackground({
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
