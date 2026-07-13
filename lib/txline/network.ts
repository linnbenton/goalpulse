import * as anchor from "@coral-xyz/anchor";

import txoracleIdl from "@/idl/txoracle.json";

import { Connection, PublicKey } from "@solana/web3.js";

export type TxLineNetwork = "mainnet" | "devnet";

export const NETWORK: TxLineNetwork =
  (process.env.NEXT_PUBLIC_TXLINE_NETWORK as TxLineNetwork) ?? "devnet";

const CONFIG = {
  mainnet: {
    rpcUrl: "https://api.mainnet-beta.solana.com",
    apiOrigin: "https://txline.txodds.com",
    apiBase: "https://txline.txodds.com/api",
    guestAuth: "https://txline.txodds.com/auth/guest/start",

    programId: new PublicKey("9ExbZjAapQww1vfcisDmrngPinHTEfpjYRWMunJgcKaA"),

    txlMint: new PublicKey("Zhw9TVKp68a1QrftncMSd6ELXKDtpVMNuMGr1jNwdeL"),
  },

  devnet: {
    rpcUrl: "https://api.devnet.solana.com",
    apiOrigin: "https://txline-dev.txodds.com",
    apiBase: "https://txline-dev.txodds.com/api",
    guestAuth: "https://txline-dev.txodds.com/auth/guest/start",

    programId: new PublicKey("6pW64gN1s2uqjHkn1unFeEjAwJkPGHoppGvS715wyP2J"),

    txlMint: new PublicKey("4Zao8ocPhmMgq7PdsYWyxvqySMGx7xb9cMftPMkEokRG"),
  },
} as const;

export const txline = CONFIG[NETWORK];

export const connection = new Connection(txline.rpcUrl, "confirmed");

export function createProgram(provider: anchor.AnchorProvider) {
  return new anchor.Program(txoracleIdl as anchor.Idl, provider);
}
