# Archie — AI chat & search prototype

A clickable prototype of the **Archie** AI chat feature for the Sidekick Health platform,
built for remote usability testing. Built from the Figma flow (`Archimedes`, node `5387-58744`).

- **Stack:** Next.js (App Router) + React + TypeScript, plain CSS.
- **Design tokens:** Robin design system, `sidekick-mobile` brand, baked into
  `app/globals.css` (see `--background-*`, `--foreground-*`, etc.). Font is Mulish as the
  closest free stand-in for Proxima Nova.
- **Responses are scripted** (canned) for predictable, repeatable testing — no live LLM, no
  clinical-advice risk. The content lives in `lib/conversations.ts` and follows
  `docs/archie-spec.md`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Screens / routes

| Route             | Screen                                                    |
| ----------------- | --------------------------------------------------------- |
| `/`               | Home — "Welcome Beverly" with the Ask Archie entry        |
| `/archie`         | Splash → conversation (the main chat)                     |
| `/archie/history` | Previous conversations (list, edit/delete, empty state)   |

## Test paths worth driving

- **Symptom → cited answer:** "I've been feeling tired after eating" → answer + 3 program
  cards → tap the suggested follow-up "What kind of walk — how long?".
- **Emotional check-in:** "Feeling overwhelmed lately".
- **Boundary / medication:** "Can I take ibuprofen with my metformin?" → decline + redirect.
- **Boundary / diagnosis:** type "Do I have insulin resistance?".

## Swapping in the real Archie logo

`components/ArchieMark.tsx` is a gradient placeholder. Drop the official asset at
`public/archie-logo.svg` and replace the component's SVG with an `<img>`/`next/image`.

## Deploy

Push to GitHub and import into Vercel (zero config), or `npx vercel`. The prototype is fully
static/client-side — no env vars or backend required.

## Reference

`reference/direction-3-sheet-over-discover.html` — the earlier "answer-in-a-sheet" exploration,
kept for context. Not part of the build.
