import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white space-y-6">
      <Image
        src="/images/gmf-logo-white.png"
        alt="GMF Logo"
        width={300}
        height={80}
        className="drop-shadow-lg"
        priority
      />
      <h1 className="text-4xl font-bold">GMF AeroAsia</h1>
    </main>
  );
}
