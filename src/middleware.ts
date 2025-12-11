// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // không thêm /en cho locale mặc định
});

export const config = {
  // Áp dụng cho mọi route trừ tài nguyên tĩnh & API
  matcher: ['/((?!api|_next|.*\\..*).*)']
  //  matcher: [
  //   '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|json)).*)'
  // ]
};