import type { Metadata } from "next";
import { getCampaignByName, getAllCampaignNames } from "@/lib/campaigns";
import ProductSearch from "@/components/search/ProductSearch";
import BrandsList from "@/components/list/brandsList";
import Footer from "@/components/core/footer";
import HighlightedBrand from "@/components/HighlightedBrand";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ cname: string }>;
}

export async function generateStaticParams() {
  return getAllCampaignNames().map((cname) => ({ cname }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { cname } = await props.params;
  const campaign = getCampaignByName(cname);
  if (!campaign) {
    return {
      title: "Campaign Not Found | Fixamigo",
      description: "The campaign you're looking for does not exist.",
      robots: { index: false },
    };
  }

  return {
    title: campaign.title,
    description: campaign.description,
    openGraph: {
      title: campaign.title,
      description: campaign.description,
    },
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { cname } = await params;
  const campaign = getCampaignByName(cname);

  if (!campaign) redirect("/");

  return (
    <main className="min-h-screen flex flex-col pb-16">
      <section className="w-full bg-gradient-to-br from-orange-50 via-white to-white pt-12 pb-8 md:pt-16 md:pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            {campaign.title}
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {campaign.description}
          </p>
          {/* Hero Banner Image */}
          <div className="mt-8 md:mt-10">
            <div className="relative -mx-6 md:mx-auto md:max-w-3xl w-[calc(100%+3rem)] md:w-full aspect-[16/9] rounded-none md:rounded-2xl overflow-hidden shadow-lg ring-0 md:ring-1 md:ring-gray-200">
              <Image
                src="https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner1.webp"
                alt="Explore mobile and laptop repair services"
                title="Explore mobile and laptop repair services"
                fill
                priority
                className="object-cover"
              />
              <Link
                href="/repair/mobile-phone"
                aria-label="Explore mobile and laptop repair services"
                className="absolute inset-0 focus:outline-none focus:ring-4 focus:ring-[#D2691E]/40"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1">
        <ProductSearch
          heading="Modern Repair. Zero Hassle."
          subheading="Your device gets expert care while you relax. Pickup and delivery are always free."
        />
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <HighlightedBrand category="mobile-phone" />
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <BrandsList variant="all" category="mobile-phone" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
