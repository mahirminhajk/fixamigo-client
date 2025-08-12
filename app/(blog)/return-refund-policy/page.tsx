"use client";
import Link from "next/link";

export default function ReturnRefundPolicyPage() {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Return & Refund Policy
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
            At Fixamigo, your satisfaction is our priority. We strive to provide
            high-quality repair services and ensure transparent communication
            throughout your service experience. This policy explains our rules
            for returns, cancellations, and refunds.
          </p>

          {/* Service Cancellation */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Service Cancellation
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  a. Before Pickup / Technician Visit:
                </h3>
                <p className="text-gray-600">
                  You can cancel your booking at any time before the pickup or
                  technician's arrival by contacting our support team.
                </p>
                <p className="text-gray-600 mt-2">
                  No cancellation fee will be charged in this case.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  b. After Pickup / Before Repair Begins:
                </h3>
                <p className="text-gray-600">
                  If the device has already been picked up, but the repair
                  process has not yet started, you may request to cancel the
                  service.
                </p>
                <p className="text-gray-600 mt-2">In such cases:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
                  <li>The device will be returned to you</li>
                  <li>
                    A cancellation fee will be applicable to cover logistics and
                    handling
                  </li>
                  <li>
                    No repair or diagnostic charges will be added unless already
                    communicated
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  c. After Repair Has Started or Completed:
                </h3>
                <p className="text-gray-600">
                  Cancellation is not permitted once the repair has begun or is
                  completed.
                </p>
                <p className="text-gray-600 mt-2">
                  However, if Fixamigo is unable to complete the repair due to
                  technical limitations or unavailable parts, the device will be
                  returned, and a partial refund may apply if any advance was
                  paid.
                </p>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Refund Policy
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  a. Eligible Refund Situations:
                </h3>
                <p className="text-gray-600 mb-2">
                  You may be eligible for a full or partial refund if:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>We are unable to complete the repair</li>
                  <li>
                    The final price after diagnosis is significantly higher than
                    estimated, and you choose not to continue
                  </li>
                  <li>
                    Your device is damaged due to our handling or logistics, and
                    the claim is approved after review
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  b. Non-Refundable Situations:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>After successful completion of repair and delivery</li>
                  <li>For cancellation after repair has started</li>
                  <li>Pickup and cancellation charges are non-refundable</li>
                  <li>
                    No refund for issues arising from physical damage or misuse
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Return Policy
            </h2>
            <p className="text-gray-600">
              Fixamigo operates a service-based model. As such, "returns" of
              services are not applicable. However:
            </p>
            <p className="text-gray-600 mt-4 pl-4 border-l-4 border-[#D2691E]">
              If the same issue reappears within the 7-day warranty period, we
              will provide a free recheck and resolution, subject to warranty
              terms.
            </p>
          </div>

          {/* Refund Processing Time */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Refund Processing Time
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Approved refunds are processed within 7–10 working days</li>
              <li>
                Refunds will be made to your original payment method or bank
                account
              </li>
              <li>Confirmation will be sent via SMS/email once processed</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Contact for Cancellations & Refunds
            </h2>
            <p className="text-gray-600 mb-4">
              To cancel a booking or request a refund, please contact:
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
            For any questions about our return and refund policy, please contact
            us at{" "}
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
