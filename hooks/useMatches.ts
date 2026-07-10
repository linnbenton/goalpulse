"use client";

import { useEffect, useState } from "react";

import { Match } from "@/types/match";

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/matches");

      const data = await res.json();

      setMatches(data);

      setLoading(false);
    }

    load();
  }, []);

  return {
    matches,

    loading,
  };
}
