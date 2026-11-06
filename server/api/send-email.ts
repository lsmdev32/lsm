import nodemailer from "nodemailer";
import { z } from "zod";

const sendEmailBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(1),
});

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
      to,
      subject,
      html: `
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Deskripsi:</strong> ${description}</p>
      `,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Gagal mengirim email." };
  }
});
