import { Resend } from "resend"
import ContactFormEmail from "./email-template"

export async function POST(request: Request) {
  try {
    const { name, email, message, department, subject } = await request.json()

    // Initialize Resend with your API key
    const resend = new Resend(process.env.RESEND_API_KEY)

    console.log("Sending email with data:", { name, email, subject, department })

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["a.java.coder7@gmail.com"], // Replace with your email
      subject: `New Contact Form Submission: ${subject}`,
      react: ContactFormEmail({ name, email, message, department, subject }),
    })

    if (error) {
      console.error("Resend API error:", error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    console.error("Server error:", error)
    return Response.json({ error: error instanceof Error ? error.message : "Unknown error occurred" }, { status: 500 })
  }
}

