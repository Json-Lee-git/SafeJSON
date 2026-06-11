import { createHmac, timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function verifySignature(rawBody: string, signature: string, secret: string) {
  const digest = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expected = Buffer.from(digest, "hex");
  const received = Buffer.from(signature, "hex");

  if (expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(expected, received);
}

export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    return Response.json(
      { ok: false, error: "Webhook secret is not configured." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("x-signature") || "";
  const rawBody = await request.text();

  if (!signature || !verifySignature(rawBody, signature, secret)) {
    return Response.json(
      { ok: false, error: "Invalid webhook signature." },
      { status: 401 }
    );
  }

  let payload: {
    meta?: { event_name?: string; custom_data?: Record<string, unknown> };
    data?: { id?: string; type?: string };
  };

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json(
      { ok: false, error: "Invalid webhook JSON." },
      { status: 400 }
    );
  }

  const eventName = payload.meta?.event_name || "unknown";

  console.info("Lemon Squeezy webhook received", {
    eventName,
    resourceType: payload.data?.type || "unknown",
    resourceId: payload.data?.id || "unknown",
  });

  return Response.json({
    ok: true,
    eventName,
  });
}
