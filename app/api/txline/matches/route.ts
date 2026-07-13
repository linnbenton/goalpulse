import { NextResponse } from "next/server";

import { txlineAuth } from "@/lib/txline/auth";
import { txlineStream } from "@/lib/txline/stream";

export async function GET() {
  try {
    await txlineAuth.ensureAuthenticated();

    const fixtures = await txlineStream.fixtures();

    return NextResponse.json(fixtures);
  } catch (err: any) {
    console.error("[TxLINE Matches]", err.response?.data ?? err.message);

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
