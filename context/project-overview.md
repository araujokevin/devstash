# DevStash — Project Overview

> **One fast, searchable, AI-enhanced hub for all dev knowledge & resources.**
> Stack: Next.js 16 · TypeScript · Neon/Prisma · NextAuth v5 · Tailwind v4 + ShadCN · OpenAI · Cloudflare R2

---

## Table of Contents

1. [Problem & Vision](#problem--vision)
2. [Target Users](#target-users)
3. [Features](#features)
4. [Item Types](#item-types)
5. [Data Models & Prisma Schema](#data-models--prisma-schema)
6. [Entity Relationship Diagram](#entity-relationship-diagram)
7. [Tech Stack](#tech-stack)
8. [Monetization](#monetization)
9. [URL Structure](#url-structure)
10. [UI/UX Guidelines](#uiux-guidelines)

---

## Problem & Vision

Developers scatter their essentials across too many places:

| What | Where it lives today |
|---|---|
| Code snippets | VS Code, Notion, Gists |
| AI prompts | Chat histories |
| Context files | Buried in project folders |
| Useful links | Browser bookmarks |
| Documentation | Random folders |
| Terminal commands | `.txt` files / bash history |
| Project templates | GitHub Gists |

This creates **context switching, lost knowledge, and inconsistent workflows**. DevStash replaces all of it with one hub.

---

## Target Users

| User Type | Core Need |
|---|---|
| **Everyday Developer** | Fast access to snippets, prompts, commands, links |
| **AI-first Developer** | Store prompts, context files, system messages, workflows |
| **Content Creator / Educator** | Organise code blocks, explanations, course notes |
| **Full-stack Builder** | Collect patterns, boilerplates, API examples |

---

## Features

### A. Items & Item Types

Items are the core unit of DevStash. Each item has a **type** that determines its icon, color, and behaviour.

**System types** (built-in, not editable):

| Type | Icon | Color | Content Kind | Free |
|---|---|---|---|---|
| `snippet` | `<Code />` | `#3b82f6` Blue | Text / code | ✅ |
| `prompt` | `<Sparkles />` | `#8b5cf6` Purple | Text | ✅ |
| `note` | `<StickyNote />` | `#fde047` Yellow | Text / markdown | ✅ |
| `command` | `<Terminal />` | `#f97316` Orange | Text | ✅ |
| `link` | `<Link />` | `#10b981` Emerald | URL | ✅ |
| `file` | `<File />` | `#6b7280` Gray | File upload | 🔒 Pro |
| `image` | `<Image />` | `#ec4899` Pink | Image upload | 🔒 Pro |

> **Content kinds:** `text` (snippet, note, prompt, command), `url` (link), `file` (file, image)

**Item capabilities:**

- ⚡ Quick create & access from a **slide-over drawer**
- 📌 Pin items to top
- ⭐ Favourite items
- 🕒 Recently used tracking
- 📥 Import code from a file
- ✍️ Markdown editor for text types
- 📤 Export data (JSON/ZIP) — Pro

---

### B. Collections

Group items of any type into named collections. Items can belong to **multiple collections**.

Examples:
- `React Patterns` — snippets, notes
- `Context Files` — files
- `Python Snippets` — snippets
- `Interview Prep` — snippets, notes, links

Features:
- ⭐ Favourite collections
- 🎨 Color-coded cards based on the most common item type
- Set a `defaultTypeId` for new items added to a collection

---

### C. Search

Powerful full-text search across:
- Item **title**
- Item **content**
- **Tags**
- Item **type**

---

### D. Authentication

- Email/password
- GitHub OAuth

Powered by **NextAuth v5**.

---

### E. AI Features (Pro only)

| Feature | Description |
|---|---|
| 🏷️ Auto-tag suggestions | Suggests relevant tags based on item content |
| 📝 AI Summaries | One-line summary of long items |
| 🔍 Explain This Code | Plain-English explanation of a snippet |
| ✨ Prompt Optimizer | Rewrites a prompt for better LLM results |

Model: `gpt-5-nano` (OpenAI)

> During development, all users can access all features regardless of plan.

---

## Data Models & Prisma Schema

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Auth ────────────────────────────────────────────────────────────────────

model User {
  id                    String    @id @default(cuid())
  name                  String?
  email                 String    @unique
  emailVerified         DateTime?
  image                 String?
  passwordHash          String?

  isPro                 Boolean   @default(false)
  stripeCustomerId      String?   @unique
  stripeSubscriptionId  String?   @unique

  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  accounts              Account[]
  sessions              Session[]
  items                 Item[]
  collections           Collection[]
  itemTypes             ItemType[]   // user-created custom types (future)

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ─── Item Types ───────────────────────────────────────────────────────────────

model ItemType {
  id       String  @id @default(cuid())
  name     String  // "snippet" | "prompt" | "note" | "command" | "file" | "image" | "link"
  icon     String  // Lucide icon name e.g. "Code", "Sparkles"
  color    String  // Hex color e.g. "#3b82f6"
  isSystem Boolean @default(false)

  userId   String?
  user     User?   @relation(fields: [userId], references: [id], onDelete: Cascade)

  items    Item[]

  @@map("item_types")
}

// ─── Items ────────────────────────────────────────────────────────────────────

enum ContentKind {
  TEXT
  FILE
  URL
}

model Item {
  id          String      @id @default(cuid())
  title       String
  contentKind ContentKind

  // Text content (snippet, note, prompt, command)
  content     String?     @db.Text

  // File content (file, image) — stored in Cloudflare R2
  fileUrl     String?
  fileName    String?
  fileSize    Int?        // bytes

  // URL content (link)
  url         String?

  description String?     @db.Text
  language    String?     // e.g. "typescript", "python" — optional for code items

  isFavorite  Boolean     @default(false)
  isPinned    Boolean     @default(false)
  lastUsedAt  DateTime?

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  userId      String
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)

  itemTypeId  String
  itemType    ItemType    @relation(fields: [itemTypeId], references: [id])

  tags        ItemTag[]
  collections ItemCollection[]

  @@map("items")
}

// ─── Collections ──────────────────────────────────────────────────────────────

model Collection {
  id            String   @id @default(cuid())
  name          String
  description   String?  @db.Text
  isFavorite    Boolean  @default(false)
  defaultTypeId String?  // ItemType id for new items in this collection

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  items         ItemCollection[]

  @@map("collections")
}

// ─── Join Tables ──────────────────────────────────────────────────────────────

model ItemCollection {
  itemId       String
  collectionId String
  addedAt      DateTime @default(now())

  item         Item       @relation(fields: [itemId], references: [id], onDelete: Cascade)
  collection   Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)

  @@id([itemId, collectionId])
  @@map("item_collections")
}

// ─── Tags ─────────────────────────────────────────────────────────────────────

model Tag {
  id    String    @id @default(cuid())
  name  String    @unique

  items ItemTag[]

  @@map("tags")
}

model ItemTag {
  itemId String
  tagId  String

  item   Item @relation(fields: [itemId], references: [id], onDelete: Cascade)
  tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([itemId, tagId])
  @@map("item_tags")
}
```

> ⚠️ **Never run `db push` or manually alter the database.** Always create migrations with `prisma migrate dev` locally, then apply with `prisma migrate deploy` in production.

---

## Entity Relationship Diagram

```
┌─────────┐        ┌──────────────┐        ┌────────────┐
│  User   │───────<│    Item      │>───────│  ItemType  │
└─────────┘  1:N   └──────────────┘  N:1   └────────────┘
     │                    │
     │ 1:N                │ N:M (via ItemCollection)
     ▼                    ▼
┌────────────┐    ┌───────────────────┐    ┌────────────┐
│ Collection │───<│  ItemCollection   │>───│    Item    │
└────────────┘    └───────────────────┘    └────────────┘

                        Item
                          │
                          │ N:M (via ItemTag)
                          ▼
                    ┌──────────┐
                    │   Tag    │
                    └──────────┘
```

**Key relationships:**
- A **User** owns many Items, Collections, and custom ItemTypes
- An **Item** belongs to one ItemType, but can be in many Collections
- An **Item** can have many Tags; Tags can be on many Items
- **ItemCollection** tracks when an item was added to a collection (`addedAt`)
- **ItemType** with `userId = null` = system type (cannot be deleted or modified)

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| **Framework** | Next.js 16 / React 19 | SSR + API routes in one repo |
| **Language** | TypeScript | Strict mode |
| **Database** | Neon (PostgreSQL) | Serverless Postgres |
| **ORM** | Prisma 7 | Always use migrations, never `db push` |
| **Auth** | NextAuth v5 | Email/password + GitHub OAuth |
| **File Storage** | Cloudflare R2 | Pro users only |
| **AI** | OpenAI `gpt-5-nano` | Via API routes |
| **CSS** | Tailwind CSS v4 + ShadCN UI | Dark mode default |
| **Caching** | Redis (optional) | TBD |

**Useful Docs:**
- [Prisma 7 Docs](https://www.prisma.io/docs)
- [NextAuth v5 Docs](https://authjs.dev)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2)
- [ShadCN UI](https://ui.shadcn.com)
- [Tailwind v4 Docs](https://tailwindcss.com/docs)
- [Next.js 16 Docs](https://nextjs.org/docs)

---

## Monetization

### Free Plan

| Limit | Value |
|---|---|
| Items | 50 total |
| Collections | 3 |
| Item Types | System types only (no file/image) |
| Search | Basic |
| File uploads | ❌ |
| AI features | ❌ |

### Pro Plan — $8/month or $72/year

| Feature | Value |
|---|---|
| Items | Unlimited |
| Collections | Unlimited |
| Item Types | All system types (file + image) |
| Custom Types | ✅ (coming later) |
| File & Image uploads | ✅ via Cloudflare R2 |
| AI auto-tagging | ✅ |
| AI code explanation | ✅ |
| AI prompt optimizer | ✅ |
| Export (JSON/ZIP) | ✅ |
| Priority support | ✅ |

Payments via **Stripe**. User model stores `stripeCustomerId` and `stripeSubscriptionId`.

> 💡 During development, all users have Pro access regardless of plan.

---

## URL Structure

```
/                          → Dashboard / home
/items                     → All items
/items/snippets            → Items filtered by type: snippet
/items/prompts             → Items filtered by type: prompt
/items/notes               → Items filtered by type: note
/items/commands            → Items filtered by type: command
/items/links               → Items filtered by type: link
/items/files               → Items filtered by type: file (Pro)
/items/images              → Items filtered by type: image (Pro)
/items/[id]                → Single item (opens in drawer)
/collections               → All collections
/collections/[id]          → Single collection with its items
/search?q=...              → Search results
/settings                  → Account, preferences, billing
/settings/billing          → Stripe subscription management
```

---

## UI/UX Guidelines

### Design Principles

- **Modern, minimal, developer-focused** — reference: Notion, Linear, Raycast
- **Dark mode by default**, light mode optional
- Clean typography with generous whitespace
- Subtle borders and shadows
- Syntax highlighting on all code blocks

### Layout

```
┌──────────────────────────────────────────────────────┐
│  Sidebar (collapsible)   │  Main Content             │
│                          │                           │
│  Item Types              │  Collection cards grid    │
│  ├─ Snippets             │  (color-coded by          │
│  ├─ Prompts              │   dominant item type)     │
│  ├─ Notes                │                           │
│  ├─ Commands             │  Items grid               │
│  ├─ Links                │  (color-coded border      │
│  ├─ Files (Pro)          │   by item type)           │
│  └─ Images (Pro)         │                           │
│                          │                           │
│  Collections (latest)    │                           │
│  ├─ React Patterns       │                           │
│  └─ Python Snippets      │                           │
└──────────────────────────────────────────────────────┘
```

- **Mobile:** Sidebar becomes a drawer
- **Items:** Open in a slide-over drawer for quick access and editing

### Item Type Colors (quick reference)

```
● #3b82f6  Snippet   — blue
● #8b5cf6  Prompt    — purple
● #f97316  Command   — orange
● #fde047  Note      — yellow
● #6b7280  File      — gray
● #ec4899  Image     — pink
● #10b981  Link      — emerald
```

### Micro-interactions

- Smooth transitions on all state changes
- Hover states on all cards
- Toast notifications for CRUD actions
- Loading skeletons while data fetches
