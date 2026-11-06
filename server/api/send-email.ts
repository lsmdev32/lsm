import nodemailer from "nodemailer";
import { z } from "zod";

const sendEmailBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(1),
});


const LOGO_URL = "https://imgur.com/a/AUpzazN";

// Warna brand
const BRAND_COLOR = "#dab38d"; 
const BRAND_DARK = "#4B3D2A"; 
const BRAND_LINK = "#8a6a3f"; 
const BRAND_SOFT = "#f8f1e9"; 

// Mencegah HTML injection dari input pengguna
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

type EmailTemplateData = {
  title: string;
  intro: string;
  descriptionLabel: string;
  name: string;
  email: string;
  description: string;
};

// Template HTML (inline style + table layout supaya aman di Gmail/Outlook)
const buildEmailHtml = ({
  title,
  intro,
  descriptionLabel,
  name,
  email,
  description,
}: EmailTemplateData): string => {
  const safeTitle = escapeHtml(title);
  const safeIntro = escapeHtml(intro);
  const safeLabel = escapeHtml(descriptionLabel);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeDescription = escapeHtml(description).replace(/\n/g, "<br />");
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f3f0;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f3f0;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;">

            <!-- Header + Logo -->
            <tr>
              <td align="center" style="background-color:${BRAND_COLOR};padding:28px 32px 20px;">
                <img src="${LOGO_URL}" alt="LSM Law Firm" width="180" style="display:block;width:180px;height:auto;border:0;margin:0 auto;" />
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color:${BRAND_COLOR};padding:0 32px 28px;">
                <h1 style="margin:0;font-size:20px;color:${BRAND_DARK};">${safeTitle}</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;color:#1f2937;font-size:15px;line-height:1.6;">
                <p style="margin:0 0 20px;">${safeIntro}</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eadfd2;border-radius:6px;">
                  <tr>
                    <td style="padding:12px 16px;width:110px;color:#6b5b4a;background-color:${BRAND_SOFT};border-bottom:1px solid #eadfd2;vertical-align:top;"><strong>Nama</strong></td>
                    <td style="padding:12px 16px;border-bottom:1px solid #eadfd2;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;color:#6b5b4a;background-color:${BRAND_SOFT};border-bottom:1px solid #eadfd2;vertical-align:top;"><strong>Email</strong></td>
                    <td style="padding:12px 16px;border-bottom:1px solid #eadfd2;">
                      <a href="mailto:${safeEmail}" style="color:${BRAND_LINK};text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;color:#6b5b4a;background-color:${BRAND_SOFT};vertical-align:top;"><strong>${safeLabel}</strong></td>
                    <td style="padding:12px 16px;">${safeDescription}</td>
                  </tr>
                </table>

                <!-- Tombol balas -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                  <tr>
                    <td style="background-color:${BRAND_COLOR};border-radius:6px;">
                      <a href="mailto:${safeEmail}" style="display:inline-block;padding:12px 24px;color:${BRAND_DARK};font-size:14px;font-weight:bold;text-decoration:none;">Balas ${safeName}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color:${BRAND_SOFT};padding:16px 32px;color:#8b7d6b;font-size:12px;border-top:3px solid ${BRAND_COLOR};">
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
  let title = "";
  let intro = "";
  let descriptionLabel = "";

  if (type === "contact") {
    subject = `From Contact Us : ${name} ingin menghubungi Anda`;
    to = "rayhanhamada1999@gmail.com";
    title = "Pesan Baru dari Contact Us";
    intro = "Ada pesan baru yang masuk lewat formulir Contact Us:";
    descriptionLabel = "Pesan";
  } else {
    subject = `From Career : ${name} ingin mengirimkan lamaran pekerjaan`;
    to = "hrd@lsmlaw.co.id";
    title = "Lamaran Pekerjaan Baru";
    intro = "Ada lamaran pekerjaan baru yang masuk lewat halaman Career:";
    descriptionLabel = "Deskripsi";
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
      to,
      subject,
      html: buildEmailHtml({
        title,
        intro,
        descriptionLabel,
        name,
        email,
        description,
      }),
      // Fallback untuk email client yang tidak mendukung HTML
      text: `${title}\n\nNama: ${name}\nEmail: ${email}\n${descriptionLabel}: ${description}`,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Gagal mengirim email." };
  }
});