import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Fixer Profile',
  description: 'Browse repair services and place orders',
};

export default function FixerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
