// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API 엔드포인트 크롤링 차단
          '/payment/success', // 결제 성공 페이지 차단
          '/payment/fail',    // 결제 실패 페이지 차단
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
