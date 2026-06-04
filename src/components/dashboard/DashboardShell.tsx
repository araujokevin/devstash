"use client";

import Link from "next/link";
import {
  Archive,
  ChevronDown,
  Clock,
  Code,
  File,
  Folder,
  Image,
  LinkIcon,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Pin,
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  collections,
  currentUser,
  items,
  itemTypes,
  type MockCollection,
  type MockItem,
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

const collectionBorderClasses: Record<string, string> = {
  "type-command": "border-l-orange-500",
  "type-file": "border-l-zinc-500",
  "type-image": "border-l-pink-500",
  "type-link": "border-l-emerald-500",
  "type-note": "border-l-yellow-300",
  "type-prompt": "border-l-violet-500",
  "type-snippet": "border-l-blue-500",
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

const itemTypeById = new Map(
  itemTypes.map((itemType) => [itemType.id, itemType]),
);

const pinnedItems = items.filter((item) => item.isPinned);

const recentItems = [...items]
  .sort(
    (first, second) =>
      new Date(second.lastUsedAt).getTime() -
      new Date(first.lastUsedAt).getTime(),
  )
  .slice(0, 10);

const dashboardStats = [
  {
    icon: Archive,
    label: "Items",
    value: items.length,
  },
  {
    icon: Folder,
    label: "Collections",
    value: collections.length,
  },
  {
    icon: Star,
    label: "Favorite items",
    value: items.filter((item) => item.isFavorite).length,
  },
  {
    icon: Star,
    label: "Favorite collections",
    value: favoriteCollections.length,
  },
];

const initialSectionState: SidebarSectionState = {
  favorites: true,
  recent: true,
  types: true,
};

export function DashboardShell() {
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

          <DashboardMain />
        </section>
      </div>
    </main>
  );
}

function DashboardMain() {
  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Dashboard
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Your developer knowledge hub
            </p>
          </div>

          <section
            aria-label="Dashboard stats"
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
          >
            {dashboardStats.map((stat) => (
              <StatCard
                icon={stat.icon}
                key={stat.label}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </section>

          <section className="space-y-4">
            <SectionHeader
              actionHref="/collections"
              actionLabel="View all"
              title="Recent collections"
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recentCollections.map((collection) => (
                <CollectionCard collection={collection} key={collection.id} />
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)]">
            <div className="space-y-4">
              <SectionHeader icon={Pin} title="Pinned items" />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {pinnedItems.map((item) => (
                  <PinnedItemCard item={item} key={item.id} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionHeader
                actionHref="/items"
                actionLabel="View all"
                icon={Clock}
                title="Recent items"
              />
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {recentItems.map((item, index) => (
                    <RecentItemRow
                      isLast={index === recentItems.length - 1}
                      item={item}
                      key={item.id}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </ScrollArea>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: IconComponent;
  label: string;
  value: number;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-3 space-y-0 pb-2">
        <CardDescription>{label}</CardDescription>
        <span className="grid size-9 place-items-center rounded-md bg-secondary text-muted-foreground ring-1 ring-border">
          <Icon className="size-4" />
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}

function SectionHeader({
  actionHref,
  actionLabel,
  icon: Icon,
  title,
}: {
  actionHref?: string;
  actionLabel?: string;
  icon?: IconComponent;
  title: string;
}) {
  return (
    <div className="flex min-h-9 items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        {Icon ? <Icon className="size-4 shrink-0 text-muted-foreground" /> : null}
        <h2 className="truncate text-base font-semibold tracking-tight sm:text-lg">
          {title}
        </h2>
      </div>
      {actionHref && actionLabel ? (
        <Button asChild className="h-8 px-3 text-muted-foreground" variant="ghost">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}

function CollectionCard({ collection }: { collection: MockCollection }) {
  const dominantType = itemTypeById.get(collection.defaultTypeId);
  const visibleTypes = collection.itemTypeIds
    .map((itemTypeId) => itemTypeById.get(itemTypeId))
    .filter((itemType): itemType is MockItemType => Boolean(itemType));

  return (
    <Card
      className={cn(
        "group min-h-44 border-l-2 transition-colors hover:bg-accent/60",
        collectionBorderClasses[collection.defaultTypeId] ?? "border-l-border",
      )}
    >
      <Link className="flex h-full flex-col" href={`/collections/${collection.id}`}>
        <CardHeader className="flex-row items-start justify-between gap-3 pb-3">
          <div className="min-w-0 space-y-1">
            <CardTitle className="flex min-w-0 items-center gap-2 text-base">
              <span className="truncate">{collection.name}</span>
              {collection.isFavorite ? (
                <Star className="size-4 shrink-0 fill-yellow-300 text-yellow-300" />
              ) : null}
            </CardTitle>
            <CardDescription>{collection.itemCount} items</CardDescription>
          </div>
          <TypeIconBadge itemType={dominantType} size="sm" />
        </CardHeader>
        <CardContent className="flex-1">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {collection.description}
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          {visibleTypes.map((itemType) => (
            <TypeIconBadge itemType={itemType} key={itemType.id} size="xs" />
          ))}
        </CardFooter>
      </Link>
    </Card>
  );
}

function PinnedItemCard({ item }: { item: MockItem }) {
  const itemType = itemTypeById.get(item.itemTypeId);

  return (
    <Card
      className={cn(
        "group border-l-2 transition-colors hover:bg-accent/60",
        collectionBorderClasses[item.itemTypeId] ?? "border-l-border",
      )}
    >
      <Link className="flex h-full flex-col" href={`/items/${item.id}`}>
        <CardHeader className="flex-row items-start justify-between gap-3 pb-3">
          <TypeIconBadge itemType={itemType} />
          <div className="flex items-center gap-2">
            <Pin className="size-4 shrink-0 fill-muted-foreground text-muted-foreground" />
            {item.isFavorite ? (
              <Star className="size-4 shrink-0 fill-yellow-300 text-yellow-300" />
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <CardTitle className="truncate text-base">{item.title}</CardTitle>
          <CardDescription className="mt-2 line-clamp-2">
            {item.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Link>
    </Card>
  );
}

function RecentItemRow({
  isLast,
  item,
}: {
  isLast: boolean;
  item: MockItem;
}) {
  const itemType = itemTypeById.get(item.itemTypeId);

  return (
    <>
      <Link
        className="flex min-h-20 items-center gap-3 px-4 py-3 transition-colors hover:bg-accent"
        href={`/items/${item.id}`}
      >
        <TypeIconBadge itemType={itemType} />
        <span className="min-w-0 flex-1">
          <span className="flex min-w-0 items-center gap-2">
            <span className="truncate text-sm font-medium">{item.title}</span>
            {item.isPinned ? (
              <Pin className="size-3.5 shrink-0 fill-muted-foreground text-muted-foreground" />
            ) : null}
            {item.isFavorite ? (
              <Star className="size-3.5 shrink-0 fill-yellow-300 text-yellow-300" />
            ) : null}
          </span>
          <span className="mt-1 block truncate text-sm text-muted-foreground">
            {item.description}
          </span>
          <span className="mt-2 flex flex-wrap gap-1.5 sm:hidden">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </span>
        </span>
        <span className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
          <Clock className="size-3.5" />
          {formatShortDate(item.lastUsedAt)}
        </span>
      </Link>
      {!isLast ? <Separator /> : null}
    </>
  );
}

function TypeIconBadge({
  itemType,
  size = "md",
}: {
  itemType?: MockItemType;
  size?: "xs" | "sm" | "md";
}) {
  const Icon = itemType ? (typeIcons[itemType.icon] ?? Code) : Code;

  return (
    <span
      aria-label={itemType?.label}
      className={cn(
        "grid shrink-0 place-items-center rounded-md ring-1",
        size === "xs" && "size-6",
        size === "sm" && "size-8",
        size === "md" && "size-10",
        itemType
          ? typeColorClasses[itemType.name]
          : "bg-secondary text-muted-foreground ring-border",
      )}
    >
      <Icon
        className={cn(
          size === "xs" && "size-3.5",
          size === "sm" && "size-4",
          size === "md" && "size-5",
        )}
      />
    </span>
  );
}

function formatShortDate(dateValue: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
  }).format(new Date(dateValue));
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

      <Badge
        className={cn("rounded-full px-2 py-0 text-muted-foreground", isCollapsed && "sr-only")}
        variant="secondary"
      >
        {itemType.count}
      </Badge>
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
    <div className="mt-4 shrink-0">
      <Separator className="mb-4" />
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
          <Avatar>
            {currentUser.image ? (
              <AvatarImage alt={currentUser.name} src={currentUser.image} />
            ) : null}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

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
