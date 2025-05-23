'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapperLogin';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); // Hook to handle navigation

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear previous error message

    const formData = new FormData(e.currentTarget);
    const employeeNumber = formData.get('employeeNumber')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!employeeNumber || !password) {
      toast.error('Semua field wajib diisi');
      setLoading(false);
      return;
    }

    // Make the API call to validate login credentials
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeNumber, password }),
    });

    const data = await res.json();
    setLoading(false);

    console.log('API Response:', data); // Log response from the backend

    if (res.ok) {
      toast.success('Login berhasil!');
      console.log('Navigating to homepage'); // Updated message
      router.push('/'); // Redirect to homepage
    } else {
      setErrorMessage(data.error || 'Login gagal');
      toast.error(data.error || 'Login gagal');
    }
  };

  return (
    <PageWrapper>
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

        {/* Overlay + Form Container */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-end px-6 lg:px-24">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-xl p-8 text-white shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105">
            <h2 className="text-3xl font-bold mb-6">Login</h2>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label htmlFor="employeeNumber" className="block text-sm mb-1 font-bold">
                  Employee Number
                </label>
                <input
                  type="text"
                  id="employeeNumber"
                  name="employeeNumber"
                  placeholder="Employee Number"
                  className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-1 font-bold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              {/* Show error message if login failed */}
              {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Continue'}
              </button>

              <p className="text-sm text-center mt-4">
                Don’t have an account?{' '}
                <Link href="/register" className="font-semibold text-white underline">
                  Register Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
