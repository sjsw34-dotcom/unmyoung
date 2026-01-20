# 📖 가독성 분석 보고서

## 현재 상태 평가

### ✅ 잘 되어 있는 부분

1. **폰트 크기 계층 구조**
   - 제목: `text-3xl` ~ `text-6xl` (명확한 계층)
   - 본문: `text-base` ~ `text-xl` (적절한 크기)
   - 반응형: 모바일/데스크톱 대응

2. **색상 대비**
   - 배경: `#07080b` (어두운 배경)
   - 주요 텍스트: `text-white` (높은 대비)
   - 강조: `#d4af37` (골드, 눈에 띄는 색상)

3. **섹션 구분**
   - `border-t border-white/10`로 섹션 구분
   - 적절한 `py-14` 패딩

4. **반응형 디자인**
   - 모바일/태블릿/데스크톱 최적화
   - `max-w-7xl`로 너비 제한

### ⚠️ 개선이 필요한 부분

1. **텍스트 투명도가 낮은 부분**
   - `text-white/50` (50% 투명도) - 너무 흐림
   - `text-white/60` (60% 투명도) - 약간 흐림
   - `text-white/70` (70% 투명도) - 개선 가능
   - `text-white/75` (75% 투명도) - 개선 가능

2. **작은 텍스트**
   - Footer: `text-xs` (10px) - 너무 작음
   - 일부 안내 문구: `text-sm` (14px) - 개선 가능

3. **줄 간격 (Line Height)**
   - 일부 본문에서 `leading-relaxed` 사용
   - 더 넓은 간격이 필요할 수 있음

4. **패키지 카드 설명**
   - `text-white/60` - 약간 흐릿함
   - 가독성 향상 필요

5. **FAQ 답변**
   - `text-white/75` - 약간 흐릿함
   - 개선 가능

## 개선 제안

### 1. 텍스트 투명도 개선
- `text-white/50` → `text-white/70` (최소)
- `text-white/60` → `text-white/80`
- `text-white/70` → `text-white/85`
- `text-white/75` → `text-white/90`

### 2. 작은 텍스트 크기 증가
- `text-xs` → `text-sm` (Footer)
- `text-sm` → `text-base` (안내 문구)

### 3. 줄 간격 개선
- 본문 텍스트에 `leading-relaxed` 또는 `leading-loose` 적용

### 4. 패키지 카드 가독성
- 설명 텍스트: `text-white/60` → `text-white/80`
- 리스트 항목: `text-white/75` → `text-white/90`

### 5. FAQ 가독성
- 답변 텍스트: `text-white/75` → `text-white/90`
