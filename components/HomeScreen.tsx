"use client";

/* Ported from the Robin Design System docs "Example App" home screen
   (robin-docs/src/app/example/home-screen.tsx). Tailwind utilities have been
   converted to inline styles to match this prototype's plain-CSS setup, the
   brand-switcher hook removed (brand is fixed to sidekick-mobile), and the
   top-right chat icon wired to launch Archie. Robin tokens unchanged. */

import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";

const A = "/assets";

const IMG = {
  chat: `${A}/Icons.svg`,
  askArchie: `${A}/ask-archie-circle.svg`,
  close: `${A}/close-16.svg`,
  bullseye: `${A}/Bullseye.svg`,
  alarmPill: `${A}/Frame 2610439.svg`,
  heartPulse: `${A}/In-app icons.svg`,
  stopwatch: `${A}/Stopwatch.svg`,
  thumb1: `${A}/Thumbnail Activities Card.svg`,
  thumb2: `${A}/Thumbnail Activities Card-1.svg`,
  thumb3: `${A}/Thumbnail Activities Card-2.svg`,
  thumb4: `${A}/Thumbnail Activities Card-3.svg`,
  navHome: `${A}/Navigation icons.svg`,
  navHealth: `${A}/Navigation icons-1.svg`,
  navGoals: `${A}/target-04.svg`,
  navDiscover: `${A}/compass-03.svg`,
};

const C = {
  bgScreen: "var(--background-brand-primary)",
  bgSurface: "var(--background-surface-primary)",
  bgSurfaceTertiary: "var(--background-surface-tertiary)",
  borderTertiary: "var(--border-surface-tertiary)",
  textStrong: "var(--foreground-surface-primary-strong)",
  textSubtle: "var(--foreground-surface-tertiary-subtle)",
  linkText: "var(--foreground-interactive-secondary-default)",
  primary: "var(--background-interactive-primary-default)",
  primaryFg: "var(--foreground-interactive-primary-default)",
  navBg: "var(--background-navigation)",
  navSelected: "var(--foreground-navigation-selected)",
  navDefault: "var(--foreground-navigation-default)",
  successBg: "var(--background-status-success-primary)",
  successFg: "var(--foreground-status-success-primary-strong)",
  dangerBg: "var(--background-status-danger-primary)",
  interactiveTertiaryBg: "var(--background-interactive-tertiary-default)",
  interactiveTertiaryBorder: "var(--border-interactive-tertiary-default)",
  interactiveTertiaryFg: "var(--foreground-interactive-tertiary-default)",
};

const F = {
  title: "var(--typography-family-title)",
  body: "var(--typography-family-body)",
  label: "var(--typography-family-label)",
};

const ILLUSTRATION_BG = "#CCECFF";

/* Robin NeonGreen tokens used by the Ask Archie card */
const NEON = {
  border200: "#ccffef", // NeonGreen/200 — card border
  divider300: "#99ffdf", // NeonGreen/300 — action divider
};

/* Exact card fill from Figma (node 5396:63945): a radial gradient anchored
   bottom-centre, cyan (#20DFFF) fading up into transparent neon-green. */
const ARCHIE_GRADIENT = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 189' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(4.6074e-13 -17.5 -23.956 -8.0147e-7 70 189)'><stop stop-color='rgba(32,223,255,1)' offset='0'/><stop stop-color='rgba(0,255,175,0)' offset='1'/></radialGradient></defs></svg>")`;

function AskArchieCard({ onAsk }: { onAsk: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onAsk}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onAsk();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflow: "hidden",
        width: 140,
        height: 189,
        borderRadius: 12,
        border: `1px solid ${NEON.border200}`,
        backgroundImage: ARCHIE_GRADIENT,
        backgroundSize: "cover",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, padding: "12px 12px 8px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <img src={IMG.askArchie} alt="" style={{ width: 48, height: 48 }} />
          <button
            type="button"
            aria-label="Dismiss"
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, padding: 0, background: "none", border: "none" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.close} alt="Dismiss" width={16} height={16} />
          </button>
        </div>
        <div>
          <p style={{ margin: 0, lineHeight: 1.4, color: "#001033", fontSize: 14, fontWeight: 700, fontFamily: F.body }}>Ask Archie</p>
          <p style={{ margin: "2px 0 0", lineHeight: 1.4, color: "#001033", fontSize: 14, fontWeight: 400, fontFamily: F.body }}>Ask the AI Coach about anything</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px", borderTop: `1px solid ${NEON.divider300}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#001033", fontFamily: F.body }}>Ask now</span>
      </div>
    </div>
  );
}

