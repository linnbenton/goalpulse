import BN from "bn.js";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export interface ApiProofNode {
  hash: number[] | Uint8Array | Buffer;
  isRightSibling: boolean;
}

export function toBN(value: number | string | bigint) {
  return new BN(value.toString());
}

export function toBytes32(value: number[] | Uint8Array) {
  return Array.from(value);
}

export function toProofNodes(nodes: ApiProofNode[]) {
  return nodes.map((node) => ({
    hash: Array.from(node.hash),
    isRightSibling: node.isRightSibling,
  }));
}

export function getEpochDay(timestamp: number) {
  return Math.floor(timestamp / 86400000);
}

export function deriveDailyScoresPda(epochDay: number, programId: PublicKey) {
  const day = Buffer.alloc(4);

  day.writeUInt32LE(epochDay);

  return PublicKey.findProgramAddressSync(
    [Buffer.from("daily_scores_roots"), day],
    programId,
  );
}

export function computeBudgetInstruction() {
  return anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
    units: 1_400_000,
  });
}
