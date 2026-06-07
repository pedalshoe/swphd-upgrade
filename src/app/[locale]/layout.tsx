import type { Metadata } from 'next';
import { Inter, EB_Garamond } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Dr. Stacy A.S. Williams | Associate Professor of Psychology',
    template: '%s | Dr. Stacy A.S. Williams',
  },
  description:
    'Dr. Stacy A.S. Williams is an Associate Professor of Psychology at Marist University, licensed psychologist, and nationally recognized expert in school psychology, MTSS, and RTI.',
  keywords: [
    'Stacy Williams',
    'school psychology',
    'MTSS',
    'RTI',
    'Marist University',
    'educational psychology',
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as 'en' | 'fr' | 'es' | 'it')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${ebGaramond.variable}`}>
      <body className="bg-cream text-navy-900 font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
