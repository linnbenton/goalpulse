import axios from "axios";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_TXLINE_API ?? "https://txline-dev.txodds.com";

const API_BASE = `${API_ORIGIN}/api`;

export async function requestPurchaseQuote(
  jwt: string,
  buyerPubkey: string,
  txlineAmount = 50,
) {
  const res = await axios.post(
    `${API_BASE}/guest/purchase/quote`,
    {
      buyerPubkey,
      txlineAmount,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
}
