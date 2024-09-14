import { NextRequest, NextResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/config/next-auth.config';

export default async function middleware(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}