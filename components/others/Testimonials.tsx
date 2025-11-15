"use client";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location?: string;
  avatarInitial?: string; // simple fallback
  rating: number; // 1-5
  title: string;
  text: string;
  device?: string;
  highlight?: boolean;
}

// Demo data – replace/edit later as needed
export const testimonialsData: Testimonial[] = [
  {
    id: "t1",
    name: "Arjun M.",
    location: "Kochi",
    avatarInitial: "A",
    rating: 5,
    title: "Super fast repair & pickup",
    text: "Booked a screen replacement. Device was picked up and returned same day. Transparent pricing.",
    device: "iPhone 12",
    highlight: true,
  },
  {
    id: "t2",
    name: "Neha P.",
    location: "Calicut",
    avatarInitial: "N",
    rating: 5,
    title: "Reliable & professional",
    text: "Whatsapp OTP login made it easy. Technician explained the issue clearly before fixing.",
    device: "Samsung S21",
  },
  {
    id: "t3",
    name: "Rahul K.",
    location: "Thrissur",
    avatarInitial: "R",
    rating: 4,
    title: "Good value for money",
    text: "Price was better than local shop and parts look genuine. Took one extra hour but worth it.",
    device: "OnePlus 9",
  },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-orange-500 fill-orange-500" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="mt-10 lg:mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mt-2">
            Real experiences from customers using Fixamigo for fast, trusted device repair.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonialsData.map(t => (
            <div
              key={t.id}
              className={`relative bg-white border ${t.highlight ? "border-orange-300" : "border-gray-200"} rounded-xl shadow-sm hover:shadow-lg transition-all p-5 flex flex-col`}
            >
              {t.highlight && (
                <div className="absolute -top-2 left-4 bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                  Popular
                </div>
              )}
              <RatingStars rating={t.rating} />
              <h3 className="mt-3 font-semibold text-gray-900 text-sm md:text-base">{t.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{t.text}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 text-white flex items-center justify-center font-bold">
                  {t.avatarInitial}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.name}{t.location ? ` • ${t.location}` : ""}</p>
                  {t.device && (
                    <p className="text-xs text-gray-500">{t.device} repair</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs md:text-sm text-gray-500">
            Want your story here? Share feedback after your next service.
          </p>
        </div>
      </div>
    </section>
  );
}
