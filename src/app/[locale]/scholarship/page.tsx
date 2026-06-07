import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'scholarship' });
  return { title: t('page_title') };
}

const articles = [
  { year: 2021, citation: 'Williams, S.A.S. et al. Social justice and anti-racism in school psychology training. Psychology in the Schools.' },
  { year: 2020, citation: 'Williams, S.A.S. Race pedagogy in higher education: Lessons for school psychology. School Psychology Review.' },
  { year: 2019, citation: 'Williams, S.A.S. Instructional consultation and literacy development in urban schools. Journal of Educational and Psychological Consultation.' },
  { year: 2018, citation: 'Williams, S.A.S. Ecological consultation in school diversity initiatives. Consulting Psychology Journal.' },
  { year: 2017, citation: 'Williams, S.A.S. Formative assessment and teacher development: Implications for school psychologists. School Psychology Forum.' },
  { year: 2015, citation: 'Williams, S.A.S. & colleagues. Reading comprehension and cultural considerations in diverse classrooms. Reading and Writing Quarterly.' },
  { year: 2012, citation: 'Williams, S.A.S. Data-based decision making in multi-tiered systems. Assessment for Effective Intervention.' },
  { year: 2010, citation: 'Williams, S.A.S. University-school partnership models for MTSS implementation. School Psychology Quarterly.' },
  { year: 2008, citation: 'Williams, S.A.S. Response to Intervention and the role of school psychologists. NASP Communique.' },
  { year: 2005, citation: 'Williams, S.A.S. Cognitive assessment practices and equity. Journal of Psychoeducational Assessment.' },
];

const chapters = [
  { year: 2023, citation: 'Williams, S.A.S. Social justice advocacy and supervision in school psychology. In Handbook of School Psychology Practice (4th ed.).' },
  { year: 2021, citation: 'Williams, S.A.S. Implicit bias and equity work in educational settings. In Diversity in Schools.' },
  { year: 2019, citation: 'Williams, S.A.S. Racism and anti-Semitism in higher education: Implications for training programs.' },
  { year: 2017, citation: 'Williams, S.A.S. Institutional barriers, poverty, and student outcomes. In Systemic Change in Education.' },
  { year: 2005, citation: 'Williams, S.A.S. MTSS frameworks and school psychologist roles. In Best Practices in School Psychology.' },
  { year: 1999, citation: 'Williams, S.A.S. Cultural competence in early intervention. In Foundations of School Psychology.' },
];

const positionStatements = [
  { year: 2021, title: 'Anti-Racism Training in School Psychology Programs', org: 'TSP' },
  { year: 2021, title: 'Opposition to Restrictions on Diversity Training in Schools', org: 'NYASP' },
  { year: 2021, title: 'Standing Against Anti-AAPI Racism', org: 'NASP' },
  { year: 2020, title: 'School Psychology and Racial Justice', org: 'TSP' },
];

export default function ScholarshipPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('scholarship');

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

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '21+', label: 'Journal Articles' },
            { num: '6', label: 'Book Chapters' },
            { num: '8', label: 'Newsletter Articles' },
            { num: '100+', label: 'Presentations' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center border border-navy-100 rounded p-6 bg-white">
              <p className="font-serif text-4xl font-bold text-gold-500 mb-1">{num}</p>
              <p className="text-sm text-navy-600 font-sans">{label}</p>
            </div>
          ))}
        </div>

        {/* Journal Articles */}
        <section>
          <h2 className="section-heading">{t('articles_heading')}</h2>
          <ul className="space-y-4">
            {articles.map(({ year, citation }) => (
              <li key={citation} className="flex gap-4 items-start card">
                <span className="text-gold-500 font-serif font-bold text-lg flex-shrink-0">{year}</span>
                <p className="text-navy-700 text-sm leading-relaxed">{citation}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Book Chapters */}
        <section>
          <h2 className="section-heading">{t('chapters_heading')}</h2>
          <ul className="space-y-4">
            {chapters.map(({ year, citation }) => (
              <li key={citation} className="flex gap-4 items-start card">
                <span className="text-gold-500 font-serif font-bold text-lg flex-shrink-0">{year}</span>
                <p className="text-navy-700 text-sm leading-relaxed">{citation}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Presentations */}
        <section>
          <h2 className="section-heading">{t('presentations_heading')}</h2>
          <div className="card max-w-3xl">
            <p className="text-navy-700 leading-relaxed mb-4">
              Dr. Williams has delivered over 100 presentations at national, international, state,
              and local venues from 2001 through 2022. Key venues include:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'National Association of School Psychologists (NASP)',
                'Trainers of School Psychologists (TSP)',
                'New York Association of School Psychologists (NYASP)',
                'International conferences (Poland, St. Maarten, Jamaica)',
                'University guest lectures and workshops',
                'Marist University community presentations',
              ].map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                  <span className="text-sm text-navy-600">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Position Statements */}
        <section>
          <h2 className="section-heading">{t('positions_heading')}</h2>
          <div className="space-y-4">
            {positionStatements.map(({ year, title, org }) => (
              <div key={title} className="card flex gap-4 items-start">
                <span className="text-gold-500 font-serif font-bold text-lg flex-shrink-0">{year}</span>
                <div>
                  <p className="text-navy-800 font-medium">{title}</p>
                  <p className="text-sm text-navy-500 mt-1">Co-authored for {org}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
