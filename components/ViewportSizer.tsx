"use client";

import { useEffect } from "react";

/* Tracks the visual viewport so the device frame resizes to the area *above*
   the on-screen keyboard. iOS Safari doesn't shrink the layout viewport when
   the keyboard appears, so without this the composer would be hidden behind it.
   Exposes two CSS vars on <html>:
     --vvh : current visual-viewport height (device height on mobile)
     --kb  : keyboard inset height (0 when closed) */
export default function ViewportSizer() {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const root = document.documentElement;
    const apply = () => {
      root.style.setProperty("--vvh", `${Math.round(vv.height)}px`);
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
