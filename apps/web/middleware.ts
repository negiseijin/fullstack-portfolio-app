export { auth as middleware } from '@repo/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
