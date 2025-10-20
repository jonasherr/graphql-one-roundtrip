# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application built with TypeScript, Vite, and Tailwind CSS v4. The project name "graphql-one-roundtrip" suggests it may be intended for GraphQL-related functionality, though the current implementation is a fresh Vite template.

## Development Commands

```bash
# Start development server with HMR
pnpm dev

# Build for production (runs TypeScript compiler first, then Vite build)
pnpm build

# Run ESLint
pnpm lint

# Preview production build
pnpm preview
```

## Tech Stack

- **React 19.1.1** - UI library with latest features
- **TypeScript 5.9.3** - Type safety
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework (v4 with Vite plugin)
- **ESLint** - Code linting with React hooks and refresh plugins

## Project Structure

```
src/
  main.tsx          # Application entry point with React root
  App.tsx           # Main App component
  index.css         # Global styles and Tailwind imports
  assets/           # Static assets (images, icons, etc.)
```

## Build Configuration

- **Vite config** (`vite.config.ts`): Configured with React plugin and Tailwind CSS Vite plugin
- **TypeScript**: Uses project references with separate configs for app code (`tsconfig.app.json`) and build tooling (`tsconfig.node.json`)
- Main TypeScript config (`tsconfig.json`) references both sub-configs

## Important Notes

- This project uses **pnpm** as the package manager (evidenced by `pnpm-lock.yaml`)
- Tailwind CSS v4 is integrated via the `@tailwindcss/vite` plugin (newer approach than traditional PostCSS setup)
- The build command runs TypeScript compiler (`tsc -b`) before Vite build to ensure type checking
