import { NextRequest, NextResponse } from "next/server";

import { getFixtureSnapshot } from "@/services/txodds";

export async function GET(req: NextRequest) {
  const jwt = req.headers.get("authorization")?.replace("Bearer ", "");
  const apiToken = req.headers.get("x-api-token");

  if (!jwt || !apiToken) {
    return NextResponse.json(
      {
        error: "Missing credentials",
      },
      {
        status: 401,
      },
    );
  }

  const search = req.nextUrl.searchParams;

  const startEpochDay = search.get("startEpochDay");

  const competitionId = search.get("competitionId");

  const fixtures = await getFixtureSnapshot(
    jwt,
    apiToken,
    startEpochDay ? Number(startEpochDay) : undefined,
    competitionId ? Number(competitionId) : undefined,
  );

  return NextResponse.json(fixtures);
}
