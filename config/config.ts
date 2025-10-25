export interface NavItem {
  label: string;
  href: string;
}
export const CONFIG = {
  NAME: "Dhruvish Lathiya",
  title:"i am backend dev",
  description: "hello i am dhruvish",
  SOCIAL_MEDIA: {
    github: "https://github.com/thedhruvish",
    linkedin: "https://linkedin.com/in/dhruvishlathiya",
    x: "https://x.com/dhruvishlathiya",
    cal: "https://cal.com/dhruvishlathiya/30min?overlayCalendar=true",
    email: "thedhruvish@gmail.com",
  },
  navItems: [
    {
      label: "Blogs",
      href: "/normal/blog",
    },
    {
      label: "Projects",
      href: "/normal/projects",
    },
  ] as NavItem[],
};
