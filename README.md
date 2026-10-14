# AriES — Create, Play, and Share AR Worlds

<p align="center">
  <strong>A browser-based studio concept for creating interactive AR books and spatial experiences with visual logic instead of code.</strong>
</p>

<p align="center">
  <a href="https://github.com/th-efool/CongealXR/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/th-efool/CongealXR?style=for-the-badge&logo=github&color=7c3aed"></a>
  <a href="https://github.com/th-efool/CongealXR/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/th-efool/CongealXR?style=for-the-badge&logo=github&color=2563eb"></a>
  <a href="https://github.com/th-efool/CongealXR/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/th-efool/CongealXR?style=for-the-badge&color=f59e0b"></a>
  <a href="https://github.com/th-efool/CongealXR/commits/main"><img alt="Last commit" src="https://img.shields.io/github/last-commit/th-efool/CongealXR?style=for-the-badge&color=10b981"></a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=111827">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="UI" src="https://img.shields.io/badge/UI-shadcn%2Fui-111827?style=flat-square">
  <img alt="Status" src="https://img.shields.io/badge/Status-Prototype-8b5cf6?style=flat-square">
</p>

---

## Overview

**AriES** is a web interface concept for making interactive augmented-reality experiences more approachable. It explores a workflow where creators assemble behavior through connected visual blocks, preview ideas, and organize creations without needing to write application code.

The project brings the product experience into one place: a landing page that explains the concept, a creator studio, an exploration area, reusable templates, previews, and an analytics view. The current repository is primarily a front-end prototype; UI concepts for publishing, spatial interaction, and collaboration should not be interpreted as proof of a production AR runtime or deployed backend.

## Product Areas

- **Visual Creator Studio** — A node/block-based interface concept for composing event, condition, and action logic.
- **Explore** — A discovery-oriented area for browsing sample experiences and ideas.
- **Templates** — A starting point for common creation patterns.
- **Preview** — A dedicated surface for reviewing a creation concept.
- **My Creations** — A space for organizing creator projects.
- **Analytics Dashboard** — A dashboard interface for representing project activity and insights.
- **Responsive Interface** — Layouts styled for desktop and smaller screens.
- **Reusable UI System** — Shared components built with React, Tailwind CSS, and shadcn/ui primitives.

## Technology Stack

| Technology | Role |
| --- | --- |
| [React](https://react.dev/) | Component-based user interface |
| [TypeScript](https://www.typescriptlang.org/) | Typed application code |
| [Vite](https://vite.dev/) | Local development server and production bundling |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/) | Reusable, accessible UI primitives |
| [React Router](https://reactrouter.com/) | Client-side navigation |
| [TanStack Query](https://tanstack.com/query/latest) | Server-state/query tooling configured in the project |
| [Lucide](https://lucide.dev/) and [Iconify](https://iconify.design/) | Interface icons |
| [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) | Test tooling |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) with npm
- Git

The repository also contains Bun lock files, but the steps below use the committed npm lockfile for a straightforward setup.

### Installation

```bash
git clone https://github.com/th-efool/CongealXR.git
cd CongealXR
npm ci
```

### Run the development server

```bash
npm run dev
```

Vite prints a local URL in the terminal (typically `http://localhost:5173`). Open it in a browser.

### Production build

```bash
npm run build
npm run preview
```

### Quality checks

```bash
npm run lint
npm test
```

The test command runs the Vitest suite once. Use `npm run test:watch` to run tests in watch mode.

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Generate the production build |
| `npm run build:dev` | Build using Vite's development mode |
| `npm run preview` | Serve the built output locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests once with Vitest |
| `npm run test:watch` | Run Vitest in watch mode |

## Repository Structure

```text
src/
├── components/
│   ├── global/       # Shared navigation, layout, and footer
│   ├── sections/     # Landing page sections and feature showcases
│   ├── theme/        # Theme-related components
│   └── ui/           # Reusable UI primitives
├── constants/        # Application constants
├── hooks/            # Reusable React hooks
├── lib/              # Shared utilities
├── pages/
│   ├── landing/      # Public landing page
│   └── dashboard/    # Explore, studio, preview, templates, analytics
├── services/         # Reserved structure for API and domain logic
├── store/            # Application state setup
└── test/             # Test setup and examples
```

The project includes additional configuration for TypeScript, Vite, Tailwind CSS, ESLint, and Vitest.

## Current Scope and Limitations

This repository should be treated as a **front-end prototype / product concept**. The interface presents intended workflows for creating and exploring AR-book experiences, but visible screens and illustrative interactions do not necessarily mean the underlying capabilities are production-ready.

Before using the project as a production platform, validate or implement the following:

- A persistent backend for users, creations, and publishing.
- A defined execution/runtime model for visual logic blocks.
- Actual AR rendering and device compatibility, if in scope.
- Multiplayer session synchronization and shared spatial anchors, if in scope.
- Production authentication, authorization, validation, error handling, and observability.
- End-to-end tests for the primary creator and preview workflows.

## Development Notes

- Keep reusable interface elements in `src/components/ui/` and shared application chrome in `src/components/global/`.
- Keep route-level views organized under `src/pages/`.
- Place future API integration and domain logic in `src/services/` rather than coupling it to presentation components.
- Run linting, tests, and a production build before submitting changes.

## Contributing

Contributions and focused improvements are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-change`.
3. Make a scoped change and run the relevant checks.
4. Commit with a descriptive message.
5. Open a pull request explaining the motivation, implementation, and validation performed.

For larger changes, open an issue first to discuss the proposed approach.

## License

No license file was identified in the repository when this README was prepared. Unless a license is added, assume that no permissions beyond applicable default copyright law are granted. Add a `LICENSE` file before explicitly inviting reuse or redistribution.

---

<p align="center">
  <sub>Built as an exploration of no-code creation workflows for augmented and spatial experiences.</sub>
</p>
