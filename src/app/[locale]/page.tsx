import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, BarChart3, Award } from 'lucide-react';
import { HeroSection } from '@/components/ui/hero-section-2';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return { title: 'Stacy S.A. Williams, PhD, LP' };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('home');
  const tNav = useTranslations('nav');

  const expertiseItems = t.raw('expertise_items') as string[];

  const credentials = [
    { label: 'PhD', detail: 'School Psychology, University of Massachusetts at Amherst, 2004' },
    { label: 'MA',  detail: 'Education, University of Massachusetts at Amherst, 2002' },
    { label: 'BA',  detail: 'Psychology, Amherst College, 1997' },
    { label: 'LP',  detail: 'Licensed Psychologist' },
    { label: 'CSP', detail: 'Certified School Psychologist' },
  ];

  const highlights = [
    {
      icon: <BookOpen size={24} />,
      title: '21+ Publications',
      desc: 'Peer-reviewed journal articles on school psychology, social justice, and educational equity.',
    },
    {
      icon: <Users size={24} />,
      title: '100+ Presentations',
      desc: 'National and international presentations at NASP, TSP, NYASP, and beyond.',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'MTSS Expert',
      desc: 'Former Director of the NYSED MTSS-I Center; consultant to districts across New York, Connecticut, and Jamaica.',
    },
    {
      icon: <Award size={24} />,
      title: '20+ Years Experience',
      desc: 'Strengthening educator capacity and improving student outcomes through evidence-based practice.',
    },
  ];

  return (
    <>
      {/* ── Hero Section (full-height split layout with clip-path animation) ── */}
      <HeroSection
        slogan="Associate Professor of Psychology | Marist University"
        title={
          <>
            Dr. Stacy<br />
            A.S. <span className="text-primary">Williams</span>
          </>
        }
        subtitle={t('hero_body')}
        callToAction={{
          text: t('cta_primary'),
          href: `/${locale}/scholarship`,
        }}
        backgroundImage="/SASWPHD_20250906.jpeg"
        contactInfo={{
          website: 'stacywilliamsphd.com',
          phone:   '(845) 575-3000 ext. 2677',
          address: 'Dyson Hall 3058, Marist University',
        }}
        className="min-h-0 md:min-h-[520px]"
      />

      {/* ── Highlights bar ────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="text-gold-500">{icon}</div>
              <h3 className="font-serif text-lg text-navy-800 font-semibold">{title}</h3>
              <p className="text-sm text-navy-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About + Expertise ─────────────────────────────────────────────── */}
      <section className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="section-heading">{t('about_heading')}</h2>
            <p className="text-navy-700 leading-relaxed text-base mb-4">{t('about_body')}</p>
            <p className="text-navy-600 leading-relaxed text-base">
              Her work centers on systems-level consultation and classroom-based strategies
              designed to foster supportive, high-quality learning environments, with a deep
              commitment to educational equity and student success.
            </p>
          </div>
          <div>
            <h2 className="section-heading">{t('expertise_heading')}</h2>
            <ul className="space-y-3">
              {expertiseItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-gold-500 flex-shrink-0" />
                  <span className="text-navy-700 text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Credentials ───────────────────────────────────────────────────── */}
      <section className="bg-navy-50 border-y border-navy-100">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="section-heading text-center mb-10">{t('credentials_heading')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map(({ label, detail }) => (
              <div key={label} className="card flex items-start gap-4">
                <span className="text-2xl font-serif font-bold text-gold-500 leading-none">{label}</span>
                <p className="text-sm text-navy-600 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="bg-gold-500">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <h2 className="font-serif text-3xl text-navy-900 mb-4">{t('contact_cta_heading')}</h2>
          <p className="text-navy-800 text-base mb-8 max-w-xl mx-auto">{t('contact_cta_body')}</p>
          <Link href={`/${locale}/contact`} className="btn-primary bg-navy-700 text-white hover:bg-navy-800">
            {tNav('contact')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
