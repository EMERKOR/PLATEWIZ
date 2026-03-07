# PLATE WIZ App

## Project Overview
PLATE WIZ is a trivia and wordplay puzzle game built around US license plates. Companion app for an original primetime game show format. Must work as a web demo (pitch meetings) and eventually an iOS App Store product from the same codebase.

## Architecture Rules (non-negotiable)
- **Three-layer separation**: Theme (config/theme.json) controls visuals. Content (content/*.json) controls game data. Logic (lib/*.ts, components/*.tsx) controls behavior. These are independently editable.
- **No hardcoded visual values**: Every color, font size, spacing, border radius, shadow, and animation duration comes from theme.json via the useTheme() hook. If I can't change it by editing theme.json, it's a bug.
- **Offline-first**: All content is bundled. No network requests for gameplay.
- **Web-first development**: Must work in browser via expo start --web. iOS packaging comes later.

## Tech Stack
- React Native + Expo (with Expo Router for file-based routing)
- TypeScript (strict mode)
- NativeWind (Tailwind for RN)
- React Native Reanimated for animations
- No external backend for MVP. All content is bundled JSON.

## Key Files
- `docs/APP_TECHNICAL_SPECIFICATION.md` — Full spec. Read this before building anything. Defines game modes, data schemas, theme system, screen flows, and build phases.
- `docs/ENCODING_GRAMMAR.md` — Vanity plate puzzle generation rules. For Phase 2/3.
- `docs/CURATED_PLATE_INDEX.json` — Plate image sources by state. For Phase 2.
- `content/states/*.json` — 51 state metadata files (slogans, symbols, colors, facts). Real content, not placeholders.
- `content/states/_all_states.json` — Combined state metadata.
- `config/theme.json` — All visual properties. Creator edits this directly.

## Project Structure
```
plate-wiz-app/
├── app/                    # Expo Router screens
│   ├── (tabs)/             # Tab navigator (Home, Play, Daily, Stats)
│   ├── game/               # Game mode screens
│   └── _layout.tsx         # Root layout
├── components/             # Reusable UI components
│   ├── plates/             # Plate rendering components
│   ├── game/               # Game UI (timer, score, answer input)
│   └── ui/                 # Buttons, cards, modals
├── config/
│   ├── theme.json          # EDITABLE: All visual properties
│   └── game-config.json    # EDITABLE: Game mode parameters
├── content/                # EDITABLE: All puzzle data
│   ├── vanity-puzzles.json
│   ├── trivia-questions.json
│   ├── observation-puzzles.json
│   ├── logic-puzzles.json
│   └── states/             # Per-state metadata
├── assets/
│   ├── plates/             # Plate images
│   ├── fonts/
│   └── icons/
├── lib/                    # Game logic, scoring, utilities
│   ├── game-engine.ts
│   ├── scoring.ts
│   ├── plate-renderer.ts
│   └── content-loader.ts
└── types/                  # TypeScript interfaces
```

## Build Phases
- Phase 1: Foundation (scaffolding, theme system, content loader, plate renderer)
- Phase 2: Game modes (vanity decoder, trivia, observation, logic)
- Phase 3: Polish (home screen, daily challenges, stats, demo mode)
- Phase 4: Distribution (iOS build, App Store, optional backend)

## Current Phase: 1
