# 🎨 운명테라피 로고 가이드

## 📁 폴더 구조

```
public/logo/
├── README.md                    ← 이 파일
├── logo-main.svg               ← 메인 로고 (SVG 추천)
├── logo-main.png               ← 메인 로고 (PNG)
├── logo-white.svg              ← 흰색 버전 (어두운 배경용)
├── logo-white.png              ← 흰색 버전 (PNG)
├── logo-icon.svg               ← 아이콘만 (파비콘용)
├── logo-icon.png               ← 아이콘만 (PNG)
└── favicon/                    ← 파비콘 폴더
    ├── favicon.ico             ← 16x16, 32x32, 48x48
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png    ← 180x180 (iOS)
    └── android-chrome-192x192.png  ← 192x192 (Android)
```

## 📐 로고 사이즈 가이드

### 1. 메인 로고 (logo-main)
**용도**: 헤더, 랜딩 페이지
**권장 크기**:
- SVG: 제한 없음 (벡터)
- PNG: 400x100px (4:1 비율)
- 배경: 투명

**사용 위치**:
- 사이트 헤더 (상단 좌측)
- 푸터
- 소개 섹션

### 2. 흰색 로고 (logo-white)
**용도**: 어두운 배경 위
**권장 크기**: 메인 로고와 동일
**색상**: 흰색 (#FFFFFF) 또는 금색 (#d4af37)

**사용 위치**:
- 검은 배경 헤더
- 영상 오버레이
- 다크 모드

### 3. 아이콘 로고 (logo-icon)
**용도**: 파비콘, 앱 아이콘
**권장 크기**:
- 512x512px (정사각형)
- 배경: 투명 또는 브랜드 색상

**사용 위치**:
- 브라우저 탭 (파비콘)
- 모바일 홈 화면 (PWA)
- 소셜 미디어 프로필

### 4. 파비콘 (favicon/)
**필수 사이즈**:
- favicon.ico: 16x16, 32x32, 48x48 (멀티 사이즈)
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png: 180x180
- android-chrome-192x192.png: 192x192
- android-chrome-512x512.png: 512x512 (선택)

## 🎨 브랜드 컬러

### 메인 색상
```
금색: #d4af37  (RGB: 212, 175, 55)
검정: #07080b  (RGB: 7, 8, 11)
흰색: #FFFFFF  (RGB: 255, 255, 255)
```

### 보조 색상
```
연한 금색: #e5c66b  (하이라이트)
회색: #1a1a1f     (배경)
반투명 흰색: rgba(255, 255, 255, 0.8)  (텍스트)
```

## 📝 파일 포맷 가이드

### SVG (추천) ⭐
**장점**:
- 어떤 크기에서도 선명
- 파일 크기 작음
- CSS로 색상 변경 가능

**사용 시**:
```tsx
<Image 
  src="/logo/logo-main.svg" 
  alt="운명테라피" 
  width={180}
  height={45}
/>
```

### PNG
**장점**:
- 그라데이션, 복잡한 효과 지원
- 투명 배경 가능

**권장 해상도**:
- 일반: 400x100px
- 레티나: 800x200px (2x)

## 🖼️ 로고 제작 가이드

### 온라인 도구
1. **Canva**: https://www.canva.com/
2. **Figma**: https://www.figma.com/
3. **Logo.com**: https://logo.com/
4. **Looka**: https://looka.com/

### 디자인 팁
- **"운명테라피"** 텍스트 명확히
- 사주/명리 느낌 (별, 우주, 음양 등)
- 금색 (#d4af37) 포인트
- 단순하고 기억하기 쉽게
- 작은 사이즈에서도 인식 가능

### AI 로고 생성 프롬프트
```
"운명테라피" 브랜드 로고 디자인
- 사주팔자, 명리, 운명 테마
- 금색과 검정색 조합
- 미니멀하고 고급스러운 느낌
- 별, 우주, 나침반 모티브
- 한글 "운명테라피" 포함
```

## 📱 파비콘 생성 도구

### 온라인 변환기
1. **Favicon.io**: https://favicon.io/
   - PNG → favicon.ico 변환
   - 자동으로 모든 사이즈 생성

2. **RealFaviconGenerator**: https://realfavicongenerator.net/
   - 모든 플랫폼용 파비콘 생성
   - 미리보기 제공

### 사용 방법
1. 512x512px PNG 로고 준비
2. 위 사이트에 업로드
3. 생성된 파일들을 `public/logo/favicon/`에 저장

## 🚀 로고 적용 위치

### 1. 헤더 (Header)
```tsx
<nav className="flex items-center">
  <Image 
    src="/logo/logo-white.svg" 
    alt="운명테라피"
    width={160}
    height={40}
  />
</nav>
```

### 2. 파비콘 (Favicon)
```tsx
// app/layout.tsx
export const metadata = {
  icons: {
    icon: '/logo/favicon/favicon.ico',
    apple: '/logo/favicon/apple-touch-icon.png',
  },
}
```

### 3. 소셜 미디어 (OG Image)
```tsx
openGraph: {
  images: ['/logo/logo-main.png'],
}
```

## ✅ 체크리스트

로고 파일을 준비하셨다면:

- [ ] logo-main.svg 또는 logo-main.png 저장
- [ ] logo-white.svg 또는 logo-white.png 저장 (선택)
- [ ] logo-icon.png 저장 (512x512px)
- [ ] favicon.ico 생성 및 저장
- [ ] apple-touch-icon.png 저장 (180x180px)
- [ ] android-chrome-192x192.png 저장
- [ ] 개발자에게 파일 준비 완료 알림

## 🎯 빠른 시작

### 임시 로고 사용 (테스트용)
로고가 아직 없다면 임시로 텍스트 로고를 사용할 수 있습니다:

```tsx
<div className="text-2xl font-bold text-[#d4af37]">
  운명테라피
</div>
```

### 로고 준비 시 알려주세요!
로고 파일을 준비하시면:
1. 이 폴더에 파일 복사
2. "로고 준비 완료"라고 알려주세요
3. 자동으로 사이트에 적용해드립니다!

---

**브랜드**: 운명테라피
**컨셉**: 사주팔자 명리 분석, 타이밍 분석
**메인 컬러**: 금색 (#d4af37)
