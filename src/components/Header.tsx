'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Globe } from 'lucide-react';
import { locales, type Locale } from '@/i18n';
import clsx from 'clsx';

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  es: 'ES',
  it: 'IT',
};

const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Francais',
  es: 'Espanol',
  it: 'Italiano',
};

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Strip the locale prefix (always present now) to get the bare path segment.
  // e.g. /fr/teaching  ->  /teaching   |   /en  ->  ''
  const pathWithoutLocale = pathname.replace(/^\/(en|fr|es|it)/, '') || '';

  function localePath(targetLocale: Locale) {
    // Always produce /<locale> or /<locale>/<path>
    return `/${targetLocale}${pathWithoutLocale}` || `/${targetLocale}`;
  }

  function isActive(href: string) {
    // Every URL now has an explicit locale prefix
    const full = `/${locale}${href === '/' ? '' : href}`;
    if (href === '/') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(full);
  }

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/teaching', label: t('teaching') },
    { href: '/scholarship', label: t('scholarship') },
    { href: '/consulting', label: t('consulting') },
    { href: '/service', label: t('service') },
    { href: '/photography', label: t('photography') },
    { href: '/poems', label: t('poems') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md border-b border-navy-100'
          : 'bg-white shadow-sm border-b border-navy-100'
      )}
    >
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-navy-600 via-gold-500 to-navy-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <Link
            href={`/${locale}`}
            className="flex flex-col leading-tight group"
          >
            <span className="font-serif text-lg font-semibold text-navy-800 group-hover:text-navy-600 transition-colors duration-200">
              Dr. Stacy A.S. Williams
            </span>
            <span className="text-xs text-gold-600 font-sans tracking-widest uppercase">
              Psychology | Marist University
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navItems.map(({ href, label }) => {
              const active = isActive(href);
              const fullHref = `/${locale}${href === '/' ? '' : href}`;
              return (
                <Link
                  key={href}
                  href={fullHref}
                  className={clsx(
                    'nav-link pb-1',
                    active && 'nav-link-active'
                  )}
                >
                  {label}
                </Link>
              );
            })}

            {/* Locale switcher */}
            <div className="relative">
              <button
                onClick={() => setLocaleOpen((v) => !v)}
                className="flex items-center gap-1.5 text-navy-600 hover:text-navy-800 text-sm font-medium transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-navy-400 rounded px-2 py-1"
                aria-label="Switch language"
                aria-expanded={localeOpen}
              >
                <Globe size={15} />
                <span>{localeLabels[locale]}</span>
              </button>
              {localeOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-navy-100 rounded shadow-lg py-1 min-w-[130px] z-50">
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={localePath(loc)}
                      onClick={() => setLocaleOpen(false)}
                      className={clsx(
                        'block px-4 py-2 text-sm hover:bg-navy-50 transition-colors duration-150 cursor-pointer',
                        loc === locale ? 'text-navy-800 font-semibold' : 'text-navy-600'
                      )}
                    >
                      {localeNames[loc]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-navy-700 hover:text-navy-900 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-navy-400 rounded"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-navy-100 shadow-lg">
          <nav className="flex flex-col py-4 px-6 gap-1" aria-label="Mobile navigation">
            {navItems.map(({ href, label }) => {
              const active = isActive(href);
              const fullHref = `/${locale}${href === '/' ? '' : href}`;
              return (
                <Link
                  key={href}
                  href={fullHref}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'py-3 px-2 text-navy-700 hover:text-navy-900 font-medium border-b border-navy-50 transition-colors duration-200',
                    active && 'text-navy-900 font-semibold'
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <div className="pt-3 flex gap-3">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={localePath(loc)}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'text-sm px-2 py-1 rounded border transition-colors duration-150 cursor-pointer',
                    loc === locale
                      ? 'border-navy-600 text-navy-800 font-bold bg-navy-50'
                      : 'border-navy-200 text-navy-500 hover:border-navy-400'
                  )}
                >
                  {localeLabels[loc]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
