# 프론트엔드 디자인 가이드

## 🎬 배경 영상 사용 가이드

### 1. 폴더 구조 및 파일 저장 위치

```
unmyoung/
├── public/
│   ├── videos/          👈 이 폴더를 생성하세요
│   │   ├── hero-bg.mp4        (Hero 섹션용 영상)
│   │   └── footer-bg.mp4      (Footer 섹션용 영상)
│   ├── file.svg
│   ├── globe.svg
│   └── ...
├── app/
│   ├── page.tsx
│   └── ...
└── ...
```

### 2. 영상 파일 준비

#### 📁 저장 경로
```
public/videos/
```

#### 📝 파일명 (추천)
- **Hero 섹션**: `hero-bg.mp4`
- **Footer 섹션**: `footer-bg.mp4`

#### 💡 영상 파일 최적화 팁
- **형식**: MP4 (H.264 코덱) 추천
- **크기**: 최대 10MB 이하 권장 (로딩 속도)
- **해상도**: 1920x1080 (Full HD) 또는 1280x720 (HD)
- **길이**: 10-30초 루프 영상 권장
- **비트레이트**: 2-5 Mbps 정도가 적당

### 3. Next.js에서 영상 사용 방법

#### 방법 1: Video 태그로 배경 영상 (추천)

```tsx
<div className="relative">
  {/* 배경 영상 */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
  </video>
  
  {/* 오버레이 (영상 위 어둡게) */}
  <div className="absolute inset-0 bg-black/60" />
  
  {/* 실제 콘텐츠 */}
  <div className="relative z-10">
    {/* 여기에 텍스트나 다른 콘텐츠 */}
  </div>
</div>
```

#### 방법 2: Image 컴포넌트 사용 (포스터/썸네일)

```tsx
import Image from "next/image";

<Image
  src="/videos/thumbnail.jpg"
  alt="Background"
  fill
  className="object-cover"
  priority
/>
```

### 4. 적용 위치별 가이드

#### 🎯 Hero 섹션 (페이지 상단)

**특징:**
- 첫 인상을 결정하는 중요한 영역
- 신비롭고 고급스러운 느낌
- 사주/명리 분석의 깊이와 전문성 표현

**추천 영상 스타일:**
- 별이 빛나는 밤하늘
- 우주/은하수
- 부드럽게 흐르는 구름
- 금색 입자 효과
- 추상적인 라이트 무브먼트

**오버레이 색상:**
- 검은색 60-70% 투명도 (`bg-black/60`)
- 금색 그라데이션 오버레이 (`bg-gradient-to-b from-black/80 to-transparent`)

#### 🎯 Footer 섹션 (페이지 하단)

**특징:**
- 마무리 인상
- 차분하고 안정적인 느낌
- CTA(Call-to-Action)를 강조

**추천 영상 스타일:**
- 잔잔한 물결
- 부드러운 안개
- 은은한 빛의 움직임
- 추상적 파티클

**오버레이 색상:**
- 더 어둡게 (`bg-black/70`)

### 5. 성능 최적화

#### Lazy Loading

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  loading="lazy"  // 👈 추가
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/hero-bg.mp4" type="video/mp4" />
</video>
```

#### 조건부 로딩 (모바일에서 영상 제외)

```tsx
"use client";
import { useState, useEffect } from "react";

function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="relative">
      {!isMobile && (
        <video autoPlay loop muted playsInline className="...">
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      )}
      {/* 모바일에서는 정적 이미지나 그라데이션 사용 */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080b] to-[#1a1a1f]" />
      )}
    </div>
  );
}
```

### 6. 무료 영상 소스 추천

#### 🎥 무료 스톡 영상 사이트

1. **Pexels Videos** (https://www.pexels.com/videos/)
   - 완전 무료, 상업적 이용 가능
   - 저작권 표시 불필요
   - 검색어: "space", "galaxy", "gold particles", "light", "abstract"

2. **Pixabay Videos** (https://pixabay.com/videos/)
   - 완전 무료
   - 검색어: "night sky", "stars", "cosmic", "aurora"

3. **Coverr** (https://coverr.co/)
   - 완전 무료
   - 웹 배경용으로 최적화됨

4. **Mixkit** (https://mixkit.co/free-stock-video/)
   - 무료, 상업적 이용 가능

#### 🔍 추천 검색어 (사주/명리 컨셉)
- "night sky" (밤하늘)
- "stars" (별)
- "galaxy" (은하)
- "gold particles" (금색 입자)
- "light rays" (빛 줄기)
- "cosmic" (우주적)
- "mystical" (신비로운)
- "ethereal" (영묘한)
- "flowing smoke" (흐르는 연기)
- "water ripple" (물결)

### 7. 구현 체크리스트

- [ ] `public/videos/` 폴더 생성
- [ ] Hero 영상 파일 저장 (`hero-bg.mp4`)
- [ ] Footer 영상 파일 저장 (선택사항: `footer-bg.mp4`)
- [ ] 영상 파일 크기 확인 (각 10MB 이하 권장)
- [ ] page.tsx에 영상 컴포넌트 추가
- [ ] 오버레이 효과 적용
- [ ] 모바일 반응형 테스트
- [ ] 로딩 속도 확인

### 8. 문제 해결

#### 영상이 재생되지 않을 때
```tsx
// 모든 필수 속성 확인
<video
  autoPlay      // 자동 재생
  loop          // 반복
  muted         // 음소거 (필수!)
  playsInline   // iOS Safari 지원
>
```

#### 영상이 너무 클 때
- 온라인 압축 도구 사용: https://www.freeconvert.com/video-compressor
- 해상도 낮추기: 1920x1080 → 1280x720
- 비트레이트 낮추기

#### 로딩이 느릴 때
- 파일 크기 줄이기
- Lazy loading 적용
- 모바일에서는 정적 이미지 사용

---

## 📌 적용 완료!

✅ **Hero 섹션 (상단)**: `/videos/seoul.mp4`
✅ **Final CTA 섹션 (하단)**: `/videos/hwasung.mp4`

### 적용된 기능

1. **자동 재생 루프 영상**
   - 음소거 상태로 자동 재생
   - 끝없이 반복 재생
   - iOS Safari 지원 (playsInline)

2. **부드러운 로딩 효과**
   - 영상 로딩 중 그라데이션 배경 표시
   - 로딩 완료 시 페이드인 효과

3. **텍스트 가독성 확보**
   - Hero 섹션: 70% 어두운 오버레이
   - CTA 섹션: 80% 어두운 오버레이

4. **반응형 디자인**
   - 모든 화면 크기에서 영상이 적절히 표시됨
   - object-cover로 비율 유지

5. **성능 최적화**
   - MP4와 WebM 두 형식 지원
   - 점진적 로딩

### 테스트 체크리스트

- [ ] 영상이 자동 재생되는지 확인
- [ ] 텍스트가 잘 보이는지 확인
- [ ] 모바일에서 정상 작동 확인
- [ ] 영상 루프 확인
- [ ] 페이지 로딩 속도 확인
