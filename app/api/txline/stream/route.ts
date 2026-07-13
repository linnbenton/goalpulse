import { NextRequest } from "next/server";

import { txlineAuth } from "@/lib/txline/auth";
import { txlineStream } from "@/lib/txline/stream";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  await txlineAuth.ensureAuthenticated();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;

      req.signal.addEventListener("abort", () => {
        closed = true;
        controller.close();
      });

      while (!closed) {
        try {
          const fixtures = await txlineStream.fixtures();

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(fixtures)}\n\n`),
          );
        } catch (err: any) {
          controller.enqueue(encoder.encode("event: error\n"));

          controller.enqueue(
            encoder.encode(
              `data:${JSON.stringify({
                message: err.response?.data ?? err.message,
              })}\n\n`,
            ),
          );
        }

        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
