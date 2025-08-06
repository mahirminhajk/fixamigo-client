import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Fixamigo",
  description:
    "Learn about Fixamigo's return, refund, and cancellation policies for our repair services. Understand your rights and our service commitment.",
  alternates: {
    canonical: "https://fixamigo.com/return-refund-policy",
  },
};

export default function ReturnRefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
