import { z } from "zod";

const subscribeBodySchema = z.object({
  name: z.string(),
  email: z.string(),
});

export default defineEventHandler(async (event) => {
  const rawBody: unknown = await readBody(event);
  const parsedBody = subscribeBodySchema.safeParse(rawBody);

  if (!parsedBody.success) {
    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    };
  }

  const config = useRuntimeConfig();

  const formData = new URLSearchParams();
  formData.append("FNAME", parsedBody.data.name);
  formData.append("EMAIL", parsedBody.data.email);

  const url = `https://${config.public.mailchimpDc}.list-manage.com/subscribe/post?u=${config.public.mailchimpU}&id=${config.public.mailchimpId}&f_id=${config.public.mailchimpFid}`;

  try {
    await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Karena pakai mode `no-cors`, kita tidak bisa membaca hasil sukses Mailchimp.
    // Jadi kita anggap berhasil kirim jika tidak ada error.
    return {
      success: true,
      message: "You have been subscribed successfully!",
    };
  } catch {
    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    };
  }
});
