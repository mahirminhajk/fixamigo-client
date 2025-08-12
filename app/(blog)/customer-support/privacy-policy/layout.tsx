import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Fixamigo",
  description:
    "Learn about how Fixamigo collects, uses, shares, and protects your personal data. Our privacy policy explains your rights and our data handling practices.",
  alternates: {
    canonical: "https://fixamigo.com/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
