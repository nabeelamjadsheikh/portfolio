import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SmoothScroll } from '@/components/providers/smooth-scroll';
import { profile } from '@/lib/content';

// Self-hosted variable fonts (latin). Loaded locally so the production build
// never has to reach Google Fonts — avoids the Vercel build-time fetch timeout.
const inter = localFont({
  src: './fonts/inter.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

const fraunces = localFont({
  src: './fonts/fraunces.woff2',
  variable: '--font-fraunces',
  display: 'swap',
  weight: '100 900',
});

const mono = localFont({
  src: './fonts/jetbrains-mono.woff2',
  variable: '--font-mono-face',
  display: 'swap',
  weight: '100 800',
});

const url = 'https://nabeel-ahmad.dev';
const description =
  'Nabeel Ahmad — Full-Stack Engineer with 6+ years building scalable, cloud-native systems on Next.js and NestJS, now specializing in AI: LLM features, RAG pipelines, and intelligent automation.';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: 'Nabeel Ahmad — Full-Stack Engineer',
  description,
  keywords: [
    'Nabeel Ahmad',
    'Full-Stack Engineer',
    'Next.js',
    'NestJS',
    'AI Engineer',
    'RAG',
    'LLM',
    'Microservices',
    'TypeScript',
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: 'Nabeel Ahmad — Full-Stack Engineer',
    description,
    type: 'website',
    url,
    siteName: profile.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nabeel Ahmad — Full-Stack Engineer',
    description,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url,
  address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
  sameAs: [profile.linkedin],
  knowsAbout: ['Next.js', 'NestJS', 'AI', 'RAG', 'LLM', 'Microservices', 'Cloud'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
