import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OmniQ Materials — One Source | Infinite Solutions',
  description: 'Sustainable packaging solutions across Delhi NCR. Eco-friendly kraft bags, paper cups, corrugated boxes, and custom packaging.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
