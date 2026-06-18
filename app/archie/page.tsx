"use client";

import { useRouter } from "next/navigation";
import ArchieExperience from "@/components/ArchieExperience";

/* Standalone / deep-link route for Archie (no modal animation).
   The Home screen presents Archie as an animated sheet instead. */
export default function ArchiePage() {
  const router = useRouter();
  return (
    <div className="stage">
      <div className="device">
        <ArchieExperience onClose={() => router.push("/")} />
      </div>
      <div className="stage__caption">
        Archie AI chat · <b>tap a suggestion, type a follow-up, or try the boundary cases</b>
      </div>
    </div>
  );
}
