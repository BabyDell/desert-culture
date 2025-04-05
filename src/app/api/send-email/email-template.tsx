interface ContactFormEmailProps {
    name: string
    email: string
    message: string
    department: string
    subject: string
  }
  
  export default function ContactFormEmail({ name, email, message, department, subject }: ContactFormEmailProps) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ color: "#333", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
          New Contact Form Submission
        </h1>
        <p>You have received a new message from the contact form on Desert Culture Magazine.</p>
        <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "4px", marginBottom: "20px" }}>
          <h2 style={{ color: "#333", fontSize: "18px", marginTop: "0" }}>Contact Details:</h2>
          <ul style={{ paddingLeft: "20px" }}>
            <li>
              <strong>Name:</strong> {name}
            </li>
            <li>
              <strong>Email:</strong> {email}
            </li>
            <li>
              <strong>Department:</strong> {department}
            </li>
            <li>
              <strong>Subject:</strong> {subject}
            </li>
          </ul>
        </div>
        <div>
          <h2 style={{ color: "#333", fontSize: "18px" }}>Message:</h2>
          <p style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>{message}</p>
        </div>
        <div
          style={{ marginTop: "30px", fontSize: "12px", color: "#666", borderTop: "1px solid #eee", paddingTop: "10px" }}
        >
          <p>This email was sent from the Desert Culture Magazine contact form.</p>
        </div>
      </div>
    )
  }
  
  