import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({ name, email, message }) {
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

  if (!to) throw new Error("CONTACT_TO not set");
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");

  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
      <h2>New portfolio contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${escapeHtml(
        message
      )}</pre>
    </div>
  `;

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Portfolio contact from ${name}`,
    replyTo: email, // <-- correct key
    html,
  });
  if (error) throw error;
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
