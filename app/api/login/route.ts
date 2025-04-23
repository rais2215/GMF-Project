import { PrismaClient } from '@/app/generated/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const employeeNumber = body.employeeNumber?.trim();  // Menggunakan employeeNumber di sini
    const password = body.password;

    // Validasi input
    if (!employeeNumber || !password) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }

    // Cari user berdasarkan employeeNumber
    const user = await prisma.user.findUnique({
      where: {
        employeeNumber: employeeNumber,  // Menggunakan employeeNumber di sini
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Nomor Pegawai tidak ditemukan' }, { status: 404 });
    }

    // Cek password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Password salah' }, { status: 401 });
    }

    // Bisa tambahkan logika auth/token/session di sini jika perlu

    return NextResponse.json({ message: 'Login berhasil', user: { id: user.id, name: user.firstName } }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan di server' }, { status: 500 });
  }
}
