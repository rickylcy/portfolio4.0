import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const lastHit = new Map();
const RATE_LIMIT_MS = 10_000;

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(5).max(5000), // was 10 → now 5
  company: z.string().optional().default(""),
});

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    const now = Date.now();
    if (now - (lastHit.get(ip) || 0) < RATE_LIMIT_MS) {
      return json({ ok: false, error: "rate_limited" }, 429);
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return json({ ok: false, error: "invalid_json" }, 400);
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return json({ ok: false, error: "invalid_input" }, 400);
    }

    const { name, email, message, company } = parsed.data;
    if (company?.trim()) return json({ ok: true }, 200); // honeypot

    await sendContactEmail({ name, email, message });
    lastHit.set(ip, now);
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("[api/contact] error:", err);
    return json({ ok: false, error: "server_error" }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
