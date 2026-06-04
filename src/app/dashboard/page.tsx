"use client";

import Link from "next/link";
import {
  ChevronDown,
  Code,
  File,
  Folder,
  Image,
  LinkIcon,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
} from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  collections,
  currentUser,
  itemTypes,
  type MockCollection,
  type MockItemType,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type SidebarSectionKey = "types" | "favorites" | "recent";

type SidebarSectionState = Record<SidebarSectionKey, boolean>;

const typeIcons: Record<string, IconComponent> = {
  Code,
  File,
  Image,
  Link: LinkIcon,
  Sparkles,
  StickyNote,
  Terminal,
};

const typeColorClasses: Record<string, string> = {
  command: "bg-orange-500/15 text-orange-300 ring-orange-500/25",
  file: "bg-zinc-500/15 text-zinc-300 ring-zinc-500/25",
  image: "bg-pink-500/15 text-pink-300 ring-pink-500/25",
  link: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
  note: "bg-yellow-500/15 text-yellow-200 ring-yellow-500/25",
  prompt: "bg-violet-500/15 text-violet-300 ring-violet-500/25",
  snippet: "bg-blue-500/15 text-blue-300 ring-blue-500/25",
};

const collectionIconClasses: Record<string, string> = {
  "type-command": "text-orange-300 ring-orange-500/25",
  "type-file": "text-zinc-300 ring-zinc-500/25",
  "type-image": "text-pink-300 ring-pink-500/25",
  "type-link": "text-emerald-300 ring-emerald-500/25",
  "type-note": "text-yellow-200 ring-yellow-500/25",
  "type-prompt": "text-violet-300 ring-violet-500/25",
  "type-snippet": "text-blue-300 ring-blue-500/25",
};

const favoriteCollections = collections.filter(
  (collection) => collection.isFavorite,
);

const recentCollections = [...collections]
  .sort(
    (first, second) =>
      new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime(),
  )
  .slice(0, 5);

const initialSectionState: SidebarSectionState = {
  favorites: true,
  recent: true,
  types: true,
};

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [openSections, setOpenSections] =
    useState<SidebarSectionState>(initialSectionState);

  function toggleSection(section: SidebarSectionKey) {
    setOpenSections((currentState) => ({
      ...currentState,
      [section]: !currentState[section],
    }));
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapsed={() => setIsSidebarCollapsed((value) => !value)}
          onToggleSection={toggleSection}
          openSections={openSections}
        />

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between gap-3 border-b px-4 md:px-6">
            <Sheet
              onOpenChange={setIsMobileDrawerOpen}
              open={isMobileDrawerOpen}
            >
              <SheetTrigger asChild>
                <Button
                  aria-label="Open sidebar"
                  className="md:hidden"
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="h-dvh w-72 bg-card p-0 sm:max-w-72"
                side="left"
              >
                <SheetTitle className="sr-only">Dashboard sidebar</SheetTitle>
                <DashboardSidebarContent
                  isCollapsed={false}
                  onCloseMobile={() => setIsMobileDrawerOpen(false)}
                  onToggleCollapsed={() => setIsMobileDrawerOpen(false)}
                  onToggleSection={toggleSection}
                  openSections={openSections}
                  showToggleButton={false}
                />
              </SheetContent>
            </Sheet>

            <div className="relative min-w-0 flex-1 md:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search items"
                className="h-10 bg-card pl-9"
                placeholder="Search items..."
                readOnly
              />
            </div>

            <Button className="h-10 shrink-0 px-3 sm:px-4" type="button">
              <Plus className="size-4" />
              <span className="hidden sm:inline">New Item</span>
            </Button>
          </header>

          <div className="flex-1 px-6 py-8">
            <h2 className="text-2xl font-semibold tracking-tight">Main</h2>
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardSidebar({
  isCollapsed,
  onToggleCollapsed,
  onToggleSection,
  openSections,
}: {
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
  onToggleSection: (section: SidebarSectionKey) => void;
  openSections: SidebarSectionState;
}) {
  return (
    <aside
      className={cn(
        "hidden h-screen shrink-0 border-r bg-card transition-[width] duration-200 md:block",
        isCollapsed ? "w-20" : "w-72",
      )}
    >
      <DashboardSidebarContent
        isCollapsed={isCollapsed}
        onToggleCollapsed={onToggleCollapsed}
        onToggleSection={onToggleSection}
        openSections={openSections}
      />
    </aside>
  );
}

function DashboardSidebarContent({
  isCollapsed,
  onCloseMobile,
  onToggleCollapsed,
  onToggleSection,
  openSections,
  showToggleButton = true,
}: {
  isCollapsed: boolean;
  onCloseMobile?: () => void;
  onToggleCollapsed: () => void;
  onToggleSection: (section: SidebarSectionKey) => void;
  openSections: SidebarSectionState;
  showToggleButton?: boolean;
}) {
  return (
    <div className="flex h-full max-h-dvh min-h-0 flex-col px-4 py-5">
      <div
        className={cn(
          "flex h-10 shrink-0 items-center justify-between gap-3",
          isCollapsed && "justify-center",
        )}
      >
        <Link
          className={cn(
            "min-w-0 text-base font-semibold tracking-tight",
            isCollapsed && "sr-only",
          )}
          href="/dashboard"
          onClick={onCloseMobile}
        >
          DevStash
        </Link>

        {showToggleButton ? (
          <Button
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggleCollapsed}
            size="icon"
            type="button"
            variant="ghost"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="size-5" />
            ) : (
              <PanelLeftClose className="size-5" />
            )}
          </Button>
        ) : null}
      </div>

      <ScrollArea className="-mx-2 mt-5 min-h-0 flex-1 px-2">
        <nav className="flex flex-col gap-3 pb-4">
          <SidebarSection
            isCollapsed={isCollapsed}
            isOpen={openSections.types}
            onToggle={() => onToggleSection("types")}
            title="Types"
          >
            <div className="space-y-1">
              {itemTypes.map((itemType) => (
                <ItemTypeLink
                  isCollapsed={isCollapsed}
                  itemType={itemType}
                  key={itemType.id}
                  onNavigate={onCloseMobile}
                />
              ))}
            </div>
          </SidebarSection>

          <SidebarSection
            isCollapsed={isCollapsed}
            isOpen={openSections.favorites}
            onToggle={() => onToggleSection("favorites")}
            title="Favorites"
          >
            <CollectionList
              collections={favoriteCollections}
              isCollapsed={isCollapsed}
              onNavigate={onCloseMobile}
            />
          </SidebarSection>

          <SidebarSection
            isCollapsed={isCollapsed}
            isOpen={openSections.recent}
            onToggle={() => onToggleSection("recent")}
            title="Recent"
          >
            <CollectionList
              collections={recentCollections}
              isCollapsed={isCollapsed}
              onNavigate={onCloseMobile}
            />
          </SidebarSection>
        </nav>
      </ScrollArea>

      <UserArea isCollapsed={isCollapsed} />
    </div>
  );
}

