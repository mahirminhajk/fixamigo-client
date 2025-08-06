import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Grievance Redressal & Customer Support | Fixamigo",
  description:
    "Learn about Fixamigo's customer support services and grievance redressal mechanism. Contact our support team for any issues or concerns.",
  alternates: {
    canonical: "https://fixamigo.com/customer-support",
  },
};

export default function CustomerSupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
