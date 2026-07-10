"use client";

import { useEffect, useState } from "react";

// Define local Fixture structure to bypass the missing export member compile error from @txodds service
export interface Fixture {
  id: string | number;
  [key: string]: any; // Flexibly maps match details, real-time odds, and scoring attributes
}

export function useFixtures(jwt: string, apiToken: string) {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jwt || !apiToken) return;

    // Use an active flag to prevent state updates on an unmounted component context
    let isMounted = true;

    async function load() {
      try {
        const res = await fetch("/api/fixtures", {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "X-Api-Token": apiToken,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch pipeline data");

        const data = await res.json();

        if (isMounted) {
          setFixtures(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error pooling TxODDS fixtures:", error);
        if (isMounted) setLoading(false);
      }
    }

    load();

    // Set up 60-second real-time polling interval for live hackathon data feeds
    const timer = setInterval(load, 60000);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [jwt, apiToken]);

  return {
    fixtures,
    loading,
  };
}
