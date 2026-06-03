export type ContentKind = 'text' | 'url' | 'file';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  image: string;
  isPro: boolean;
}

export interface MockItemType {
  id: string;
  name: string;
  label: string;
  icon: string;
  color: string;
  contentKind: ContentKind;
  count: number;
  isSystem: boolean;
  isPro: boolean;
}

export interface MockCollection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  itemTypeIds: string[];
  defaultTypeId: string;
  isFavorite: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockItem {
  id: string;
  title: string;
  description: string;
  content: string;
  contentKind: ContentKind;
  url?: string;
  fileName?: string;
  language?: string;
  tags: string[];
  itemTypeId: string;
  collectionIds: string[];
  isFavorite: boolean;
  isPinned: boolean;
  lastUsedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const currentUser: MockUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'demo@devstash.io',
  image: '',
  isPro: true,
};

export const itemTypes: MockItemType[] = [
  {
    id: 'type-snippet',
    name: 'snippet',
    label: 'Snippets',
    icon: 'Code',
    color: '#3b82f6',
    contentKind: 'text',
    count: 24,
    isSystem: true,
    isPro: false,
  },
  {
    id: 'type-prompt',
    name: 'prompt',
    label: 'Prompts',
    icon: 'Sparkles',
    color: '#8b5cf6',
    contentKind: 'text',
    count: 18,
    isSystem: true,
    isPro: false,
  },
  {
    id: 'type-command',
    name: 'command',
    label: 'Commands',
    icon: 'Terminal',
    color: '#f97316',
    contentKind: 'text',
    count: 15,
    isSystem: true,
    isPro: false,
  },
  {
    id: 'type-note',
    name: 'note',
    label: 'Notes',
    icon: 'StickyNote',
    color: '#fde047',
    contentKind: 'text',
    count: 12,
    isSystem: true,
    isPro: false,
  },
  {
    id: 'type-file',
    name: 'file',
    label: 'Files',
    icon: 'File',
    color: '#6b7280',
    contentKind: 'file',
    count: 5,
    isSystem: true,
    isPro: true,
  },
  {
    id: 'type-image',
    name: 'image',
    label: 'Images',
    icon: 'Image',
    color: '#ec4899',
    contentKind: 'file',
    count: 3,
    isSystem: true,
    isPro: true,
  },
  {
    id: 'type-link',
    name: 'link',
    label: 'Links',
    icon: 'Link',
    color: '#10b981',
    contentKind: 'url',
    count: 8,
    isSystem: true,
    isPro: false,
  },
];

export const collections: MockCollection[] = [
  {
    id: 'collection-react-patterns',
    name: 'React Patterns',
    description: 'Common React patterns and hooks',
    itemCount: 12,
    itemTypeIds: ['type-snippet', 'type-note', 'type-link'],
    defaultTypeId: 'type-snippet',
    isFavorite: true,
    color: '#3b82f6',
    createdAt: '2026-01-08T10:00:00.000Z',
    updatedAt: '2026-01-15T13:20:00.000Z',
  },
  {
    id: 'collection-python-snippets',
    name: 'Python Snippets',
    description: 'Useful Python code snippets',
    itemCount: 8,
    itemTypeIds: ['type-snippet', 'type-note'],
    defaultTypeId: 'type-snippet',
    isFavorite: false,
    color: '#3b82f6',
    createdAt: '2026-01-07T09:30:00.000Z',
    updatedAt: '2026-01-14T16:45:00.000Z',
  },
  {
    id: 'collection-context-files',
    name: 'Context Files',
    description: 'AI context files for projects',
    itemCount: 5,
    itemTypeIds: ['type-file', 'type-note'],
    defaultTypeId: 'type-file',
    isFavorite: true,
    color: '#6b7280',
    createdAt: '2026-01-06T11:15:00.000Z',
    updatedAt: '2026-01-13T15:10:00.000Z',
  },
  {
    id: 'collection-interview-prep',
    name: 'Interview Prep',
    description: 'Technical interview preparation',
    itemCount: 24,
    itemTypeIds: ['type-note', 'type-snippet', 'type-link', 'type-prompt'],
    defaultTypeId: 'type-note',
    isFavorite: false,
    color: '#fde047',
    createdAt: '2026-01-05T14:25:00.000Z',
    updatedAt: '2026-01-12T18:30:00.000Z',
  },
  {
    id: 'collection-git-commands',
    name: 'Git Commands',
    description: 'Frequently used git commands',
    itemCount: 15,
    itemTypeIds: ['type-command', 'type-note'],
    defaultTypeId: 'type-command',
    isFavorite: true,
    color: '#f97316',
    createdAt: '2026-01-04T08:45:00.000Z',
    updatedAt: '2026-01-11T12:05:00.000Z',
  },
  {
    id: 'collection-ai-prompts',
    name: 'AI Prompts',
    description: 'Curated AI prompts for coding',
    itemCount: 18,
    itemTypeIds: ['type-prompt', 'type-snippet', 'type-note'],
    defaultTypeId: 'type-prompt',
    isFavorite: false,
    color: '#8b5cf6',
    createdAt: '2026-01-03T12:00:00.000Z',
    updatedAt: '2026-01-10T17:35:00.000Z',
  },
];

