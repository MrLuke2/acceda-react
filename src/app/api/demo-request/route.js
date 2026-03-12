import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, company, email, phone, zip } = await req.json();

  // Basic validation
  if (!name || !company || !email) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "ACCEDA Leads <leads@useacceda.com>",
      to: "mr.n.luke@gmail.com",          // ← YOUR email here
      subject: `New Demo Request — ${company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; padding: 32px;">
          <h2 style="margin: 0 0 24px; color: #0C1F4A;">
            New Demo Request
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #6B7280; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #6B7280; font-size: 13px;">Company</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; font-weight: 600;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #6B7280; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">
                <a href="mailto:${email}" style="color: #1D6AFF;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #6B7280; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${phone || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6B7280; font-size: 13px;">ZIP Code</td>
              <td style="padding: 10px 0; font-size: 14px;">${zip || "—"}</td>
            </tr>
          </table>
          <div style="margin-top: 28px; padding: 16px; background: #F4F6F8; border-radius: 8px; font-size: 12px; color: #6B7280;">
            Submitted via ACCEDA landing page
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return Response.json({ error: "Failed to send" }, { status: 500 });
  }
}