export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const formData = new URLSearchParams()
  formData.append("FNAME", body.name)
  formData.append("EMAIL", body.email)

  const url = `https://${config.public.mailchimpDc}.list-manage.com/subscribe/post?u=${config.public.mailchimpU}&id=${config.public.mailchimpId}&f_id=${config.public.mailchimpFid}`

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    return { success: true }
  } catch (err) {
    return { success: false, message: "Failed to subscribe." }
  }
})
