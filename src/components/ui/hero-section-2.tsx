'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, type Variants, type Transition } from 'framer-motion';
import { Globe, Phone, MapPin } from 'lucide-react';

// ─── Contact info icons using lucide-react ───────────────────────────────────
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: <Globe className="h-5 w-5 text-primary" />,
    phone:   <Phone className="h-5 w-5 text-primary" />,
    address: <MapPin className="h-5 w-5 text-primary" />,
  };
  return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// ─── Prop types ───────────────────────────────────────────────────────────────
interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      logo,
      slogan,
      title,
      subtitle,
      callToAction,
      backgroundImage,
      contactInfo,
      ...props
    },
    ref
  ) => {
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 } as Transition,
      },
    };

    const itemVariants: Variants = {
      hidden:   { y: 20, opacity: 0 },
      visible:  {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } as Transition,
      },
    };

    return (
      <div ref={ref} className={cn('relative w-full', className)} {...props}>
      <motion.section
        className="flex w-full flex-col overflow-hidden bg-background text-foreground md:flex-row"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* ── Left: Content ─────────────────────────────────────────────── */}
        <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-10 lg:w-3/5 lg:p-12">
          {/* Top: logo + main copy */}
          <div>
            <motion.header className="mb-12" variants={itemVariants}>
              {logo && (
                <div className="flex items-center">
                  <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />
                  <div>
                    {logo.text && (
                      <p className="text-lg font-bold text-foreground">{logo.text}</p>
                    )}
                    {slogan && (
                      <p className="text-xs tracking-wider text-muted-foreground">{slogan}</p>
                    )}
                  </div>
                </div>
              )}
              {!logo && slogan && (
                <p className="text-xs tracking-widest uppercase text-muted-foreground font-sans font-semibold">
                  {slogan}
                </p>
              )}
            </motion.header>

            <motion.main variants={containerVariants}>
              <motion.h1
                className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl font-serif"
                variants={itemVariants}
              >
                {title}
              </motion.h1>

              <motion.div
                className="my-6 h-1 w-20 bg-primary"
                variants={itemVariants}
              />

              <motion.p
                className="mb-8 max-w-md text-base text-muted-foreground leading-relaxed"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>

              <motion.a
                href={callToAction.href}
                className="inline-block text-sm font-bold tracking-widest uppercase text-primary transition-colors hover:text-primary/80 border-b border-primary pb-1"
                variants={itemVariants}
              >
                {callToAction.text} &rarr;
              </motion.a>
            </motion.main>
          </div>

          {/* Bottom: footer contact info */}
          <motion.footer className="mt-8 w-full" variants={itemVariants}>
            <div className="flex flex-col gap-3 text-xs text-muted-foreground lg:flex-row lg:gap-6">
              <div className="flex items-center gap-2">
                <InfoIcon type="website" />
                <span>{contactInfo.website}</span>
              </div>
              <div className="flex items-center gap-2">
                <InfoIcon type="phone" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <InfoIcon type="address" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </motion.footer>
        </div>

        {/* ── Right: Animated image with clip-path reveal ────────────────── */}
        <motion.div
          className="w-full min-h-[400px] bg-cover bg-center bg-no-repeat md:w-1/2 md:min-h-full lg:w-2/5"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.2, ease: 'circOut' }}
        />
      </motion.section>
      </div>
    );
  }
);

HeroSection.displayName = 'HeroSection';

export { HeroSection };
