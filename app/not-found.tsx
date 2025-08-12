import Link from "next/link";

export default function NotFound() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200 shadow-lg group transition-all duration-300 ease-in-out hover:shadow-2xl">
        {/* Background gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[#D2691E]/0 to-[#121212]/0 group-hover:from-[#D2691E]/5 group-hover:to-[#121212]/5 transition-all duration-300 rounded-2xl"
        />

        {/* Shine effect */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
        />

        <div className="relative z-[1] flex flex-col items-center text-center px-6 md:px-10 py-12 md:py-16">
          <p className="mb-3 text-sm md:text-base font-semibold tracking-wider text-[#D2691E] uppercase">
            Oops! Page not found
          </p>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-none bg-gradient-to-r from-[#D2691E] to-[#121212] bg-clip-text text-transparent">
            404
          </h1>
          <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
            The page you are looking for doesn’t exist or may have moved. Let’s
            get you back on track.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/"
              className="relative inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#D2691E] to-[#121212] hover:from-[#121212] hover:to-[#D2691E] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50"
            >
              Go Home
            </Link>

            <Link
              href="/repair"
              className="group/btn inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-gray-800 font-semibold rounded-2xl border-2 border-gray-200 hover:border-[#D2691E] hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#D2691E]/30"
            >
              Browse Repairs
            </Link>

            <Link
              href="/contact"
              className="group/btn inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-gray-800 font-semibold rounded-2xl border-2 border-gray-200 hover:border-[#D2691E] hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#D2691E]/30"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
