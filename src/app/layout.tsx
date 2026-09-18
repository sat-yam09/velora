import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Velora — Luxury Stays & Timeless Hospitality',
  description: 'Thoughtfully designed rooms that bring together modern comfort, refined details, and a sense of calm. Experience Velora luxury hotel.',
  keywords: ['Velora', 'Luxury Hotel', 'Boutique Hotel', 'Luxury Stays', 'Hospitality', 'Resort'],
  authors: [{ name: 'Velora Hotel' }],
  openGraph: {
    title: 'Velora — A refined stay, beautifully yours.',
    description: 'Thoughtfully designed rooms that bring together modern comfort, refined details, and a sense of calm.',
    images: ['/images/hero-bg.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
