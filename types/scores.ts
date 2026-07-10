export interface ScoresPayload {
  fixtureId: number;
  gameState: string;
  startTime: number;

  participant1Id: number;
  participant2Id: number;

  action: string;

  ts: number;
  seq: number;

  scoreSoccer?: unknown;
  scoreBasketball?: unknown;
  score?: unknown;

  stats?: unknown;
}
