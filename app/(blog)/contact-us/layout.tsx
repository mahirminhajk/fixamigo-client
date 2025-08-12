import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Fixamigo",
  description:
    "Contact Fixamigo for support, queries, or feedback. Find our email, phone, address, and working hours for quick assistance.",
  alternates: {
    canonical: "https://fixamigo.com/contact-us",
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
