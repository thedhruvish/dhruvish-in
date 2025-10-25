import { CONFIG } from "@/config/config";
import { Link } from "next-view-transitions";

import Container from "./Container";
import { ThemeToggleButton } from "./ThemeSwitch";

export default function Navbar() {
  return (
    <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-baseline gap-4">
          <Link href="/">
            <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              dhruvish
            </h1>
          </Link>
          <div className="flex items-center justify-center gap-4">
            {CONFIG.navItems.map((item) => (
              <Link
                className="transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
                key={item.label}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggleButton variant="circle" start="top-right" blur />
        </div>
      </div>
    </Container>
  );
}
