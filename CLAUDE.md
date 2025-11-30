# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Contéo** est une application mobile qui génère des histoires personnalisées pour enfants. L'enfant choisit ses personnages, objets et décors préférés, et l'app génère une histoire unique avec :
- Texte de l'histoire
- Narration audio
- Illustrations visuelles générées

Ce repository contient la **landing page** de l'application.

## Figma Design Reference

**Fichier Figma** : `https://www.figma.com/design/WZXy7PCrfeosTVC1MPxqvQ/Contéo--Copy-`

### Design System (extrait du Figma)

#### Couleurs
```css
--conteo-dark: #2a2a42;        /* Fond principal sombre (violet foncé) */
--conteo-accent: #c9f560;      /* Vert lime - CTAs, accents, logo */
--conteo-secondary: #6a5ae0;   /* Violet - éléments sélectionnés, liens */
--conteo-light: #efeefc;       /* Fond clair des cartes */
--conteo-text-muted: #858494;  /* Texte secondaire */
```

#### Typographie
- **Nunito ExtraBold (800)** : Logo "Contéo", titres principaux
- **Rubik (400, 500, 600)** : Corps de texte, boutons, descriptions

#### Style visuel
- Coins arrondis : `20px` (boutons), `32px` (cartes/containers)
- Illustrations 3D mignonnes d'animaux (vache, renard, grenouille, ourson, etc.)
- Style playful et enfantin
- Ombres douces

## Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **React**: React 19 with Server Components (default) and React Compiler enabled
- **Styling**: Tailwind CSS 4 with CSS variables theming
- **Components**: shadcn/ui (New York style, RSC-enabled)
- **Icons**: Lucide React
- **Type Safety**: TypeScript 5 in strict mode

## Architecture

### Path Aliases
- `@/*` → `./src/*` (use for all imports)

### Component Structure
```
src/components/
├── sections/           # Page sections
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── HowItWorksSection.tsx
│   └── Footer.tsx
├── shared/             # Reusable components
│   ├── Logo.tsx
│   ├── AppStoreBadges.tsx
│   ├── FeatureCard.tsx
│   └── StepCard.tsx
└── ui/                 # shadcn/ui components
```

### Key Files
- `src/app/globals.css` - Design system CSS variables (couleurs Contéo)
- `src/app/layout.tsx` - Fonts Nunito + Rubik configuration
- `src/app/page.tsx` - Landing page assembly

### Styling Conventions
- Use `cn()` from `@/lib/utils` for conditional/merged classNames
- Use Tailwind classes with Contéo colors: `bg-conteo-dark`, `text-conteo-accent`, etc.
- Server Components by default (no "use client" needed for static content)

## MCP Integrations

Project has MCP servers configured for:

- **shadcn**: Component library operations
- **next-devtools**: Next.js development tools
- **figma**: Design integration (Contéo design file)
- **playwright**: Browser automation

### Figma MCP server rules

- The Figma MCP server provides an assets endpoint which can serve image and SVG assets
- IMPORTANT: If the Figma MCP server returns a localhost source for an image or an SVG, use that image or SVG source directly
- IMPORTANT: DO NOT import/add new icon packages, all the assets should be in the Figma payload
- IMPORTANT: do NOT use or create placeholders if a localhost source is provided
- Les assets Figma (personnages 3D) sont configurés dans `next.config.ts` pour le domaine `www.figma.com`
