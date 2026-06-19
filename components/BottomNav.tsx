"use client";

import Link from "next/link";

const A = "/assets";
const NAV = {
  home: `${A}/Navigation icons.svg`,
  health: `${A}/Navigation icons-1.svg`,
  goals: `${A}/target-04.svg`,
  discover: `${A}/compass-03.svg`,
};

const SELECTED = "var(--foreground-navigation-selected)";
const DEFAULT = "var(--foreground-navigation-default)";

function MaskedIcon({ src, color, size = 22 }: { src: string; color: string; size?: number }) {
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

function Item({ icon, label, active, href }: { icon: string; label: string; active?: boolean; href?: string }) {
  const color = active ? SELECTED : DEFAULT;
  const inner = (
    <>
      <MaskedIcon src={icon} color={color} size={22} />
      <span style={{ fontSize: 11, fontWeight: active ? 700 : 500, lineHeight: 1, color }}>{label}</span>
    </>
  );
  const style = { display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4, width: 56, background: "none", border: "none", textDecoration: "none" };
  return href ? (
    <Link href={href} style={style}>{inner}</Link>
  ) : (
    <button type="button" style={style}>{inner}</button>
  );
}

export default function BottomNav({ active }: { active: "home" | "discover" }) {
  return (
    <div style={{ position: "absolute", left: 8, right: 8, bottom: 16, zIndex: 100 }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 16px",
          height: 64,
          backgroundColor: "var(--background-navigation)",
          borderRadius: 32,
        }}
      >
        <Item icon={NAV.home} label="Home" active={active === "home"} href="/" />
        <Item icon={NAV.goals} label="Goals" />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56 }}>
          <button
            type="button"
            aria-label="Add"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              width: 48,
              height: 48,
              backgroundColor: "var(--background-interactive-primary-default)",
              color: "var(--foreground-interactive-primary-default)",
              border: "none",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
        <Item icon={NAV.health} label="Health" />
        <Item icon={NAV.discover} label="Discover" active={active === "discover"} href="/discover" />
      </div>
    </div>
  );
}
