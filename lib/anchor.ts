import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

import txoracle from "@/idl/txoracle.json";

export const connection = new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC ?? "https://api.devnet.solana.com",
  "confirmed",
);

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_TXLINE_PROGRAM_ID ??
    "6pW64gN1s2uqjHkn1unFeEjAwJkPGHoppGvS715wyP2J",
);

export function createReadonlyProgram(wallet: anchor.Wallet) {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions(),
  );

  anchor.setProvider(provider);

  return new Program(txoracle as any, provider);
}
