import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.TXLINE_API ?? "https://txline-dev.txodds.com/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const fixtureId = searchParams.get("fixtureId");
    const seq = searchParams.get("seq");
    const statKeys = searchParams.get("statKeys");

    if (!fixtureId || !seq || !statKeys) {
      return NextResponse.json(
        {
          error: "fixtureId, seq and statKeys are required",
        },
        {
          status: 400,
        },
      );
    }

    const url =
      `${API_BASE}/scores/stat-validation` +
      `?fixtureId=${fixtureId}` +
      `&seq=${seq}` +
      `&statKeys=${statKeys}`;

    console.log("[TxLINE]", url);

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();

      return NextResponse.json(
        {
          error: text,
        },
        {
          status: response.status,
        },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
