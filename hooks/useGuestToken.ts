"use client";

import { useEffect, useState } from "react";

export function useGuestToken() {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/auth/guest");

      const data = await res.json();

      setToken(data.token);
    }

    load();
  }, []);

  return token;
}
