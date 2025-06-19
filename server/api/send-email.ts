import nodemailer from "nodemailer"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { name, email, type, description } = body

	if (!name || !email || !type || !description) {
		return { success: false, error: "Semua field wajib diisi." }
	}

	let subject = ""
	if (type === "contact") {
		subject = `From Contact Us : ${name} ingin menghubungi Anda`
	}
	else {
		subject = `From Career : ${name} ingin mengirimkan lamaran pekerjaan`
	}

	const config = useRuntimeConfig()

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
			from: `"Website LSM" <${config.smtpUser}>`,
			to: "lsmlawfirm@lsmlaw.co.id", // email penerima
			subject: subject,
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
