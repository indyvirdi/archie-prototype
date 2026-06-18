"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchResultsScreen from "@/components/SearchResultsScreen";
import { SEARCH_RESULTS, DEFAULT_SEARCH } from "@/lib/searchResults";

function SearchInner() {
  const params = useSearchParams();
  const key = params.get("q") || DEFAULT_SEARCH;
  const data = SEARCH_RESULTS[key] || SEARCH_RESULTS[DEFAULT_SEARCH];
  return (
    <div className="stage">
      <div className="device">
        <SearchResultsScreen data={data} />
      </div>
      <div className="stage__caption">
        Discover search results · <b>tap the filters; back returns to Discover</b>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}
