import BN from "bn.js";
import { toBN, toBytes32, toProofNodes } from "./txline";

export interface ValidationResponse {
  summary: {
    fixtureId: number;
    updateStats: {
      updateCount: number;
      minTimestamp: number;
      maxTimestamp: number;
    };
    eventStatsSubTreeRoot: number[];
  };

  subTreeProof: any[];

  mainTreeProof: any[];

  eventStatRoot: number[];

  statsToProve: any[];

  statProofs: any[];
}

export function buildValidationPayload(val: ValidationResponse) {
  return {
    ts: toBN(val.summary.updateStats.minTimestamp),

    fixtureSummary: {
      fixtureId: toBN(val.summary.fixtureId),

      updateStats: {
        updateCount: val.summary.updateStats.updateCount,

        minTimestamp: toBN(val.summary.updateStats.minTimestamp),

        maxTimestamp: toBN(val.summary.updateStats.maxTimestamp),
      },

      eventsSubTreeRoot: toBytes32(val.summary.eventStatsSubTreeRoot),
    },

    fixtureProof: toProofNodes(val.subTreeProof),

    mainTreeProof: toProofNodes(val.mainTreeProof),

    eventStatRoot: toBytes32(val.eventStatRoot),

    stats: val.statsToProve.map((stat, index) => ({
      stat,
      statProof: toProofNodes(val.statProofs[index]),
    })),
  };
}

export function buildSingleStrategy(
  statIndex: number,
  threshold: number,
  comparison: "greaterThan" | "lessThan" | "equalTo",
) {
  return {
    geometricTargets: [],

    distancePredicate: null,

    discretePredicates: [
      {
        single: {
          index: statIndex,

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

export function buildBinaryStrategy(
  indexA: number,
  indexB: number,
  threshold: number,
  comparison: "greaterThan" | "lessThan" | "equalTo",
  op: "add" | "subtract" = "subtract",
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
            [op]: {},
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

export function buildGeometricStrategy(
  targets: {
    statIndex: number;
    prediction: number;
  }[],
  threshold: number,
) {
  return {
    geometricTargets: targets,

    distancePredicate: {
      threshold,

      comparison: {
        lessThan: {},
      },
    },

    discretePredicates: [],
  };
}
