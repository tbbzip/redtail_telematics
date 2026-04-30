import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";

type HeroCta = {
  label: string;
  href: string;
};

type MediaHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  priority?: boolean;
};

export function MediaHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  primaryCta,
  secondaryCta,
  priority = false,
}: MediaHeroProps) {
  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden rounded-b-3xl border-b border-black/10 text-white sm:min-h-[92svh]">
      <Image
        alt={imageAlt}
        className="object-cover object-center"
        fill
        priority={priority}
        sizes="100vw"
        src={imageSrc}
      />
      <div className="absolute inset-0 bg-black/48" />
      <div className="absolute inset-0 bg-linear-to-r from-black/78 via-black/58 to-black/34" />
      <div className="absolute inset-0 bg-linear-to-t from-black/34 via-transparent to-black/20" />

      <div className="relative mx-auto flex min-h-[88svh] w-full max-w-7xl items-end px-4 pb-10 sm:min-h-[92svh] sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="max-w-4xl pt-28 sm:pt-36 lg:pt-40">
          <p className="text-xs font-semibold tracking-[0.34em] text-white/78 uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-[2.55rem] leading-[0.98] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-full text-base leading-7 text-white/82 sm:max-w-3xl sm:text-xl sm:leading-8">
            {description}
          </p>

          {primaryCta || secondaryCta ? (
            <div className="mt-7 flex max-w-full flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row">
              {primaryCta ? (
                <Button asChild className="w-full sm:w-auto" size="lg">
                  <Link href={primaryCta.href}>
                    {primaryCta.label}
                    <HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
                  </Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button
                  asChild
                  className="w-full border-white/22 bg-white/10 text-white hover:border-white/36 hover:bg-white/16 hover:text-white sm:w-auto"
                  size="lg"
                  variant="outline"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
