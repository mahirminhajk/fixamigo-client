import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Fixamigo",
  description:
    "Learn about Fixamigo's mission, vision, and services. Discover why we are Kerala's trusted online service center for mobile, laptop, and electronics repair.",
  alternates: {
    canonical: "https://fixamigo.com/about-us",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
