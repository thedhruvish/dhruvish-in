"use client";
import React from "react";
import { ArrowRight, ChevronRight, Laptop, Moon, Sun } from "lucide-react";
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
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type SearchSubItem = {
  title: string;
  url: string;
  shortcut: string[];
};

type SearchNavItem =
  | {
      title: string;
      url: string;
      shortcut: string[];
      items?: never; // Explicitly state it cannot have sub-items
    }
  | {
      title: string;
      items: SearchSubItem[];
      url?: never; // Explicitly state it cannot have a direct url
      shortcut?: never;
    };

// This is the top-level group (e.g., "General")
type SearchGroup = {
  title: string;
  items: SearchNavItem[];
};

// Apply the new type to your searchData
const searchData: SearchGroup[] = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        url: "/",
        shortcut: ["G", "D"],
      },
      {
        title: "Tasks",
        url: "/tasks",
        shortcut: ["G", "T"],
      },
      {
        title: "Apps",
        url: "/apps",
        shortcut: ["G", "A"],
      },
      {
        title: "Users",
        url: "/users",
        shortcut: ["G", "U"],
      },
    ],
  },
  {
    title: "Application Settings",
    items: [
      {
        title: "Application",
        items: [
          {
            title: "Banner",
            url: "/apps/banners",
            shortcut: ["S", "B"],
          },
          {
            title: "Blogs",
            url: "/apps/blogs",
            shortcut: ["S", "L"],
          },
        ],
      },
    ],
  },
];

export function CommandMenu() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { open, setOpen } = useSearch();
  const keySequence = React.useRef<string[]>([]);
  const sequenceTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  const sidebarData = searchData;
  // Flatten all commands with shortcuts for easy lookup
  const allCommands = React.useMemo(() => {
    const commands: { shortcut: string[]; action: () => void }[] = [];

    // With our new types, 'group' is SearchGroup and 'item' is SearchNavItem
    sidebarData.forEach((group) => {
      group.items.forEach((item) => {
        // This 'if' block now correctly narrows 'item' to the first
        // type in the SearchNavItem union
        if (item.url && item.shortcut) {
          commands.push({
            shortcut: item.shortcut,
            action: () => runCommand(() => router.push(item.url as string)),
          });
        }
        // This 'else if' block correctly narrows 'item' to the second
        // type in the union. TS now knows 'item.items' exists.
        else if (item.items) {
          // TS also knows 'item.items' is SearchSubItem[], so 'subItem'
          // is correctly typed as SearchSubItem, fixing the 'any' error.
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
    return commands;
    // sidebarData is a constant, but we'll leave it in the
    // dependency array for correctness if it ever becomes dynamic.
  }, [runCommand, router, sidebarData]);

  // Global key listener for shortcuts
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
          JSON.stringify(cmd.shortcut) === JSON.stringify(keySequence.current)
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

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <div
        className={cn("h-full w-full", {
          "animate-fade-in-blur": open,
        })}
        onWheel={(e) => e.stopPropagation()}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <ScrollArea type="hover" className="h-72 pe-1">
            <CommandEmpty>No results found.</CommandEmpty>

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
            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
                <Sun /> <span>Light</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
                <Moon className="scale-90" />
                <span>Dark</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => setTheme("system"))}
              >
                <Laptop />
                <span>System</span>
              </CommandItem>
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </div>
    </CommandDialog>
  );
}
