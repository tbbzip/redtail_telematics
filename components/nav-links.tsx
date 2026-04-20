import type { LinkItemType } from "@/components/sheard";
import {
  BoltIcon,
  BookOpenIcon,
  BriefcaseIcon,
  Building2Icon,
  BusIcon,
  CalendarIcon,
  CarIcon,
  CpuIcon,
  FileTextIcon,
  GraduationCapIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  NewspaperIcon,
  PackageIcon,
  ShieldIcon,
  TruckIcon,
  UsersIcon,
  UtensilsCrossedIcon,
  VanIcon,
  WrenchIcon,
} from "lucide-react";

type RouteEntry = {
  label: string;
  href: string;
  section: string;
};

export const solutionLinks: LinkItemType[] = [
  {
    label: "Usage Based Insurance",
    href: "/solutions/usage-based-insurance",
    icon: <ShieldIcon />,
  },
  {
    label: "Fleet Management",
    href: "/solutions/fleet-management",
    icon: <LayoutDashboardIcon />,
  },
  {
    label: "Reseller Program",
    href: "/solutions/reseller-program",
    icon: <UsersIcon />,
  },
  {
    label: "White Label",
    href: "/solutions/white-label",
    icon: <FileTextIcon />,
  },
];

export const solutionFeaturedLinks: LinkItemType[] = [
  {
    label: "Platform & Apps",
    href: "/platform-and-apps",
    icon: <LayoutDashboardIcon />,
  },
  {
    label: "Devices",
    href: "/solutions/devices",
    icon: <PackageIcon />,
  },
];

export const industryLinks: LinkItemType[] = [
  {
    label: "Auto OEM",
    href: "/industries/auto-oem",
    icon: <CarIcon />,
  },
  {
    label: "Car Rental",
    href: "/industries/car-rental",
    icon: <VanIcon />,
  },
  {
    label: "Construction",
    href: "/industries/construction",
    icon: <Building2Icon />,
  },
  {
    label: "Education",
    href: "/industries/education",
    icon: <GraduationCapIcon />,
  },
  {
    label: "Emergency Vehicles",
    href: "/industries/emergency-vehicles",
    icon: <ShieldIcon />,
  },
  {
    label: "Field Services",
    href: "/industries/field-services",
    icon: <WrenchIcon />,
  },
  {
    label: "Food & Beverage",
    href: "/industries/food-and-beverage",
    icon: <UtensilsCrossedIcon />,
  },
  {
    label: "Government",
    href: "/industries/government",
    icon: <LandmarkIcon />,
  },
  {
    label: "Logistics",
    href: "/industries/transportation-and-logistics",
    icon: <TruckIcon />,
  },
  {
    label: "Passenger Transit",
    href: "/industries/passenger-transit",
    icon: <BusIcon />,
  },
  {
    label: "Utilities",
    href: "/industries/utilities",
    icon: <BoltIcon />,
  },
];

export const resourceLinks: LinkItemType[] = [
  {
    label: "Blog",
    href: "/resources/blog",
    icon: <NewspaperIcon />,
  },
  {
    label: "Case Studies",
    href: "/resources/case-studies",
    icon: <FileTextIcon />,
  },
  {
    label: "Guides",
    href: "/resources/guides",
    icon: <BookOpenIcon />,
  },
  {
    label: "Events",
    href: "/resources/events",
    icon: <CalendarIcon />,
  },
];

export const companyLinks: LinkItemType[] = [
  {
    label: "About Us",
    href: "/about-us",
    icon: <UsersIcon />,
  },
  {
    label: "Our Technology",
    href: "/our-technology",
    icon: <CpuIcon />,
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    icon: <FileTextIcon />,
  },
  {
    label: "Redtail Careers",
    href: "/careers",
    icon: <BriefcaseIcon />,
  },
  {
    label: "Life at Redtail",
    href: "/careers/life-at-redtail",
    icon: <BookOpenIcon />,
  },
];

export const topLevelLink = {
  label: "Platform & Apps",
  href: "/platform-and-apps",
};

export const secondaryCtaLink = {
  label: "Contact Us",
  href: "/contact-us",
};

export const primaryCtaLink = {
  label: "Login",
  href: "/login",
};

const routeEntries: RouteEntry[] = [
  ...solutionLinks.map(({ label, href }) => ({
    label,
    href,
    section: "Solutions",
  })),
  ...solutionFeaturedLinks.map(({ label, href }) => ({
    label,
    href,
    section: "Solutions",
  })),
  ...industryLinks.map(({ label, href }) => ({
    label,
    href,
    section: "Industries",
  })),
  ...resourceLinks.map(({ label, href }) => ({
    label,
    href,
    section: "Resources",
  })),
  ...companyLinks.map(({ label, href }) => ({
    label,
    href,
    section: "Company",
  })),
  {
    label: topLevelLink.label,
    href: topLevelLink.href,
    section: "Platform",
  },
];

export const allRouteEntries = Array.from(
  new Map(routeEntries.map((entry) => [entry.href, entry])).values()
);

export function getRouteEntry(href: string) {
  return allRouteEntries.find((entry) => entry.href === href);
}

export function getRouteEntriesByPrefix(prefix: string) {
  return allRouteEntries.filter((entry) => entry.href.startsWith(prefix));
}
