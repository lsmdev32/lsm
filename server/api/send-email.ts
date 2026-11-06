import nodemailer from "nodemailer";
import { z } from "zod";

const sendEmailBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(1),
});

// Mencegah HTML injection dari input pengguna
const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

interface EmailTemplateData {
  name: string;
  email: string;
  description: string;
  isCareer: boolean;
}

const buildEmailHtml = ({
  name,
  email,
  description,
  isCareer,
}: EmailTemplateData): string => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeDescription = escapeHtml(description).replaceAll("\n", "<br />");
  const year = new Date().getFullYear();

  const badge = isCareer ? "Career" : "Contact Us";

  const title = isCareer
    ? "Lamaran Pekerjaan Baru"
    : "Pesan Baru dari Pengunjung";

  const intro = isCareer
    ? `<strong>${safeName}</strong> mengirimkan lamaran pekerjaan melalui website.`
    : `<strong>${safeName}</strong> ingin menghubungi Anda melalui website.`;

  const descriptionLabel = isCareer ? "Pesan / Deskripsi" : "Pesan";

  return `
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background-color:#1d4ed8;padding:28px 32px;">
                <span style="display:inline-block;padding:4px 10px;background-color:rgba(255,255,255,0.18);border-radius:999px;color:#ffffff;font-size:11px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;">${badge}</span>
                <h1 style="margin:12px 0 0;font-size:22px;color:#ffffff;">${title}</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;color:#111827;font-size:15px;line-height:1.6;">
                <p style="margin:0 0 20px;">${intro}</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;">
                  <tr>
                    <td style="padding:12px 16px;width:120px;color:#6b7280;border-bottom:1px solid #e5e7eb;"><strong>Nama</strong></td>
                    <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;color:#6b7280;border-bottom:1px solid #e5e7eb;"><strong>Email</strong></td>
                    <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">
                      <a href="mailto:${safeEmail}" style="color:#1d4ed8;text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;color:#6b7280;vertical-align:top;"><strong>${descriptionLabel}</strong></td>
                    <td style="padding:12px 16px;">${safeDescription}</td>
                  </tr>
                </table>

                <!-- Tombol balas -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                  <tr>
                    <td style="background-color:#1d4ed8;border-radius:6px;">
                      <a href="mailto:${safeEmail}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;">Balas ${safeName}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f9fafb;padding:16px 32px;color:#9ca3af;font-size:12px;text-align:center;">
                Email ini dikirim otomatis dari Website LSM &copy; ${year}
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export default defineEventHandler(async (event) => {
  const rawBody: unknown = await readBody(event);
  const parsedBody = sendEmailBodySchema.safeParse(rawBody);

  if (!parsedBody.success) {
    return { success: false, error: "Semua field wajib diisi." };
  }

  const { name, email, type, description } = parsedBody.data;

  let subject = "";
  let to = "";

  if (type === "contact") {
    subject = `From Contact Us : ${name} ingin menghubungi Anda`;
    to = "rayhanhamada1999@gmail.com";
  } else {
    subject = `From Career : ${name} ingin mengirimkan lamaran pekerjaan`;
    to = "hrd@lsmlaw.co.id";
  }

  const config = useRuntimeConfig();

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website LSM" <${config.smtpUser}>`,
      replyTo: email,
      to,
      subject,
      html: buildEmailHtml({
        name,
        email,
        description,
        isCareer: type !== "contact",
      }),
      text: `${subject}\n\nNama: ${name}\nEmail: ${email}\nDeskripsi: ${description}`,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Gagal mengirim email." };
  }
});
