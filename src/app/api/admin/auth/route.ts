import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated, createAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(request: NextRequest) {
  try {
    const { passcode } = await request.json();

    const token = createAdminToken(passcode);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin passcode. Access denied.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication successful',
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    console.error('Error during admin auth:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}
