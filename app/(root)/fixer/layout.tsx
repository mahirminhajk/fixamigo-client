import { ReactNode } from "react";

// Custom layout for fixer profile pages without default navbar/footer
export default function FixerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
