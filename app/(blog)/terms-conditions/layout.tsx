import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Fixamigo",
  description:
    "Terms and conditions for using Fixamigo's mobile repair services. Learn about our service conditions, warranty policy, and user agreements.",
  alternates: {
    canonical: "https://fixamigo.com/terms-conditions",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
