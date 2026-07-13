import { NDimensionalStrategy } from "@/types/txline";

export type Comparison = "gt" | "lt" | "eq";

export interface StrategyOptions {
  statIndex: number;
  threshold: number;
  comparison: Comparison;
}

function buildComparison(type: Comparison) {
  switch (type) {
    case "gt":
      return {
        greaterThan: {},
      };

    case "lt":
      return {
        lessThan: {},
      };

    default:
      return {
        equalTo: {},
      };
  }
}

export function buildStrategy(options: StrategyOptions): NDimensionalStrategy {
  return {
    geometricTargets: [],

    distancePredicate: null,

    discretePredicates: [
      {
        single: {
          index: options.statIndex,

          predicate: {
            threshold: options.threshold,

            comparison: buildComparison(options.comparison),
          },
        },
      },
    ],
  };
}
