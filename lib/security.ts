import { NextRequest, NextResponse } from 'next/server';

// Rate limiting을 위한 간단한 in-memory 저장소
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting 미들웨어
 * @param ip 클라이언트 IP
 * @param limit 허용 횟수
 * @param windowMs 시간 윈도우 (밀리초)
 */
export function checkRateLimit(
  ip: string,
  limit: number = 10,
  windowMs: number = 60000 // 1분
): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // 새로운 윈도우 시작
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * 클라이언트 IP 추출
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

/**
 * API 키 검증 (간단한 인증)
 */
export function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const validKey = process.env.API_SECRET_KEY;

  // API 키가 설정되지 않았으면 검증 통과 (개발 환경)
  if (!validKey) {
    return true;
  }

  return apiKey === validKey;
}

/**
 * 입력 sanitization - XSS 방지
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';

  return input
    .replace(/[<>]/g, '') // HTML 태그 제거
    .replace(/javascript:/gi, '') // javascript: 프로토콜 제거
    .replace(/on\w+\s*=/gi, '') // 이벤트 핸들러 제거
    .trim();
}

/**
 * 이메일 유효성 검증
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 날짜 유효성 검증 (YYYY-MM-DD)
 */
export function validateDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const parsedDate = new Date(date);
  return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
}

/**
 * 금액 유효성 검증
 */
export function validateAmount(amount: number): boolean {
  return (
    typeof amount === 'number' &&
    amount > 0 &&
    amount <= 10000000 && // 최대 1천만원
    Number.isInteger(amount)
  );
}

/**
 * orderId 유효성 검증
 */
export function validateOrderId(orderId: string): boolean {
  // ORDER_로 시작하고 영숫자와 언더스코어만 허용
  const orderIdRegex = /^ORDER_[a-zA-Z0-9_]+$/;
  return orderIdRegex.test(orderId);
}

/**
 * 보안 에러 응답 생성 (민감한 정보 숨김)
 */
export function createSecureErrorResponse(
  error: unknown,
  defaultMessage: string = '요청 처리 중 오류가 발생했습니다.'
): NextResponse {
  // 프로덕션에서는 자세한 에러 메시지 숨김
  const isDevelopment = process.env.NODE_ENV === 'development';

  const message = isDevelopment && error instanceof Error
    ? error.message
    : defaultMessage;

  // 에러 로그 (서버 측에만)
  console.error('[Security Error]:', error);

  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 500 }
  );
}

/**
 * 보안 헤더 추가
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // XSS 방어
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // HTTPS 강제 (프로덕션)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
  }

  // Referrer 정책
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );

  return response;
}

/**
 * 민감한 정보 마스킹
 */
export function maskSensitiveData(data: Record<string, unknown>): Record<string, unknown> {
  const masked = { ...data };

  // 이메일 마스킹
  if (typeof masked.email === 'string') {
    const [local, domain] = masked.email.split('@');
    masked.email = `${local.slice(0, 2)}***@${domain}`;
  }

  if (typeof masked.customer_email === 'string') {
    const [local, domain] = masked.customer_email.split('@');
    masked.customer_email = `${local.slice(0, 2)}***@${domain}`;
  }

  // 이름 마스킹
  if (typeof masked.name === 'string' && masked.name.length > 1) {
    masked.name = masked.name[0] + '*'.repeat(masked.name.length - 1);
  }

  if (typeof masked.customer_name === 'string' && masked.customer_name.length > 1) {
    masked.customer_name = masked.customer_name[0] + '*'.repeat(masked.customer_name.length - 1);
  }

  // 생년월일 마스킹
  if (typeof masked.birth_date === 'string') {
    masked.birth_date = masked.birth_date.slice(0, 4) + '-**-**';
  }

  return masked;
}
