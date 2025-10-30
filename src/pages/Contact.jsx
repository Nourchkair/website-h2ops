// src/pages/Contact.jsx
import React, { useState } from "react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Contact() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('https://h2ops.app.n8n.cloud/webhook/form-h2ops-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        e.target.reset();
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[100svh] bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to home</span>
        </button>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-2 text-white/80">
          Tell us about your project and we'll get back within 24 hours.
        </p>

        {submitStatus === 'success' && (
          <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
            Message sent successfully! Redirecting to home...
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            Failed to send message. Please try again.
          </div>
        )}

        <form
          className="mt-6 grid gap-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              type="text"
              name="firstName"
              placeholder="First name"
              required
            />
            <input
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              type="text"
              name="lastName"
              placeholder="Last name"
              required
            />
          </div>
          <input
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
            type="text"
            name="company"
            placeholder="Company name"
            required
          />
          <textarea
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 min-h-[140px] outline-none focus:ring-2 focus:ring-sky-500"
            name="message"
            placeholder="What are you trying to achieve?"
            required
          />
          <div className="pt-2">
            <ButtonColorful
              type="submit"
              label={isSubmitting ? "Sending..." : "Send message"}
              variant="blue"
              className="font-semibold"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
