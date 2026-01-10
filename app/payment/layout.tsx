// Payment 페이지들을 동적으로 렌더링하도록 설정
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
