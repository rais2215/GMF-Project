import { PrismaClient } from '@/app/generated/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { firstName, lastName, employeeNumber, email, password } = await req.json();

    if (!firstName || !lastName || !employeeNumber || !email || !password) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { employeeNumber }],
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email atau Nomor Pegawai sudah terdaftar' }, { status: 409 });
    }

    // 🔒 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        employeeNumber,
        email,
        password: hashedPassword, // Simpan password yang sudah di-hash
      },
    });

    return NextResponse.json({ message: 'Registrasi berhasil' }, { status: 200 });
  } catch (error) {
    console.error('Error saat registrasi:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat registrasi' }, { status: 500 });
  }
}
