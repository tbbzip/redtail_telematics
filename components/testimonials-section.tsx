import FadeContent from "@/components/FadeContent";
import TestimonialsComponent from "@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01";
import type { TestimonialItem } from "@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01";

const testimonials: TestimonialItem[] = [
  {
    content:
      "Redtail helped us scale with flexible pricing, strong support, and measurable fuel savings as our fleet expanded.",
    company: "UCI Constructions",
    name: "Vince Zamora",
    role: "Fleet Manager",
  },
  {
    content:
      "Our long partnership continues to deliver profitable UBI operations, strong support, and constant innovation from device to incident insight.",
    company: "Admiral",
    name: "Paul Taylor",
    role: "Head of Telematics",
  },
  {
    content:
      "Redtail proved early that its technology could support usage-based insurance and evolve into broader fleet and connected vehicle programs.",
    company: "BT Enterprises",
    name: "Colin Shillito",
    role: "Head of Business Development",
  },
  {
    content:
      "The hardware, device management, and data services combine into a best-in-class telematics stack with strong technical support behind it.",
    company: "MyDrive Solutions",
    name: "David Kirby",
    role: "COO",
  },
  {
    content:
      "Redtail tracking gave us the visibility to recover a stolen truck quickly. The platform works exceptionally well for stolen vehicle tracking.",
    company: "Stringer Transports",
    name: "Bobby Stringer",
    role: "Owner",
  },
  {
    content:
      "The savings were immediate. Redtail gave us precise vehicle visibility, exposed misuse fast, and was simple to install and operate.",
    company: "AlphaStream Technologies",
    name: "Bryan Weaver",
    role: "Director",
  },
  {
    content:
      "Our pay-by-mile insurance model depends on reliable real-time mileage, and Redtail has been a flexible partner in delivering that foundation.",
    company: "By Miles",
    name: "Maddy Howlett",
    role: "CEO",
  },
  {
    content:
      "After 15 years in a demanding construction environment, Redtail devices and services have delivered outstanding reliability and support.",
    company: "J.M. Thompson Company",
    name: "Marty Thompson",
    role: "Customer",
  },
  {
    content:
      "Redtail has improved the efficiency, accountability, and security of our fleet operations with exceptional support and a complete platform.",
    company: "Illinois Attorney General's Office",
    name: "Kimberly Brauer",
    role: "Fleet operations",
  },
];

export function TestimonialsSection() {
  return (
    <FadeContent duration={650} threshold={0.16}>
      <TestimonialsComponent testimonials={testimonials} />
    </FadeContent>
  );
}
