"use client";
import React from "react";
import { Contact2 } from "@/components/ui/contact-2";

export function Contact() {
  return (
    <section id="contact" className="bg-transparent">
      <Contact2
        title="Start Your Transformation"
        description="Ready to 3x your revenue with premium automation? Let’s talk."
        phone="+1 (555) 123-4567"
        email="info@horizon2operations.com"
        web={{ label: "horizon2operations.com", url: "https://horizon2operations.com" }}
      />
    </section>
  );
}

export default Contact;
