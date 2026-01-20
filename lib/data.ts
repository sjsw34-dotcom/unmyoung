// 프로모션 상수
export const PROMO = {
  TOTAL_SLOTS: 50,        // 총 한정 수량
  REMAINING_SLOTS: 10,    // 남은 수량
  ORIGINAL_PRICE: 49800,  // 정가
  PROMO_PRICE: 29900,     // 프로모션가
} as const;

// 패키지 데이터
export const packages = [
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

// FAQ 데이터
export const faqs = [
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
    a: "네, PDF 리포트 형태입니다. 하지만 읽고 추가로 궁금한 부분은 카카오톡으로 질문하실 수 있습니다. 프리미엄 패키지는 10일 이내 무제한 질문이 가능합니다.",
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

// 카카오톡 채널 URL
export const CHAT_URL = "http://pf.kakao.com/_fECQn";
