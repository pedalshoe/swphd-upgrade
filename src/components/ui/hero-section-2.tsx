'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, type Variants, type Transition } from 'framer-motion';
import { Globe, Phone, MapPin } from 'lucide-react';

// ─── Contact info icons ───────────────────────────────────────────────────────
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: <Globe className="h-4 w-4 text-primary" />,
    phone:   <Phone className="h-4 w-4 text-primary" />,
    address: <MapPin className="h-4 w-4 text-primary" />,
  };
  return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// ─── Prop types ───────────────────────────────────────────────────────────────
interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  logo?: { url: string; alt: string; text?: string };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: { text: string; href: string };
  backgroundImage: string;
  contactInfo: { website: string; phone: string; address: string };
}

// ─── Component ────────────────────────────────────────────────────────────────
const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, contactInfo, ...props }, ref) => {

    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 } as Transition,
      },
    };

    const itemVariants: Variants = {
      hidden:  { y: 20, opacity: 0 },
      visible: {
        y: 0, opacity: 1,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } as Transition,
      },
    };

    return (
      <div ref={ref} className={cn('relative w-full', className)} {...props}>
        <motion.section
          // Always flex-row — image sits to the right of the text at every breakpoint.
          // On mobile the content panel is narrower and the image fills the remaining width.
          className="flex w-full flex-row overflow-hidden bg-background text-foreground"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* ── Content panel ─────────────────────────────────────────────── */}
          <div className="flex w-[58%] flex-col justify-between p-5 sm:p-8 md:w-1/2 md:p-10 lg:w-3/5 lg:p-12">
            <div>
              {/* Slogan — hidden on smallest phones, shown from sm up */}
              <motion.header className="mb-4 md:mb-10" variants={itemVariants}>
                {!logo && slogan && (
                  <p className="hidden sm:block text-xs tracking-widest uppercase text-muted-foreground font-sans font-semibold">
                    {slogan}
                  </p>
                )}
              </motion.header>

              <motion.main variants={containerVariants}>
                {/* Display headline — endowed-chair scale, extrabold weight, tight leading */}
                <motion.h1
                  className="font-serif font-extrabold leading-[1.1] tracking-tight text-foreground
                             text-[2rem] sm:text-[2.6rem] md:text-[3.8rem] lg:text-[5rem] xl:text-[6rem]"
                  variants={itemVariants}
                >
                  {title}
                </motion.h1>

                <motion.div
                  className="my-4 h-[3px] w-14 bg-primary md:my-6 md:w-24"
                  variants={itemVariants}
                />

                <motion.p
                  className="mb-6 md:mb-8 max-w-md text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed"
                  variants={itemVariants}
                >
                  {subtitle}
                </motion.p>

                <motion.a
                  href={callToAction.href}
                  className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-primary transition-colors hover:text-primary/80 border-b border-primary pb-1"
                  variants={itemVariants}
                >
                  {callToAction.text} &rarr;
                </motion.a>
              </motion.main>
            </div>

            {/* Contact footer — only shown on lg+ where there is room */}
            <motion.footer className="hidden lg:block mt-8 w-full" variants={itemVariants}>
              <div className="flex flex-col gap-3 text-xs text-muted-foreground lg:flex-row lg:gap-6">
                <div className="flex items-center gap-2">
                  <InfoIcon type="website" /><span>{contactInfo.website}</span>
                </div>
                <div className="flex items-center gap-2">
                  <InfoIcon type="phone" /><span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <InfoIcon type="address" /><span>{contactInfo.address}</span>
                </div>
              </div>
            </motion.footer>
          </div>

          {/* ── Image panel — always on the right ─────────────────────────── */}
          <motion.div
            className={cn(
              'relative w-[42%] bg-cover bg-top bg-no-repeat',
              'md:w-1/2 md:bg-center lg:w-2/5',
              'min-h-[260px] md:min-h-[400px]',
            )}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
            transition={{ duration: 1.2, ease: 'circOut' }}
          >
            {/* Contact info overlay — mobile only, sits over the lower portion of the image */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 lg:hidden px-3 py-4"
              style={{ background: 'linear-gradient(to top, rgba(10,21,36,0.82) 0%, rgba(10,21,36,0.3) 70%, transparent 100%)' }}
              variants={itemVariants}
            >
              <p className="text-white text-[10px] leading-relaxed font-sans">
                {contactInfo.website}
              </p>
              <p className="text-white text-[10px] leading-relaxed font-sans">
                {contactInfo.phone}
              </p>
              <p className="text-white text-[10px] leading-relaxed font-sans">
                {contactInfo.address}
              </p>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    );
  }
);

HeroSection.displayName = 'HeroSection';

export { HeroSection };
