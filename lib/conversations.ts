/* ============================================================
   Scripted content for the Archie usability-test prototype.
   Every response follows the Figma "Archie response spec":
   answer text → transition line → 1-3 mission cards → disclaimer.
   Out-of-scope prompts decline + redirect (no clinical advice).
   See docs/archie-spec.md.
   ============================================================ */

export const DISCLAIMER = "Archie answers from your program only · not medical advice";

export type ContentType = "exercise" | "article" | "audio" | "lesson";

export interface MissionCard {
  id: string;
  title: string;
  typeLabel: string; // e.g. "Article"
  contentType: ContentType; // drives the meta icon
  duration: string; // "4 mins"
  quest: string; // "Type 2 Diabetes"
  week: string; // "Week 2"
  img: string; // photo thumbnail (placeholder asset)
}

const A = "/assets";

export const MISSIONS: Record<string, MissionCard> = {
  "post-meal-movement": {
    id: "post-meal-movement",
    title: "Post-meal movement guide",
    typeLabel: "Exercise",
    contentType: "exercise",
    duration: "5 mins",
    quest: "Type 2 Diabetes",
    week: "Week 2",
    img: `${A}/Sit-to-stand progression img.png`,
  },
  "why-blood-sugar": {
    id: "why-blood-sugar",
    title: "Why blood sugar affects energy",
    typeLabel: "Article",
    contentType: "article",
    duration: "4 mins",
    quest: "Type 2 Diabetes",
    week: "Week 1",
    img: `${A}/Low-glycaemic meal ideas img.png`,
  },
  "plate-ordering": {
    id: "plate-ordering",
    title: "Plate ordering for steady energy",
    typeLabel: "Mini lesson",
    contentType: "lesson",
    duration: "3 mins",
    quest: "Type 2 Diabetes",
    week: "Week 3",
    img: `${A}/Plate ordering for steady energy img.png`,
  },
  "gentle-mobility": {
    id: "gentle-mobility",
    title: "Gentle mobility for your back",
    typeLabel: "Exercise",
    contentType: "exercise",
    duration: "8 mins",
    quest: "Physical Activity",
    week: "Week 1",
    img: `${A}/Gentle resistance_ standing series img.png`,
  },
  "why-movement": {
    id: "why-movement",
    title: "Why movement beats rest",
    typeLabel: "Article",
    contentType: "article",
    duration: "4 mins",
    quest: "Physical Activity",
    week: "Week 2",
    img: `${A}/Bone strengthening basics img.png`,
  },
  "breathing-reset": {
    id: "breathing-reset",
    title: "A 3-minute breathing reset",
    typeLabel: "Audio",
    contentType: "audio",
    duration: "3 mins",
    quest: "Mental Well-being",
    week: "Week 1",
    img: `${A}/Guided breathing for calm img.png`,
  },
};

export interface ArchieReply {
  kind: "answer" | "refusal";
  text: string[]; // paragraphs
  transition?: string; // bridge to the cards
  cards?: string[]; // mission ids
  actions?: string[]; // refusal redirect options
}

export interface Turn {
  user: string;
  searching?: boolean; // "Searching…" with thumbnails vs plain "Thinking…"
  reply: ArchieReply;
}

export interface Conversation {
  id: string;
  prompt: string; // first user message (also the history title)
  turns: Turn[];
}

export const CONVERSATIONS: Record<string, Conversation> = {
  "tired-after-eating": {
    id: "tired-after-eating",
    prompt: "I've been feeling really tired after eating again",
    turns: [
      {
        user: "I've been feeling really tired after eating again",
        searching: true,
        reply: {
          kind: "answer",
          text: [
            "Feeling tired after meals is really common with Type 2 diabetes — it can be your body's response to blood sugar changes after eating. A short walk after eating, or adjusting what you eat first on your plate, can make a real difference.",
          ],
          transition: "I found these in your program:",
          cards: ["post-meal-movement", "why-blood-sugar", "plate-ordering"],
        },
      },
      {
        user: "What kind of walk — how long?",
        reply: {
          kind: "answer",
          text: [
            "Even 10 minutes makes a real difference. Your program suggests walking within 30 minutes of finishing your meal — it doesn't need to be fast, just moving helps your body manage blood sugar more steadily.",
          ],
          transition: "Here's where to go next:",
          cards: ["post-meal-movement"],
        },
      },
    ],
  },

  "lower-back-pain": {
    id: "lower-back-pain",
    prompt: "I've been experiencing lower back pain",
    turns: [
      {
        user: "I've been experiencing lower back pain",
        searching: true,
        reply: {
          kind: "answer",
          text: [
            "When your back is sore it's tempting to rest completely, but gentle movement usually helps more. Slow stretches and short walks through the day keep things from stiffening up. If the pain turns sharp or starts to spread, that's worth raising with your care team.",
          ],
          transition: "Here's where to go next:",
          cards: ["gentle-mobility", "why-movement"],
        },
      },
    ],
  },

  "feeling-overwhelmed": {
    id: "feeling-overwhelmed",
    prompt: "Feeling overwhelmed lately",
    turns: [
      {
        user: "Feeling overwhelmed lately",
        reply: {
          kind: "answer",
          text: [
            "That sounds like a lot to be carrying right now. When everything piles up at once, a small reset can help your body settle before you take on the rest. Be gentle with yourself today — you don't have to fix it all in one go.",
          ],
          transition: "Your program has something on this:",
          cards: ["breathing-reset"],
        },
      },
    ],
  },

  /* --- Out-of-scope: medication --- */
  ibuprofen: {
    id: "ibuprofen",
    prompt: "Can I take ibuprofen with my metformin?",
    turns: [
      {
        user: "Can I take ibuprofen with my metformin?",
        reply: {
          kind: "refusal",
          text: [
            "That's not something I can help with — medication interactions need to come from your doctor or pharmacist, not from me. I only share guidance from your Sidekick program content.",
            "Your care team is the right place for this one.",
          ],
          actions: ["Contact my care team", "Ask me something else"],
        },
      },
    ],
  },

  /* --- Out-of-scope: diagnosis seeking --- */
  "insulin-resistance": {
    id: "insulin-resistance",
    prompt: "Do I have insulin resistance?",
    turns: [
      {
        user: "Do I have insulin resistance?",
        reply: {
          kind: "refusal",
          text: [
            "I'm not able to give any kind of diagnosis — that's really important to discuss with your doctor. What I can do is point you to what your program covers about blood sugar and energy.",
            "Want me to find something relevant in your program instead?",
          ],
          actions: ["Find something in my program", "Ask me something else"],
        },
      },
    ],
  },
};

