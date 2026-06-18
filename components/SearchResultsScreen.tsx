"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "./StatusBar";
import ArchieMark from "./ArchieMark";
import { BackIcon, MicIcon, ArrowRightIcon } from "./icons";
import TypeIcon from "./TypeIcon";
import { DISCLAIMER } from "@/lib/conversations";
import type { ResultType, SearchResult, SearchResultItem } from "@/lib/searchResults";

const FILTERS = ["All", "Exercises", "Articles", "Audio"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_TYPE: Record<Exclude<Filter, "All">, ResultType> = {
  Exercises: "exercise",
  Articles: "article",
  Audio: "audio",
};

/* eslint-disable @next/next/no-img-element */
function ResultCard({ item }: { item: SearchResultItem }) {
  return (
    <button className="sr-card">
      <span className="sr-card__thumb">
        <img src={item.img} alt="" />
      </span>
      <span className="sr-card__body">
        <span className="sr-card__title">{item.title}</span>
        <span className="sr-card__meta">
          <TypeIcon type={item.type} />
          {item.typeLabel} • {item.duration}
        </span>
        <span className="sr-card__tag">{item.tag}</span>
      </span>
    </button>
  );
}

export default function SearchResultsScreen({ data }: { data: SearchResult }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("All");
  const [draft, setDraft] = useState("");
  const submitFollowUp = () => {
    if (draft.trim()) router.push("/archie");
  };

  const filtered = data.results.filter((r) => (filter === "All" ? true : r.type === FILTER_TYPE[filter]));

  return (
    <div className="screen search-results">
      <StatusBar />
      <div className="appbar">
        <button className="iconbtn" aria-label="Back" onClick={() => router.back()}>
          <BackIcon />
        </button>
        <div className="sr-title">Search</div>
        <span style={{ width: 40 }} />
      </div>

      <div className="sr-sheet">
        <div className="sr-content">
          <div className="sr-query">
            <span>{data.query}</span>
          </div>

          <div className="sr-answer">
            <ArchieMark size={28} />
            <p className="sr-answer__text">{data.answer}</p>
            <p className="sr-answer__disclaimer">{DISCLAIMER}</p>
            <div className="sr-divider" />
            <div className="sr-filters">
              {FILTERS.map((f) => (
                <button key={f} className={`sr-filter${filter === f ? " sr-filter--active" : ""}`} onClick={() => setFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
            {filtered.map((r) => (
              <ResultCard key={r.title} item={r} />
            ))}
          </div>
        </div>
      </div>

      <div className="sr-composer">
        <div className="sr-composer__field">
          <input
            className="sr-composer__input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitFollowUp();
            }}
            placeholder="Ask Archie…"
            enterKeyHint="send"
            aria-label="Ask Archie a follow-up question"
          />
          <button className="composer__mic" aria-label="Voice input" tabIndex={-1}>
            <MicIcon />
          </button>
          <button className="composer__send" aria-label="Send" onClick={submitFollowUp} disabled={!draft.trim()}>
            <ArrowRightIcon size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
