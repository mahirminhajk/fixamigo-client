import { brands, repairCategory } from "@/constants";

export function generateBrandPageMeta(
  categorySlug: string,
  brandSlug: string
): {
  heading: string;
  metaTitle: string;
  metaDescription: string;
} {
  const brand = brands.find(
    (b) => b.slug.toLowerCase() === brandSlug.toLowerCase()
  );
  const category = repairCategory.find(
    (c) => c.slug.toLowerCase() === categorySlug.toLowerCase()
  );

  if (!brand || !category) {
    return {
      heading: "Phone Repair Services – Select Your Model",
      metaTitle: "Affordable Phone Repair Services | Fast & Reliable",
      metaDescription:
        "Explore our reliable and affordable phone repair services. Select your phone model and get started today.",
    };
  }

  const brandName = brand.name;
  const categoryName = category.name;

  const categoryToSEO: Record<string, string> = {
    Display: "Screen Repair & Replacement",
    Battery: "Battery Replacement",
    Camera: "Camera Repair",
    Ports: "Charging Port Repair",
    Speaker: "Speaker Repair",
    Others: "Phone Repair Services",
    "mobile-phone": "Phone Repair Services",
  };

  const service = categoryToSEO[categoryName] || `${categoryName} Repair`;

  const heading = `${brandName} Phone ${service} – Fast & Reliable Service`;
  const metaTitle = `${brandName} ${service} | Affordable & Trusted Repairs`;
  const metaDescription = `Need a ${brandName} phone ${service.toLowerCase()}? Choose your model and book a repair now. Trusted, fast and budget-friendly service.`;

  return {
    heading,
    metaTitle,
    metaDescription,
  };
}
