export function usesOverlayHeader(pathname: string | null | undefined) {
  if (!pathname) {
    return false;
  }

  return pathname === "/" || pathname.startsWith("/industries/");
}
