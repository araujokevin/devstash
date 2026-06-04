# Current Feature

Dashboard UI Phase 3 - main dashboard content from @context/features/dashboard-phase-3-spec.md

## Status

In Progress

## Goals

- Implement the main area to the right of the sidebar.
- Show recent collections.
- Show pinned items.
- Show 10 recent items.
- Add 4 top stats cards for total items, collections, favorite items, and favorite collections.

## Notes

- Use @context/features/dashboard-phase-3-spec.md as the source spec for this feature.
- Use mock dashboard data directly until database-backed data is implemented.

## History

<!-- Keep this updated. Earliest to latest  -->

- 2026-06-02: Completed initial Next.js and Tailwind CSS setup. Created initial commit `chore: initial next.js and tailwind setup`, pushed to `origin/main`, and renamed the local branch to `main`.
- 2026-06-03: Added mock dashboard data source for item types, collections, items, and the current user.
- 2026-06-03: Verified the mock data change with `npm.cmd run build`.
- 2026-06-03: Started Dashboard UI Phase 1 from `context/features/dashboard-phase-1-spec.md`.
- 2026-06-03: Implemented Dashboard UI Phase 1 at `/dashboard` with ShadCN-style setup, dark global styles, top bar, and placeholder layout.
- 2026-06-03: Verified Dashboard UI Phase 1 with `npm.cmd run build`, `npm.cmd run lint`, and a local `/dashboard` HTTP check.
- 2026-06-03: Completed Dashboard UI Phase 1.
- 2026-06-04: Set current feature to Dashboard UI Phase 2 from `context/features/dashboard-phase-2-spec.md`.
- 2026-06-04: Implemented Dashboard UI Phase 2 sidebar with desktop collapse, mobile drawer, item type links, favorite and recent collections, and user footer.
- 2026-06-04: Verified Dashboard UI Phase 2 with `npm.cmd run lint`, `npm.cmd run build`, and a local `/dashboard` HTTP check.
- 2026-06-04: Updated Dashboard UI Phase 2 mobile sidebar to use the shadcn/ui Sheet component and reverified with `npm.cmd run lint` and `npm.cmd run build`.
- 2026-06-04: Improved Dashboard UI Phase 2 sidebar with collapsible sections, shadcn/ui ScrollArea scrolling, viewport-safe sizing, and a user settings action. Reverified with `npm.cmd run lint`, `npm.cmd run build`, and a local `/dashboard` HTTP check.
- 2026-06-04: Completed Dashboard UI Phase 2 and cleared the active feature details.
- 2026-06-04: Set current feature to Dashboard UI Phase 3 from `context/features/dashboard-phase-3-spec.md`.
- 2026-06-04: Implemented Dashboard UI Phase 3 main content with stats cards, recent collections, pinned items, and recent items using mock data.
- 2026-06-04: Verified Dashboard UI Phase 3 with `npm.cmd run lint`, `npm.cmd run build`, and a local `/dashboard` HTTP check.
- 2026-06-04: Refactored Dashboard UI Phase 3 to use shadcn/ui-style Card, Badge, Avatar, Separator, Button, and ScrollArea components.
- 2026-06-04: Reverified the shadcn/ui Phase 3 refactor with `npm.cmd run lint`, `npm.cmd run build`, and a local `/dashboard` HTTP check.
- 2026-06-04: Restored the `/dashboard` route as a server component and moved interactive dashboard state into `src/components/dashboard/DashboardShell.tsx`.
- 2026-06-04: Reverified the server-route/client-shell split with `npm.cmd run lint`, `npm.cmd run build`, and a local `/dashboard` HTTP check.
