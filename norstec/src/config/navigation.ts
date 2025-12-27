export type NavItem = {
  label: string;
  href: string;
  variant?: "summit";
};

export const NAV_ITEMS: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ARTICLES", href: "/articles" },
  { label: "ABOUT", href: "/about" },
  { label: "TEAM", href: "/team" },
  { label: "INITIATIVES", href: "/initiatives" },
  { label: "SUMMIT", href: "/summit", variant: "summit" },
];
