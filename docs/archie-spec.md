# Archie — response spec (source of truth)

Transcribed from the Figma flow (`Archimedes`, node `5387-58744`). These rules drive
every scripted response in `lib/conversations.ts`.

## Response anatomy (in order)

1. **Answer text** — 2–4 sentences. Warm, plain language. Acknowledges the feeling or
   situation first, then gives guidance. Never starts with "I". Never gives a diagnosis or a
   recommendation outside program content.
2. **Transition line** — bridges the answer to the cards. One of:
   - "I found these in your program:"
   - "Your program has something on this:"
   - "Here's where to go next:"
3. **Mission cards (1–3 max)** — each card has:
   - content-type icon, colour-coded: **green = exercise · amber = article · blue = audio/lesson**
   - mission name (primary label)
   - content type + duration (secondary label)
   - quest name + week (provenance, shown in blue)
   - full-width tappable → opens the mission
4. **Persistent disclaimer** — every response, no exceptions:
   _"Archie answers from your program only · not medical advice"_
5. **Follow-up input** — always visible. Placeholder: "Ask Archie…"

## Follow-up behaviour

- Shorter than the first response (1–2 sentences max)
- Reference the same mission cards where relevant — don't introduce new content unless the
  follow-up genuinely requires it
- Never contradict the first response
- Always include the disclaimer

## Out-of-scope (medication / diagnosis / anything clinical / outside program)

Archie declines and redirects, then offers two options.

- **Medication** (highest risk) — e.g. "Can I take ibuprofen with my metformin?"
  → decline, point to doctor/pharmacist + care team. Options: _Contact my care team_ / _Ask me something else_.
- **Diagnosis seeking** — e.g. "Do I have insulin resistance?"
  → decline to diagnose, point to doctor. Options: _Find something in my program_ / _Ask me something else_.
- **Outside program scope** — e.g. "What's the best diet for weight loss?", "Recommend a physio near me",
  "What does my blood test result mean?" → decline, offer to browse the library / ask something else.

## Screens in the flow

1. **Launch from home** — "Welcome Beverly!" with an "Ask Archie" entry card.
2. **Splash / starting conversation** — "Hi Beverly, how's it going?" + suggestion chips + composer.
3. **Conversation** — user bubbles + Archie answers (anatomy above) + thinking/searching states.
4. **Out-of-scope responses** — refusal + redirect options.
5. **Previous conversations (History)** — grouped list, edit/delete, empty state.
