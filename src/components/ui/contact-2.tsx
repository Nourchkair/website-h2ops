"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Instagram } from "lucide-react";

interface Contact2Props {
  title?: string;
  description?: string;
  email?: string;
}

export const Contact2 = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  email = "email@example.com",
}: Contact2Props) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(
        "https://h2ops.app.n8n.cloud/webhook-test/h2ops-website-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-screen-xl">
        <div className="mx-auto flex flex-col justify-between gap-8 sm:gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex w-full max-w-sm flex-col justify-between gap-8 sm:gap-10 lg:mx-0">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight lg:mb-1 lg:text-6xl">
                {title}
              </h1>
              <p className="text-white/70 text-sm sm:text-base">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-4 sm:mb-6 text-center text-xl sm:text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="text-sm sm:text-base break-all">
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline hover:text-white/80 transition-colors">
                    {email}
                  </a>
                </div>
                <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full min-w-[44px] min-h-[44px] w-11 h-11 sm:w-10 sm:h-10 p-0 flex items-center justify-center touch-manipulation"
                    onClick={() => window.open('https://linkedin.com', '_blank')}
                    aria-label="Visit our LinkedIn page"
                  >
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full min-w-[44px] min-h-[44px] w-11 h-11 sm:w-10 sm:h-10 p-0 flex items-center justify-center touch-manipulation"
                    onClick={() => window.open('https://www.instagram.com/horizon2operations?igsh=NGdpOGJ6cXFxaGps', '_blank')}
                    aria-label="Visit our Instagram page"
                  >
                    <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full min-w-[44px] min-h-[44px] w-11 h-11 sm:w-10 sm:h-10 p-0 flex items-center justify-center touch-manipulation"
                    onClick={() => window.open('https://tiktok.com', '_blank')}
                    aria-label="Visit our TikTok page"
                  >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-screen-md flex-col gap-4 sm:gap-6 rounded-lg border border-white/10 p-4 sm:p-6 md:p-8 lg:p-10"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname" className="text-sm sm:text-base">First Name</Label>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  className="min-h-[44px] text-base"
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname" className="text-sm sm:text-base">Last Name</Label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  className="min-h-[44px] text-base"
                  required
                />
              </div>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                inputMode="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                className="min-h-[44px] text-base"
                required
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject" className="text-sm sm:text-base">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder="What can we help with?"
                value={formData.subject}
                onChange={handleInputChange}
                className="min-h-[44px] text-base"
                required
              />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message" className="text-sm sm:text-base">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Type your message here."
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="min-h-[120px] text-base resize-y"
                required
              />
            </div>

            {submitStatus === "success" && (
              <p className="text-green-500 text-center text-sm sm:text-base font-medium" role="alert">
                Message sent successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-center text-sm sm:text-base font-medium" role="alert">
                Failed to send message. Please try again.
              </p>
            )}

            <Button
              type="submit"
              className="w-full min-h-[44px] text-base sm:text-lg font-semibold touch-manipulation"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
