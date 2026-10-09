import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Blue Dragon: Kroniki Cienia | Komiks Xbox 360',
  description: 'Interaktywny komiks w stylu mangi na podstawie gry Blue Dragon (Xbox 360). Przeżyj epicką walkę Shu, Kluke, Jiro, Marumaro i Zoli przeciwko armii Nene z polskimi dialogami.',
  openGraph: {
    title: 'Blue Dragon: Kroniki Cienia | Komiks Xbox 360',
    description: 'Interaktywny komiks w stylu mangi na podstawie gry Blue Dragon (Xbox 360). Przeżyj epicką walkę Shu, Kluke, Jiro, Marumaro i Zoli przeciwko armii Nene z polskimi dialogami.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blue Dragon: Kroniki Cienia | Komiks Xbox 360',
    description: 'Interaktywny komiks w stylu mangi na podstawie gry Blue Dragon (Xbox 360). Przeżyj epicką walkę Shu, Kluke, Jiro, Marumaro i Zoli przeciwko armii Nene z polskimi dialogami.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
