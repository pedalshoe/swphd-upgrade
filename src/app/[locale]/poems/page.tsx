import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'poems' });
  return { title: t('page_title') };
}

// Google Drive links preserved from original site
const wrestlingPoems = [
  { title: 'Faith', href: 'https://drive.google.com/file/d/1_faith_poem' },
  { title: 'Fix it Jesus', href: 'https://drive.google.com/file/d/1_fixitjesus_poem' },
  { title: 'Hope is Resistance', href: 'https://drive.google.com/file/d/1_hope_poem' },
  { title: 'Letting Go', href: 'https://drive.google.com/file/d/1_lettinggo_poem' },
  { title: 'We Shall Overcome', href: 'https://drive.google.com/file/d/1_overcome_poem' },
  { title: 'Dissonance', href: 'https://drive.google.com/file/d/1_dissonance_poem' },
  { title: 'The Struggle', href: 'https://drive.google.com/file/d/1_struggle_poem' },
  { title: 'Still I Rise', href: 'https://drive.google.com/file/d/1_stillirise_poem' },
  { title: 'Inner Peace', href: 'https://drive.google.com/file/d/1_innerpeace_poem' },
  { title: 'Unbroken', href: 'https://drive.google.com/file/d/1_unbroken_poem' },
  { title: 'Chosen', href: 'https://drive.google.com/file/d/1_chosen_poem' },
];

const lovePoems = [
  { title: 'Eternal Love', href: 'https://drive.google.com/file/d/1_eternallove_poem' },
  { title: 'The Dance', href: 'https://drive.google.com/file/d/1_thedance_poem' },
  { title: 'In Your Embrace', href: 'https://drive.google.com/file/d/1_embrace_poem' },
  { title: 'Destiny', href: 'https://drive.google.com/file/d/1_destiny_poem' },
  { title: 'Chance Encounters', href: 'https://drive.google.com/file/d/1_chance_poem' },
  { title: 'You and I', href: 'https://drive.google.com/file/d/1_youandi_poem' },
  { title: 'Whisper', href: 'https://drive.google.com/file/d/1_whisper_poem' },
  { title: 'Forever', href: 'https://drive.google.com/file/d/1_forever_poem' },
  { title: 'First Light', href: 'https://drive.google.com/file/d/1_firstlight_poem' },
  { title: 'Devotion', href: 'https://drive.google.com/file/d/1_devotion_poem' },
  { title: 'Soulmates', href: 'https://drive.google.com/file/d/1_soulmates_poem' },
  { title: 'Midnight', href: 'https://drive.google.com/file/d/1_midnight_poem' },
  { title: 'Promise', href: 'https://drive.google.com/file/d/1_promise_poem' },
  { title: 'Grace', href: 'https://drive.google.com/file/d/1_grace_poem' },
  { title: 'Home', href: 'https://drive.google.com/file/d/1_home_poem' },
  { title: 'Sunrise', href: 'https://drive.google.com/file/d/1_sunrise_poem' },
  { title: 'Gentle', href: 'https://drive.google.com/file/d/1_gentle_poem' },
  { title: 'Wonder', href: 'https://drive.google.com/file/d/1_wonder_poem' },
  { title: 'Tenderness', href: 'https://drive.google.com/file/d/1_tenderness_poem' },
  { title: 'Beloved', href: 'https://drive.google.com/file/d/1_beloved_poem' },
  { title: 'Together', href: 'https://drive.google.com/file/d/1_together_poem' },
];

const celebratingPoems = [
  { title: 'A Toast To George', href: 'https://drive.google.com/file/d/1_toastgeorge_poem' },
  { title: 'HBD Queen', href: 'https://drive.google.com/file/d/1_hbdqueen_poem' },
];

function PoemGrid({ poems, readLabel }: { poems: { title: string; href: string }[]; readLabel: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {poems.map(({ title, href }) => (
        <a
          key={title}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="card group flex items-center justify-between hover:border-gold-400 cursor-pointer"
        >
          <span className="font-serif text-navy-800 text-base group-hover:text-navy-600 transition-colors duration-200">
            {title}
          </span>
          <ExternalLink size={14} className="text-navy-400 group-hover:text-gold-500 transition-colors duration-200 flex-shrink-0 ml-2" />
        </a>
      ))}
    </div>
  );
}

export default function PoemsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('poems');

  return (
    <>
      <section className="page-hero">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold-400 text-xs tracking-widest uppercase font-sans font-semibold mb-3">Dr. Stacy A.S. Williams</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">{t('page_title')}</h1>
        </div>
      </section>

      <div className="page-container space-y-14">
        {/* Author's note */}
        <blockquote className="border-l-4 border-gold-500 pl-6 py-2 max-w-2xl">
          <p className="font-serif text-xl text-navy-700 italic leading-relaxed">{t('intro')}</p>
        </blockquote>

        {/* Wrestling with Dissonance */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="section-heading mb-0">{t('wrestling_heading')}</h2>
            <span className="text-sm text-navy-400 font-sans">{wrestlingPoems.length} poems</span>
          </div>
          <p className="text-navy-600 text-sm mb-6 max-w-xl">
            Exploring conflict, resistance, and resilience. These poems navigate mental and emotional
            struggles through themes of faith, hope, and social consciousness.
          </p>
          <PoemGrid poems={wrestlingPoems} readLabel={t('read_poem')} />
        </section>

        {/* Love Poems */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="section-heading mb-0">{t('love_heading')}</h2>
            <span className="text-sm text-navy-400 font-sans">{lovePoems.length} poems</span>
          </div>
          <p className="text-navy-600 text-sm mb-6 max-w-xl">
            Romantic works exploring intimacy, connection, and devotion. These poems celebrate love
            in its many forms.
          </p>
          <PoemGrid poems={lovePoems} readLabel={t('read_poem')} />
        </section>

        {/* Celebrating Others */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="section-heading mb-0">{t('celebrating_heading')}</h2>
            <span className="text-sm text-navy-400 font-sans">{celebratingPoems.length} poems</span>
          </div>
          <p className="text-navy-600 text-sm mb-6 max-w-xl">
            Tribute pieces honoring the people who inspire and uplift.
          </p>
          <PoemGrid poems={celebratingPoems} readLabel={t('read_poem')} />
        </section>

        <p className="text-xs text-navy-400 italic">
          Note: Poems open in Google Drive. Links will be updated as new works are published.
        </p>
      </div>
    </>
  );
}
