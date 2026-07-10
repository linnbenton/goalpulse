import { NextRequest, NextResponse } from "next/server";
import { getFixtureSnapshot } from "@/services/txodds";

export async function GET(req: NextRequest) {
  const jwt = req.headers.get("authorization")?.replace("Bearer ", "");
  const apiToken = req.headers.get("x-api-token");

  if (!jwt || !apiToken) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 401 });
  }

  // Fetch fixtures using exactly 2 arguments as expected by the service
  const fixtures = await getFixtureSnapshot(jwt, apiToken);

  return NextResponse.json(fixtures);
}
