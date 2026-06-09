import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'photography' });
  return { title: t('page_title') };
}

// All gallery cards — real images, same hover treatment throughout
const galleryImages = [
  {
    src: '/portrait/av3a5723b.jpeg',
    alt: 'Dr. Stacy Williams - Portrait',
    caption: 'Portrait',
    theme: 'People',
    href: 'portrait',
  },
  {
    src: '/chatgpt-image-sep-6-2025-10-33-53-pm_orig.png',
    alt: 'AI-Enhanced portrait of Dr. Stacy Williams',
    caption: 'AI-Enhanced Art',
    theme: 'AI-Enhanced Art',
    href: 'ai-enhanced-art',
  },
  {
    src: '/water-and-beaches.jpg',
    alt: 'Water and beaches photography by Dr. Stacy Williams',
    caption: 'Water & Beaches',
    theme: 'Nature',
    href: null as string | null,
  },
  {
    src: '/flowers-and-nature.jpg',
    alt: 'Flowers and nature photography by Dr. Stacy Williams',
    caption: 'Flowers & Nature',
    theme: 'Nature',
    href: null as string | null,
  },
  {
    src: '/architecture.jpg',
    alt: 'Architecture photography by Dr. Stacy Williams',
    caption: 'Architecture',
    theme: 'Architecture',
    href: null as string | null,
  },
];

// No more placeholder themes needed — all five categories now have real images
const placeholderThemes: { label: string; desc: string }[] = [];

// All themes (for the "Collection Themes" reference cards at bottom)
const themes = [
  { label: 'Water & Beaches', desc: 'Coastal and aquatic landscapes capturing the serenity of water.' },
  { label: 'Flowers & Nature', desc: 'Botanical and natural world photography celebrating growth and beauty.' },
  { label: 'People', desc: 'Portraits and candid moments honoring human connection.' },
  { label: 'Architecture', desc: 'Buildings, structures, and urban environments framed with artistic intention.' },
  { label: 'AI-Enhanced Art', desc: 'Original photographs reimagined using generative AI tools (ChatGPT 4.0).' },
];

export default function PhotographyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('photography');

  return (
    <>
      <section className="page-hero">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold-400 text-xs tracking-widest uppercase font-sans font-semibold mb-3">
            Dr. Stacy A.S. Williams
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">{t('page_title')}</h1>
        </div>
      </section>

      <div className="page-container space-y-14">
        <div className="max-w-2xl">
          <p className="text-navy-700 text-lg leading-relaxed">{t('intro')}</p>
          <p className="text-sm text-navy-400 mt-3 italic">{t('ai_note')}</p>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-4">
          <a
            href="https://www.instagram.com/najiimages"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 btn-outline text-sm"
            aria-label="Follow najiimages on Instagram"
          >
            <Instagram size={16} />
            @najiimages on Instagram
          </a>
          <a
            href="https://www.facebook.com/najiimages"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 btn-outline text-sm"
            aria-label="Follow najiimages on Facebook"
          >
            <Facebook size={16} />
            najiimages on Facebook
          </a>
        </div>

        {/* Gallery grid */}
        <section>
          <h2 className="section-heading">{t('gallery_heading')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Real images with gallery links where available */}
            {galleryImages.map(({ src, alt, caption, theme, href }) => {
              const inner = (
                <>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-colors duration-300" />
                    {/* "View gallery" badge on gallery cards */}
                    {href && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-navy-800/80 text-white text-xs px-2.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View gallery <ArrowRight size={11} />
                      </div>
                    )}
                  </div>
                  <figcaption className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-navy-700 text-sm">{caption}</p>
                      <p className="text-xs text-navy-400 mt-0.5">{theme}</p>
                    </div>
                    {href && (
                      <ArrowRight size={14} className="text-gold-500 flex-shrink-0" />
                    )}
                  </figcaption>
                </>
              );

              const figureClass =
                'group overflow-hidden rounded border border-navy-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer';

              return href ? (
                <Link
                  key={src}
                  href={`/${locale}/photography/${href}`}
                  className={figureClass}
                  aria-label={`View ${caption} gallery`}
                >
                  {inner}
                </Link>
              ) : (
                <figure key={src} className={figureClass}>
                  {inner}
                </figure>
              );
            })}

          </div>

          <p className="mt-6 text-sm text-navy-400 italic">
            Visit Dr. Williams' Instagram and Facebook pages at @najiimages for the full gallery.
          </p>
        </section>

        {/* Collection themes reference */}
        <section>
          <h2 className="section-heading">Collection Themes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {themes.map(({ label, desc }) => (
              <div key={label} className="card">
                <div className="w-6 h-0.5 bg-gold-500 mb-3" />
                <h3 className="font-serif text-base font-semibold text-navy-800 mb-1">{label}</h3>
                <p className="text-xs text-navy-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
