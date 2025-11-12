import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySSOToken } from '@/lib/auth';

// Helper function to determine if request is over HTTPS
function isSecureConnection(request: NextRequest): boolean {
  // Check if explicitly set via environment variable
  if (process.env.FORCE_SECURE_COOKIES === 'true') {
    return true;
  }

  // Check X-Forwarded-Proto header (set by reverse proxies like nginx)
  const forwardedProto = request.headers.get('x-forwarded-proto');
  if (forwardedProto === 'https') {
    return true;
  }

  // Check the request URL protocol
  const protocol = request.nextUrl.protocol;
  if (protocol === 'https:') {
    return true;
  }

  // Default to false for HTTP connections
  return false;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const redirectUrl = searchParams.get('redirectUrl') || '/';

    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const ssoUser = await verifySSOToken(token);

    if (!ssoUser) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    let user = await prisma.user.findUnique({
      where: { ssoId: ssoUser.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: ssoUser.email,
          name: ssoUser.name,
          ssoId: ssoUser.id,
        },
      });
    }

    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    response.cookies.set('sso_token', token, {
      httpOnly: true,
      secure: isSecureConnection(request),
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Error in auth callback:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
