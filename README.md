# GraphQL One Roundtrip

A conference talk demo application showcasing GraphQL performance optimization patterns using the GitHub GraphQL API.

## Overview

This project demonstrates three progressive approaches to GraphQL query optimization:

1. **Waterfall Pattern** (Commit 1) - Shows the performance problem with 11+ sequential requests
2. **Fragment Colocation** (Commit 2) - Eliminates waterfalls by colocating fragments with components
3. **Normalized Cache** (Commit 3) - Enables automatic UI updates after mutations without refetching

The application displays GitHub repositories with user profiles, languages, pinned repos, and issues, featuring the ability to star/unstar repositories.

## Tech Stack

- **React 19.1.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first styling
- **URQL 5.0.1** - GraphQL client
- **gql.tada 1.8.13** - Type-safe GraphQL with TypeScript inference
- **@urql/exchange-graphcache 8.1.0** - Normalized caching
- **React Router 7.9.4** - Client-side routing

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure GitHub Token

Create a `.env.local` file in the project root:

```bash
VITE_GITHUB_TOKEN=your_github_personal_access_token
VITE_GITHUB_USERNAME=your_github_username
```

To create a GitHub personal access token:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `read:user` and `repo` scopes
3. Copy the token to your `.env.local` file

### 3. Start Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

## Demo Structure

This project uses git commits to demonstrate the progressive optimization:

### Commit 1: Initial Waterfall Pattern
```bash
git checkout 311cf2e
```
Shows the performance problem with multiple sequential GraphQL requests (11+ waterfalls).

### Commit 2: Fragment Colocation with Masking
```bash
git checkout fbc0581
```
Demonstrates fragment colocation pattern using gql.tada's fragment masking, reducing to 1 request per page.

### Commit 3: Normalized Cache
```bash
git checkout ee45e54
```
Shows normalized caching with Graphcache, enabling automatic UI updates after mutations without refetch.

### Latest: TypeScript Fixes
```bash
git checkout main
```
Includes null-safety improvements and proper type handling.

## Features Demonstrated

### Fragment Colocation
- Components define their own data requirements as GraphQL fragments
- Parent queries compose child fragments
- Fragment masking prevents data leakage between components
- Eliminates GraphQL waterfall problem

### Normalized Cache
- Automatic cache updates after mutations
- Instant UI updates when starring/unstarring repositories
- No manual cache invalidation needed
- Entities normalized by ID

### Type Safety
- Full TypeScript inference from GraphQL schema
- gql.tada provides compile-time type checking
- No code generation required
- Autocomplete for GraphQL queries

## Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint

# Preview production build
pnpm preview

# Generate GraphQL types
pnpm schema:generate
```

## Project Structure

```
src/
├── components/          # React components with colocated fragments
│   ├── UserProfile.tsx
│   ├── UserStats.tsx
│   ├── UserLanguages.tsx
│   ├── UserPinnedRepos.tsx
│   ├── RepositoryCard.tsx
│   ├── RepositoryGrid.tsx
│   ├── RepositoryHeader.tsx
│   ├── IssueList.tsx
│   ├── IssueItem.tsx
│   └── StarButton.tsx
├── pages/               # Page-level components with composed queries
│   ├── HomePage.tsx
│   └── RepositoryPage.tsx
├── graphql/             # GraphQL client configuration
│   ├── client.ts
│   ├── schema.graphql
│   └── graphql-env.d.ts
└── graphql.ts           # gql.tada initialization
```

## Conference Talk Flow

1. **Show the Problem** - Demo commit 1, open Network tab, show 11+ sequential requests
2. **Introduce Fragment Colocation** - Show commit 2, demonstrate 1 request per page
3. **Add Normalized Cache** - Show commit 3, star a repository, show instant UI update
4. **Explain Benefits** - Type safety, performance, developer experience

## License

MIT
