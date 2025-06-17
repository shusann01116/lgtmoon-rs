# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Prerequisites
Install tools via mise (required):
```bash
mise install
```

This installs: Rust 1.86.0, Node 23, pnpm 10.9.0, wasm-pack 0.13.1, lefthook, vercel CLI

### Core Development Workflow
```bash
# Install dependencies
pnpm install

# Build WASM module (required before first dev run and after Rust changes)
pnpm build:wasm

# Start development server
pnpm dev

# Production build
pnpm build

# Type checking
pnpm check-types

# Linting and formatting
cd web-app && pnpm lint    # Biome lint + format
cd web-app && pnpm format  # Biome format only
```

### Testing
```bash
cd web-app && pnpm test:e2e  # Playwright E2E tests
```

### Database Operations
```bash
cd web-app && npx drizzle-kit push      # Push schema changes
cd web-app && npx drizzle-kit generate  # Generate migrations
cd web-app && npx drizzle-kit migrate   # Run migrations
```

### WASM Development
After modifying Rust code in `lgtmoon-core/` or `lgtmoon-wasm/`:
```bash
pnpm build:wasm  # Rebuilds WASM and copies to web-app/public/pkg/
```

## Architecture Overview

### Multi-Workspace Structure
- **Root**: Cargo workspace + pnpm workspace with turbo for task orchestration
- **lgtmoon-core**: Pure Rust library for image processing and text rendering
- **lgtmoon-wasm**: WebAssembly bindings exposing core functionality to JavaScript
- **web-app**: Next.js 15 frontend with full-stack features

### Key Integration Points

#### WASM Integration Flow
1. Rust core (`lgtmoon-core`) handles image processing with `imageproc` and `ab_glyph`
2. WASM bindings (`lgtmoon-wasm`) expose `drawLgtm` function to JavaScript
3. React hook (`use-lgtmoon.ts`) loads WASM module and provides drawing function
4. Components use the hook to process images client-side

#### Dual Storage Architecture
The app uses a hybrid local/cloud storage pattern:
- **Local Storage**: IndexedDB via `use-image-storage.ts` for immediate access
- **Cloud Storage**: Cloudflare R2 via AWS S3 SDK for authenticated users
- **Data Flow**: Local-first → optional cloud upload → unified view in `useImageStorage`

#### Authentication & Database
- **Auth**: NextAuth.js with Google OAuth + Drizzle adapter
- **Database**: PostgreSQL via Neon with Drizzle ORM
- **Schema**: Shared between auth tables (NextAuth) and app tables (images, quotas)

### Environment Configuration
Strict environment validation with Zod schemas:
- **Client env** (`config/env.ts`): Public Next.js vars, WASM paths
- **Server env** (`config/server-env.ts`): Database, R2 credentials, marked with `server-only`

### File Processing Pipeline
1. File upload → `processImage` (canvas resizing)
2. WASM `drawLgtm` → processes image with "L G T M" overlay
3. Local storage → IndexedDB for immediate access
4. Optional cloud upload → R2 with presigned URLs

### Code Quality Tools
- **Biome**: Linting, formatting (replaces ESLint/Prettier)
- **Lefthook**: Git hooks for pre-commit checks
- **TypeScript**: Strict mode with `tsconfig.json`
- **Playwright**: E2E testing

## Important Patterns

### Error Handling
- All async operations return Result-like objects: `{ success: boolean, error?: string }`
- Client-side errors use Sonner toast notifications
- Environment validation throws early with detailed error messages

### Type Safety
- Comprehensive TypeScript coverage including WASM bindings
- Zod schemas for runtime validation
- Drizzle provides type-safe database operations

### Performance Considerations
- WASM runs image processing on main thread (consider Web Workers for large images)
- Local-first architecture reduces server round trips
- Turbo caching for build tasks
- Next.js 15 features for optimization

### Development Notes
- WASM rebuilds are required after any Rust changes
- Database migrations use Drizzle Kit
- Use `mise.toml` for tool version consistency across environments
- Biome configuration in `biome.json` (root and web-app)