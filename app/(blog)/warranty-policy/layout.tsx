import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Warranty Policy | Fixamigo",
  description:
    "Learn about Fixamigo's 7-day warranty policy for repair services, what's covered, exclusions, and how to make a warranty claim.",
  alternates: {
    canonical: "https://fixamigo.com/warranty-policy",
  },
};

export default function WarrantyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
