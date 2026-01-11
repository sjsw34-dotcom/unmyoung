// app/terms/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | 운명테라피",
  description: "운명테라피 서비스 이용약관",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#07080b] via-[#0f1014] to-[#07080b] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f1014]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:text-[#d4af37] transition-colors">
            운명테라피
          </Link>
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          서비스 이용약관
        </h1>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 space-y-8">
          {/* 제1조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제1조 (목적)
            </h2>
            <p className="text-white/80 leading-relaxed">
              본 약관은 운명테라피(이하 "회사")가 제공하는 사주팔자 명리 분석 서비스(이하 "서비스")의 이용과 관련하여
              회사와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          {/* 제2조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제2조 (용어의 정의)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">"서비스"</strong>란 회사가 제공하는 사주팔자 명리 분석, PDF 리포트 제공 등
                  일체의 서비스를 의미합니다.
                </li>
                <li>
                  <strong className="text-white">"이용자"</strong>란 본 약관에 따라 회사가 제공하는 서비스를 받는 자를
                  의미합니다.
                </li>
                <li>
                  <strong className="text-white">"패키지"</strong>란 회사가 제공하는 서비스 상품을 의미합니다
                  (신년운세, 기본 분석, 프리미엄 종합 분석 등).
                </li>
                <li>
                  <strong className="text-white">"리포트"</strong>란 사주 분석 결과를 담은 PDF 형식의 문서를 의미합니다.
                </li>
              </ul>
            </div>
          </section>

          {/* 제3조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제3조 (약관의 효력 및 변경)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                ① 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
              </p>
              <p>
                ② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며,
                약관이 변경되는 경우 변경사항을 시행일자 7일 전부터 공지합니다.
              </p>
              <p>
                ③ 이용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다.
              </p>
            </div>
          </section>

          {/* 제4조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제4조 (서비스의 제공 및 변경)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>① 회사가 제공하는 서비스는 다음과 같습니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>사주팔자 명리 분석 서비스</li>
                <li>신년운세, 연애운, 재물운, 직업운, 건강운 등의 분석</li>
                <li>PDF 형식의 분석 리포트 제공</li>
                <li>카카오톡 채널을 통한 상담 서비스</li>
              </ul>
              <p>
                ② 회사는 서비스의 내용 및 제공 시기를 변경할 수 있으며, 변경 사항은 사전에 공지합니다.
              </p>
              <p>
                ③ 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 단, 회사의 업무상 또는 기술상의 이유로
                서비스가 일시 중지될 수 있습니다.
              </p>
            </div>
          </section>

          {/* 제5조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제5조 (이용계약의 성립)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                ① 이용계약은 이용자가 본 약관에 동의하고 패키지를 선택하여 주문하고,
                회사가 이를 승낙함으로써 성립됩니다.
              </p>
              <p>
                ② 회사는 다음 각 호에 해당하는 경우 이용 신청을 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>타인의 명의를 도용한 경우</li>
                <li>허위의 정보를 기재한 경우</li>
                <li>결제 수단의 명의인이 이용자와 다른 경우</li>
                <li>기타 회사가 정한 이용조건에 위배되는 경우</li>
              </ul>
            </div>
          </section>

          {/* 제6조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제6조 (결제 및 요금)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                ① 서비스 이용 요금은 각 패키지별로 명시된 금액을 따르며, 웹사이트 또는 앱에 표시된
                가격으로 결제됩니다.
              </p>
              <p>
                ② 결제 수단은 신용카드, 계좌이체, 간편결제 등 회사가 제공하는 방법 중 이용자가 선택할 수 있습니다.
              </p>
              <p>
                ③ 결제 완료 시 이용자에게 결제 확인 메시지가 전송되며, 영수증은 이메일로 발송됩니다.
              </p>
              <p>
                ④ 회사는 프로모션 및 이벤트를 통해 요금을 할인하거나 변경할 수 있으며,
                이는 해당 이벤트 페이지에 명시됩니다.
              </p>
            </div>
          </section>

          {/* 제7조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제7조 (서비스 제공 및 배송)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                ① 회사는 결제 완료 후 영업일 기준 3~5일 이내에 분석 리포트를 이용자의 이메일로 발송합니다.
              </p>
              <p>
                ② 회사는 천재지변, 시스템 장애 등 불가항력적인 사유로 서비스 제공이 지연될 수 있으며,
                이 경우 이용자에게 사전 통지합니다.
              </p>
              <p>
                ③ 이용자가 잘못된 이메일 주소를 입력한 경우, 회사는 배송 실패에 대한 책임을 지지 않습니다.
                단, 이용자가 정확한 이메일 주소로 재발송을 요청하는 경우 1회에 한해 무료로 재발송합니다.
              </p>
            </div>
          </section>

          {/* 제8조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제8조 (청약 철회 및 환불)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                ① 이용자는 서비스 제공 전(리포트 발송 전)까지 청약 철회를 요청할 수 있으며,
                회사는 결제 금액 전액을 환불합니다.
              </p>
              <p>
                ② 리포트 발송 후에는 디지털 콘텐츠의 특성상 청약 철회가 불가능합니다.
                단, 다음 각 호의 경우 예외적으로 환불이 가능합니다:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>서비스 내용이 표시·광고 내용과 현저히 다른 경우</li>
                <li>리포트에 중대한 오류가 있는 경우</li>
                <li>회사의 귀책사유로 서비스 제공이 불가능한 경우</li>
              </ul>
              <p>
                ③ 환불은 결제 수단에 따라 3~7 영업일이 소요될 수 있습니다.
              </p>
              <p>
                ④ 환불 요청은 카카오톡 채널 또는 이메일을 통해 접수할 수 있습니다.
              </p>
            </div>
          </section>

          {/* 제9조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제9조 (이용자의 의무)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>① 이용자는 다음 행위를 하여서는 안 됩니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>타인의 개인정보를 도용하는 행위</li>
                <li>허위 정보를 입력하여 서비스를 이용하는 행위</li>
                <li>회사의 서비스를 무단으로 복제, 배포, 판매하는 행위</li>
                <li>리포트를 무단으로 재배포하거나 상업적으로 이용하는 행위</li>
                <li>회사의 저작권 및 지적재산권을 침해하는 행위</li>
                <li>부정한 방법으로 결제하거나 환불을 요구하는 행위</li>
              </ul>
              <p>
                ② 이용자가 위 의무를 위반한 경우, 회사는 서비스 제공을 중지하고 법적 조치를 취할 수 있습니다.
              </p>
            </div>
          </section>

          {/* 제10조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제10조 (회사의 의무)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                ① 회사는 관련 법령과 본 약관을 준수하며, 계속적이고 안정적으로 서비스를 제공하기 위해 최선을 다합니다.
              </p>
              <p>
                ② 회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 이를 준수합니다.
              </p>
              <p>
                ③ 회사는 서비스 이용과 관련하여 이용자로부터 제기된 의견이나 불만이 정당하다고 인정될 경우
                신속하게 처리합니다.
              </p>
            </div>
          </section>

          {/* 제11조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제11조 (저작권 및 지적재산권)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                ① 회사가 제공하는 서비스 및 리포트에 대한 저작권 및 지적재산권은 회사에 귀속됩니다.
              </p>
              <p>
                ② 이용자는 리포트를 개인적인 용도로만 사용할 수 있으며, 회사의 사전 동의 없이
                복제, 전송, 출판, 배포, 방송 등의 방법으로 이용하거나 제3자에게 제공할 수 없습니다.
              </p>
            </div>
          </section>

          {/* 제12조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제12조 (면책사항)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                ① 회사가 제공하는 사주 분석 서비스는 전통 명리학을 기반으로 한 해석 및 조언을 제공하는 것으로,
                절대적인 미래 예측이나 확정적인 결과를 보장하지 않습니다.
              </p>
              <p>
                ② 이용자는 리포트 내용을 참고 자료로 활용하되, 최종 결정은 본인의 판단에 따라야 하며,
                회사는 이용자의 결정으로 인한 결과에 대해 책임을 지지 않습니다.
              </p>
              <p>
                ③ 천재지변, 전쟁, 폭동, 시스템 장애 등 불가항력적인 사유로 서비스 제공이 불가능한 경우
                회사는 책임을 지지 않습니다.
              </p>
              <p>
                ④ 이용자가 잘못된 정보를 입력하여 발생한 오류나 손해에 대해 회사는 책임을 지지 않습니다.
              </p>
            </div>
          </section>

          {/* 제13조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제13조 (분쟁 해결)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                ① 회사와 이용자 간 발생한 분쟁에 대해서는 전자문서 및 전자거래 기본법, 전자금융거래법,
                전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령을 적용합니다.
              </p>
              <p>
                ② 회사와 이용자 간 발생한 분쟁에 관한 소송은 회사의 본사 소재지를 관할하는 법원을 전속 관할법원으로 합니다.
              </p>
            </div>
          </section>

          {/* 부칙 */}
          <section className="pt-8 border-t border-white/10">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              부칙
            </h2>
            <p className="text-white/80 leading-relaxed">
              본 약관은 2026년 1월 1일부터 시행합니다.
            </p>
          </section>

          {/* 사업자 정보 (플레이스홀더) */}
          <section className="pt-8 border-t border-white/10">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              사업자 정보
            </h2>
            <div className="text-white/80 leading-relaxed space-y-2">
              <p><strong className="text-white">상호:</strong> 운명테라피</p>
              <p><strong className="text-white">대표자:</strong> [대표자명을 입력하세요]</p>
              <p><strong className="text-white">사업자등록번호:</strong> [사업자등록번호를 입력하세요]</p>
              <p><strong className="text-white">통신판매업 신고번호:</strong> [통신판매업 신고번호를 입력하세요]</p>
              <p><strong className="text-white">주소:</strong> [사업장 주소를 입력하세요]</p>
              <p><strong className="text-white">이메일:</strong> [이메일 주소를 입력하세요]</p>
              <p><strong className="text-white">고객센터:</strong> 카카오톡 채널 (http://pf.kakao.com/_fECQn)</p>
            </div>
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-300 text-sm">
                ⚠️ 주의: 위 사업자 정보는 플레이스홀더입니다. 실제 사업자 정보로 반드시 교체해야 합니다.
              </p>
            </div>
          </section>
        </div>

        {/* 하단 네비게이션 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/privacy"
            className="text-center px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
          >
            개인정보처리방침 보기
          </Link>
          <Link
            href="/"
            className="text-center px-6 py-3 rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] transition-all"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0f1014] px-4 py-8 mt-12">
        <div className="mx-auto max-w-5xl text-center text-sm text-white/50">
          <p>© 2026 운명테라피. 정통 명리 기반 사주 분석 서비스.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
