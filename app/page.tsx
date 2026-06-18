"use client";

import { useState, useEffect } from "react";
import HomeScreen from "@/components/HomeScreen";
import ArchieExperience from "@/components/ArchieExperience";

export default function Home() {
  const [archieOpen, setArchieOpen] = useState(false);
  // Enable slide transitions only after mount, so the sheet starts cleanly
  // closed instead of animating down on first paint.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <div className="stage">
      <div className="device">
        {/* Home, pushed back slightly while the modal is presented (iOS style) */}
        <div className={`home-base${ready ? " is-ready" : ""}${archieOpen ? " home-base--pushed" : ""}`}>
          <HomeScreen onOpenArchie={() => setArchieOpen(true)} />
        </div>

        {/* Archie — presented as a full-screen sheet that slides up from the bottom.
            Kept mounted so it can animate back down on close (and state persists). */}
        <div
          className={`modal-sheet${ready ? " is-ready" : ""}${archieOpen ? " modal-sheet--open" : ""}`}
          aria-hidden={!archieOpen}
        >
          <ArchieExperience onClose={() => setArchieOpen(false)} />
        </div>
      </div>

      <div className="stage__caption">
        Sidekick home · <b>tap “Ask Archie” to present the chat</b>
      </div>
    </div>
  );
}
