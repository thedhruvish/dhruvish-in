"use client";

import { CONFIG } from "@/config/config";
import { Link } from "next-view-transitions";

import Container from "./Container";
import { ThemeToggleButton } from "./ThemeSwitch";
import { SearchBar } from "./search-bar";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ isSearch = true }: { isSearch?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container className="sticky top-0 z-30 rounded-md py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6">
        <Link href="/" className="shrink-0">
          <h1 className="text-2xl font-semibold leading-10 tracking-tight">
            {CONFIG.name.slice(0, 2).toUpperCase()}
          </h1>
        </Link>

        {/* Nav items for md+ screens */}
        <nav className="hidden md:flex flex-1 justify-center gap-6">
          {CONFIG.navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right section: Search + Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-4">
          {isSearch && <SearchBar className="hidden md:block" />}
          <ThemeToggleButton variant="circle" start="top-right" blur />

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu (absolute dropdown) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md z-20 md:hidden flex flex-col items-center gap-4 py-4"
          >
            {CONFIG.navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-full text-center transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
