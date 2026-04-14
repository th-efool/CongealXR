

# Organize Project Folder Structure Following Template

## What we're doing
Adapting the folder structure from `Instructions/2. folder structure/FullStackTemplate-main/src/` into the current React + Vite project at `src/`. Since this is a Vite project (not Next.js), we'll adapt the structure — skipping Next.js-specific patterns like route groups `(auth)`, `(dashboard)`, `layout.tsx`, and server actions.

The user asked to **just initialize the folders first** — so we'll create placeholder files in each directory to establish the structure without implementing any logic.

## Adapted folder structure

Since this is React + Vite (not Next.js), we'll translate the template like this:

```text
src/
├── components/
│   ├── global/          # Global components (Navbar, Footer, etc.)
│   ├── theme/           # Theme provider
│   └── ui/              # Already exists (shadcn)
├── constants/           # App constants
│   └── app.constants.ts
├── hooks/               # Already exists
├── lib/
│   ├── errors/          # Custom error classes
│   ├── utils/           # Utility functions (already has utils.ts)
│   └── validators/      # Zod/validation schemas
├── pages/               # Keep existing pages pattern (React Router)
│   ├── auth/            # Auth pages
│   ├── dashboard/       # Dashboard pages
│   └── landing/         # Landing page
├── services/            # Backend/API service calls (replaces backend/)
│   ├── api/             # API call functions
│   └── domain/          # Domain types
│       ├── user/
│       └── session/
├── store/               # State management (replaces redux/)
│   └── store.ts
└── react-query/         # React Query config
    └── query-client.ts
```

## Steps

1. Create empty placeholder `.gitkeep` or minimal `.ts` files in each new directory:
   - `src/components/global/` — empty placeholder
   - `src/components/theme/` — empty placeholder
   - `src/constants/app.constants.ts` — empty export
   - `src/lib/errors/` — empty placeholder
   - `src/lib/utils/` — empty placeholder (keep existing `lib/utils.ts`)
   - `src/lib/validators/` — empty placeholder
   - `src/pages/auth/` — empty placeholder
   - `src/pages/dashboard/` — empty placeholder
   - `src/pages/landing/` — empty placeholder
   - `src/services/api/` — empty placeholder
   - `src/services/domain/user/` — empty placeholder
   - `src/services/domain/session/` — empty placeholder
   - `src/store/store.ts` — empty store file
   - `src/react-query/query-client.ts` — query client config

2. Each file will just have a comment like `// TODO: implement` or an empty export so the folder is tracked by git.

No existing files will be moved or modified.

