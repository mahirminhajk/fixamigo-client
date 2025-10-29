"use client";
import Link from "next/link";
import Image from "next/image";
import { INFO } from "@/constants";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useHelpHeaderStore } from "@/stores/helpHeaderStore";

export default function MinimalHeader() {
  const helpMessage = useHydratedStore(
    useHelpHeaderStore,
    (s) => s.helpMessage
  );

  const finalMessage = helpMessage || "Hi, I need help";

  return (
    <header className="w-full bg-white border-b border-gray-200 py-3 mb-2 sticky top-0 z-30">
      <div className="container mx-auto px-4 max-w-5xl flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-2" prefetch={false}>
          <Image
            src="/logos/text.png"
            alt="Fixamigo Logo"
            width={100}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        <a
          href={INFO.waLink(finalMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline text-sm font-medium flex items-center gap-1"
        >
          Need Help?
        </a>
      </div>
    </header>
  );
}
