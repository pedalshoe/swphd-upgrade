import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'consulting' });
  return { title: t('page_title') };
}

const services = [
  {
    title: 'Social Justice Initiatives in Higher Education',
    desc: 'Developing equity frameworks and inclusive practices for colleges and universities.',
  },
  {
    title: 'Social Justice and the School Psychologist',
    desc: 'Building school psychologists\' capacity to advocate for equitable outcomes for all students.',
  },
  {
    title: 'Creating Inclusive Classrooms',
    desc: 'Training educators to design learning environments that honor student diversity and promote belonging.',
  },
  {
    title: 'Academic and Behavioral Interventions',
    desc: 'Evidence-based strategies for supporting students with academic and behavioral challenges.',
  },
  {
    title: 'Implementing Response to Intervention (RTI)',
    desc: 'Guiding schools and districts through RTI framework adoption and data collection systems.',
  },
  {
    title: 'Data-Based Decision Making for Teachers',
    desc: 'Building educator capacity to use student data meaningfully to inform instructional decisions.',
  },
  {
    title: 'Systems Level Consultation',
    desc: 'Working with school and district leadership to design sustainable, systemic improvement processes.',
  },
  {
    title: 'University and School Partnerships',
    desc: 'Establishing collaborative models that bridge higher education and K-12 school systems.',
  },
];

const clients = [
  { name: 'Queensbury School District', year: '2021', location: 'NY' },
  { name: 'Guilderland School District', year: '2019', location: 'NY' },
  { name: 'Guilderland Middle School', year: '2019', location: 'NY' },
  { name: 'Nova Southeastern University', year: '2018', location: 'FL' },
  { name: 'Albany Public School System', year: '2011-2014', location: 'NY' },
  { name: 'Bureau of Education and Research', year: '2011', location: 'Multiple states' },
];

export default function ConsultingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('consulting');

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

        {/* Services */}
        <section>
          <h2 className="section-heading">{t('services_heading')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ title, desc }) => (
              <div key={title} className="card group cursor-default">
                <div className="w-8 h-1 bg-gold-500 mb-4 rounded" />
                <h3 className="font-serif text-lg text-navy-800 mb-2 font-semibold">{title}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Clients */}
        <section>
          <h2 className="section-heading">{t('clients_heading')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-navy-50 border-b border-navy-200">
                  <th className="text-left py-3 px-4 font-sans font-semibold text-navy-700">Organization</th>
                  <th className="text-left py-3 px-4 font-sans font-semibold text-navy-700">Years</th>
                  <th className="text-left py-3 px-4 font-sans font-semibold text-navy-700">Location</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(({ name, year, location }) => (
                  <tr key={name} className="border-b border-navy-100 hover:bg-navy-50 transition-colors duration-150">
                    <td className="py-3 px-4 text-navy-700 font-medium">{name}</td>
                    <td className="py-3 px-4 text-navy-600">{year}</td>
                    <td className="py-3 px-4 text-navy-500">{location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Approach */}
        <section>
          <h2 className="section-heading">{t('approach_heading')}</h2>
          <div className="card max-w-3xl">
            <p className="text-navy-700 leading-relaxed mb-4">
              Dr. Williams brings a systems-level, ecological approach to consulting that begins with
              a thorough assessment of organizational needs, context, and capacity. Trainings progress
              from foundational concepts through applied implementation, ensuring participants develop
              both understanding and practical skills.
            </p>
            <p className="text-navy-600 leading-relaxed">
              She combines her roles as researcher, educator, and practitioner to deliver professional
              development that is grounded in evidence, culturally responsive, and immediately
              applicable in school and university settings.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-navy-50 rounded p-8 text-center border border-navy-100">
          <h3 className="font-serif text-2xl text-navy-800 mb-3">Interested in Working Together?</h3>
          <p className="text-navy-600 mb-6 max-w-xl mx-auto">
            Dr. Williams is available for keynote presentations, professional development workshops,
            and ongoing consulting engagements.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Dr. Williams <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
