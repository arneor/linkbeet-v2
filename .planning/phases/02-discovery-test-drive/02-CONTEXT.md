# Phase 2 — Discovery Validation (Test Drive)

This phase overrides the roadmap's standard Auth phase to quickly validate the Apple-inspired design system (`DESIGN.md`) built in Phase 1. It acts as a rapid prototype for the Web Discovery screen (`web/src/app/(discovery)/page.tsx` or similar), implementing mock data to prove out the shared UI components and layout foundations.

## Decisions

<decisions>

### UI Layout & Composition
- **AppShell Integration**: The page will be wrapped in the `AppShell` component built in Phase 1.
- **Hero Section**: A high-impact, Apple-style hero showing pure black background (`.section-dark`) and very large, tracked-tight text (using `displayHero` tokens) to test Inter optical sizing.
- **Search Placement**: Floating search bar (ChatGPT/Perplexity style) taking center stage.
- **Mock Feed**: A rhythmic alternating section (light gray `.section-light`) underneath containing a grid of mocked "Profile Cards" to test the borderless `Card`, `Badge`, and `Avatar` components.

### Interactions & Tokens
- **Focus States**: Apple Blue (`#0071e3`) focus rings on the search input and buttons.
- **Typography Density**: Validation of the negative letter-spacing and strict hierarchical type scale.
- **No Mobile-specific Build**: This phase focuses exclusively on the Web environment (`web/src/app`) to rapidly test the visuals. The full Discovery phase (Phase 3) will later build the exhaustive cross-platform versions.

</decisions>

## Specifics

<specifics>
- Only mock data will be used. No backend wiring is required.
- The goal is high-fidelity aesthetics over functional routing. Make it look like a premium Apple product launch page that transitions into a web app.
</specifics>

## Canonical References
- `DESIGN.md` — Core design system rules.