function SidebarSection({
  children,
  isCollapsed,
  isOpen,
  onToggle,
  title,
}: {
  children: ReactNode;
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  title: string;
}) {
  return (
    <section>
      <button
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Collapse" : "Expand"} ${title}`}
        className={cn(
          "flex h-8 w-full items-center gap-2 rounded-md px-2 text-xs font-medium uppercase text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
          isCollapsed && "justify-center px-0",
        )}
        onClick={onToggle}
        type="button"
      >
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            !isOpen && "-rotate-90",
          )}
        />
        <span className={cn("min-w-0 truncate", isCollapsed && "sr-only")}>
          {title}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden pt-1">{children}</div>
      </div>
    </section>
  );
}

function ItemTypeLink({
  isCollapsed,
  itemType,
  onNavigate,
}: {
  isCollapsed: boolean;
  itemType: MockItemType;
  onNavigate?: () => void;
}) {
  const Icon = typeIcons[itemType.icon] ?? Code;
  const href = `/items/${itemType.label.toLowerCase()}`;

  return (
    <Link
      aria-label={itemType.label}
      className={cn(
        "flex h-10 items-center gap-3 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        isCollapsed && "justify-center px-0",
      )}
      href={href}
      onClick={onNavigate}
    >
      <span
        className={cn(
          "grid size-7 place-items-center rounded-md ring-1",
          typeColorClasses[itemType.name],
        )}
      >
        <Icon className="size-4" />
      </span>

      <span className={cn("min-w-0 flex-1 truncate", isCollapsed && "sr-only")}>
        {itemType.label}
      </span>

      <span
        className={cn(
          "rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground",
          isCollapsed && "sr-only",
        )}
      >
        {itemType.count}
      </span>
    </Link>
  );
}

function CollectionList({
  collections: collectionItems,
  isCollapsed,
  onNavigate,
}: {
  collections: MockCollection[];
  isCollapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-1">
      {collectionItems.map((collection) => (
        <CollectionLink
          collection={collection}
          isCollapsed={isCollapsed}
          key={collection.id}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

function CollectionLink({
  collection,
  isCollapsed,
  onNavigate,
}: {
  collection: MockCollection;
  isCollapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      aria-label={collection.name}
      className={cn(
        "flex h-9 items-center gap-3 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        isCollapsed && "justify-center px-0",
      )}
      href={`/collections/${collection.id}`}
      onClick={onNavigate}
    >
      <span
        className={cn(
          "grid size-7 shrink-0 place-items-center rounded-md bg-secondary ring-1",
          collectionIconClasses[collection.defaultTypeId] ??
            "text-muted-foreground ring-border",
        )}
      >
        <Folder className="size-4" />
      </span>

      <span className={cn("min-w-0 flex-1 truncate", isCollapsed && "sr-only")}>
        {collection.name}
      </span>

      {collection.isFavorite ? (
        <Star
          className={cn(
            "size-3.5 fill-yellow-300 text-yellow-300",
            isCollapsed && "sr-only",
          )}
        />
      ) : null}
    </Link>
  );
}

function UserArea({ isCollapsed }: { isCollapsed: boolean }) {
  const initials = currentUser.name
    .split(" ")
    .map((namePart) => namePart[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mt-4 shrink-0 border-t pt-4">
      <div
        className={cn(
          "flex items-center gap-2",
          isCollapsed && "flex-col justify-center",
        )}
      >
      <button
        aria-label="Account"
        className={cn(
          "flex h-12 min-w-0 flex-1 items-center gap-3 rounded-md px-2 text-left transition-colors hover:bg-accent",
          isCollapsed && "justify-center px-0",
        )}
        type="button"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initials}
        </span>

        <span className={cn("min-w-0 flex-1", isCollapsed && "sr-only")}>
          <span className="block truncate text-sm font-medium">
            {currentUser.name}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {currentUser.email}
          </span>
        </span>
      </button>
        <Button
          aria-label="Open settings"
          className="size-9 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={() => undefined}
          size="icon"
          type="button"
          variant="ghost"
        >
          <Settings className="size-4" />
        </Button>
      </div>
    </div>
  );
}
