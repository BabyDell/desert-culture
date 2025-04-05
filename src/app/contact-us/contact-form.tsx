"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import localFont from "next/font/local";

const Nirpa = localFont({
  src: "../../fonts/Nirpa-2.ttf",
  variable: "--font-nirpa",
});

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    department: "editorial",
    message: "",
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormState({
      ...formState,
      department: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true });
    console.log("Form submitted:", formState);

    try {
      // Replace with your actual Formspree endpoint
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          error: false,
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormState({
          name: "",
          email: "",
          subject: "",
          department: "editorial",
          message: "",
        });
      } else {
        const data = await response.json();
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        error: true,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 font-Playfair">Get In Touch</h2>

      {status.submitted && !status.error ? (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">Success!</AlertTitle>
          <AlertDescription className="text-green-700">
            {status.message}
          </AlertDescription>
        </Alert>
      ) : status.error ? (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-800">Error</AlertTitle>
          <AlertDescription className="text-red-700">
            {status.message}
          </AlertDescription>
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-6 font-Poly">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="rounded-none border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="rounded-none border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select
            value={formState.department}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger
              id="department"
              className="rounded-none border-gray-300"
            >
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general inquiry">General Inquiry</SelectItem>
              <SelectItem value="editorial">Editorial</SelectItem>
              <SelectItem value="advertising">Advertising</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            placeholder="Subject of your message"
            required
            className="rounded-none border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            placeholder="Your message..."
            required
            className="min-h-[150px] rounded-none border-gray-300"
          />
        </div>

        <Button
          type="submit"
          disabled={status.submitting}
          className={`bg-black text-white rounded-none w-full text-xl ${Nirpa.variable} font-nirpa`}
        >
          <span className="mt-1">
            {status.submitting ? "Sending..." : "Send Message"}
          </span>
        </Button>
      </form>
    </div>
  );
}
