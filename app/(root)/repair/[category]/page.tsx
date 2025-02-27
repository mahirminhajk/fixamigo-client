import { repairCategory } from "@/constants";
import BrandsList from "@/components/list/brandsList";

export const dynamicParams = false;

// Static Generation
export async function generateStaticParams() {
  return repairCategory.map((category) => ({
    category: category.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <section className="p-6">
      <BrandsList variant="all" category={category} />
    </section>
  );
}

/**
 //* /repair/[category]
 //* ex: /repair/display
 * display
 * ports
 * battery
 * camera
 * speaker
 * others
 */
