import DiscoverScreen from "@/components/DiscoverScreen";

export default function DiscoverPage() {
  return (
    <div className="stage">
      <div className="device">
        <DiscoverScreen />
      </div>
      <div className="stage__caption">
        Discover · <b>AI search, suggestions, quests &amp; library</b>
      </div>
    </div>
  );
}
