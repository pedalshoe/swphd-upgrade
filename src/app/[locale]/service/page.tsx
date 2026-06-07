import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'service' });
  return { title: t('page_title') };
}

export default function ServicePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('service');

  const professionalService = [
    {
      org: 'Trainers of School Psychologists (TSP)',
      roles: [
        'Executive Board Member',
        'Membership Coordinator',
        'Facebook Group Moderator',
      ],
    },
    {
      org: 'New York Association of School Psychologists (NYASP)',
      roles: [
        'Treasurer-Elect',
        'Graduate Facebook Page Administrator',
        'Main Facebook Page Administrator',
      ],
    },
    {
      org: 'National Association of School Psychologists (NASP)',
      roles: [
        'Mentor, NASP Mentoring Program',
        '#SP4SJ Social Media Campaign Participant (San Antonio, TX, 2017)',
      ],
    },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold-400 text-xs tracking-widest uppercase font-sans font-semibold mb-3">Dr. Stacy A.S. Williams</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">{t('page_title')}</h1>
        </div>
      </section>

      <div className="page-container space-y-14">
        <p className="text-navy-700 text-lg leading-relaxed max-w-3xl">{t('intro')}</p>

        {/* Guiding quote */}
        <blockquote className="border-l-4 border-gold-500 pl-6 py-2 max-w-2xl">
          <p className="font-serif text-xl text-navy-700 italic leading-relaxed">
            "{t('quote')}"
          </p>
          <footer className="mt-3 text-sm text-navy-500 font-sans">{t('quote_attribution')}</footer>
        </blockquote>

        {/* Professional service */}
        <section>
          <h2 className="section-heading">{t('professional_heading')}</h2>
          <div className="space-y-8">
            {professionalService.map(({ org, roles }) => (
              <div key={org} className="card">
                <h3 className="font-serif text-xl text-navy-800 mb-4 font-semibold">{org}</h3>
                <ul className="space-y-2">
                  {roles.map((role) => (
                    <li key={role} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-gold-500 flex-shrink-0" />
                      <span className="text-navy-600 text-sm">{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section>
          <h2 className="section-heading">{t('community_heading')}</h2>
          <div className="card max-w-2xl">
            <p className="text-navy-700 leading-relaxed">
              Beyond formal organizational roles, Dr. Williams actively contributes to school psychology
              community building through social media engagement, peer mentorship, and public advocacy
              on topics including racial justice, student mental health, and educator well-being.
            </p>
          </div>

          {/* Second quote */}
          <blockquote className="border-l-4 border-navy-200 pl-6 py-2 max-w-2xl mt-8">
            <p className="font-serif text-lg text-navy-700 italic leading-relaxed">
              "If you believe strongly enough, you can make a difference. Widen your vision."
            </p>
            <footer className="mt-3 text-sm text-navy-500 font-sans">Patrick Lindsay</footer>
          </blockquote>
        </section>
      </div>
    </>
  );
}
