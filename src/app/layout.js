import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: 'Wellness App • 1-Year Mental Health & Wellness Micro-Learning Program',
  description: 'Evidence-informed preventative mental wellness for adults 18+ and parents. 5-minute six-tile comics, 4-minute 6-person weekend voice rooms, and 1-minute daily actions.',
  keywords: 'mental wellness, mental health micro-learning, adult self-care, six-tile comics, emotion coaching, burnout recovery',
  icons: {
    icon: '/images/mascot.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
