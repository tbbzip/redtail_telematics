import type { LinkItemType } from "@/components/sheard";
import { type IconSvgElement } from "@hugeicons/react";
import {
  AmbulanceIcon,
  BookOpenTextIcon,
  Briefcase01Icon,
  Calendar03Icon,
  CarTimeIcon,
  ConstructionIcon,
  ContactIcon,
  CourtHouseIcon,
  CpuIcon,
  DeliveryTruckIcon,
  DeviceAccessIcon,
  ElectricTowerIcon,
  FileChartColumnIcon,
  HierarchySquare03Icon,
  LabelIcon,
  News01Icon,
  Route03Icon,
  SchoolIcon,
  ShieldUserIcon,
  SpoonAndForkIcon,
  ToolboxIcon,
  UserGroupIcon,
  BusIcon,
} from "@hugeicons/core-free-icons";
import { HugeIcon } from "@/components/huge-icon";

export type NavMatcher = readonly string[];

type RouteEntry = {
  label: string;
  href: string;
  section: string;
};

function NavIcon({ icon }: { icon: IconSvgElement }) {
  return (
    <HugeIcon
      className="block size-[19px]"
      icon={icon}
      size={19}
      strokeWidth={2.45}
    />
  );
}

export const solutionLinks: LinkItemType[] = [
  {
    label: "Usage-Based Insurance",
    href: "/solutions/usage-based-insurance",
    icon: <NavIcon icon={ShieldUserIcon} />,
    description: "Driving data for insurer programs.",
  },
  {
    label: "Fleet Management",
    href: "/solutions/fleet-management",
    icon: <NavIcon icon={Route03Icon} />,
    description: "Visibility, alerts, and fleet insight.",
  },
  {
    label: "Reseller Program",
    href: "/solutions/reseller-program",
    icon: <NavIcon icon={HierarchySquare03Icon} />,
    description: "Partner-ready telematics delivery.",
  },
  {
    label: "White Label",
    href: "/solutions/white-label",
    icon: <NavIcon icon={LabelIcon} />,
    description: "Branded platform and app programs.",
  },
];

export const solutionFeaturedLinks: LinkItemType[] = [
  {
    label: "Devices",
    href: "/solutions/devices",
    icon: <NavIcon icon={DeviceAccessIcon} />,
    description: "Hardware built for reliable deployments.",
  },
];

export const solutionMatchers = ["/solutions"] as const;

export const industryLinks: LinkItemType[] = [
  {
    label: "Car Rental",
    href: "/industries/car-rental",
    icon: <NavIcon icon={CarTimeIcon} />,
  },
  {
    label: "Construction",
    href: "/industries/construction",
    icon: <NavIcon icon={ConstructionIcon} />,
  },
  {
    label: "Education",
    href: "/industries/education",
    icon: <NavIcon icon={SchoolIcon} />,
  },
  {
    label: "Emergency Vehicles",
    href: "/industries/emergency-vehicles",
    icon: <NavIcon icon={AmbulanceIcon} />,
  },
  {
    label: "Field Services",
    href: "/industries/field-services",
    icon: <NavIcon icon={ToolboxIcon} />,
  },
  {
    label: "Food & Beverage",
    href: "/industries/food-and-beverage",
    icon: <NavIcon icon={SpoonAndForkIcon} />,
  },
  {
    label: "Government",
    href: "/industries/government",
    icon: <NavIcon icon={CourtHouseIcon} />,
  },
  {
    label: "Logistics",
    href: "/industries/transportation-and-logistics",
    icon: <NavIcon icon={DeliveryTruckIcon} />,
  },
  {
    label: "Passenger Transit",
    href: "/industries/passenger-transit",
    icon: <NavIcon icon={BusIcon} />,
  },
  {
    label: "Utilities",
    href: "/industries/utilities",
    icon: <NavIcon icon={ElectricTowerIcon} />,
  },
];

export const industryMatchers = ["/industries"] as const;

export const resourceLinks: LinkItemType[] = [
  {
    label: "Blog",
    href: "/resources/blog",
    icon: <NavIcon icon={News01Icon} />,
  },
  {
    label: "Case Studies",
    href: "/resources/case-studies",
    icon: <NavIcon icon={FileChartColumnIcon} />,
  },
  {
    label: "Guides",
    href: "/resources/guides",
    icon: <NavIcon icon={BookOpenTextIcon} />,
  },
  {
    label: "Events",
    href: "/resources/events",
    icon: <NavIcon icon={Calendar03Icon} />,
  },
];

export const resourceMatchers = ["/resources"] as const;

export const companyLinks: LinkItemType[] = [
  {
    label: "About Us",
    href: "/about-us",
    icon: <NavIcon icon={UserGroupIcon} />,
  },
  {
    label: "Our Technology",
    href: "/our-technology",
    icon: <NavIcon icon={CpuIcon} />,
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    icon: <NavIcon icon={ContactIcon} />,
  },
  {
    label: "Careers",
    href: "/careers",
    icon: <NavIcon icon={Briefcase01Icon} />,
  },
  {
    label: "Life at Redtail",
    href: "/careers/life-at-redtail",
    icon: <NavIcon icon={BookOpenTextIcon} />,
  },
];

export const companyMatchers = [
  "/about-us",
  "/our-technology",
  "/contact-us",
  "/careers",
] as const;

export const topLevelLink = {
  label: "Platform & Apps",
  href: "/platform-and-apps",
};

export const platformMatchers = [topLevelLink.href] as const;

export const secondaryCtaLink = {
  label: "Login",
  href: "/login",
};

export const primaryCtaLink = {
  label: "Contact Us",
  href: "/contact-us",
};

export const getStartedCtaLink = {
  label: "Get Started",
  href: "/platform-and-apps",
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

export function pathnameMatches(pathname: string | null | undefined, matcher: string) {
  if (!pathname) {
    return false;
  }

  return pathname === matcher || pathname.startsWith(`${matcher}/`);
}

export function pathnameMatchesAny(
  pathname: string | null | undefined,
  matchers: NavMatcher
) {
  return matchers.some((matcher) => pathnameMatches(pathname, matcher));
}
