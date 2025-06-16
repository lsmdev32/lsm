import nodemailer from "nodemailer"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { name, email, message, description } = body
	console.log(`data ${name} ${email} ${message} ${description}`)

	if (!name || !email || !message || !description) {
		return { success: false, error: "Semua field wajib diisi." }
	}

	const config = useRuntimeConfig()
	console.log(config)

	const transporter = nodemailer.createTransport({
		host: config.smtpHost,
		port: Number(config.smtpPort),
		secure: true,
		auth: {
			user: config.smtpUser,
			pass: config.smtpPass,
		},
	})

	try {
		await transporter.sendMail({
			from: `"Website Test" <${config.smtpUser}>`,
			to: "ardinatahs.gcp2@gmail.com", // email penerima
			subject: `From Contact Us : ${message} - ${name}`,
			html: `
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Deskripsi:</strong> ${description}</p>
      `,
		})

		return { success: true }
	}
	catch (err) {
		return { success: false, error: "Gagal mengirim email." }
	}
})
