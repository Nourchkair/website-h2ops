// src/pages/Contact.jsx
import React from "react";
import { ButtonColorful } from "@/components/ui/button-colorful";

export default function Contact() {
  return (
    <main className="min-h-[100svh] bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-2 text-white/80">
          Tell us about your project and we’ll get back within 24 hours.
        </p>

        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire to your webhook / form handler
            alert("Submitted!");
          }}
        >
          <input
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
          <input
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
          <input
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
            type="text"
            name="company"
            placeholder="Company (optional)"
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
