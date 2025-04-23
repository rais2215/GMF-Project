'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import PageWrapperRegister from '@/components/PageWrapperRegister';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName')?.toString().trim();
    const lastName = formData.get('lastName')?.toString().trim();
    const employeeNumber = formData.get('employeeNumber')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString() || '';
    const confirmPassword = formData.get('confirmPassword')?.toString() || '';

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

    if (!firstName || !lastName || !employeeNumber || !email || !password || !confirmPassword) {
      setLoading(false);
      toast.error('Semua field harus diisi.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setLoading(false);
      toast.error('Your password must include at least one letter and one number.');
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      toast.error('Password dan konfirmasi password tidak cocok.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, employeeNumber, email, password, confirmPassword }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success('Registrasi berhasil! Silakan login.');
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        toast.error(data.error || 'Registrasi gagal');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setLoading(false);
      toast.error('Terjadi kesalahan saat menghubungi server');
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/plane.jpg"
        alt="Plane Background"
        fill
        className="object-cover"
        priority
      />

      {/* Company Logo */}
      <div className="absolute top-6 left-6 right-6 z-10">
        <Image
          src="/images/gmf-logo-white.png"
          alt="Company Logo"
          width={350}
          height={40}
          className="object-contain drop-shadow-md"
        />
      </div>

      {/* Form Area */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-end px-6 lg:px-24">
        <PageWrapperRegister>
          <h2 className="text-3xl font-bold mb-6">Register</h2>

          <form className="space-y-5" onSubmit={handleRegister}>
            <InputField id="firstName" label="First Name" />
            <InputField id="lastName" label="Last Name" />
            <InputField id="employeeNumber" label="Employee Number" />
            <InputField id="email" label="Email" type="email" />

            <div>
              <label htmlFor="password" className="block text-sm mb-1 font-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password (at least 1 letter & 1 number)"
                value={passwordInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setPasswordInput(val);
                  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
                  if (!regex.test(val)) {
                    setPasswordWarning('Your password must include at least one letter and one number.');
                  } else {
                    setPasswordWarning('');
                  }
                }}
                className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-1 font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {passwordWarning && (
              <p className="text-yellow-300 text-sm">{passwordWarning}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Create Account'}
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-white underline cursor-pointer">
                Login here
              </Link>
            </p>
          </form>
        </PageWrapperRegister>
      </div>
    </div>
  );
}

function InputField({
  id,
  label,
  type = 'text',
}: {
  id: string;
  label: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm mb-1 font-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={label}
        className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>
  );
}
