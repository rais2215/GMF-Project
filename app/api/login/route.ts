import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// Dummy user (biasanya ini diambil dari database)
const users = [
  {
    id: 1,
    username: 'admin',
    passwordHash: await bcrypt.hash('admin123', 10), // hash passwordnya dulu
  },
];

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  // Set cookie
  const response = NextResponse.json({ message: 'Login success' });
  response.headers.set(
    'Set-Cookie',
    serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })
  );

  return response;
}