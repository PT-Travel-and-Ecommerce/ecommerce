import { NextRequest } from 'next/server';

const SSO_AUTH_URL = 'https://ssoauth.darulgs.co.id';

export interface SSOUser {
  id: string;
  email: string;
  name: string;
}

export function getSSORedirectUrl(redirectUrl: string): string {
  return `${SSO_AUTH_URL}/login?redirectUrl=${encodeURIComponent(redirectUrl)}`;
}

export function getSSOLogoutUrl(redirectUrl: string): string {
  return `${SSO_AUTH_URL}/logout?redirectUrl=${encodeURIComponent(redirectUrl)}`;
}

export async function verifySSOToken(token: string): Promise<SSOUser | null> {
  try {
    const response = await fetch(`${SSO_AUTH_URL}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error verifying SSO token:', error);
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const cookieToken = request.cookies.get('sso_token')?.value;
  const headerToken = request.headers.get('Authorization')?.replace('Bearer ', '');
  
  return cookieToken || headerToken || null;
}

export async function getCurrentUser(request: NextRequest): Promise<SSOUser | null> {
  const token = getTokenFromRequest(request);
  
  if (!token) {
    return null;
  }

  return await verifySSOToken(token);
}
