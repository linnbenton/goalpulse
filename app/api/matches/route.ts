import { NextResponse } from "next/server";

// Sample live/upcoming World Cup matches data for hackathon UI development
const mockMatches = [
  {
    id: "match-1",
    homeTeam: "Argentina",
    awayTeam: "France",
    homeScore: 3,
    awayScore: 3,
    status: "LIVE",
    minute: "118'",
    tournament: "FIFA World Cup",
    group: "Group Stage",
  },
  {
    id: "match-2",
    homeTeam: "Brazil",
    awayTeam: "Croatia",
    homeScore: 1,
    awayScore: 0,
    status: "LIVE",
    minute: "72'",
    tournament: "FIFA World Cup",
    group: "Group Stage",
  },
  {
    id: "match-3",
    homeTeam: "Spain",
    awayTeam: "Germany",
    homeScore: 0,
    awayScore: 0,
    status: "UPCOMING",
    time: "22:00 WIB",
    tournament: "FIFA World Cup",
    group: "Group Stage",
  },
];

export async function GET() {
  // 1. Bypass environment variable check for local development
  const jwt = process.env.TXODDS_JWT;
  const token = process.env.TXODDS_API_TOKEN;

  if (!jwt || !token) {
    return NextResponse.json(
      { error: "Missing TXLINE environment variables inside mock handler" },
      { status: 500 },
    );
  }

  // 2. Return mock matches instantly without hitting the broken TxLINE server
  // This ensures your UI components render perfectly right now!
  return NextResponse.json(mockMatches);
}
