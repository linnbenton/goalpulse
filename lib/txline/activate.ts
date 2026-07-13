import axios from "axios";
import nacl from "tweetnacl";

import type { WalletContextState } from "@solana/wallet-adapter-react";

const API_ORIGIN = process.env.TXLINE_API ?? "https://txline-dev.txodds.com";

const API_BASE = `${API_ORIGIN}/api`;

export async function activateApiToken(
  wallet: WalletContextState,
  jwt: string,
  txSig: string,
  leagues: number[] = [],
) {
  const message = new TextEncoder().encode(
    `${txSig}:${leagues.join(",")}:${jwt}`,
  );

  let signature: Uint8Array;

  if (wallet.signMessage) {
    signature = await wallet.signMessage(message);
  } else {
    const signer = wallet as any;

    if (signer.payer) {
      signature = nacl.sign.detached(message, signer.payer.secretKey);
    } else {
      throw new Error("Connected wallet does not support signMessage");
    }
  }

  const walletSignature = Buffer.from(signature).toString("base64");

  console.log("========== ACTIVATE ==========");
  console.log("JWT:", jwt);
  console.log("TX SIG:", txSig);
  console.log("LEAGUES:", leagues);
  console.log("SIGNATURE:", walletSignature);

  try {
    const res = await axios.post(
      `${API_BASE}/token/activate`,
      {
        txSig,
        walletSignature,
        leagues,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
        },
      },
    );

    console.log("========== ACTIVATE SUCCESS ==========");
    console.log(res.data);

    return res.data.token ?? res.data;
  } catch (err: any) {
    console.log("========== ACTIVATE FAILED ==========");
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);

    throw err;
  }
}
