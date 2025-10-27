"use client";
import React from "react";
import { ArrowRight, ChevronRight, Moon, Sun } from "lucide-react";
import { useSearch } from "@/components/search-provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Kbd } from "./ui/kbd";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useThemeToggle } from "./ThemeSwitch";

type SearchSubItem = {
  title: string;
  url: string;
  shortcut: string[];
};

type SearchNavItem =
  | {
      title: string;
      url: string;
      shortcut?: string[];
      items?: never;
    }
  | {
      title: string;
      items: SearchSubItem[];
      url?: never;
      shortcut?: never;
    };

type SearchGroup = {
  title: string;
  items: SearchNavItem[];
};

type BlogSearchItem = {
  title: string;
  slug: string;
  content: string;
};

const searchData: SearchGroup[] = [
  {
    title: "General",
    items: [
      {
        title: "Home",
        url: "/",
        shortcut: ["h", "h"],
      },
      {
        title: "Contact",
        url: "/contact-us",
        shortcut: ["c", "u"],
      },
    ],
  },
];

/**
 * Finds the first sentence in content that includes the query.
 * @param content The full blog post content
 * @param query The user's search query
 * @returns The matching sentence, or null
 */
function findMatchingSentence(content: string, query: string): string | null {
  if (!query.trim()) {
    return null;
  }

  const plainText = content
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[`*#_>~]/g, "") // Remove markdown chars
    .replace(/\s+/g, " "); // Normalize whitespace

  const queryLower = query.toLowerCase();

  // Split content into sentences
  const sentences = plainText.split(
    /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|!)\s/,
  );

  for (const sentence of sentences) {
    if (sentence.toLowerCase().includes(queryLower)) {
      return sentence.trim();
    }
  }

  return null;
}

export function CommandMenu({
  blogPosts = [],
}: {
  blogPosts: BlogSearchItem[];
}) {
  const router = useRouter();
  const { toggleTheme } = useThemeToggle();
  const { open, setOpen } = useSearch();
  const keySequence = React.useRef<string[]>([]);
  const sequenceTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const [search, setSearch] = React.useState("");

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  const sidebarData = searchData;

  const allCommands = React.useMemo(() => {
    const commands: { shortcut: string[]; action: () => void }[] = [];
    sidebarData.forEach((group) => {
      group.items.forEach((item) => {
        if (item.url && item.shortcut) {
          commands.push({
            shortcut: item.shortcut,
            action: () => runCommand(() => router.push(item.url as string)),
          });
        } else if (item.items) {
          item.items.forEach((subItem) => {
            if (subItem.shortcut && subItem.url) {
              commands.push({
                shortcut: subItem.shortcut,
                action: () => runCommand(() => router.push(subItem.url)),
              });
            }
          });
        }
      });
    });
    commands.push({
      shortcut: ["B", "B"],
      action: () => runCommand(() => router.push("/blog")),
    });
    return commands;
  }, [runCommand, router, sidebarData]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
      ) {
        return;
      }
      if (sequenceTimeout.current) {
        clearTimeout(sequenceTimeout.current);
      }
      keySequence.current.push(e.key.toUpperCase());
      const matchedCommand = allCommands.find(
        (cmd) =>
          JSON.stringify(cmd.shortcut) === JSON.stringify(keySequence.current),
      );
      if (matchedCommand) {
        e.preventDefault();
        matchedCommand.action();
        keySequence.current = [];
      } else {
        sequenceTimeout.current = setTimeout(() => {
          keySequence.current = [];
        }, 800);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (sequenceTimeout.current) {
        clearTimeout(sequenceTimeout.current);
      }
    };
  }, [allCommands]);

  const renderShortcut = (shortcut: string[] | undefined) => {
    if (!shortcut) return null;
    return (
      <div className="ml-auto flex items-center gap-1">
        {shortcut.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </div>
    );
  };

  const blogCommandItems = blogPosts.map((post) => {
    const matchingSentence = findMatchingSentence(post.content, search);

    return (
      <CommandItem
        key={`/blog/${post.slug}`}
        value={`${post.title} ${post.content}`}
        onSelect={() => {
          runCommand(() => router.push(`/blog/${post.slug}`));
        }}
      >
        <div className="flex size-4 shrink-0 items-center justify-center">
          <ArrowRight className="text-muted-foreground/80 size-2" />
        </div>

        <div className="ms-2 flex flex-col overflow-hidden">
          <span className="me-2 truncate font-medium">{post.title}</span>
          {matchingSentence && (
            <span className="truncate text-xs text-muted-foreground">
              ...{matchingSentence}...
            </span>
          )}
        </div>
      </CommandItem>
    );
  });

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <div
        className={cn("h-full w-full", {
          "animate-fade-in-blur": open,
        })}
        onWheel={(e) => e.stopPropagation()}
      >
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={setSearch}
        />

        <CommandList>
          <ScrollArea type="hover" className="h-72 pe-1">
            <CommandEmpty>No results found.</CommandEmpty>

            {/* Static Sidebar Data  */}
            {sidebarData.map((group) => (
              <CommandGroup key={group.title} heading={group.title}>
                {group.items.map((navItem) => {
                  if (navItem.url)
                    return (
                      <CommandItem
                        key={navItem.url}
                        value={navItem.title}
                        onSelect={() => {
                          runCommand(() => router.push(navItem.url as string));
                        }}
                      >
                        <div className="flex size-4 items-center justify-center">
                          <ArrowRight className="text-muted-foreground/80 size-2" />
                        </div>
                        <span className="me-2">{navItem.title}</span>
                        {renderShortcut(navItem.shortcut)}
                      </CommandItem>
                    );
                  return navItem.items?.map((subItem) => (
                    <CommandItem
                      key={subItem.url}
                      value={`${navItem.title}-${subItem.title}`}
                      onSelect={() => {
                        runCommand(() => router.push(subItem.url));
                      }}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="text-muted-foreground/80 size-2" />
                      </div>
                      <span>
                        {navItem.title}{" "}
                        <ChevronRight className="inline size-3" />{" "}
                        {subItem.title}
                      </span>
                      {renderShortcut(subItem.shortcut)}
                    </CommandItem>
                  ));
                })}
              </CommandGroup>
            ))}

            {blogCommandItems.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Blogs">{blogCommandItems}</CommandGroup>
              </>
            )}

            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem onSelect={() => runCommand(() => toggleTheme())}>
                <Sun /> <span>Light</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => toggleTheme())}>
                <Moon className="scale-90" />
                <span>Dark</span>
              </CommandItem>
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </div>
    </CommandDialog>
  );
}
