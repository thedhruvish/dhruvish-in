export interface NavItem {
  label: string;
  href: string;
}
export const CONFIG = {
  NAME: "Dhruvish Lathiya",
  SOCIAL_MEDIA: {
    github: "https://github.com/thedhruvish",
    linkedin: "https://linkedin.com/in/dhruvishlathiya",
    x: "https://x.com/dhruvishlathiya",
    cal: "https://cal.com/dhruvishlathiya/30min?overlayCalendar=true",
  },
  navItems: [
    {
      label: "Blogs",
      href: "/blog",
    },
    {
      label: "Projects",
      href: "/projects",
    },
  ] as NavItem[],
};
