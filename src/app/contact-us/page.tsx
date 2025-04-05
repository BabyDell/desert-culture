import ContactForm from "./contact-form"
import Image from "next/image"

export const metadata = {
  title: "Contact Us | Desert Culture Magazine",
  description: "Get in touch with the Desert Culture Magazine team",
}

export default function ContactPage() {
  return (
    <main className="max-w-7xl w-full mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
        <div>
          <h1 className="text-4xl font-bold mb-6 font-Playfair">Contact Us</h1>
          <p className="text-gray-600 mb-8 font-Poly text-lg">
            Have a question, suggestion, or want to contribute to Desert Culture Magazine? We&apos;d love to hear from you.
            Fill out the form and our team will get back to you as soon as possible.
          </p>
         
          <Image
            src="/img/CCAssets/magazine-cover.jpg"
            alt="Contact Us"
            width={500}
            height={300}
            className="rounded-lg shadow-lg mb-6  lg:block hidden" />
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </main>
  )
}

