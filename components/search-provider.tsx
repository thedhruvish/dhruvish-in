"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CommandMenu } from "@/components/command-menu";
import { useLenis } from "lenis/react";

type SearchContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchContext = createContext<SearchContextType | null>(null);

type SearchProviderProps = {
  children: React.ReactNode;
};

export function SearchProvider({ children }: SearchProviderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const lenis = useLenis(); 

  useEffect(() => {
    if (lenis) {
      if (open) {
        lenis.stop(); 
      } else {
        lenis.start(); 
      }
    }
  }, [lenis, open]); 

  return (
    <SearchContext value={{ open, setOpen }}>
      {children}
      <CommandMenu />
    </SearchContext>
  );
}

export const useSearch = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error("useSearch has to be used within SearchProvider");
  }

  return searchContext;
};
