import React from "react";

export default function ContactUsPage() {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg">
            Contact Us – Fixamigo
          </h1>
          <p className="mt-4 text-center text-gray-200 text-lg md:text-xl font-medium">
            Your Online Service Center
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#D2691E] mb-6">
            Have a question, need help with a repair, or want to know more?
          </h2>
          <p className="mb-6 text-gray-700 text-lg">
            The Fixamigo team is here to assist you every step of the way. We
            make it easy for you to book repairs, track your order, and get
            answers fast — whether online, by phone, or via WhatsApp.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg text-[#D2691E] mb-2">
                📞 Call Us
              </h3>
              <p className="text-gray-700 mb-2">
                Phone:{" "}
                <a
                  href="tel:+918078160942"
                  className="text-[#D2691E] font-medium"
                >
                  +91 8078160942
                </a>
              </p>
              <p className="text-gray-600">
                Available: 10:00 AM – 6:00 PM, Monday to Saturday
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#D2691E] mb-2">
                📧 Email Us
              </h3>
              <p className="text-gray-700 mb-2">
                General Support:{" "}
                <a
                  href="mailto:support@fixamigo.com"
                  className="text-[#D2691E] font-medium"
                >
                  support@fixamigo.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#D2691E] mb-2">
                💬 WhatsApp Support
              </h3>
              <p className="text-gray-700 mb-2">
                WhatsApp:{" "}
                <a
                  href="https://wa.me/918078160942"
                  className="text-[#D2691E] font-medium"
                >
                  +91 8078160942
                </a>
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg text-[#D2691E] mb-2">
              🛠 Quick Links
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <a href="#" className="text-[#D2691E] font-medium">
                  Book a Repair
                </a>
              </li>
              <li>
                <a href="#" className="text-[#D2691E] font-medium">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-[#D2691E] font-medium">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg text-[#D2691E] mb-2">
              Stay Connected
            </h3>
            <ul className="flex gap-6 text-gray-700">
              <li>
                <a href="#" className="text-[#D2691E] font-medium">
                  Instagram: @fixamigo
                </a>
              </li>
              <li>
                <a href="#" className="text-[#D2691E] font-medium">
                  Facebook: Fixamigo
                </a>
              </li>
              <li>
                <a href="#" className="text-[#D2691E] font-medium">
                  Twitter: @fixamigo
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg text-[#D2691E] mb-2">
              📜 Grievance Officer
            </h3>
            <p className="text-gray-700">Name: Mahir Minhaj K</p>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:km@fixamigo.com"
                className="text-[#D2691E] font-medium"
              >
                km@fixamigo.com
              </a>
            </p>
            <p className="text-gray-700">
              Address: Kunduvayil, Ponmala, Kerala – 676528
            </p>
            <p className="text-gray-700">
              Working Hours: 10:00 AM – 4:00 PM, Monday to Saturday
            </p>
          </div>

          <p className="mt-8 text-center text-lg font-semibold text-[#D2691E]">
            Fixamigo – Your gadget’s best friend, always here to help.
          </p>
        </div>
      </div>
    </section>
  );
}
