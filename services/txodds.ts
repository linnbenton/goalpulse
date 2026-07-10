import axios from "axios";

// 1. Define the correct Devnet endpoint according to TxLINE 2026 rules
const TXLINE_DEVNET_API = "https://txline-dev.txodds.com/api";

export interface MatchFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: string;
}

/**
 * Fetches current live fixtures snapshot from TxLINE data layer
 * @param jwt Guest authentication token
 * @param apiToken Cryptographically activated on-chain API token
 */
export async function getFixtureSnapshot(
  jwt: string,
  apiToken: string,
): Promise<MatchFixture[]> {
  try {
    // 2. Data API endpoints strictly require both Authorization and X-Api-Token headers
    const response = await axios.get(`${TXLINE_DEVNET_API}/fixtures`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "X-Api-Token": apiToken,
      },
    });

    // 3. Adapt to TxLINE normalized JSON schema
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.fixtures)) {
      return response.data.fixtures;
    }

    return [];
  } catch (error: any) {
    console.error(
      "TxLINE Service Error - Failed to fetch fixtures:",
      error.response?.data || error.message,
    );
    throw new Error("External data layer failure");
  }
}
