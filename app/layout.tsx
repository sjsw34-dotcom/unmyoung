import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "사주팔자 명리 분석 | 당신의 선택을 바꾸는 타이밍 분석 | PDF 리포트",
  description: "정통 만세력 기반 사주 분석. 인생의 타이밍과 방향을 명확하게 파악하세요. 100페이지 PDF 리포트 제공. 2026 신년운세, 연애운, 재물운, 직업운 포함. 50명 한정 특가.",
  keywords: ["사주", "사주팔자", "명리", "운세", "신년운세", "2026운세", "타로", "점", "사주분석", "명리상담"],
  authors: [{ name: "명리심리상담사" }],
  creator: "운명 명리 분석",
  publisher: "운명 명리 분석",
  openGraph: {
    title: "사주팔자 명리 분석 | 당신의 선택을 바꾸는 타이밍 분석",
    description: "정통 만세력 기반 사주 분석. 인생의 타이밍과 방향을 명확하게 파악하세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "운명 명리 분석",
  },
  twitter: {
    card: "summary_large_image",
    title: "사주팔자 명리 분석 | 당신의 선택을 바꾸는 타이밍 분석",
    description: "정통 만세력 기반 사주 분석. PDF 리포트 제공.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Next.js 16+ viewport 설정
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#07080b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#07080b" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="사주 분석" />
        
        {/* 성능 최적화 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
