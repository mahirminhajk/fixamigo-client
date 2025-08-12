"use client";
import Link from "next/link";

export default function WarrantyPolicyPage() {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Warranty Policy
          </h1>
          <p className="mt-4 text-center text-gray-200">
            Effective Date: August 1, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-gray-600 mb-8">
            At Fixamigo, we stand by the quality of our repair services. This
            Warranty Policy outlines the conditions under which your repaired
            device is covered under warranty and what exclusions apply.
          </p>

          {/* Warranty Coverage */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Warranty Coverage
            </h2>
            <p className="text-gray-600 mb-4">
              All repair services provided by Fixamigo are covered by a 7-day
              limited warranty from the date of delivery or service completion.
            </p>
            <p className="text-gray-600 mb-2">This warranty applies to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                The specific issue that was repaired (e.g., screen replacement,
                battery, charging port)
              </li>
              <li>
                The specific part that was replaced by our technician or service
                center
              </li>
            </ul>
          </div>

          {/* What Is Not Covered */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. What Is Not Covered
            </h2>
            <p className="text-gray-600 mb-2">
              The warranty does not cover the following:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                Physical damage (cracks, dents, water/liquid damage, accidental
                damage)
              </li>
              <li>Tampering with the device after repair</li>
              <li>Issues unrelated to the original service</li>
              <li>Damage due to third-party repair after Fixamigo's service</li>
              <li>Software issues (unless related to original service)</li>
              <li>Normal wear and tear</li>
            </ul>
          </div>

          {/* Warranty Claim Process */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Warranty Claim Process
            </h2>
            <p className="text-gray-600 mb-2">
              If you notice the same issue reoccurring within 7 days:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Contact Fixamigo via support@fixamigo.com or call us</li>
              <li>
                Our team will verify the issue through remote or in-person
                inspection
              </li>
              <li>
                If approved, we will provide a free re-repair or resolution at
                no extra cost
              </li>
            </ul>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 italic">
                Note: The warranty covers only one follow-up repair under the
                same issue. Subsequent failures will be treated as new service
                requests.
              </p>
            </div>
          </div>

          {/* Parts Warranty */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Parts Warranty (if applicable)
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                If OEM (Original Equipment Manufacturer) parts were used, the
                warranty applies only as per the manufacturer's terms.
              </li>
              <li>
                For third-party compatible parts, Fixamigo offers the 7-day
                limited warranty mentioned above.
              </li>
            </ul>
          </div>

          {/* No Refund Under Warranty */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. No Refund Under Warranty
            </h2>
            <p className="text-gray-600 pl-4 border-l-4 border-[#D2691E]">
              Warranty covers repair or replacement only, not refunds.
            </p>
          </div>

          {/* Proof of Warranty */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Proof of Warranty
            </h2>
            <p className="text-gray-600 mb-2">Keep your:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Invoice copy</li>
              <li>Service reference number</li>
            </ul>
            <p className="text-gray-600 mt-2">
              These are required to raise a warranty claim.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              To raise a warranty issue, please reach out:
            </p>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-gray-600">Email: support@fixamigo.com</p>
              <p className="text-gray-600">Phone: +91-XXXXXXXXXX</p>
              <p className="text-gray-600">
                Grievance Officer: Mahir Minhaj K (km@fixamigo.com)
              </p>
              <p className="text-gray-600">
                Address: Kunduvayil, Ponmala, Kerala – 676528
              </p>
              <p className="text-gray-600">
                Working Hours: Monday to Saturday, 10:00 AM – 4:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            For any questions about our warranty policy, please contact us at{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800">
              our contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
