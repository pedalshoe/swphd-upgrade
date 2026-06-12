import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('page_title') };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('contact');

  return (
    <>
      <section className="page-hero">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold-400 text-xs tracking-widest uppercase font-sans font-semibold mb-3">Dr. Stacy A.S. Williams</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">{t('page_title')}</h1>
        </div>
      </section>

      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <p className="text-navy-700 text-lg leading-relaxed mb-8">{t('intro')}</p>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="card">
              <h2 className="font-serif text-xl text-navy-800 mb-5">{t('office_heading')}</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-navy-600 leading-relaxed">{t('office_address')}</p>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-gold-500 flex-shrink-0" />
                  <a href="tel:+18455753000" className="text-sm text-navy-600 hover:text-navy-800 transition-colors duration-200">
                    {t('office_phone')}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-gold-500 flex-shrink-0" />
                  <a
                    href={`mailto:${t('office_email')}`}
                    className="text-sm text-navy-600 hover:text-navy-800 transition-colors duration-200 break-all"
                  >
                    {t('office_email')}
                  </a>
                </li>
              </ul>
            </div>

            <div className="card">
              <h2 className="font-serif text-xl text-navy-800 mb-5">Social Media</h2>
              <ul className="space-y-3">
                <li>
                  <a href="https://x.com/Scheeatow" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-navy-600 hover:text-navy-800 transition-colors duration-200 cursor-pointer">
                    <Twitter size={16} className="text-gold-500" />
                    X (@Scheeatow)
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/najiimages" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-navy-600 hover:text-navy-800 transition-colors duration-200 cursor-pointer">
                    <Instagram size={16} className="text-gold-500" />
                    Instagram (@najiimages)
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/stacy-williams-9380982/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-navy-600 hover:text-navy-800 transition-colors duration-200 cursor-pointer">
                    <Linkedin size={16} className="text-gold-500" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-navy-50 rounded p-4 border border-navy-100 text-sm text-navy-500 leading-relaxed">
              <p className="font-medium text-navy-700 mb-1">Response Time</p>
              <p>Dr. Williams typically responds within 3 to 5 business days. For urgent matters, please call the office directly.</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
