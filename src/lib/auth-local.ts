import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
      },
    });

    if (!user || !user.password) {
      return null;
    }

    const isValid = await verifyPassword(password, user.password);
    
    if (!isValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

export function getSessionFromRequest(request: NextRequest): AuthUser | null {
  const sessionCookie = request.cookies.get('admin_session')?.value;
  
  if (!sessionCookie) {
    return null;
  }

  try {
    const session = JSON.parse(decodeURIComponent(sessionCookie));
    return session;
  } catch {
    return null;
  }
}

export async function getCurrentUser(request: NextRequest): Promise<AuthUser | null> {
  return getSessionFromRequest(request);
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === 'ADMIN';
}
