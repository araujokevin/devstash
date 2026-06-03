import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r bg-card px-6 py-6 md:block">
          <h2 className="text-lg font-semibold tracking-tight">Sidebar</h2>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between gap-4 border-b px-4 md:px-6">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search items"
                className="h-10 bg-card pl-9"
                placeholder="Search items..."
                readOnly
              />
            </div>

            <Button className="h-10 shrink-0" type="button">
              <Plus className="size-4" />
              New Item
            </Button>
          </header>

          <div className="flex flex-1">
            <aside className="w-32 shrink-0 border-r bg-card px-4 py-6 md:hidden">
              <h2 className="text-lg font-semibold tracking-tight">Sidebar</h2>
            </aside>

            <div className="flex-1 px-6 py-8">
              <h2 className="text-2xl font-semibold tracking-tight">Main</h2>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
