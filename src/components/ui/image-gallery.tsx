'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface GalleryImage {
  src: string;
  alt: string;
  ratio?: number; // width/height — defaults to 4/3
  placeholder?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3;
  heading?: string;
  subheading?: string;
}

/**
 * Masonry-style image gallery with scroll-triggered fade-in per image.
 * Images are distributed across columns in order (top-to-bottom, left-to-right).
 * No Math.random() — avoids React hydration mismatches.
 */
export function ImageGallery({
  images,
  columns = 3,
  heading,
  subheading,
}: ImageGalleryProps) {
  // Distribute images across columns in order
  const cols: GalleryImage[][] = Array.from({ length: columns }, () => []);
  images.forEach((img, i) => cols[i % columns].push(img));

  const gridClass =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="relative flex w-full flex-col items-center py-10 px-4">
      {(heading || subheading) && (
        <div className="mb-10 text-center max-w-2xl mx-auto">
          {heading && (
            <h2 className="font-serif text-3xl md:text-4xl text-navy-800 mb-3">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-navy-600 text-base leading-relaxed">{subheading}</p>
          )}
        </div>
      )}

      <div className={cn('mx-auto grid w-full max-w-5xl gap-6', gridClass)}>
        {cols.map((col, colIdx) => (
          <div key={colIdx} className="grid gap-6 content-start">
            {col.map((img, imgIdx) => (
              <AnimatedImage
                key={`${colIdx}-${imgIdx}`}
                src={img.src}
                alt={img.alt}
                ratio={img.ratio ?? 4 / 3}
                placeholder={img.placeholder}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Animated image cell ──────────────────────────────────────────────────────

interface AnimatedImageProps {
  alt: string;
  src: string;
  className?: string;
  placeholder?: string;
  ratio: number;
}

function AnimatedImage({ alt, src, ratio, placeholder, className }: AnimatedImageProps) {
  // Attach ref to a plain div — Radix AspectRatio may not forward refs reliably,
  // which would cause useInView to observe null and never fire.
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: true, margin: '0px 0px 0px 0px' });
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (placeholder) setImgSrc(placeholder);
  };

  return (
    <div ref={wrapperRef} className={cn('w-full', className)}>
      <AspectRatio
        ratio={ratio}
        className="relative w-full overflow-hidden rounded-lg border border-navy-100 bg-navy-50"
      >
        {/* Skeleton shimmer — shown until loaded or errored */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-navy-100 to-navy-200 rounded-lg" />
        )}

        <img
          alt={alt}
          src={imgSrc}
          className={cn(
            'size-full rounded-lg object-cover transition-all duration-700 ease-in-out',
            isInView && !isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          )}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          loading="lazy"
        />

        {/* Error state — keeps the aspect ratio box visible */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-50 rounded-lg">
            <span className="text-xs text-navy-400 italic">Image unavailable</span>
          </div>
        )}
      </AspectRatio>
    </div>
  );
}
