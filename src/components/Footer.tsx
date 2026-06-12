import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  // With localePrefix:'always' every locale has an explicit prefix, including English
  const prefix = `/${locale}`;

  const navItems = [
    { href: `${prefix}`, label: t('nav.home') },
    { href: `${prefix}/teaching`, label: t('nav.teaching') },
    { href: `${prefix}/scholarship`, label: t('nav.scholarship') },
    { href: `${prefix}/consulting`, label: t('nav.consulting') },
    { href: `${prefix}/service`, label: t('nav.service') },
    { href: `${prefix}/photography`, label: t('nav.photography') },
    { href: `${prefix}/poems`, label: t('nav.poems') },
    { href: `${prefix}/contact`, label: t('nav.contact') },
  ];

  const socialLinks = [
    {
      href: 'https://x.com/Scheeatow',
      label: 'X (@Scheeatow)',
      icon: <Twitter size={18} />,
    },
    {
      href: 'https://www.instagram.com/najiimages',
      label: 'Instagram (najiimages)',
      icon: <Instagram size={18} />,
    },
    {
      href: 'https://www.linkedin.com/in/stacy-williams-9380982/',
      label: 'LinkedIn',
      icon: <Linkedin size={18} />,
    },
  ];

  return (
    <footer className="bg-navy-800 text-navy-100">
      <div className="h-1 bg-gradient-to-r from-navy-600 via-gold-500 to-navy-600" />
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p className="font-serif text-xl font-semibold text-white mb-2">
            Dr. Stacy A.S. Williams
          </p>
          <p className="text-sm text-navy-300 leading-relaxed">{t('footer.tagline')}</p>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gold-400 mb-4 font-sans font-semibold">
            {t('footer.nav_label')}
          </p>
          <ul className="space-y-2">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-navy-300 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gold-400 mb-4 font-sans font-semibold">
            {t('footer.social_label')}
          </p>
          <ul className="space-y-3">
            {socialLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 text-sm text-navy-300 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {icon}
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-navy-700 text-sm text-navy-400">
            <p>Stacy.Williams@marist.edu</p>
            <p className="mt-1">(845) 575-3000 ext. 2677</p>
          </div>
        </div>
      </div>

      {/* Copyright — always last on every screen size */}
      <div className="border-t border-navy-700 px-6 py-4 text-center">
        <p className="text-xs text-navy-400">
          &copy; {new Date().getFullYear()} Dr. Stacy A.S. Williams. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
