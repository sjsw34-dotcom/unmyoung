"use client";

import Link from "next/link";
import { useState } from "react";

// 블로그 글 데이터
const blogPosts = [
  {
    id: 1,
    title: "사주란 무엇인가? - 내 운명의 지도 펼치기",
    excerpt: "사주팔자는 단순한 점술이 아닙니다. 내가 태어난 순간의 우주 에너지를 기록한 '나의 사용 설명서'입니다.",
    gradient: "from-purple-900/80 to-indigo-900/80",
    date: "2026-01-15",
    category: "기초 개념",
    content: `사주팔자(四柱八字)는 내가 태어난 순간 우주가 나에게 찍어준 '바코드'와 같습니다. 많은 분들이 사주를 '미래를 맞히는 점'이라고 생각하지만, 사실 사주는 '내 사용 설명서'에 가깝습니다. 내가 어떤 엔진(기질)을 달고 태어났는지, 그리고 내가 달리는 도로(운의 흐름)가 고속도로인지 비포장도로인지를 알려주는 지도입니다.

사주는 네 개의 기둥인 '사주(四柱)'와 여덟 개의 글자인 '팔자(八字)'로 이루어집니다. 년주(태어난 해), 월주(태어난 달), 일주(태어난 날), 시주(태어난 시간) 이렇게 네 개의 기둥으로 구성되어 있으며, 각 기둥마다 천간(하늘)과 지지(땅) 두 글자씩 있어 총 여덟 글자가 됩니다.

년주는 초년(0~19세)의 환경과 조상, 가문을 나타내며, 나의 뿌리이자 인상을 결정합니다. 월주는 청년기(20~39세)를 의미하며, 사주에서 가장 강력한 기운이 담겨 있습니다. 부모님에게 받은 유전자와 직업적 환경을 보여줍니다. 일주는 중년기(40~59세)를 나타내며, 사주의 핵심입니다. 일간(위)은 나 자신을, 일지(아래)는 배우자 궁을 뜻합니다. 시주는 말년(60세 이후)과 자녀, 인생의 결실을 의미합니다.

사주를 본다는 것은 정해진 운명에 굴복하는 것이 아니라, 내게 주어진 패를 확인하고 가장 잘 쓰는 법을 배우는 것입니다. 한자를 몰라도 괜찮습니다. 요즘은 스마트폰 앱이 다 만세력을 뽑아주니까요. 중요한 것은 그 안에 담긴 '자연의 이치'를 이해하는 것입니다.

사주 공부의 첫걸음은 내 사주를 열어보는 것입니다. 스마트폰 앱스토어에서 '만세력'을 검색해서 생년월일시를 입력하면 8개의 글자가 나옵니다. 이것이 바로 당신의 인생 지도입니다. 이 지도를 읽을 수 있게 되면, 언제 어떤 선택을 해야 하는지, 어떤 시기에 조심해야 하는지를 알 수 있게 됩니다.`
  },
  {
    id: 2,
    title: "오행의 세계 - 목화토금수로 보는 나의 기질",
    excerpt: "목, 화, 토, 금, 수. 이 다섯 가지 에너지가 나의 성격과 운명을 만듭니다. 당신은 어떤 오행이 강한가요?",
    gradient: "from-green-900/80 to-emerald-900/80",
    date: "2026-01-14",
    category: "오행",
    content: `만세력의 8글자는 모두 목(木), 화(火), 토(土), 금(金), 수(水) 다섯 가지 재료로 만들어져 있습니다. 이를 오행이라고 하며, 동양 철학의 가장 기본이 되는 개념입니다. 내 사주에 어떤 색깔(오행)이 많은지 살펴보는 것이 사주 분석의 첫걸음입니다.

목(木)은 나무를 의미하며, 초록색으로 표현됩니다. 성장, 시작, 아이디어를 상징하며, 어질 인(仁)의 덕목을 가지고 있습니다. 목이 강한 사람은 추진력이 있고 새로운 일을 시작하는 것을 좋아합니다. 하지만 너무 강하면 고집이 세고 융통성이 부족할 수 있습니다.

화(火)는 불을 의미하며, 빨간색으로 표현됩니다. 열정, 확산, 표현을 상징하며, 예절 예(禮)의 덕목을 가집니다. 화가 강한 사람은 밝고 적극적이며 사교성이 뛰어납니다. 하지만 과하면 성격이 급하고 참을성이 부족할 수 있습니다.

토(土)는 흙을 의미하며, 노란색으로 표현됩니다. 중재, 믿음, 멈춤을 상징하며, 믿음 신(信)의 덕목을 가집니다. 토가 강한 사람은 안정적이고 신뢰할 수 있으며, 중재를 잘합니다. 하지만 너무 강하면 우유부단하고 변화를 싫어할 수 있습니다.

금(金)은 쇠를 의미하며, 흰색으로 표현됩니다. 결단, 마무리, 원칙을 상징하며, 의리 의(義)의 덕목을 가집니다. 금이 강한 사람은 결단력이 있고 원칙을 중시하며, 완벽주의 성향이 있습니다. 하지만 과하면 융통성이 없고 차갑게 느껴질 수 있습니다.

수(水)는 물을 의미하며, 검정색으로 표현됩니다. 지혜, 휴식, 유연함을 상징하며, 지혜 지(智)의 덕목을 가집니다. 수가 강한 사람은 지혜롭고 유연하며, 적응력이 뛰어납니다. 하지만 너무 강하면 우유부단하고 의지가 약할 수 있습니다.

오행의 균형이 매우 중요합니다. 특정 오행이 너무 많으면 그 기질이 과하게 나타나고, 너무 없으면 그 기질이 부족하여 오히려 그것을 갈망하게 됩니다. 예를 들어, 불(화)이 너무 많으면 성격이 급하고 화를 잘 낼 수 있으며, 불이 전혀 없으면 열정이 부족하고 소극적일 수 있습니다. 사주 분석의 핵심은 이러한 오행의 균형을 파악하고, 부족한 부분을 채우고 과한 부분을 조절하는 것입니다.`
  },
  {
    id: 3,
    title: "천간과 지지 완전 정복 - 사주의 기본 구조 이해하기",
    excerpt: "사주의 윗줄과 아랫줄, 천간과 지지. 이 구조를 이해하면 사주의 절반은 이해한 것입니다.",
    gradient: "from-blue-900/80 to-cyan-900/80",
    date: "2026-01-13",
    category: "기초 개념",
    content: `사주 8글자는 윗줄과 아랫줄로 나뉩니다. 윗줄을 천간(天干), 아랫줄을 지지(地支)라고 합니다. 천간은 하늘의 뜻으로 나의 생각, 의지, 정신적인 면을 나타내며, 지지는 땅의 환경으로 내가 발 딛고 선 현실, 환경, 계절을 의미합니다.

천간은 총 10개로 갑(甲), 을(乙), 병(丙), 정(丁), 무(戊), 기(己), 경(庚), 신(辛), 임(壬), 계(癸)입니다. 갑목(甲木)은 큰 나무로 리더십과 곧음을 상징하며, 을목(乙木)은 덩굴 식물로 유연함과 생활력을 나타냅니다. 병화(丙火)는 태양으로 공평함과 화려함을, 정화(丁火)는 촛불이나 달로 집중력과 따뜻함을 의미합니다.

무토(戊土)는 큰 산으로 묵직함과 신용을, 기토(己土)는 밭 흙으로 실속과 포용을 나타냅니다. 경금(庚金)은 바위나 무쇠로 결단력과 혁명을, 신금(辛金)은 보석이나 칼로 섬세함과 예리함을 상징합니다. 임수(壬水)는 바다나 호수로 포용력과 생각을, 계수(癸水)는 빗물이나 안개로 감수성과 지혜를 의미합니다.

지지는 총 12개로 자(子), 축(丑), 인(寅), 묘(卯), 진(辰), 사(巳), 오(午), 미(未), 신(申), 유(酉), 술(戌), 해(亥)입니다. 각각은 동물(띠)로도 표현되는데, 자(쥐), 축(소), 인(범), 묘(토끼), 진(용), 사(뱀), 오(말), 미(양), 신(원숭이), 유(닭), 술(개), 해(돼지)입니다.

자수(子水)는 한겨울, 비밀, 씨앗을 의미하며, 축토(丑土)는 겨울 끝, 인내, 연결을 나타냅니다. 인목(寅木)은 초봄, 시작, 추진력을, 묘목(卯木)은 봄, 꾸미기, 생명력을 상징합니다. 진토(辰土)는 봄 끝, 이상, 다양성을, 사화(巳火)는 초여름, 활동, 변화를 의미합니다.

오화(午火)는 여름, 도화, 열정을, 미토(未土)는 여름 끝, 건조함, 희생을 나타냅니다. 신금(申金)은 초가을, 재주, 결실을, 유금(酉金)은 가을, 도도함, 분리를 상징합니다. 술토(戌土)는 가을 끝, 이중성, 충직을, 해수(亥水)는 초겨울, 역마, 저장을 의미합니다.

천간과 지지의 조합으로 60갑자가 만들어집니다. 예를 들어, 갑자(甲子), 을축(乙丑), 병인(丙寅) 등입니다. 이 60가지 조합이 반복되면서 시간의 흐름을 표현합니다. 천간은 나의 의지와 방향을, 지지는 나를 둘러싼 환경과 상황을 나타내므로, 둘의 조화를 보는 것이 중요합니다.

또한 지지 안에는 지장간(地藏干)이라는 숨겨진 천간이 들어있습니다. 이는 '땅 속에 숨어 있는 하늘의 기운'으로, 겉으로 보이는 성격 외에 마음 깊은 곳에 숨겨진 진짜 속마음이나 잠재력을 의미합니다. 사주 분석의 고수들은 이 지장간을 매우 중요하게 봅니다.`
  },
  {
    id: 4,
    title: "십성으로 알아보는 나의 성격과 능력",
    excerpt: "비견, 식신, 재성, 관성, 인성. 이 다섯 가지 십성으로 나의 사회적 능력과 성격을 파악할 수 있습니다.",
    gradient: "from-amber-900/80 to-orange-900/80",
    date: "2026-01-12",
    category: "십성",
    content: `십성(육친)은 '일간(나)'을 기준으로 나머지 7글자가 어떤 관계인지 이름 붙인 것입니다. 십성은 나의 사회적 가면이자 능력을 나타내며, 사주 분석에서 매우 중요한 개념입니다.

비견(比肩)과 겁재(劫財)는 나와 같은 오행입니다. 형제, 동료, 경쟁자, 자존심을 의미하며, 나의 세력을 나타냅니다. 비견이 많으면 자존심이 강하고 독립적이며, 동업이나 협업을 잘합니다. 하지만 너무 많으면 고집이 세고 타협을 잘 못할 수 있습니다. 겁재는 비견보다 더 강력하고 경쟁적인 성향을 나타냅니다.

식신(食神)과 상관(傷官)은 내가 생하는 오행입니다. 표현력, 말, 재능, 자식(여명)을 의미하며, 내 기운을 밖으로 뿜어내는 힘입니다. 식신이 많으면 표현력이 뛰어나고 예술적 재능이 있으며, 여유롭고 낙천적입니다. 상관은 식신보다 더 날카롭고 비판적인 표현력을 나타내며, 창의성과 반항심이 강합니다. 상관이 많으면 독특하고 개성이 강하지만, 때로는 말로 인해 문제가 생길 수 있습니다.

편재(偏財)와 정재(正財)는 내가 극하는 오행입니다. 돈, 결과물, 아버지, 아내(남명)를 의미하며, 내가 관리하고 소유하려는 대상입니다. 재성이 많으면 돈을 잘 벌고 현실적이며, 실용적입니다. 편재는 큰 돈, 유동적인 재물, 장사를 의미하며, 정재는 월급, 안정적인 수입, 저축을 나타냅니다. 재성이 너무 많으면 돈에 집착하거나 물질만능주의에 빠질 수 있습니다.

편관(偏官)과 정관(正官)은 나를 극하는 오행입니다. 직장, 명예, 규칙, 남편(여명), 자식(남명)을 의미하며, 나를 통제하는 시스템입니다. 관성이 많으면 책임감이 강하고 규칙을 잘 지키며, 공직이나 대기업에 잘 맞습니다. 정관은 정당한 권력과 명예를, 편관(칠살)은 강력한 압박과 도전을 나타냅니다. 편관이 많으면 카리스마가 있고 강한 추진력이 있지만, 스트레스도 많을 수 있습니다.

편인(偏印)과 정인(正印)은 나를 생하는 오행입니다. 공부, 문서, 계약, 어머니를 의미하며, 나에게 에너지를 공급하고 보호하는 힘입니다. 인성이 많으면 학구적이고 지적이며, 보수적이고 안정을 추구합니다. 정인은 정통 학문과 정식 교육을, 편인은 독특한 학문과 특수 기술을 나타냅니다. 인성이 너무 많으면 의존적이고 실행력이 부족할 수 있습니다.

십성의 균형을 보는 것이 중요합니다. 어떤 십성이 많고 적은지, 어떤 십성이 부족한지를 파악하면 나의 강점과 약점을 알 수 있습니다. 예를 들어, 식신이 많고 재성이 적으면 재능은 있지만 돈으로 연결하는 능력이 부족한 것이고, 관성이 많고 인성이 적으면 책임은 많지만 도와주는 사람이 부족한 것입니다. 이렇게 십성을 통해 나의 인생 패턴을 이해하고, 부족한 부분을 보완할 수 있습니다.`
  },
  {
    id: 5,
    title: "대운과 세운 - 시간의 흐름을 읽는 법",
    excerpt: "사주는 고정된 것이 아닙니다. 대운과 세운이라는 시간의 흐름을 이해하면, 인생의 타이밍을 알 수 있습니다.",
    gradient: "from-rose-900/80 to-pink-900/80",
    date: "2026-01-11",
    category: "대운/세운",
    content: `초보자들이 가장 많이 오해하는 것이 "사주는 정해져 있다"는 것입니다. 하지만 사주는 자동차(원국)와 도로(운)의 만남입니다. 자동차가 아무리 좋아도 도로가 험하면 속도를 낼 수 없고, 자동차가 평범해도 도로가 좋으면 빠르게 달릴 수 있습니다. 이 도로가 바로 대운과 세운입니다.

대운(大運)은 10년마다 바뀌는 큰 운의 흐름입니다. '대박 나는 운'이 아니라 '큰(大) 운의 흐름'을 말합니다. 대운은 내 인생의 계절이 봄에서 여름으로, 여름에서 가을로 바뀌는 것과 같습니다. 계절이 바뀌면 입는 옷(행동)이 달라져야 하듯이, 대운이 바뀌면 나의 전략도 바뀌어야 합니다.

대운은 남자와 여자, 양년생과 음년생에 따라 순행(順行)과 역행(逆行)으로 나뉩니다. 순행은 월주 다음 월주 순서대로 가는 것이고, 역행은 월주 이전 월주 역순으로 가는 것입니다. 대운은 보통 7~8세부터 시작하며, 10년마다 바뀝니다. 예를 들어, 7세에 첫 대운이 시작되면 7~16세, 17~26세, 27~36세 이렇게 10년 단위로 바뀝니다.

대운을 볼 때는 대운의 천간과 지지가 원국(내 사주)의 어떤 글자와 만나는지를 봅니다. 내게 좋은 오행(용신)이 대운으로 오면 좋은 시기이고, 나쁜 오행(기신)이 오면 어려운 시기입니다. 또한 대운과 원국의 글자가 합(合)이나 충(冲)을 이루면 큰 변화가 생깁니다.

세운(歲運)은 매년 바뀌는 운입니다. 2024년 갑진년, 2025년 을사년처럼 매년 들어오는 운을 말합니다. 대운이 계절이라면 세운은 그날의 날씨입니다. 계절이 좋아도 비가 올 수 있고, 계절이 나빠도 맑은 날이 있습니다. 세운은 그해의 전체적인 분위기를 나타내며, 대운과 함께 봐야 정확한 판단을 할 수 있습니다.

예를 들어, 대운이 좋은데 세운이 나쁘면 전체적으로는 괜찮지만 그해만 조금 힘들 수 있습니다. 반대로 대운이 나쁜데 세운이 좋으면 일시적으로 좋은 일이 생길 수 있지만 근본적인 문제는 해결되지 않을 수 있습니다. 가장 좋은 것은 대운도 좋고 세운도 좋을 때이며, 이때가 인생의 황금기입니다.

대운과 세운을 보는 방법은 복잡하지만, 기본 원리는 간단합니다. 내게 부족한 오행이 대운이나 세운으로 오면 좋고, 이미 많은 오행이 더 오면 과해서 문제가 생길 수 있습니다. 또한 합과 충, 형과 파 등의 관계를 보면서 언제 큰 변화가 생기는지, 언제 안정적인지를 파악할 수 있습니다.

대운과 세운을 이해하면 "지금이 때다" 또는 "지금은 아니다"를 알 수 있습니다. 이것이 사주의 가장 큰 장점입니다. 무작정 노력하는 것이 아니라, 타이밍에 맞춰 움직이는 것이 중요합니다. 좋은 운이 올 때는 적극적으로 도전하고, 나쁜 운이 올 때는 방어하고 준비하는 전략이 필요합니다. 사주는 이러한 인생의 리듬을 알려주는 나침반입니다.`
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const categories = ["전체", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = selectedCategory === "전체"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#121212]/90 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-[#d4af37] hover:opacity-80 transition-opacity">
              운명테라피
            </Link>
            <nav className="flex gap-4 sm:gap-6 text-sm sm:text-base">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">
                홈
              </Link>
              <Link href="/blog" className="text-[#d4af37] font-semibold">
                블로그
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 to-transparent"></div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm text-[#d4af37] mb-6">
            <span>✨</span>
            <span>사주명리학 지식 나눔</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            사주명리학 <span className="text-[#d4af37]">입문 가이드</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed">
            운명의 지도를 읽는 법, 사주팔자의 세계로 여러분을 초대합니다.
            <br className="hidden sm:block" />
            초보자도 쉽게 이해할 수 있는 명리학 지식을 나눕니다.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all ${
                selectedCategory === category
                  ? "bg-[#d4af37] text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-[#d4af37]/50 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Gradient Background */}
              <div className={`relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br ${post.gradient}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl sm:text-7xl md:text-8xl opacity-20">
                    {post.category === "기초 개념" && "📚"}
                    {post.category === "오행" && "🌿"}
                    {post.category === "십성" && "⭐"}
                    {post.category === "대운/세운" && "⏰"}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#d4af37] text-black text-xs sm:text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 md:p-8">
                <time className="text-xs sm:text-sm text-white/50">
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>

                <h2 className="mt-3 text-xl sm:text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm sm:text-base text-white/70 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Expandable Content */}
                <details className="mt-4 group/details">
                  <summary className="cursor-pointer text-[#d4af37] hover:text-[#e5c158] text-sm sm:text-base font-semibold flex items-center gap-2 group-hover/details:gap-3 transition-all">
                    전체 글 읽기
                    <span className="group-open/details:rotate-90 transition-transform">→</span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-white/10 text-sm sm:text-base text-white/80 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/50 text-lg">해당 카테고리의 글이 없습니다.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-gradient-to-b from-[#d4af37]/5 to-transparent">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            더 깊은 <span className="text-[#d4af37]">나만의 사주 분석</span>이 필요하신가요?
          </h2>
          <p className="text-base sm:text-lg text-white/75 mb-8 max-w-2xl mx-auto">
            100페이지 이상의 상세한 PDF 리포트로 당신의 인생 지도를 명확하게 정리해드립니다.
          </p>
          <Link
            href="/#packages"
            className="inline-block rounded-xl bg-[#d4af37] px-8 py-4 text-lg font-bold text-black hover:opacity-90 hover:scale-105 transition-all"
          >
            사주 분석 신청하기 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#131313] px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-white/50">
          <p>© 2026 운명테라피. 정통 명리 기반 사주 분석 서비스.</p>
          <p className="mt-2">모든 글의 저작권은 운명테라피에 있습니다.</p>
        </div>
      </footer>
    </main>
  );
}
