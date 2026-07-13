import BN from "bn.js";
import {
  ProofNode,
  ScoresBatchSummary,
  ScoreStat,
  StatLeaf,
  StatValidationInput,
} from "@/types/txline";

export function mapProof(proof: any[]): ProofNode[] {
  if (!proof) return [];

  return proof.map((node) => ({
    hash: Array.from(node.hash),
    isRightSibling: Boolean(
      node.isRightSibling ?? node.is_right_sibling ?? node.right ?? false,
    ),
  }));
}

export function mapScoreStat(stat: any): ScoreStat {
  return {
    key: Number(stat.key),
    value: Number(stat.value),
    period: Number(stat.period),
  };
}

export function buildFixtureSummary(summary: any): ScoresBatchSummary {
  return {
    fixtureId: new BN(summary.fixtureId),

    updateStats: {
      updateCount: Number(summary.updateStats.updateCount),
      minTimestamp: Number(summary.updateStats.minTimestamp),
      maxTimestamp: Number(summary.updateStats.maxTimestamp),
    },

    eventsSubTreeRoot: Array.from(summary.eventsSubTreeRoot),
  };
}

export function buildValidationPayload(validation: any): StatValidationInput {
  const stats: StatLeaf[] = validation.statsToProve.map(
    (stat: any, index: number) => ({
      stat: mapScoreStat(stat),
      statProof: mapProof(validation.statProofs[index]),
    }),
  );

  return {
    ts: new BN(validation.summary.updateStats.minTimestamp),

    fixtureSummary: buildFixtureSummary(validation.summary),

    fixtureProof: mapProof(validation.subTreeProof),

    mainTreeProof: mapProof(validation.mainTreeProof),

    eventStatRoot: Array.from(validation.eventStatRoot),

    stats,
  };
}
