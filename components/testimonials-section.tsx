import type { ComponentProps } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Redtail helped us scale with flexible pricing, strong support, and measurable fuel savings as our fleet expanded.",
    name: "Vince Zamora",
    title: "Fleet Manager at UCI Constructions",
  },
  {
    quote:
      "Our long partnership continues to deliver profitable UBI operations, strong support, and constant innovation from device to incident insight.",
    name: "Paul Taylor",
    title: "Head of Telematics at Admiral",
  },
  {
    quote:
      "Redtail proved early that its technology could support usage-based insurance and evolve into broader fleet and connected vehicle programs.",
    name: "Colin Shillito",
    title: "Head of Business Development at BT Enterprises",
  },
  {
    quote:
      "The hardware, device management, and data services combine into a best-in-class telematics stack with strong technical support behind it.",
    name: "David Kirby",
    title: "COO at MyDrive Solutions",
  },
  {
    quote:
      "Redtail tracking gave us the visibility to recover a stolen truck quickly. The platform works exceptionally well for stolen vehicle tracking.",
    name: "Bobby Stringer",
    title: "Owner at Stringer Transports",
  },
  {
    quote:
      "The savings were immediate. Redtail gave us precise vehicle visibility, exposed misuse fast, and was simple to install and operate.",
    name: "Bryan Weaver",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Our pay-by-mile insurance model depends on reliable real-time mileage, and Redtail has been a flexible partner in delivering that foundation.",
    name: "Maddy Howlett",
    title: "CEO of By Miles",
  },
  {
    quote:
      "After 15 years in a demanding construction environment, Redtail devices and services have delivered outstanding reliability and support.",
    name: "Marty Thompson",
    title: "J.M. Thompson Company",
  },
  {
    quote:
      "Redtail has improved the efficiency, accountability, and security of our fleet operations with exceptional support and a complete platform.",
    name: "Kimberly Brauer",
    title: "Illinois Attorney General's Office",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialsSection() {
  return (
    <section className="border-b border-black/10 bg-[#fcfbf9]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.34em] text-rb-red uppercase">
            Customer voices
          </p>
          <h2 className="mt-4 text-4xl leading-tight font-bold tracking-tight text-balance text-rb-black sm:text-5xl">
            Trusted across fleets, insurers, and partner programs.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/74 sm:text-lg">
            Redtail supports fleet operators, insurers, government teams, and
            connected vehicle programs that need dependable telematics and
            operational clarity.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialsCard
              className={cn(
                index === 0 || index === 4
                  ? "border-rb-red/20 bg-white"
                  : "bg-white"
              )}
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsCard({
  testimonial,
  className,
  ...props
}: ComponentProps<"figure"> & {
  testimonial: Testimonial;
}) {
  return (
    <figure
      className={cn(
        "flex h-full min-w-0 flex-col rounded-xl border border-black/10 p-6 shadow-sm shadow-black/5 sm:p-7",
        className
      )}
      {...props}
    >
      <div className="mb-5 h-1.5 w-10 rounded-full bg-rb-red/85" />
      <blockquote className="flex-1 text-base leading-7 text-foreground/82">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-black/8 pt-5">
        <Avatar className="size-10 bg-rb-peach text-rb-red after:border-black/8">
          <AvatarFallback className="bg-rb-peach font-semibold text-rb-red">
            {getInitials(testimonial.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <cite className="block font-medium not-italic tracking-tight text-rb-black">
            {testimonial.name}
          </cite>
          <span className="block text-sm leading-6 text-foreground/68">
            {testimonial.title}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
