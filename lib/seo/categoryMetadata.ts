import { Metadata } from "next";

export function getCategoryMetadata(category: string): Metadata {
  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  return {
    title: `${categoryName} Repair for All Phone Brands | Fixamigo`,
    description: `Need a ${categoryName.toLowerCase()} repair for your phone? Explore trusted repair options by brand at Fixamigo. Fast service, quality parts, and warranty backed repairs.`,
    alternates: {
      canonical: `/repair/${category}`,
    },
    openGraph: {
      title: `${categoryName} Repair for All Phone Brands | Fixamigo`,
      description: `Looking for ${categoryName.toLowerCase()} repair? Choose your phone brand to get started with reliable service.`,
      url: `/repair/${category}`,
    },
  };
}
