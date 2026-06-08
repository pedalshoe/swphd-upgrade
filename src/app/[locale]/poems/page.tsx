import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'poems' });
  return { title: t('page_title') };
}

// ── Real Google Drive links scraped from stacywilliamsphd.com/poems-of-the-heart.html ──

const wrestlingPoems = [
  { title: 'Faith',                        href: 'https://drive.google.com/file/d/1JZENulQZ0lVX0h7nqHzfbb95CHfCf0Rx/view?usp=sharing' },
  { title: 'Fix it Jesus',                  href: 'https://drive.google.com/file/d/1p5l6pwfBAXP2FGTW0E21QuHFTOMu3Zpw/view?usp=sharing' },
  { title: 'Food For Thought',              href: 'https://drive.google.com/file/d/1NjkMfmK239IJnwKa2NJWArANud3F4N59/view?usp=sharing' },
  { title: 'Hope is Resistance',            href: 'https://drive.google.com/file/d/1UNUK6bunewBpF9OrZKfQTFSlRK07NzYL/view?usp=sharing' },
  { title: "It's not all in your head",    href: 'https://drive.google.com/file/d/13haXebYcxg3QRom1sn7rwKmahScRwAmm/view?usp=sharing' },
  { title: 'Letting Go',                    href: 'https://drive.google.com/file/d/1cAV7j7NAWegb-bS3xfn2-Kn0-PqyE539/view?usp=sharing' },
  { title: 'Liberte, Egalite, Fraternite', href: 'https://drive.google.com/file/d/1k-s8PYaHHIWzySzpSGkzb9tlVamRPg0M/view?usp=sharing' },
  { title: 'Perfection',                    href: 'https://drive.google.com/file/d/1hFOgZGblqoak2QZq12JmDo_HYhjQJIvz/view?usp=sharing' },
  { title: 'Suffocation',                   href: 'https://drive.google.com/file/d/1hFOgZGblqoak2QZq12JmDo_HYhjQJIvz/view?usp=sharing' },
  { title: 'Tap-In',                        href: 'https://drive.google.com/file/d/1hAPPdDQweo7zAkm3i0KsS7_3SAJMkSaR/view?usp=sharing' },
  { title: 'Twilight Zone',                 href: 'https://drive.google.com/file/d/1k1KZDEK9tcqF-1P4aK3RZzugyyuKfbgc/view?usp=sharing' },
  { title: 'We Shall Overcome',             href: 'https://drive.google.com/file/d/1cW1NmLzRueJmYVIh1qXQ_76FSJrbAWav/view?usp=sharing' },
];

const lovePoems = [
  { title: 'A Full Heart',        href: 'https://drive.google.com/file/d/1O3CV3Y7DrQJrGFg-Yfe3lyu7c_3heCIJ/view?usp=sharing' },
  { title: 'Chance Encounters',   href: 'https://drive.google.com/file/d/1_YUqZRmNxwchTeDmcQbFd6eqrVRhRULL/view?usp=sharing' },
  { title: 'Destiny',             href: 'https://drive.google.com/file/d/1874jGig9CmSLRK-YvWo7uR0ol-s-yNOT/view?usp=sharing' },
  { title: 'Dream Land',          href: 'https://drive.google.com/file/d/1zj-AJEdzieH90FZELwVPgsNPjpb1wiDq/view?usp=sharing' },
  { title: 'Eternal Love',        href: 'https://drive.google.com/file/d/1PAAe5ybcxszp_w92x0l-01ocEp2E31yZ/view?usp=sharing' },
  { title: 'Experiencing You',    href: 'https://drive.google.com/file/d/1q6jknGNjbt-Bw6waKj-ACDv1bhIluJFq/view?usp=sharing' },
  { title: 'Gazing',              href: 'https://drive.google.com/file/d/1m5KhLCXbkGjlD3gcNXhbc6hXiaQMiUDK/view?usp=sharing' },
  { title: 'Happy',               href: 'https://drive.google.com/file/d/1F04WUzgSzJULKDtynoyr4H-VTnoWKAXY/view?usp=sharing' },
  { title: 'Happy MomDada Day',   href: 'https://drive.google.com/file/d/1GyfUJqRD96ZL-jkEvyVYwiUonU7l58Ew/view?usp=sharing' },
  { title: 'I Adore Love',        href: 'https://drive.google.com/file/d/1zmrxDyYkEx-B0QPo6px8tXQcKZyqLQQH/view?usp=sharing' },
  { title: "In Time's Embrace",  href: 'https://drive.google.com/file/d/1a8aKvFmZoYhDH93anvEOnFO3-2EaU3rH/view?usp=sharing' },
  { title: 'In Your Embrace',     href: 'https://drive.google.com/file/d/1gapqrODE9xVpqLkbwl2S26onYySfS5xt/view?usp=sharing' },
  { title: 'My Prayer',           href: 'https://drive.google.com/file/d/1RseSNkR6RdkbJ1bTD7fhXKYtf4pOo5w4/view?usp=sharing' },
  { title: 'Peace',               href: 'https://drive.google.com/file/d/1mvtaBOTse58TCSUzoy7B5plxazvqwVtV/view?usp=sharing' },
  { title: 'The Dance',           href: 'https://drive.google.com/file/d/1oo6zvyNftEm_1sSMWf8kaLaTCpU0aAGw/view?usp=sharing' },
  { title: 'The Memory of You',   href: 'https://drive.google.com/file/d/1lQDUupoPdwat6pLGFgewL_l6I9Ttabcs/view?usp=sharing' },
  { title: 'Through Your Eyes',   href: 'https://drive.google.com/file/d/15VP-eZ9p-fR_WuQ9DJL625sakSSIfmJq/view?usp=sharing' },
  { title: 'Trust Your Instinct', href: 'https://drive.google.com/file/d/1hpNgHyYYvOK6m9KTLz_Rv4_CcMcNCF6N/view?usp=sharing' },
  { title: 'Your Eyes',           href: 'https://drive.google.com/file/d/1nTn8ICnZLfOfWWxAcjW7Nkw0_A3nSmuc/view?usp=sharing' },
];

const celebratingPoems = [
  { title: 'A Toast To George', href: 'https://drive.google.com/file/d/1MX68qtEwjP2ulH9rBvlV3N-WBqhHbkCx/view?usp=sharing' },
  { title: 'HBD Queen',         href: 'https://drive.google.com/file/d/18b8p-zbcCD2CWlyiOBau1Uwlwhbm2Jh4/view?usp=sharing' },
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
          Poems open in Google Drive. Links are sourced directly from stacywilliamsphd.com.
        </p>
      </div>
    </>
  );
}
