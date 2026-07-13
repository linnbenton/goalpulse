import BN from "bn.js";

export function toBytes32(arr: number[]): number[] {
  if (!Array.isArray(arr)) throw new Error("Expected byte array");

  if (arr.length !== 32) throw new Error("Expected 32-byte array");

  return arr;
}

export function toProofNodes(nodes: any[]) {
  return nodes.map((n) => ({
    hash: toBytes32(n.hash),
    isRightSibling: n.isRightSibling ?? n.is_right_sibling ?? false,
  }));
}

export function buildValidationPayload(validation: any) {
  return {
    ts: new BN(validation.summary.updateStats.minTimestamp),

    fixtureSummary: {
      fixtureId: new BN(validation.summary.fixtureId),

      updateStats: {
        updateCount: validation.summary.updateStats.updateCount,

        minTimestamp: new BN(validation.summary.updateStats.minTimestamp),

        maxTimestamp: new BN(validation.summary.updateStats.maxTimestamp),
      },

      eventsSubTreeRoot: toBytes32(validation.summary.eventStatsSubTreeRoot),
    },

    fixtureProof: toProofNodes(validation.subTreeProof),

    mainTreeProof: toProofNodes(validation.mainTreeProof),

    eventStatRoot: toBytes32(validation.eventStatRoot),

    stats: validation.statsToProve.map((stat: any, index: number) => ({
      stat,

      statProof: toProofNodes(validation.statProofs[index]),
    })),
  };
}

export function buildBinaryStrategy(
  indexA: number,
  indexB: number,
  threshold: number,
  comparison: "equalTo" | "greaterThan" | "lessThan",
  operation: "subtract" | "add",
) {
  return {
    geometricTargets: [],

    distancePredicate: null,

    discretePredicates: [
      {
        binary: {
          indexA,

          indexB,

          op: {
            [operation]: {},
          },

          predicate: {
            threshold,

            comparison: {
              [comparison]: {},
            },
          },
        },
      },
    ],
  };
}

export function buildSingleStrategy(
  index: number,
  threshold: number,
  comparison: "equalTo" | "greaterThan" | "lessThan",
) {
  return {
    geometricTargets: [],

    distancePredicate: null,

    discretePredicates: [
      {
        single: {
          index,

          predicate: {
            threshold,

            comparison: {
              [comparison]: {},
            },
          },
        },
      },
    ],
  };
}
