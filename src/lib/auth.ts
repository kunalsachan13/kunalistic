import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'kunalistic_admin_auth';
const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'kunalistic-admin-2026';

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;

  // Token is formatted as base64(admin_secret:timestamp)
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [secret] = decoded.split(':');
    return secret === ADMIN_SECRET;
  } catch {
    return false;
  }
}

export function createAdminToken(secret: string): string | null {
  if (secret !== ADMIN_SECRET) {
    return null;
  }
  const payload = `${secret}:${Date.now()}`;
  return Buffer.from(payload).toString('base64');
}

export { ADMIN_COOKIE_NAME };
