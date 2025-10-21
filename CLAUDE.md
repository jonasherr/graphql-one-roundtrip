# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a conference talk demo application showcasing GraphQL performance optimization patterns. The project demonstrates three progressive approaches to GraphQL optimization using the GitHub GraphQL API:

1. **Commit 1** (311cf2e): Waterfall pattern showing 11+ sequential requests
2. **Commit 2** (fbc0581): Fragment colocation with masking, reducing to 1 request per page
3. **Commit 3** (ee45e54): Normalized cache enabling automatic UI updates after mutations

The application displays GitHub repositories with user profiles, programming languages, pinned repositories, and issues, with functionality to star/unstar repositories.

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

# Generate GraphQL types from schema
pnpm schema:generate
```

## Tech Stack

- **React 19.1.1** - UI library with latest features
- **TypeScript 5.9.3** - Type safety with strict null checks
- **Vite 7.1.7** - Build tool and dev server with HMR
- **Tailwind CSS 4.1.14** - Utility-first CSS framework (v4 with Vite plugin)
- **URQL 5.0.1** - GraphQL client with normalized caching
- **gql.tada 1.8.13** - Type-safe GraphQL with TypeScript inference (no codegen)
- **@urql/exchange-graphcache 8.1.0** - Normalized caching for URQL
- **React Router 7.9.4** - Client-side routing
- **ESLint** - Code linting with React hooks and refresh plugins

## Project Structure

```
src/
├── components/          # React components with colocated GraphQL fragments
│   ├── UserProfile.tsx       # Main user profile with @_unmask directive
│   ├── UserStats.tsx         # Followers, following, repos count
│   ├── UserLanguages.tsx     # Programming languages from repositories
│   ├── UserPinnedRepos.tsx   # User's pinned repositories
│   ├── RepositoryCard.tsx    # Repository card display
│   ├── RepositoryGrid.tsx    # Grid layout for repositories
│   ├── RepositoryHeader.tsx  # Repository header with star button
│   ├── IssueList.tsx         # List of repository issues
│   ├── IssueItem.tsx         # Individual issue display
│   └── StarButton.tsx        # Star/unstar mutation button
├── pages/               # Page-level components with composed queries
│   ├── HomePage.tsx          # Main page with user profile and repos
│   └── RepositoryPage.tsx    # Repository detail page with issues
├── graphql/             # GraphQL configuration and schema
│   ├── client.ts             # URQL client with Graphcache setup
│   ├── schema.graphql        # GitHub GraphQL API schema (70k+ lines)
│   └── graphql-env.d.ts      # gql.tada generated types
├── graphql.ts           # gql.tada initialization with custom scalars
├── main.tsx             # Application entry point
├── App.tsx              # Root component with routing
└── index.css            # Global styles and Tailwind imports
```

## Build Configuration

- **Vite config** (`vite.config.ts`): Configured with React plugin and Tailwind CSS Vite plugin
- **TypeScript**: Uses project references with separate configs:
  - `tsconfig.app.json`: App code configuration with gql.tada plugin
  - `tsconfig.node.json`: Build tooling configuration
  - `tsconfig.json`: Main config referencing both sub-configs
- The build command runs TypeScript compiler (`tsc -b`) before Vite build to ensure type checking

## GraphQL Configuration

### gql.tada Setup
- TypeScript plugin configured in `tsconfig.app.json`
- Schema located at `src/graphql/schema.graphql`
- Types generated to `src/graphql/graphql-env.d.ts`
- Custom scalars configured: DateTime, URI, HTML, GitObjectID, GitTimestamp, X509Certificate

### URQL Client
- Configured with Graphcache for normalized caching
- Uses GitHub GraphQL API v4 at `https://api.github.com/graphql`
- Authentication via bearer token from `VITE_GITHUB_TOKEN` environment variable

### Fragment Patterns
- **Child components**: Use `readFragment()` to unwrap masked fragment data
- **Parent components**: Use `@_unmask` directive to access own fields directly
- **Props naming**: All components receive `data` prop (not domain-specific names)
- **Fragment masking**: Enabled by default, prevents data leakage between components

## Environment Setup

The application requires a `.env.local` file with:

```bash
VITE_GITHUB_TOKEN=your_github_personal_access_token
VITE_GITHUB_USERNAME=your_github_username
```

To create a GitHub personal access token:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `read:user` and `repo` scopes
3. Copy the token to `.env.local`

## Important Notes

- This project uses **pnpm** as the package manager (evidenced by `pnpm-lock.yaml`)
- Tailwind CSS v4 is integrated via the `@tailwindcss/vite` plugin (newer approach than traditional PostCSS setup)
- Fragment masking is a key feature - always use `readFragment()` in child components
- All GraphQL operations are type-safe with gql.tada's TypeScript inference
- The project demonstrates three commits for a conference talk demo
- Normalized cache automatically updates UI after mutations (no refetch needed)

## Conference Talk Demo Flow

When working on this project, be aware of the three-phase demonstration:

1. **Phase 1** (Commit 1): Multiple components with independent queries creating waterfalls
2. **Phase 2** (Commit 2): Fragment colocation eliminating waterfalls, 1 request per page
3. **Phase 3** (Commit 3): Normalized cache with automatic updates after star/unstar mutations

The current main branch includes all optimizations plus TypeScript null-safety improvements.

## GraphQL Patterns Used

### Fragment Colocation
- Each component defines its data requirements as a GraphQL fragment
- Page queries compose child fragments using spread syntax
- Fragment masking prevents components from accessing fields they didn't request

### Normalized Cache
- Entities normalized by their `id` field automatically
- Mutations return updated fields to trigger cache updates
- No manual cache invalidation required
- Instant UI updates across all components displaying the same data

### Type Safety
- Full TypeScript inference from GraphQL schema via gql.tada
- No code generation step required
- Compile-time type checking for all queries and mutations
- IDE autocomplete for GraphQL operations
