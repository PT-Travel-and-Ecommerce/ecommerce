import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth-local';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied. Admin only.' },
        { status: 403 }
      );
    }

    // Create session
    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const response = NextResponse.json({
      success: true,
      user: sessionData,
    });

    // Set session cookie - only use secure flag if actually over HTTPS
    response.cookies.set('admin_session', encodeURIComponent(JSON.stringify(sessionData)), {
      httpOnly: true,
      secure: isSecureConnection(request),
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
