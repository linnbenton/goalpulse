"use client";

import { useEffect, useState } from "react";

import { Fixture } from "@/services/txodds";

export function useFixtures(jwt: string, apiToken: string) {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jwt || !apiToken) return;

    async function load() {
      const res = await fetch("/api/fixtures", {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "X-Api-Token": apiToken,
        },
      });

      const data = await res.json();

      setFixtures(data);

      setLoading(false);
    }

    load();

    const timer = setInterval(load, 60000);

    return () => clearInterval(timer);
  }, [jwt, apiToken]);

  return {
    fixtures,
    loading,
  };
}
