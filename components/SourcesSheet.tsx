"use client";

import { useEffect } from "react";
import type { Source } from "@/lib/conversations";

/* eslint-disable @next/next/no-img-element */

export function SourcesRow({
  sources,
  onOpen,
}: {
  sources: Source[];
  onOpen: () => void;
}) {
  return (
    <button className="sources-row" onClick={onOpen} aria-label="View sources">
      <span className="sources-row__circles">
        {sources.slice(0, 3).map((s, i) => (
          <span key={i} className="sources-row__circle" style={{ zIndex: 3 - i, marginLeft: i === 0 ? 0 : -8 }}>
            <img src={s.circle} alt={s.label} />
          </span>
        ))}
      </span>
      <span className="sources-row__label">Sources</span>
    </button>
  );
}

export function SourcesSheet({
  sources,
  onClose,
}: {
  sources: Source[];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="sources-overlay" onClick={onClose}>
      <div className="sources-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sources-sheet__header">
          <span className="sources-sheet__title">Sources</span>
          <button className="sources-sheet__close" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="sources-sheet__body">
          <div className="sources-sheet__where">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span>Where this comes from:</span>
          </div>

          {sources.map((s, i) => (
            <div key={i}>
              {i > 0 && <div className="sources-sheet__divider" />}
              <div className="sources-sheet__item">
                <span className="sources-sheet__thumb">
                  <img src={s.thumb} alt={s.label} />
                </span>
                <span className="sources-sheet__item-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