/* Suggestion pills shown on the splash, in two auto-scrolling rows.
   `icon` is an asset in /public/assets. (Icon→prompt mapping is a best
   guess from the supplied SVGs; easy to swap.) */
export interface SplashPill {
  label: string;
  icon: string;
  conversationId: string;
}

export const SPLASH_ROW_1: SplashPill[] = [
  { label: "Feeling overwhelmed lately", icon: "/assets/pill-overwhelmed.svg", conversationId: "feeling-overwhelmed" },
  { label: "I need help sleeping better", icon: "/assets/pill-sleep.svg", conversationId: "feeling-overwhelmed" },
  { label: "Tired after eating lately", icon: "/assets/pill-tired.svg", conversationId: "tired-after-eating" },
];

export const SPLASH_ROW_2: SplashPill[] = [
  { label: "Struggling to stay motivated", icon: "/assets/pill-motivated.svg", conversationId: "feeling-overwhelmed" },
  { label: "Quick exercises I can do at home", icon: "/assets/pill-exercise.svg", conversationId: "lower-back-pain" },
  { label: "My joints have been really stiff", icon: "/assets/pill-joints.svg", conversationId: "lower-back-pain" },
];

/* Route free-typed text to the closest scripted conversation. */
export function routeQuery(text: string): string {
  const t = text.toLowerCase();
  if (/ibuprofen|metformin|medication|tablet|pill|dose|insulin pen|inject/.test(t)) return "ibuprofen";
  if (/diagnos|insulin resistance|do i have|is this normal|something serious|something worse/.test(t)) return "insulin-resistance";
  if (/overwhelm|stress|anxious|down|burnt out|too much/.test(t)) return "feeling-overwhelmed";
  if (/back|spine|posture/.test(t)) return "lower-back-pain";
  if (/tired|fatigue|energy|sleepy|after eating|after meals|sugar/.test(t)) return "tired-after-eating";
  return "tired-after-eating"; // sensible default for the demo
}

/* ---- History (Previous conversations) ---- */
export interface HistoryEntry {
  id: string;
  title: string;
  preview: string;
  messages: number;
  time: string;
  group: "Today" | "Yesterday" | "Last week";
}

export const HISTORY: HistoryEntry[] = [
  {
    id: "tired-after-eating",
    title: "I've been feeling really tired after eating…",
    preview: "Archie: Feeling tired after meals is really…",
    messages: 3,
    time: "Today, 14:32",
    group: "Today",
  },
  {
    id: "lower-back-pain",
    title: "I've been experiencing lower back pain",
    preview: "Archie: Gentle movement usually helps m…",
    messages: 2,
    time: "Today, 11:15",
    group: "Today",
  },
  {
    id: "feeling-overwhelmed",
    title: "Feeling overwhelmed lately",
    preview: "Archie: That sounds like a lot to carry rig…",
    messages: 3,
    time: "Yesterday, 20:07",
    group: "Yesterday",
  },
  {
    id: "feeling-overwhelmed",
    title: "Quick exercises I can do at home",
    preview: "Archie: Here are a few things from your p…",
    messages: 1,
    time: "Yesterday, 09:41",
    group: "Yesterday",
  },
  {
    id: "tired-after-eating",
    title: "What can I do for low energy in the mor…",
    preview: "Archie: Morning energy dips are really co…",
    messages: 3,
    time: "Mon, 09:12",
    group: "Last week",
  },
];
