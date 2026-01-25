import Image from "next/image";
import { BadgeCheck, ShieldCheck, Sparkles, Star } from "lucide-react";

interface ShowModelProps {
  deviceData: {
    name: string;
    company: string;
    images: string[];
  };
  // Render the heading as <h1> when true; otherwise use a <p>
  renderHeadingAsH1?: boolean;
  // Render only a specific layout to avoid duplicate markup
  only?: "mobile" | "desktop";
}

const FEATURE_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Genuine parts",
    description: "Authentic spare parts available",
    accent: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-200/60",
  },
  {
    icon: Sparkles,
    title: "Expert service",
    description: "Fast, professional repair support",
    accent: "from-sky-500 to-cyan-500",
    glow: "shadow-sky-200/60",
  },
  {
    icon: BadgeCheck,
    title: "Warranty",
    description: "Warranty on select parts",
    accent: "from-amber-500 to-orange-500",
    glow: "shadow-amber-200/60",
  },
];

function ShowModel({
  deviceData,
  renderHeadingAsH1 = false,
  only,
}: ShowModelProps) {
  return (
    <div className="flex justify-center">
      {/* Mobile Layout - Original horizontal */}
      {only !== "desktop" && (
        <div className="group lg:hidden flex flex-col items-center p-4 w-full">
          <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <div className="relative flex flex-col items-center">
              <div className="absolute inset-x-8 top-0 h-24 rounded-full bg-gradient-to-r from-sky-200/40 via-cyan-200/20 to-transparent blur-2xl" />
              <div className="relative z-10 w-56 h-56 flex items-center justify-center">
                <Image
                  src={deviceData.images[1]}
                  alt={deviceData.name}
                  title={deviceData.name}
                  width={224}
                  height={224}
                  className="object-cover w-full h-full mb-2 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            {renderHeadingAsH1 ? (
              <h1 className="text-lg font-bold text-slate-900 text-center tracking-tight">
                {deviceData.name.toUpperCase()}
              </h1>
            ) : (
              <p className="text-lg font-bold text-slate-900 text-center tracking-tight">
                {deviceData.name.toUpperCase()}
              </p>
            )}
            <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              <Star className="h-3.5 w-3.5 text-amber-500" />
              {deviceData.company.toUpperCase()}
            </span>

            <div className="mt-4 grid gap-2">
              {FEATURE_ITEMS.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className={`flex items-center gap-3 rounded-2xl border border-slate-200 bg-gradient-to-r ${feature.accent} p-3 text-white shadow-lg ${feature.glow} transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-2`}
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold leading-none">
                        {feature.title}
                      </p>
                      <p className="mt-1 text-xs text-white/90">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout - Horizontal layout for top position */}
      {only !== "mobile" && (
        <div className="hidden lg:flex lg:items-center lg:gap-8 p-4">
          {/* Image Section */}
          <div className="rounded-[28px] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <div className="relative w-64 h-64 flex items-center justify-center overflow-hidden rounded-[24px]">
              <div className="absolute inset-6 rounded-full bg-gradient-to-r from-sky-200/40 via-cyan-100/20 to-transparent blur-2xl" />
              <Image
                src={deviceData.images[1]}
                alt={deviceData.name}
                title={deviceData.name}
                width={256}
                height={256}
                className="relative z-10 object-cover w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Device Info Section */}
          <div className="flex-1 max-w-xl">
            {renderHeadingAsH1 ? (
              <h1 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">
                {deviceData.name.toUpperCase()}
              </h1>
            ) : (
              <p className="text-3xl font-bold mb-4 tracking-tight text-slate-900">
                {deviceData.name.toUpperCase()}
              </p>
            )}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <Star className="h-4 w-4 text-amber-500" />
              {deviceData.company.toUpperCase()}
            </div>

            {/* Features */}
            <div className="grid gap-3 sm:grid-cols-3">
              {FEATURE_ITEMS.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 animate-in fade-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div
                      className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.accent} text-white shadow-lg ${feature.glow} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {feature.description}
                    </p>
                    <div className="mt-3 h-1.5 w-0 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowModel;
