/* Scripted Discover search results (3 worked examples from Figma). */

export type ResultType = "exercise" | "article" | "audio" | "content" | "recipe";

export interface SearchResultItem {
  img: string;
  title: string;
  type: ResultType;
  typeLabel: string;
  duration: string;
  tag: string;
}

export interface SearchResult {
  query: string;
  answer: string;
  results: SearchResultItem[];
}

const A = "/assets";

export const SEARCH_RESULTS: Record<string, SearchResult> = {
  "osteoporosis-exercises": {
    query: "Osteoporosis exercises",
    answer:
      "Weight-bearing and resistance exercises are the most effective for bone density. Your program has a few good options to start with.",
    results: [
      { img: `${A}/Bone strengthening basics img.png`, title: "Bone-strengthening basics", type: "exercise", typeLabel: "Exercise", duration: "8 mins", tag: "Bone health · Week 1" },
      { img: `${A}/Gentle resistance_ standing series img.png`, title: "Gentle resistance: standing series", type: "exercise", typeLabel: "Exercise", duration: "12 mins", tag: "Move · Week 2" },
      { img: `${A}/Why impact matters for your bones img.png`, title: "Why impact matters for your bones", type: "article", typeLabel: "Article", duration: "4 mins", tag: "Bone health · Week 1" },
      { img: `${A}/Sit-to-stand progression img.png`, title: "Sit-to-stand progression", type: "exercise", typeLabel: "Exercise", duration: "8 mins", tag: "Move · Week 3" },
    ],
  },
  "meditations-for-stress": {
    query: "Meditations for stress",
    answer:
      "Your program has several guided sessions that work well for stress — here are the ones most relevant to where you are right now.",
    results: [
      { img: `${A}/Guided breathing for calm img.png`, title: "Guided breathing for calm", type: "audio", typeLabel: "Audio", duration: "8 mins", tag: "Mind · Week 2" },
      { img: `${A}/Body scan_ letting go of tension img.png`, title: "Body scan: letting go of tension", type: "audio", typeLabel: "Audio", duration: "12 mins", tag: "Calm · Week 1" },
      { img: `${A}/5-4-3-2-1 grounding practice img.png`, title: "5-4-3-2-1 grounding practice", type: "audio", typeLabel: "Audio", duration: "6 mins", tag: "Mind · Week 3" },
      { img: `${A}/How stress affects your condition img.png`, title: "How stress affects your condition", type: "article", typeLabel: "Article", duration: "5 mins", tag: "Mind · Week 1" },
    ],
  },
  "recipes-for-my-condition": {
    query: "Recipes for my condition",
    answer:
      "Here are the recipes and nutrition guides from your program — these are chosen for your condition and goals.",
    results: [
      { img: `${A}/Plate ordering for steady energy img.png`, title: "Plate ordering for steady energy", type: "content", typeLabel: "Content cards", duration: "8 mins", tag: "Food and diabetes · Week 3" },
      { img: `${A}/Anti-inflammatory smoothie bowl img.png`, title: "Anti-inflammatory smoothie bowl", type: "recipe", typeLabel: "Recipe", duration: "5 mins", tag: "Nutrition basics · Week 2" },
      { img: `${A}/Low-glycaemic meal ideas img.png`, title: "Low-glycaemic meal ideas", type: "content", typeLabel: "Content cards", duration: "6 mins", tag: "Food and diabetes · Week 1" },
      { img: `${A}/Reading food labels for your condition img.png`, title: "Reading food labels for your condition", type: "article", typeLabel: "Article", duration: "4 mins", tag: "Nutrition basics · Week 1" },
    ],
  },
};

export const DEFAULT_SEARCH = "osteoporosis-exercises";

/* Map any pill/recent label to the closest scripted result. */
export function searchKeyFor(label: string): string {
  const t = label.toLowerCase();
  if (/recipe|nutrition|breakfast|food|eat|meal/.test(t)) return "recipes-for-my-condition";
  if (/meditat|stress|sleep|overwhelm|calm|relax|mind/.test(t)) return "meditations-for-stress";
  return "osteoporosis-exercises";
}
