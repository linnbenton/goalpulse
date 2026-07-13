import { NextRequest, NextResponse } from "next/server";

import { txlineSubscription } from "@/lib/txline/subscription";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const fixtureId = searchParams.get("fixtureId");
    const seq = searchParams.get("seq");
    const statKeys = searchParams.get("statKeys");

    if (!fixtureId || !seq || !statKeys) {
      return NextResponse.json(
        {
          error: "Missing fixtureId / seq / statKeys",
        },
        {
          status: 400,
        },
      );
    }

    const jwt = req.headers.get("authorization");

    const apiToken = req.headers.get("x-api-token");

    console.log("JWT:", jwt);
    console.log("API:", apiToken);

    const res = await axios.get(
      "https://txline-dev.txodds.com/api/scores/stat-validation",
      {
        params: {
          fixtureId,
          seq,
          statKeys,
        },
        headers: {
          Authorization: jwt ?? "",
          "x-api-token": apiToken ?? "",
          Accept: "application/json",
        },
      },
    );

    const validation = res.data;

    return NextResponse.json(validation);
  } catch (err: any) {
    console.error("[TxLINE Validation]", err.response?.data ?? err.message);

    return NextResponse.json(
      {
        error: err.response?.data ?? err.message,
      },
      {
        status: err.response?.status ?? 500,
      },
    );
  }
}
