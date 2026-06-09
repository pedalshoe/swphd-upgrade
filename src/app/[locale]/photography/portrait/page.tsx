import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ImageGallery, type GalleryImage } from '@/components/ui/image-gallery';
import galleryData from '../../../../../public/portrait/gallery.json';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return {
    title: 'Portrait | Photography',
    description:
      'Portrait photography by Dr. Stacy A.S. Williams, featuring the full portrait slideshow collection.',
  };
}

const images: GalleryImage[] = galleryData.map((item) => ({
  src: item.src,
  alt: item.alt,
  ratio: item.width / item.height,
}));

export default function PortraitPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
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
            Portrait
          </h1>
          <p className="mt-4 text-navy-200 text-base max-w-xl leading-relaxed">
            A portrait collection by Dr. Stacy A.S. Williams capturing presence,
            expression, and human connection across the original slideshow gallery.
          </p>
          <p className="mt-2 text-navy-400 text-sm">
            {images.length} works in this collection
          </p>
        </div>
      </section>

      <div className="bg-cream min-h-screen">
        <ImageGallery images={images} columns={3} />
      </div>
    </>
  );
}
