"use client";

import { GoogleReview } from "@/types/review";
import { Star } from "lucide-react";
import { useState } from "react";

// Dummy Google Reviews Data - Replace this with actual data later
const DUMMY_REVIEWS: GoogleReview[] = [
  {
    id: "1",
    author: "Muhsina Shebeerkp",
    rating: 5,
    date: "2025-10-15",
    text: "എൻ്റെ vivo Y15s display പൊട്ടിയിരുന്നു. പുറത്ത് പോയി repair ചെയ്യാൻ എനിക്ക് time ഉണ്ടായിരുന്നില്ല. പക്ഷെ fixamigo വീട്ടിൽ വന്ന് phon എടുത്തു അതേ ദിവസം repair ചെയ്ത് തിരിച്ചു തന്നു.service അടിപൊളിയായിരുന്നു.site use ചെയ്യാനും easy ആയിരുന്നു.fixamigo recomment ചെയ്യുന്നു",
    avatar: "MS",
  },
  {
    id: "2",
    author: "SHAHL",
    rating: 5,
    date: "2025-10-22",
    text: "Nalla service aannu! Vellya time edukkathe thanne phone kayyil kitti ivarude website use cheyyanum ellam easy aayirunnu overall good aaann satisfied!!🙌❤️",
    avatar: "S",
  },
  {
    id: "3",
    author: "Lubaina Lubi",
    rating: 5,
    date: "2025-10-24",
    text: "എന്റെ Samsung A31 ഫോൺ്റെ ഡിസ്പ്ലേ പൊളിഞ്ഞിരുന്നു. Fixamigo വന്ന് വീട്ടിൽ നിന്ന് എടുത്ത്, ഒരുദിവസം കൊണ്ടു തന്നെ റെഡ്ഡിയാക്കി തിരികെ കൊടുത്തു. ഒന്നും ബുദ്ധിമുട്ട് ഇല്ലാതെ ആയിരുന്നു. ഞാൻ കോളിൽ പറഞ്ഞ് ഓർഡർ കൊടുത്തു, പിന്നെ വെബ്സൈറ്റിൽ കണ്ട് എല്ലാം ട്രാക്ക് ചെയ്യാൻ പറ്റി. നല്ല സേവനം, സന്തോഷം ആയി",
    avatar: "LL",
  },
  {
    id: "4",
    author: "Moideen Kutty",
    rating: 5,
    date: "2025-11-12",
    text: "My samsung a31 display changed in a day with affordable price. Thankyou fixamigo",
    avatar: "MK",
  },
  {
    id: "5",
    author: "Yasin",
    rating: 5,
    date: "2025-11-15",
    text: "My iQOO Z3 5G display was damaged and I couldn't find a replacement anywhere since it's an old model. Fixamigo took my phone and got it fixed by the next day. Really happy with their fast and reliable service!",
    avatar: "Y",
  },
  {
    id: "6",
    author: "Firoz Mohamed",
    rating: 5,
    date: "2025-11-15",
    text: "I found Fixamigo on Instagram and decided to give them a try honestly one of the best mobile repair services in Malappuram! The team is young, energetic, and super professional. They were really fast, friendly, and reliable came to pick up my phone, diagnosed the issue, sent me a clear repair quote, and returned it the very next day. My OnePlus 7T power button was fixed perfectly.I love their idea of doorstep mobile repair so much easier than going to a phone service center. Great communication, fair pricing, and excellent customer service.Highly recommend Fixamigo for anyone looking for mobile phone repair at home in Malappuram or nearby!",
    avatar: "FM",
  },
];

const CustomerReviews = () => {
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);

  const toggleReview = (reviewId: string) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const truncateText = (text: string, limit: number = 150): string => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            Real reviews from our satisfied customers
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-xl font-semibold text-gray-900">5.0</span>
            <span className="text-gray-600">(7 reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {review.avatar}
                  </div>
                  {/* Author Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.author}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {expandedReviews.includes(review.id)
                  ? review.text
                  : truncateText(review.text)}
              </p>

              {/* Read More Button */}
              {review.text.length > 150 && (
                <button
                  onClick={() => toggleReview(review.id)}
                  className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  {expandedReviews.includes(review.id)
                    ? "Read Less"
                    : "Read More"}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-10">
          <a
            href="https://share.google/U8hg4hR3YCu9IGg8f"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span>See all reviews on Google</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
