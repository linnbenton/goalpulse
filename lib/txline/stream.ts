import { txlineClient } from "./client";

export interface LiveMatch {
  fixtureId: number;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  competition: string;
  kickoff: number;
  status: string;
}

export interface LiveOdds {
  fixtureId: number;
  prices: number[];
  bookmaker: string;
}

export interface LiveScore {
  fixtureId: number;
  home: number;
  away: number;
}

class TxLineStream {
  async fixtures() {
    return txlineClient.get<LiveMatch[]>("/fixtures/live");
  }

  async odds(fixtureId: number) {
    return txlineClient.get<LiveOdds[]>("/odds/latest", {
      fixtureId,
    });
  }

  async scores(fixtureId: number) {
    return txlineClient.get<LiveScore>("/scores/latest", {
      fixtureId,
    });
  }

  async snapshot(fixtureId: number) {
    const [odds, scores] = await Promise.all([
      this.odds(fixtureId),
      this.scores(fixtureId),
    ]);

    return {
      odds,
      scores,
    };
  }
}

export const txlineStream = new TxLineStream();
