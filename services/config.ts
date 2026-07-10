export const API_ORIGIN =
  process.env.NEXT_PUBLIC_TXLINE_ORIGIN ?? "https://txline.txodds.com";

export const API_BASE = `${API_ORIGIN}/api`;

export const AUTH_ENDPOINT = `${API_ORIGIN}/auth/guest/start`;
