import type { MissionCard as Mission } from "@/lib/conversations";
import TypeIcon from "./TypeIcon";

/* Archie chat reply card — same visual style as the Discover search results
   (photo thumbnail, type meta with icon, green quest·week tag). */
export default function MissionCard({ mission, onOpen }: { mission: Mission; onOpen: (m: Mission) => void }) {
  return (
    <button className="sr-card fade-enter" onClick={() => onOpen(mission)}>
      <span className="sr-card__thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mission.img} alt="" />
      </span>
      <span className="sr-card__body">
        <span className="sr-card__title">{mission.title}</span>
        <span className="sr-card__meta">
          <TypeIcon type={mission.contentType} />
          {mission.typeLabel} • {mission.duration}
        </span>
        <span className="sr-card__tag">
          {mission.quest} · {mission.week}
        </span>
      </span>
    </button>
  );
}
