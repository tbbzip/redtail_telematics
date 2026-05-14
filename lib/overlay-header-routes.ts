export function usesOverlayHeader(pathname: string | null | undefined) {
  if (!pathname) {
    return false;
  }

  return (
    pathname === "/" ||
    pathname.startsWith("/industries/") ||
    pathname === "/solutions/usage-based-insurance" ||
    pathname === "/solutions/fleet-management" ||
    pathname === "/solutions/reseller-program" ||
    pathname === "/solutions/white-label" ||
    pathname === "/solutions/devices" ||
    pathname === "/platform-and-apps" ||
    pathname === "/about-us" ||
    pathname === "/our-technology" ||
    pathname === "/careers"
  );
}
