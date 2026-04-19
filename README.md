# CK Ascend

Personal training operating system for iOS + Android. React Native + Expo.

## Stack

- **Expo SDK 54** (managed workflow) + **Expo Router** (file-based navigation)
- **TypeScript** strict mode
- **Zustand** + `@react-native-async-storage/async-storage` for persisted local state
- **Google Fonts**: Archivo (display) + IBM Plex Mono (data/numbers)
- Targets: iOS, Android, Web (via `react-native-web`)

## Getting started

```bash
npm install
npm run start       # Expo dev server
npm run ios         # iOS simulator (macOS only)
npm run android     # Android emulator
npm run web         # Web preview
```

Install the **Expo Go** app on your phone and scan the QR code from `npm run start` to preview instantly.

## Project structure

```
app/                  # Expo Router screens (file-based)
  _layout.tsx         # Root stack, font loading
  (tabs)/             # Bottom tab group: HOME, TRAIN, QUESTS, EAT, STATS
  event/[id].tsx      # Event detail modal
components/           # Reusable UI (Card, Button, HunterCard, EventBanner, ...)
data/                 # Typed constants: exercises, program, meals, events, quests, dna, profile
lib/                  # Pure logic: xp, readiness, plates, dates
store/useAppStore.ts  # Zustand store with AsyncStorage persistence
theme/                # Design tokens: colors, fonts, spacing, radius
```

## Status

- Project scaffold + theme + data layer
- State store with persistence
- Tab navigation + HOME dashboard
- Event detail screen
- TRAIN tab (Hevy-style logger) — next
- QUESTS tab (daily quests, rank system, event center) — next
- EAT tab (meal plan, AI scanner, grocery, supplements) — next
- STATS tab (body, PRs, DNA) — next

## Backend

Currently local-only. Supabase (Postgres + Auth + Storage + Edge Functions) wiring is deferred until the UI is solid.
