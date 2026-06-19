"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import StatusBar from "@/components/StatusBar";
import ArchieMark from "@/components/ArchieMark";
import MissionCard from "@/components/MissionCard";
import { SourcesRow, SourcesSheet } from "@/components/SourcesSheet";
import {
  BackIcon,
  HistoryIcon,
  MicIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@/components/icons";
import {
  CONVERSATIONS,
  MISSIONS,
  SPLASH_ROW_1,
  SPLASH_ROW_2,
  DISCLAIMER,
  HISTORY,
  routeQuery,
  type ArchieReply,
  type MissionCard as Mission,
  type HistoryEntry,
  type SplashPill,
  type Source,
} from "@/lib/conversations";

type Msg =
  | { role: "user"; text: string }
  | { role: "thinking"; searching: boolean }
  | { role: "archie"; reply: ArchieReply };

/* The full Archie experience (splash → conversation → history) as a
   self-contained screen. `onClose` is called by the splash back button —
   the parent decides what that means (dismiss the modal, or route home). */
export default function ArchieExperience({ onClose }: { onClose: () => void }) {
  const [started, setStarted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [convId, setConvId] = useState<string | null>(null);
  const [turnIndex, setTurnIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [composerFocused, setComposerFocused] = useState(false);
  const [openSources, setOpenSources] = useState<Source[] | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const showToast = useCallback((t: string) => {
    setToast(t);
    setTimeout(() => setToast(null), 1700);
  }, []);

  const runTurn = useCallback(
    (displayText: string, conversationId: string, idx: number) => {
      const turn = CONVERSATIONS[conversationId]?.turns[idx];
      setBusy(true);
      setStarted(true);
      setMsgs((m) => [
        ...m,
        { role: "user", text: displayText },
        { role: "thinking", searching: !!turn?.searching },
      ]);
      const delay = turn?.searching ? 1900 : 1300;
      timer.current = setTimeout(() => {
        setMsgs((m) => {
          const copy = m.slice(0, -1);
          if (turn) copy.push({ role: "archie", reply: turn.reply });
          else
            copy.push({
              role: "archie",
              reply: {
                kind: "answer",
                text: [
                  "I've shared what your program covers on this. If something new comes up, I can point you to the right place — or your care team is always there for anything clinical.",
                ],
              },
            });
          return copy;
        });
        setConvId(conversationId);
        setTurnIndex(idx + 1);
        setBusy(false);
      }, delay);
    },
    []
  );

  const startConversation = useCallback(
    (conversationId: string) => {
      const conv = CONVERSATIONS[conversationId];
      if (!conv) return;
      setShowHistory(false);
      setMsgs([]);
      setTurnIndex(0);
      runTurn(conv.prompt, conversationId, 0);
    },
    [runTurn]
  );

  const handleSend = useCallback(() => {
    const text = draft.trim();
    if (!text || busy) return;
    setDraft("");
    if (!started || !convId) {
      runTurn(text, routeQuery(text), 0);
    } else {
      runTurn(text, convId, turnIndex);
    }
  }, [draft, busy, started, convId, turnIndex, runTurn]);

  const handleAction = useCallback(
    (label: string) => {
      if (/ask me something else|ask archie/i.test(label)) {
        inputRef.current?.focus();
        return;
      }
      if (/find something in my program/i.test(label)) {
        startConversation("tired-after-eating");
        return;
      }
      showToast(`→ ${label}`);
    },
    [showToast, startConversation]
  );

  const openMission = useCallback((m: Mission) => showToast(`→ Opens “${m.title}”`), [showToast]);

  const resetToSplash = useCallback(() => {
    setStarted(false);
    setMsgs([]);
    setConvId(null);
    setTurnIndex(0);
  }, []);

  return (
    <>
      {!started ? (
        /* ---------- Splash ---------- */
        <div className={`splash${composerFocused ? " splash--focused" : ""}`}>
          <div className="splash__bg" aria-hidden>
            <span className="blob blob--cyan" />
            <span className="blob blob--green" />
            <span className="blob blob--pink" />
            <span className="blob blob--yellow" />
          </div>
          <StatusBar />
          <div className="appbar">
            <button className="iconbtn" aria-label="Back" onClick={onClose}>
              <BackIcon />
            </button>
            {!composerFocused && <div className="appbar__title">Archie · AI coach</div>}
            <button className="iconbtn" aria-label="History" onClick={() => setShowHistory(true)}>
              <HistoryIcon />
            </button>
          </div>

          <div className="splash__body">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="splash__logo" src="/assets/archie-logo.svg" alt="Archie" />
            <h1 className="splash__greeting">Hi Beverly, how&apos;s it going?</h1>

            <div className="pill-rows">
              <PillRow pills={SPLASH_ROW_1} direction="right" onPick={startConversation} />
              <PillRow pills={SPLASH_ROW_2} direction="left" onPick={startConversation} />
            </div>
          </div>

          <Composer
            draft={draft}
            setDraft={setDraft}
            onSend={handleSend}
            busy={busy}
            inputRef={inputRef}
            placeholder="What's on your mind today?"
            floating
            onFocus={() => setComposerFocused(true)}
            onBlur={() => setComposerFocused(false)}
          />
        </div>
      ) : (
        /* ---------- Conversation ---------- */
        <div className="screen">
          <StatusBar />
          <div className="appbar">
            <button className="iconbtn" aria-label="Back" onClick={resetToSplash}>
              <BackIcon />
            </button>
            <div />
            <button className="iconbtn" aria-label="History" onClick={() => setShowHistory(true)}>
              <HistoryIcon />
            </button>
          </div>

          <div className="screen__scroll" ref={scrollRef}>
            <div className="chat">
              {msgs.map((m, i) => (
                <MessageView key={i} msg={m} onOpenMission={openMission} onAction={handleAction} onOpenSources={setOpenSources} />
              ))}
            </div>
          </div>

          <Composer
            draft={draft}
            setDraft={setDraft}
            onSend={handleSend}
            busy={busy}
            inputRef={inputRef}
            placeholder="Ask Archie…"
          />
        </div>
      )}

      {/* History — slides in from the right over the experience */}
      <HistoryScreen
        open={showHistory}
        onBack={() => setShowHistory(false)}
        onOpenConversation={(id) => (CONVERSATIONS[id] ? startConversation(id) : setShowHistory(false))}
      />

      {toast && <div className="archie-toast">{toast}</div>}

      {openSources && (
        <SourcesSheet sources={openSources} onClose={() => setOpenSources(null)} />
      )}

      <style>{`
        .archie-toast{position:absolute;left:50%;bottom:96px;transform:translateX(-50%);
          background:var(--background-navigation);color:#fff;font-size:13px;font-weight:600;
          padding:10px 16px;border-radius:999px;z-index:30;white-space:nowrap;
          box-shadow:0 8px 24px color-mix(in srgb,var(--others-shadow) 22%,transparent);}
      `}</style>
    </>
  );
}

/* ---------------- history ---------------- */
function HistoryScreen({
  open,
  onBack,
  onOpenConversation,
}: {
  open: boolean;
  onBack: () => void;
  onOpenConversation: (id: string) => void;
}) {
  const [entries, setEntries] = useState<HistoryEntry[]>(() => HISTORY.map((h, i) => ({ ...h, id: `${h.id}__${i}` })));
  const [editing, setEditing] = useState(false);
  const groups = ["Today", "Yesterday", "Last week"] as const;
  const empty = entries.length === 0;

  return (
    <div className={`history-overlay${open ? " history-overlay--open" : ""}`}>
      <div className="screen">
        <StatusBar />
        <div className="appbar">
          <button className="iconbtn" aria-label="Back" onClick={onBack}>
            <BackIcon />
          </button>
          <div className="appbar__title">History</div>
          {empty ? (
            <span style={{ width: 40 }} />
          ) : (
            <button className="appbar__action" onClick={() => setEditing((e) => !e)}>
              {editing ? "Done" : "Edit"}
            </button>
          )}
        </div>

        {empty ? (
          <div className="history-empty">
            <ArchieMark size={72} />
            <div className="history-empty__title">No conversations yet</div>
            <div className="history-empty__sub">
              When you ask Archie something, your conversations will appear here so you can pick up where you left off.
            </div>
          </div>
        ) : (
          <div className="screen__scroll">
            <div className="history">
              {groups.map((g) => {
                const items = entries.filter((e) => e.group === g);
                if (!items.length) return null;
                return (
                  <div key={g}>
                    <div className="history__group-label">{g}</div>
                    {items.map((e) => (
                      <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <button
                          className="history-card"
                          onClick={() => !editing && onOpenConversation(e.id.split("__")[0])}
                        >
                          <span className="history-card__body">
                            <span className="history-card__title">{e.title}</span>
                            <span className="history-card__preview">{e.preview}</span>
                            <span className="history-card__meta">
                              {e.messages} message{e.messages > 1 ? "s" : ""} · {e.time}
                            </span>
                          </span>
                          {!editing && <ChevronRightIcon size={20} style={{ color: "var(--border-input-field-unselected)" }} />}
                        </button>
                        {editing && (
                          <button
                            className="history-card__delete"
                            aria-label={`Delete ${e.title}`}
                            onClick={() => setEntries((prev) => prev.filter((x) => x.id !== e.id))}
                          >
                            <TrashIcon size={22} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- message renderer ---------------- */
function MessageView({
  msg,
  onOpenMission,
  onAction,
  onOpenSources,
}: {
  msg: Msg;
  onOpenMission: (m: Mission) => void;
  onAction: (label: string) => void;
  onOpenSources: (sources: Source[]) => void;
}) {
  if (msg.role === "user") {
    return <div className="bubble-user fade-enter">{msg.text}</div>;
  }
  if (msg.role === "thinking") {
    return (
      <div className="thinking-pill fade-enter">
        <ArchieMark size={20} />
        {msg.searching ? "Searching" : "Thinking"}
        <span className="thinking-pill__dots">
          <i /><i /><i />
        </span>
        {msg.searching && (
          <span className="thinking-pill__imgs">
            <span style={{ background: "#ffd9a0" }}>🚶</span>
            <span style={{ background: "#bfe3ff" }}>🧘</span>
            <span style={{ background: "#c7f9d0" }}>🥗</span>
          </span>
        )}
      </div>
    );
  }
  const r = msg.reply;
  return (
    <div className="archie-answer fade-enter">
      {r.text.map((p, i) => (
        <div className="archie-answer__text" key={i}>{p}</div>
      ))}

      {r.kind === "answer" && (
        <>
          {r.transition && <div className="archie-answer__transition">{r.transition}</div>}
          {r.cards?.map((id) => (
            <MissionCard key={id} mission={MISSIONS[id]} onOpen={onOpenMission} />
          ))}
        </>
      )}

      {r.kind === "refusal" &&
        r.actions?.map((label) => (
          <button key={label} className="action-row" onClick={() => onAction(label)}>
            <span className="action-row__label">{label}</span>
            <ChevronRightIcon size={20} style={{ color: "var(--foreground-surface-secondary-subtle)" }} />
          </button>
        ))}

      <div className="disclaimer">{DISCLAIMER}</div>

      {r.sources && r.sources.length > 0 && (
        <SourcesRow sources={r.sources} onOpen={() => onOpenSources(r.sources!)} />
      )}
    </div>
  );
}

/* ---------------- splash suggestion pills ---------------- */
function PillRow({
  pills,
  direction,
  onPick,
}: {
  pills: SplashPill[];
  direction: "left" | "right";
  onPick: (conversationId: string) => void;
}) {
  // Duplicate the set so the marquee can loop seamlessly.
  const loop = [...pills, ...pills];
  return (
    <div className="pill-row">
      <div className={`pill-track pill-track--${direction}`}>
        {loop.map((p, i) => (
          <button
            key={`${p.label}-${i}`}
            className="pill"
            onClick={() => onPick(p.conversationId)}
            aria-hidden={i >= pills.length}
            tabIndex={i >= pills.length ? -1 : 0}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pill__icon" src={p.icon} alt="" width={16} height={16} />
            <span className="pill__label">{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- composer ---------------- */
function Composer({
  draft,
  setDraft,
  onSend,
  busy,
  inputRef,
  placeholder,
  onFocus,
  onBlur,
  floating,
}: {
  draft: string;
  setDraft: (v: string) => void;
  onSend: () => void;
  busy: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  placeholder: string;
  onFocus?: () => void;
  onBlur?: () => void;
  floating?: boolean;
}) {
  return (
    <div className={`composer${floating ? " composer--floating" : ""}`}>
      <div className="composer__field">
        <input
          ref={inputRef}
          className="composer__input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          enterKeyHint="send"
          aria-label="Message Archie"
        />
        <button className="composer__mic" aria-label="Voice input" tabIndex={-1}>
          <MicIcon />
        </button>
        <button className="composer__send" aria-label="Send" onClick={onSend} disabled={!draft.trim() || busy}>
          <ArrowRightIcon size={22} />
        </button>
      </div>
    </div>
  );
}