function ProfileSilhouette({ color }: { color: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 44 44" preserveAspectRatio="xMidYMax slice" aria-hidden style={{ display: "block" }}>
      <path
        d="M45 38.3028V44H-1V38.3237C1.67557 34.7891 5.14849 31.9204 9.1426 29.9457C13.1367 27.9709 17.5418 26.9446 22.0077 26.9483C31.407 26.9483 39.756 31.4082 45 38.3028ZM29.6705 15.5785C29.6705 17.5885 28.8628 19.5161 27.425 20.9374C25.9872 22.3586 24.0372 23.1571 22.0038 23.1571C19.9705 23.1571 18.0205 22.3586 16.5827 20.9374C15.1449 19.5161 14.3372 17.5885 14.3372 15.5785C14.3372 13.5686 15.1449 11.641 16.5827 10.2197C18.0205 8.79845 19.9705 8 22.0038 8C24.0372 8 25.9872 8.79845 27.425 10.2197C28.8628 11.641 29.6705 13.5686 29.6705 15.5785Z"
        fill={color}
      />
    </svg>
  );
}

function MaskedIcon({ src, color, size }: { src: string; color: string; size: number }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

function WidgetCard({ glyph, glyphSize, title, body }: { glyph: string; glyphSize: number; title: string; body: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden", width: 140, height: 189, backgroundColor: C.bgSurface, border: `1px solid ${C.borderTertiary}`, borderRadius: 12 }}>
      <div style={{ flex: 1, padding: 12 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 9999, width: 48, height: 48, backgroundColor: ILLUSTRATION_BG }}>
            <img src={glyph} alt="" style={{ width: glyphSize, height: glyphSize }} />
          </div>
          <button type="button" aria-label="Dismiss" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, background: "none", border: "none", padding: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.close} alt="Dismiss" width={16} height={16} />
          </button>
        </div>
        <div>
          <p style={{ margin: 0, lineHeight: 1.2, color: C.textStrong, fontSize: 14, fontWeight: 700, fontFamily: F.body }}>{title}</p>
          <p style={{ margin: "4px 0 0", lineHeight: 1.375, color: C.textStrong, fontSize: 13, fontFamily: F.body }}>{body}</p>
        </div>
      </div>
      <button type="button" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 44, borderTop: `1px solid ${C.borderTertiary}`, borderLeft: "none", borderRight: "none", borderBottom: "none", background: "none", color: C.linkText, fontSize: 14, fontWeight: 700, fontFamily: F.label }}>
        Get started
      </button>
    </div>
  );
}

