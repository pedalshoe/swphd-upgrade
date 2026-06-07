import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'teaching' });
  return { title: t('page_title') };
}

const maristGrad = [
  { code: 'PSYH 602', title: 'Consultation in the Schools' },
  { code: 'PSYH 617', title: 'Academic Assessments' },
  { code: 'PSYH 640', title: 'Academic and Behavioral Interventions' },
];

const maristUndergrad = [
  { code: 'PSYC 208', title: 'Educational Psychology' },
  { code: 'PSYC 362', title: 'Measurement and Evaluation' },
  { code: 'PSYC 372', title: 'Psychoeducational Assessment of Educational Disabilities' },
];

const albanyGrad = [
  { code: 'ESPY 780', title: 'Cognitive Assessments' },
  { code: 'ESPY 798', title: 'Diversity: Developing a Multicultural Awareness' },
  { code: 'ESPY 895', title: 'Field Training Experience II' },
  { code: 'ESPY 786', title: 'Instructional Consultation and Intervention' },
  { code: 'ESPY 790', title: 'Practicum' },
];

const otherCourses = ['Introduction to Psychology', 'Abnormal Psychology'];

function CourseTable({ courses }: { courses: { code: string; title: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-navy-50 border-b border-navy-200">
            <th className="text-left py-3 px-4 font-sans font-semibold text-navy-700 w-36">Course</th>
            <th className="text-left py-3 px-4 font-sans font-semibold text-navy-700">Title</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(({ code, title }) => (
            <tr key={code} className="border-b border-navy-100 hover:bg-navy-50 transition-colors duration-150">
              <td className="py-3 px-4 font-mono text-gold-600 font-medium">{code}</td>
              <td className="py-3 px-4 text-navy-700">{title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TeachingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('teaching');

  return (
    <>
      <section className="page-hero">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold-400 text-xs tracking-widest uppercase font-sans font-semibold mb-3">Dr. Stacy A.S. Williams</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">{t('page_title')}</h1>
        </div>
      </section>

      <div className="page-container space-y-12">
        <p className="text-navy-700 text-lg leading-relaxed max-w-3xl">{t('intro')}</p>

        <section>
          <h2 className="section-heading">{t('philosophy_heading')}</h2>
          <div className="card max-w-3xl">
            <p className="text-navy-700 leading-relaxed">{t('philosophy_body')}</p>
            <p className="mt-4 text-navy-600 leading-relaxed">
              Movement and mindfulness practices are integrated into classroom routines, fostering
              focus, well-being, and an inclusive learning environment for all students.
            </p>
          </div>
        </section>

        <section>
          <h2 className="section-heading">{t('courses_heading')}</h2>

          <div className="space-y-10">
            <div>
              <h3 className="section-subheading">{t('marist_heading')}</h3>
              <p className="text-sm text-navy-500 mb-3 font-sans font-medium uppercase tracking-wide">{t('graduate_label')}</p>
              <CourseTable courses={maristGrad} />
              <p className="text-sm text-navy-500 mt-6 mb-3 font-sans font-medium uppercase tracking-wide">{t('undergraduate_label')}</p>
              <CourseTable courses={maristUndergrad} />
            </div>

            <div>
              <h3 className="section-subheading">{t('albany_heading')}</h3>
              <p className="text-sm text-navy-500 mb-3 font-sans font-medium uppercase tracking-wide">{t('graduate_label')}</p>
              <CourseTable courses={albanyGrad} />
            </div>

            <div>
              <h3 className="section-subheading">{t('other_heading')}</h3>
              <ul className="space-y-2">
                {otherCourses.map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-gold-500 flex-shrink-0" />
                    <span className="text-navy-700">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
