// src/pages/Contact.jsx
import React from "react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Contact() {
  const navigate = useNavigate();

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

        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire to your webhook / form handler
            alert("Submitted!");
          }}
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
              label="Send message"
              variant="blue"
              className="font-semibold"
            />
          </div>
        </form>
      </div>
    </main>
  );
}