function ActivityCard({ thumb, title, type, duration, completed }: { thumb: string; title: string; type: string; duration: string; completed?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRadius: 9999, position: "relative", zIndex: 10, width: 24, height: 24, backgroundColor: completed ? C.successBg : C.bgScreen, border: completed ? "none" : `1.5px solid ${C.interactiveTertiaryBorder}` }}>
        {completed && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.successFg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: 12, backgroundColor: C.bgSurfaceTertiary, border: `1px solid ${C.borderTertiary}`, borderRadius: 12 }}>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, backgroundColor: C.bgSurface, border: `1px solid ${C.borderTertiary}`, borderRadius: 8 }}>
          <img src={thumb} alt="" style={{ width: 56, height: 56 }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: C.textStrong, fontSize: 16, fontWeight: 700, fontFamily: F.body }}>{title}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "4px 0 0", color: C.textSubtle, fontSize: 13, fontFamily: F.label }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span>{type}</span>
          </div>
          <p style={{ margin: "4px 0 0", color: C.textSubtle, fontSize: 13, fontFamily: F.label }}>{duration}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomeScreen({ onOpenArchie }: { onOpenArchie: () => void }) {
  return (
    <div className="screen" style={{ backgroundColor: C.bgScreen, color: C.textStrong, fontFamily: F.body }}>
      <StatusBar />

      <div className="screen__scroll" style={{ paddingBottom: 92 }}>
        {/* Quick access bar: avatar + chat (launches Archie) */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "8px 16px 4px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden", width: 44, height: 44, backgroundColor: C.interactiveTertiaryBg, border: `1px solid ${C.interactiveTertiaryBorder}`, borderRadius: 10 }} aria-label="Profile">
            <ProfileSilhouette color={C.interactiveTertiaryFg} />
          </div>
          <button
            type="button"
            aria-label="Chat with Archie"
            onClick={onOpenArchie}
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, backgroundColor: C.interactiveTertiaryBg, border: `1px solid ${C.interactiveTertiaryBorder}`, borderRadius: 10 }}
          >
            <MaskedIcon src={IMG.chat} color={C.interactiveTertiaryFg} size={20} />
            <span style={{ position: "absolute", top: -3, right: -3, width: 10, height: 10, borderRadius: 9999, backgroundColor: C.dangerBg, border: `2px solid ${C.bgScreen}` }} />
          </button>
        </div>

        {/* Welcome header */}
        <div style={{ padding: "8px 16px 12px" }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.2, color: C.textStrong, letterSpacing: -0.5, fontFamily: F.title }}>
            Welcome Beverly!
          </h1>
        </div>

        {/* Widget carousel */}
        <div className="home-carousel" style={{ overflowX: "auto", paddingBottom: 8 }}>
          <div style={{ display: "flex", gap: 12, padding: "0 16px" }}>
            <AskArchieCard onAsk={onOpenArchie} />
            <WidgetCard glyph={IMG.alarmPill} glyphSize={35} title="Add your meds" body="Set up your medications" />
            <WidgetCard glyph={IMG.heartPulse} glyphSize={36} title="Get health stats!" body="Start monitoring your health" />
            <WidgetCard glyph={IMG.stopwatch} glyphSize={41} title="Ready for more?" body="Check out these Side Quests" />
            <div style={{ width: 4, flexShrink: 0 }} />
          </div>
        </div>

        {/* Today's tasks */}
        <section style={{ marginTop: 16, padding: "24px 24px 0", backgroundColor: C.bgSurface, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 24, color: C.textStrong, letterSpacing: -0.3, fontWeight: 700, fontFamily: F.title }}>
            Today&apos;s tasks
          </h2>

          <div style={{ position: "relative", borderRadius: 9999, overflow: "hidden", height: 28, backgroundColor: C.bgSurface, border: `1px solid ${C.interactiveTertiaryBg}`, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 9999, width: "50%", height: "100%", backgroundColor: C.primary, color: C.primaryFg, fontSize: 14, fontWeight: 700, fontFamily: F.label }}>
              2 of 4
            </div>
          </div>
          <p style={{ margin: "0 0 20px", color: C.textStrong, fontSize: 16, fontFamily: F.body }}>
            You have 2 activities to complete today
          </p>

          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16, paddingBottom: 24 }}>
            <div style={{ position: "absolute", left: 11, top: 28, bottom: 40, borderLeft: `1.5px dashed ${C.interactiveTertiaryBorder}` }} aria-hidden />
            <ActivityCard thumb={IMG.thumb1} title="Breathing exercise" type="Content cards" duration="5 mins" completed />
            <ActivityCard thumb={IMG.thumb2} title="Add your medication" type="Content cards" duration="5 mins" />
            <ActivityCard thumb={IMG.thumb3} title="Track your symptoms" type="Article" duration="7 mins" />
            <ActivityCard thumb={IMG.thumb4} title="Breathing exercise" type="Article" duration="7 mins" />
          </div>
        </section>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
