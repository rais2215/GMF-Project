import Image from 'next/image';
import Link from 'next/link';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-7xl mx-auto px-6">{children}</div>;
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <PageWrapper>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image src="/images/gmf-logo-white.png" alt="GMF Logo" width={200} height={80} />
              <h1 className="text-2xl font-bold ml-4">GMF AeroAsia</h1>
            </div>

            {/* Navigation */}
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link href="/" className="hover:text-gray-200 transition duration-300 ease-in-out">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-gray-200 transition duration-300 ease-in-out">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-gray-200 transition duration-300 ease-in-out">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-200 transition duration-300 ease-in-out">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </PageWrapper>
      </header>

      {/* Content Section */}
      <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to GMF AeroAsia</h1>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            As a trusted leader in the MRO industry, GMF AeroAsia provides premium Maintenance, Repair, and Overhaul services to ensure the safety, performance, and reliability of your aircraft.
          </p>
        </section>

        {/* Services Section */}
        <section className="w-full max-w-4xl mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Our MRO Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Service 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/images/mro-service-1.jpg" alt="Aircraft Maintenance" width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Aircraft Maintenance</h3>
                <p className="text-gray-600 mt-2">Our comprehensive aircraft maintenance services ensure operational reliability and safety, keeping your fleet in top shape.</p>
              </div>
            </div>
            {/* Service 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/images/mro-service-2.jpg" alt="Aircraft Repair" width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Aircraft Repair</h3>
                <p className="text-gray-600 mt-2">We offer fast, reliable aircraft repair services to minimize downtime and get your fleet back in operation as quickly as possible.</p>
              </div>
            </div>
            {/* Service 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/images/mro-service-3.jpg" alt="Overhaul Services" width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Overhaul Services</h3>
                <p className="text-gray-600 mt-2">Our overhaul services extend the life and performance of critical aircraft components, ensuring maximum reliability.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Get in Touch for MRO Solutions</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Let us help you achieve peak performance for your fleet. Contact us for customized MRO solutions tailored to your needs.
          </p>
          <Link href="/contact">
            <button className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700">
              Contact Us
            </button>
          </Link>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white py-6 mt-12">
        <PageWrapper>
          <div className="flex justify-between items-center">
            <p>&copy; 2025 GMF AeroAsia. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="hover:text-gray-200">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-gray-200">
                Terms of Service
              </Link>
              <Link href="/login">
                <button className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700">
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </PageWrapper>
      </footer>
    </div>
  );
}
