import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ImageGallery, type GalleryImage } from '@/components/ui/image-gallery';
import galleryData from '../../../../../public/ai-enhanced-art/gallery.json';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return {
    title: 'AI-Enhanced Art | Photography',
    description:
      'Original photographs reimagined using generative AI tools by Dr. Stacy A.S. Williams.',
  };
}

// Map JSON manifest to GalleryImage props (ratio = width / height)
const images: GalleryImage[] = galleryData.map((item) => ({
  src:   item.src,
  alt:   item.alt,
  ratio: item.width / item.height,
}));

export default function AIEnhancedArtPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <div className="max-w-5xl mx-auto">
          <Link
            href={`/${locale}/photography`}
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-xs tracking-widest uppercase font-sans font-semibold mb-4 transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            Photography
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            AI-Enhanced Art
          </h1>
          <p className="mt-4 text-navy-200 text-base max-w-xl leading-relaxed">
            Original photographs reimagined using generative AI tools. Each piece begins
            with Dr. Williams' own photography, then is transformed through creative AI
            collaboration using ChatGPT 4.0.
          </p>
          <p className="mt-2 text-navy-400 text-sm">
            {images.length} works in this collection
          </p>
        </div>
      </section>

      {/* Gallery — driven entirely by gallery.json */}
      <div className="bg-cream min-h-screen">
        <ImageGallery
          images={images}
          columns={3}
        />
      </div>
    </>
  );
}
