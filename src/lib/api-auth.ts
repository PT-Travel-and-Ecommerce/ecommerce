import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function requireAuth(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      ),
    };
  }

  return { user, response: null };
}

export async function withAuth<T>(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse<T>>
) {
  const { user, response } = await requireAuth(request);

  if (response) {
    return response;
  }

  return handler(request, user);
}
