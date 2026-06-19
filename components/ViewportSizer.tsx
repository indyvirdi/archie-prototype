"use client";

import { useEffect } from "react";

/* Tracks the visual viewport so the device frame exactly overlays the area
   *above* the on-screen keyboard. iOS Safari doesn't shrink the layout viewport
   when the keyboard appears — it shrinks the visual viewport and pans it (an
   offsetTop). We mirror both so the device follows the visible window instead
   of being scrolled off the top.
   Exposes on <html>:
     --vvh    : visual-viewport height (device height on mobile)
     --vv-top : visual-viewport offsetTop (how far it's panned)
     --kb     : keyboard inset height (0 when closed) */
export default function ViewportSizer() {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const root = document.documentElement;
    const apply = () => {
      root.style.setProperty("--vvh", `${Math.round(vv.height)}px`);
      root.style.setProperty("--vv-top", `${Math.round(vv.offsetTop)}px`);
      const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      root.style.setProperty("--kb", `${Math.round(kb)}px`);
    };
    apply();
    vv.addEventListener("resize", apply);
    vv.addEventListener("scroll", apply);
    return () => {
      vv.removeEventListener("resize", apply);
      vv.removeEventListener("scroll", apply);
    };
  }, []);
  return null;
}
