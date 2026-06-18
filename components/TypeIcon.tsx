/* 16px content-type icon (gray, inherits currentColor). Shared by the
   Discover search results and the Archie chat reply cards. */
export type ContentIconType = "exercise" | "article" | "audio" | "content" | "recipe" | "lesson";

export default function TypeIcon({ type }: { type: ContentIconType }) {
  const c = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "exercise":
      return (
        <svg {...c}>
          <path d="M19.5 12.6 12 20l-7.5-7.4a4.5 4.5 0 1 1 6.4-6.3l1.1 1.1 1.1-1.1a4.5 4.5 0 1 1 6.4 6.3" />
        </svg>
      );
    case "article":
      return (
        <svg {...c}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M9 12h6M9 16h6" />
        </svg>
      );
    case "audio":
      return (
        <svg {...c}>
          <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
          <rect x="3" y="13" width="4" height="6" rx="1.5" />
          <rect x="17" y="13" width="4" height="6" rx="1.5" />
        </svg>
      );
    case "recipe":
      return (
        <svg {...c}>
          <path d="M5 4h12a1 1 0 0 1 1 1v15H7a2 2 0 0 0-2 2z" />
          <path d="M5 4a2 2 0 0 0 2 2h11" />
        </svg>
      );
    case "lesson":
      return (
        <svg {...c}>
          <path d="M12 3l1.7 5.1 5.1 1.7-5.1 1.7L12 17l-1.7-5.5L5.2 9.8l5.1-1.7z" />
        </svg>
      );
    case "content":
    default:
      return (
        <svg {...c}>
          <path d="M12 6c-1.6-1-4.2-1.5-7-1v13c2.8-.5 5.4 0 7 1 1.6-1 4.2-1.5 7-1V5c-2.8-.5-5.4 0-7 1z" />
          <path d="M12 6v13" />
        </svg>
      );
  }
}
