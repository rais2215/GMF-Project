'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert('Login berhasil!');
      window.location.href = '/dashboard'; // Arahkan user ke dashboard
    } else {
      setError(data.error || 'Login gagal');
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

      {/* Overlay + Form Container */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-end px-6 lg:px-24">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-xl p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Login</h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm mb-1 font-bold">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
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
                placeholder="Enter Password"
                className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {error && <p className="text-red-300 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Continue'}
            </button>

            <p className="text-sm text-center mt-4">
              Don’t have an account?{' '}
              <span className="font-semibold text-white underline cursor-pointer">
                Register Now
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
