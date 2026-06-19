"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import { SearchIcon } from "./icons";
import { searchKeyFor } from "@/lib/searchResults";

const A = "/assets";

const RECENT = ["walking", "meditations", "breakfast ideas"];
const ASK_ARCHIE: Pill[] = [
  { label: "Feeling overwhelmed lately", icon: `${A}/pill-overwhelmed.svg` },
  { label: "Quick exercises I can do at home", icon: `${A}/pill-exercise.svg` },
  { label: "What can I do for lower back pain?", icon: `${A}/pill-joints.svg` },
  { label: "I need help sleeping better", icon: `${A}/pill-sleep.svg` },
];

interface Pill { label: string; icon: string }
const PILLS_1: Pill[] = [
  { label: "Feeling overwhelmed lately", icon: `${A}/pill-overwhelmed.svg` },
  { label: "Osteoporosis exercises", icon: `${A}/pill-joints.svg` },
  { label: "Help with sleep", icon: `${A}/pill-sleep.svg` },
];
const PILLS_2: Pill[] = [
  { label: "Meditations for stress", icon: `${A}/Meditation.svg` },
  { label: "Recipes for my condition", icon: `${A}/Recipes.svg` },
];

const SUGGESTED = [
  { title: "Sit-to-stand", img: `${A}/Category Card.png`, type: "Exercise", typeIcon: `${A}/activity-heart.svg`, duration: "5 mins" },
  { title: "Poor sleep", img: `${A}/Category Card-1.png`, type: "Article", typeIcon: `${A}/file-02.svg`, duration: "6 mins" },
  { title: "Your compassionate self", img: `${A}/Category Card-2.png`, type: "Lesson", typeIcon: `${A}/file-question-02.svg`, duration: "5 mins" },
];

const QUESTS = [
  { title: "Medication Essentials", img: `${A}/Medication Essentials.svg`, chapters: 4, percent: 8 },
  { title: "Fatigue", img: `${A}/Fatigue.svg`, chapters: 3, percent: 0 },
  { title: "Type 2 Diabetes", img: `${A}/Type 2 Diabetes.svg`, chapters: 5, percent: 0 },
  { title: "Heart Failure", img: `${A}/Heart Failure.svg`, chapters: 4, percent: 0 },
  { title: "Obesity", img: `${A}/Obesity.svg`, chapters: 4, percent: 0 },
];

const LIBRARY = [
  { title: "Physical activity", img: `${A}/Category Card.svg` },
  { title: "Well-being", img: `${A}/Category Card-1.svg` },
  { title: "Sleep", img: `${A}/Category Card-2.svg` },
  { title: "Nutrition", img: `${A}/Category Card-3.svg` },
  { title: "Heart health", img: `${A}/Category Card-4.svg` },
  { title: "Habit formation", img: `${A}/Category Card-5.svg` },
];

