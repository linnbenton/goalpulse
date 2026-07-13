import BN from "bn.js";

export interface ProofNode {
  hash: number[];
  isRightSibling: boolean;
}

export interface ScoreStat {
  key: number;
  value: number;
  period: number;
}

export interface StatLeaf {
  stat: ScoreStat;
  statProof: ProofNode[];
}

export interface ScoresUpdateStats {
  updateCount: number;
  minTimestamp: number;
  maxTimestamp: number;
}

export interface ScoresBatchSummary {
  fixtureId: BN;
  updateStats: ScoresUpdateStats;
  eventsSubTreeRoot: number[];
}

export interface StatValidationInput {
  ts: BN;
  fixtureSummary: ScoresBatchSummary;
  fixtureProof: ProofNode[];
  mainTreeProof: ProofNode[];
  eventStatRoot: number[];
  stats: StatLeaf[];
}

export interface TraderPredicate {
  threshold: number;
  comparison: { greaterThan: {} } | { lessThan: {} } | { equalTo: {} };
}

export interface NDimensionalStrategy {
  geometricTargets: any[];
  distancePredicate: TraderPredicate | null;
  discretePredicates: any[];
}
