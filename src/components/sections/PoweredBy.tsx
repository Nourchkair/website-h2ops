// src/components/sections/PoweredBy.tsx
'use client';

import React from 'react';
import LogoLoop from '@/components/ui/LogoLoop';

type ExternalLogoProps = {
  src: string;
  alt: string;
  href: string;
  title: string;
  className?: string;
  /** Use when the source asset has a baked-in white rectangle */
  removeWhiteBG?: boolean;
};

const ExternalLogo = ({
  src,
  alt,
  href,
  title,
  className = '',
  removeWhiteBG = false,
}: ExternalLogoProps) => {
  // Force glyphs to white; keep transparency intact
  const baseFilter = 'brightness(0) invert(1) contrast(100%)';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      title={title}
      className="inline-flex items-center"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-[48px] w-auto object-contain ${className}`}
        style={{
          filter: baseFilter,
          // If the logo file has a white box, blend it away against whatever background is behind
          mixBlendMode: removeWhiteBG ? 'multiply' as const : undefined,
          backgroundColor: 'transparent',
        }}
      />
    </a>
  );
};

// Use files from /public/media/logos/*
const techLogos = [
  { node: <ExternalLogo src="/media/logos/n8n.svg" alt="n8n logo" title="n8n" href="https://n8n.io" />, title: 'n8n' },
  // These two often ship with white backgrounds:
  { node: <ExternalLogo src="/media/logos/vapi.svg" alt="Vapi.ai logo" title="Vapi.ai" href="https://vapi.ai" removeWhiteBG />, title: 'Vapi.ai' },
  { node: <ExternalLogo src="/media/logos/instantly.svg" alt="Instantly logo" title="Instantly" href="https://instantly.ai" removeWhiteBG />, title: 'Instantly' },
  { node: <ExternalLogo src="/media/logos/elevenlabs.svg" alt="ElevenLabs logo" title="ElevenLabs" href="https://elevenlabs.io" />, title: 'ElevenLabs' },
  { node: <ExternalLogo src="/media/logos/twilio.svg" alt="Twilio logo" title="Twilio" href="https://twilio.com" />, title: 'Twilio' },
  { node: <ExternalLogo src="/media/logos/chatgpt.svg" alt="ChatGPT logo" title="ChatGPT" href="https://openai.com/chatgpt" />, title: 'ChatGPT' },
  { node: <ExternalLogo src="/media/logos/stripe.svg" alt="Stripe logo" title="Stripe" href="https://stripe.com" />, title: 'Stripe' },
  { node: <ExternalLogo src="/media/logos/airtable.svg" alt="Airtable logo" title="Airtable" href="https://airtable.com" />, title: 'Airtable' },
];

export default function PoweredBy() {
  return (
    <section className="relative py-12"> {/* no background added */}
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="mb-6 text-xl font-semibold text-white/90 text-center">
          Powered by your favorite tools
        </h3>

        <div className="relative h-[200px] overflow-hidden rounded-xl"> {/* transparent container */}
          <LogoLoop
            logos={techLogos}
            speed={80}
            direction="left"
            logoHeight={48}
            gap={50}
            pauseOnHover
            scaleOnHover
            fadeOut
            // no explicit fadeOutColor so it blends with whatever background you have
            ariaLabel="Technology partners"
          />
        </div>

        <noscript>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 place-items-center">
            {techLogos.map((l, i) => (
              <div key={i}>{l.node}</div>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
}