/* eslint-disable @next/next/no-img-element */
function PillRow({ pills, direction, onPick }: { pills: Pill[]; direction: "left" | "right"; onPick: (label: string) => void }) {
  const loop = [...pills, ...pills];
  return (
    <div className="pill-row">
      <div className={`pill-track pill-track--${direction}`}>
        {loop.map((p, i) => (
          <button key={`${p.label}-${i}`} className="pill" onClick={() => onPick(p.label)} aria-hidden={i >= pills.length} tabIndex={i >= pills.length ? -1 : 0}>
            <img className="pill__icon" src={p.icon} alt="" width={16} height={16} />
            <span className="pill__label">{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DiscoverScreen() {
  const router = useRouter();
  const [searchActive, setSearchActive] = useState(false);
  const [defaultVisible, setDefaultVisible] = useState(true);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const goSearch = (label?: string) => router.push(`/search?q=${searchKeyFor(label || query)}`);
  const goChat = () => router.push("/archie");
  const activateSearch = () => {
    setSearchActive(true);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    // unmount the default content once it has faded out
    fadeTimer.current = setTimeout(() => setDefaultVisible(false), 220);
  };
  const cancelSearch = () => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    inputRef.current?.blur();
    setSearchActive(false);
    setDefaultVisible(true);
    setQuery("");
  };
  useEffect(() => () => { if (fadeTimer.current) clearTimeout(fadeTimer.current); }, []);

  return (
    <div className={`discover screen${searchActive ? " discover--search" : ""}`}>
      <div className="discover__bg" aria-hidden>
        <span className="blob blob--cyan" />
        <span className="blob blob--green" />
        <span className="blob blob--pink" />
        <span className="blob blob--yellow" />
      </div>
      <StatusBar />
      <div className="screen__scroll" style={{ paddingBottom: 92 }}>
        {/* Title — collapses up while searching */}
        <h1 className="discover__title">Discover</h1>

        {/* Search bar (input) + Cancel */}
        <div className="dsearch-row">
          <div className="search-bar" onClick={() => inputRef.current?.focus()}>
            <span className="search-bar__inner">
              <img className="search-bar__icon" src={`${A}/search-sm.svg`} alt="" width={20} height={20} />
              <input
                ref={inputRef}
                className="search-bar__input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={activateSearch}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goSearch(query);
                }}
                placeholder="Ask Archie to help you find something"
                enterKeyHint="search"
                aria-label="Ask Archie to help you find something"
              />
            </span>
          </div>
          {searchActive && (
            <button className="dsearch-cancel" onClick={cancelSearch}>
              Cancel
            </button>
          )}
        </div>

        <div className="discover__stack">
          {searchActive && (
            <div className="dsearch-body fade-enter">
            <div className="dsearch-section">
              <p className="dsearch-heading">Recent searches</p>
              <div className="dsearch-recent">
                {RECENT.map((r) => (
                  <button key={r} className="recent-pill" onClick={() => goSearch(r)}>
                    <SearchIcon size={16} style={{ color: "var(--foreground-surface-primary-subtle)" }} />
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="dsearch-section">
              <p className="dsearch-heading">Ask Archie our AI coach</p>
              <div className="dsearch-pills">
                {ASK_ARCHIE.map((p) => (
                  <button key={p.label} className="ask-pill" onClick={goChat}>
                    <img src={p.icon} alt="" width={16} height={16} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          )}
          {defaultVisible && (
            <div className="discover__default">
        <div className="pill-rows" style={{ marginTop: 14 }}>
          <PillRow pills={PILLS_1} direction="right" onPick={goSearch} />
          <PillRow pills={PILLS_2} direction="left" onPick={goSearch} />
        </div>

        {/* White content sheet */}
        <div className="discover__sheet">
          {/* Favourites / History */}
          <div className="fav-row">
            <button className="fav-card">
              <img src={`${A}/heart.svg`} alt="" width={22} height={22} />
              <span>Favourites</span>
            </button>
            <button className="fav-card">
              <img src={`${A}/clock-rewind.svg`} alt="" width={22} height={22} />
              <span>History</span>
            </button>
          </div>

          {/* Suggested for you */}
          <section>
            <div className="section-head">
              <h2 className="section-title">Suggested for you</h2>
            </div>
            <p className="section-sub">Personalised tools to support your goals and needs.</p>
            <div className="hscroll">
              {SUGGESTED.map((c) => (
                <button className="sug-card" key={c.title}>
                  <span className="sug-card__img"><img src={c.img} alt="" /></span>
                  <span className="sug-card__title">{c.title}</span>
                  <span className="sug-card__meta">
                    <img src={c.typeIcon} alt="" width={16} height={16} />
                    {c.type}
                    <span className="sug-card__divider" />
                    <img src={`${A}/clock.svg`} alt="" width={16} height={16} />
                    {c.duration}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Quests */}
          <section>
            <div className="section-head">
              <h2 className="section-title">Quests</h2>
              <button className="section-link">View all</button>
            </div>
            <p className="section-sub">Discover the skills and topics you will master in this program</p>
            <div className="hscroll">
              {QUESTS.map((q) => (
                <button className="quest-card" key={q.title}>
                  <span className="quest-card__illu">
                    <span className="quest-badge">Active</span>
                    <img src={q.img} alt="" />
                  </span>
                  <span className="quest-card__foot">
                    <span className="quest-card__title">{q.title}</span>
                    <span className="quest-card__meta">
                      <span>{q.chapters} chapters</span>
                      <span>{q.percent}% complete</span>
                    </span>
                    <span className="quest-progress">
                      <span className="quest-progress__fill" style={{ width: `${Math.max(q.percent, 2)}%` }} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Library & Tools */}
          <section>
            <div className="section-head">
              <h2 className="section-title">Library &amp; Tools</h2>
            </div>
            <p className="section-sub">
              Dive into the library below to read up on tips, strategies and try out the different tools when you want to
            </p>
            <div className="lib-grid">
              {LIBRARY.map((c) => (
                <button className="lib-card" key={c.title}>
                  <span className="lib-card__title">{c.title}</span>
                  <img className="lib-card__img" src={c.img} alt="" />
                </button>
              ))}
            </div>
          </section>
        </div>
            </div>
          )}
        </div>
      </div>

      {!searchActive && <BottomNav active="discover" />}
    </div>
  );
}
