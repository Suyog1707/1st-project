import type { Metadata } from 'next';
import './globals.css';

// THESIS:    a video platform's front door — sign in, then see your own account, live from the server.
// WORLD:     Monolithic Dark — near-black canvas, one signal red, serif display, hairline borders.
// STORY:     you sign in and the app proves it by showing who you are.
// VIEWPORT:  login = centered card on black; home = account identity top-left of an airy page.
// FINISH:    contrast, focus and reduced-motion pass; unreviewed is unfinished.

export const metadata: Metadata = {
  title: 'VideoTube',
  description: 'Sign in to your VideoTube account.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-canvas text-ink font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
