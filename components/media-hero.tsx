import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

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
    <section className="relative isolate min-h-[92svh] overflow-hidden border-b border-black/10 text-white rounded-b-3xl">
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

      <div className="relative mx-auto flex min-h-[92svh] w-full max-w-7xl items-end px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="max-w-4xl pt-30 sm:pt-36 lg:pt-40">
          <p className="text-xs font-semibold tracking-[0.34em] text-white/78 uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl leading-[0.96] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/82 sm:text-xl">
            {description}
          </p>

          {primaryCta || secondaryCta ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <Button asChild size="lg">
                  <Link href={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button
                  asChild
                  className="border-white/22 bg-white/10 text-white hover:border-white/36 hover:bg-white/16 hover:text-white"
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