export const items: MockItem[] = [
  {
    id: 'item-use-auth-hook',
    title: 'useAuth Hook',
    description: 'Custom authentication hook for React applications',
    content:
      'export function useAuth() {\n  const user = useUser();\n  return { user, isAuthenticated: Boolean(user) };\n}',
    contentKind: 'text',
    language: 'typescript',
    tags: ['react', 'auth', 'hooks'],
    itemTypeId: 'type-snippet',
    collectionIds: ['collection-react-patterns'],
    isFavorite: true,
    isPinned: true,
    lastUsedAt: '2026-01-15T09:30:00.000Z',
    createdAt: '2026-01-09T10:30:00.000Z',
    updatedAt: '2026-01-15T09:30:00.000Z',
  },
  {
    id: 'item-api-error-handling-pattern',
    title: 'API Error Handling Pattern',
    description: 'Fetch wrapper with exponential backoff retry logic',
    content:
      'async function fetchWithRetry(url: string, retries = 3) {\n  try {\n    return await fetch(url);\n  } catch (error) {\n    if (retries === 0) throw error;\n    return fetchWithRetry(url, retries - 1);\n  }\n}',
    contentKind: 'text',
    language: 'typescript',
    tags: ['api', 'errors', 'retry'],
    itemTypeId: 'type-snippet',
    collectionIds: ['collection-react-patterns', 'collection-interview-prep'],
    isFavorite: false,
    isPinned: true,
    lastUsedAt: '2026-01-12T14:10:00.000Z',
    createdAt: '2026-01-08T15:45:00.000Z',
    updatedAt: '2026-01-12T14:10:00.000Z',
  },
  {
    id: 'item-component-refactor-prompt',
    title: 'Component Refactor Prompt',
    description: 'Prompt for improving React component structure',
    content:
      'Review this component for readability, state management, accessibility, and unnecessary re-renders. Suggest focused improvements without changing behavior.',
    contentKind: 'text',
    tags: ['ai', 'react', 'refactor'],
    itemTypeId: 'type-prompt',
    collectionIds: ['collection-ai-prompts', 'collection-react-patterns'],
    isFavorite: true,
    isPinned: false,
    lastUsedAt: '2026-01-11T11:40:00.000Z',
    createdAt: '2026-01-05T16:20:00.000Z',
    updatedAt: '2026-01-11T11:40:00.000Z',
  },
  {
    id: 'item-git-undo-last-commit',
    title: 'Undo Last Git Commit',
    description: 'Keep local changes while removing the latest commit',
    content: 'git reset --soft HEAD~1',
    contentKind: 'text',
    tags: ['git', 'undo', 'commit'],
    itemTypeId: 'type-command',
    collectionIds: ['collection-git-commands'],
    isFavorite: true,
    isPinned: false,
    lastUsedAt: '2026-01-10T10:15:00.000Z',
    createdAt: '2026-01-04T10:00:00.000Z',
    updatedAt: '2026-01-10T10:15:00.000Z',
  },
  {
    id: 'item-system-design-notes',
    title: 'System Design Notes',
    description: 'High-level checklist for API and database design interviews',
    content:
      'Clarify requirements, estimate scale, define APIs, model data, identify bottlenecks, and discuss tradeoffs.',
    contentKind: 'text',
    tags: ['interview', 'system-design', 'notes'],
    itemTypeId: 'type-note',
    collectionIds: ['collection-interview-prep'],
    isFavorite: false,
    isPinned: false,
    lastUsedAt: '2026-01-09T13:00:00.000Z',
    createdAt: '2026-01-03T09:10:00.000Z',
    updatedAt: '2026-01-09T13:00:00.000Z',
  },
  {
    id: 'item-nextjs-docs',
    title: 'Next.js App Router Docs',
    description: 'Official App Router documentation',
    content: '',
    contentKind: 'url',
    url: 'https://nextjs.org/docs/app',
    tags: ['nextjs', 'docs', 'app-router'],
    itemTypeId: 'type-link',
    collectionIds: ['collection-react-patterns'],
    isFavorite: false,
    isPinned: false,
    lastUsedAt: '2026-01-08T17:25:00.000Z',
    createdAt: '2026-01-02T12:30:00.000Z',
    updatedAt: '2026-01-08T17:25:00.000Z',
  },
  {
    id: 'item-project-context',
    title: 'Project Context',
    description: 'Reusable AI context file for project setup and decisions',
    content: '',
    contentKind: 'file',
    fileName: 'project-context.md',
    tags: ['context', 'ai', 'project'],
    itemTypeId: 'type-file',
    collectionIds: ['collection-context-files'],
    isFavorite: true,
    isPinned: false,
    lastUsedAt: '2026-01-07T08:50:00.000Z',
    createdAt: '2026-01-01T11:00:00.000Z',
    updatedAt: '2026-01-07T08:50:00.000Z',
  },
];
