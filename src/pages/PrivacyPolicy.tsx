import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import BackgroundAuroraParticles from "@/components/layout/BackgroundAuroraParticles";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BackgroundAuroraParticles />

      <div className="relative z-10 min-h-screen w-full text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 border border-white/10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              H2Ops Privacy Policy
            </h1>

            <p className="text-white/60 text-sm mb-6">
              Last updated: October 23, 2025
            </p>

            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              This policy explains how H2Ops collects, uses, and protects your information.
            </p>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1) Who we are and scope</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    H2Ops ("Horizon 2 Operations," "H2Ops," "we," "our," "us") operates horizon2operations.com and provides B2B services including websites, CRM implementations, process automations, and AI voice/text agents. This Privacy Policy describes how we handle Personal Information when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>visit or use our website and pages that link to this policy (the "Site"),</li>
                    <li>interact with our sales, support, or marketing communications, or</li>
                    <li>receive services as a client or prospective client (the "Services").</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Roles</h3>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>For Site visitors, prospects, and our own business records, H2Ops is a <strong>controller</strong>.</li>
                    <li>For client-supplied data processed in your CRM/automations/AI agents, H2Ops acts as a <strong>processor</strong> (or service provider) under your instructions and any applicable Data Processing Addendum (DPA).</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Privacy Officer</h3>
                  <p className="text-white/80 leading-relaxed">
                    H2Ops designates a Privacy Officer responsible for compliance with this policy and PIPEDA. Contact: <a href="mailto:privacy@horizon2operations.com" className="text-sky-400 hover:text-sky-300 underline">privacy@horizon2operations.com</a>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2) Information we collect</h2>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">A) You provide</h3>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>Identification and contact: name, email, phone, company, role.</li>
                    <li>Business records: scoping notes, onboarding forms, configuration data, content you upload.</li>
                    <li>Communications: emails, chat transcripts, support requests, call bookings.</li>
                    <li>Billing: invoice details and transaction metadata. Card data is handled by processors; we do <strong>not</strong> store full card numbers.</li>
                    <li>Marketing preferences and consent choices.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">B) Collected automatically</h3>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>Usage and device data: IP address, timestamps, pages viewed, referrer, browser/OS, language, approximate location, session IDs.</li>
                    <li>Cookies, pixels, and similar tech for analytics and site performance. We may use Google Analytics and comparable tools.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">C) From third parties</h3>
                  <p className="text-white/80 leading-relaxed">
                    Lead and enrichment data from sales/marketing partners (e.g., Apollo) and public sources (company websites, LinkedIn, registries), in compliance with applicable laws and your preferences.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">D) Service- and agent-specific data</h3>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>Voice/SMS/telephony:</strong> call recordings, transcriptions, and message metadata when you use AI agents or Twilio/Vapi numbers, where permitted and with required notices/consents.</li>
                    <li><strong>CRM/workflow:</strong> records you instruct us to process in Airtable, ClickUp, n8n, or similar tools.</li>
                  </ul>

                  <p className="text-white/80 leading-relaxed mt-4">
                    <strong>Sensitive data:</strong> We do not intentionally collect sensitive personal information. Do not submit it to us. If processing is required by a client, it must be governed by a DPA and lawful basis.
                  </p>

                  <p className="text-white/80 leading-relaxed mt-4">
                    <strong>Data minimization:</strong> We collect only what is necessary for stated purposes and review collection to reduce data footprint.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3) How we use information</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>Provide, configure, and maintain the Services.</li>
                    <li>Communicate about projects, support, security, and billing.</li>
                    <li>Analyze performance, improve quality, and develop new features.</li>
                    <li>Personalize content and measure campaign effectiveness.</li>
                    <li>Detect, prevent, and investigate security incidents and abuse.</li>
                    <li>Comply with legal obligations and enforce agreements.</li>
                    <li>Send marketing communications where permitted; you can opt out at any time.</li>
                  </ul>

                  <p className="text-white/80 leading-relaxed mt-4">
                    <strong>Automated decisioning & AI:</strong> We may use AI models to route inquiries, score or prioritize leads, generate responses, and automate follow-ups. We do not make decisions with legal or similarly significant effects without human involvement. You may request human review or opt out of non-essential profiling.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4) Legal bases (EEA/UK where applicable)</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>Consent</strong> (e.g., marketing, cookies, recording where required).</li>
                    <li><strong>Contract</strong> (to deliver Services you request).</li>
                    <li><strong>Legitimate interests</strong> (product improvement, security, fraud prevention, B2B outreach) balanced with your rights.</li>
                    <li><strong>Legal obligation</strong> (tax, accounting, compliance).</li>
                  </ul>
                  <p className="text-white/80 leading-relaxed mt-4">
                    For Canada, processing aligns with PIPEDA principles of consent, limiting collection, use, disclosure, and retention.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5) Sharing and disclosures</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    We do <strong>not</strong> sell or rent Personal Information. We share as follows:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>Service providers/processors</strong> strictly for our operations, such as: Gmail/Google Workspace, n8n, Twilio, Vapi, Airtable, Apollo, Instantly, ClickUp, Bolt, Apify, web hosting/CDN, analytics, payment processors, and security tools.</li>
                    <li><strong>Legal:</strong> if required by law or to protect rights, safety, or the integrity of the Services.</li>
                    <li><strong>Business transfers:</strong> in a merger, acquisition, or asset sale, information may transfer subject to this policy.</li>
                  </ul>
                  <p className="text-white/80 leading-relaxed mt-4">
                    We require processors to protect Personal Information and to process it only under our instructions. We maintain a current list of sub-processors available on request and will provide notice before adding or replacing a sub-processor where contractually required.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6) International transfers</h2>
                  <p className="text-white/80 leading-relaxed">
                    We may process and store data in countries outside your own, including the United States. Where required, we rely on appropriate safeguards such as Standard Contractual Clauses and comparable mechanisms. Details available on request.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7) Retention</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    We keep Personal Information only as long as necessary for the purposes described or as required by law. Typical periods:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>Sales inquiries and support tickets: up to <strong>24 months</strong> after last interaction.</li>
                    <li>Contracts, invoices, and tax records: <strong>7 years</strong>.</li>
                    <li>Call recordings and AI agent transcripts: up to <strong>12 months</strong> unless you request earlier deletion or longer retention for your operations.</li>
                    <li>Web server logs and security events: up to <strong>12 months</strong>. Actual retention may vary based on legal, operational, or contractual needs.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8) Security</h2>
                  <p className="text-white/80 leading-relaxed">
                    We implement administrative, technical, and physical safeguards appropriate to risk, including access controls, encryption in transit, and environment hardening. No method is 100% secure. We monitor for vulnerabilities and aim to mitigate incidents promptly.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">8.1) Breach notification (Canada)</h3>
                  <p className="text-white/80 leading-relaxed">
                    We assess any breach of security safeguards. If a breach creates a real risk of significant harm, we will notify affected individuals and report to the Office of the Privacy Commissioner of Canada without undue delay, and maintain breach records for 24 months.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9) Your rights and choices</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    <strong>Canada (PIPEDA):</strong> Access and correct your Personal Information; withdraw consent subject to legal/contractual limits.
                  </p>
                  <p className="text-white/80 leading-relaxed mb-4">
                    <strong>EEA/UK (GDPR):</strong> Request access, rectification, erasure, restriction, portability, and object to processing, including profiling based on legitimate interests or direct marketing.
                  </p>
                  <p className="text-white/80 leading-relaxed mb-4">
                    <strong>California (CCPA/CPRA):</strong> Residents may request access/portability and deletion, and opt out of certain sharing for cross-context behavioral advertising. We do not sell Personal Information.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    We will verify your identity before acting on requests. We aim to respond within 30 days, subject to lawful extensions. To exercise rights, email <a href="mailto:sammi@horizon2operations.com" className="text-sky-400 hover:text-sky-300 underline">sammi@horizon2operations.com</a>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10) Cookies and similar technologies</h2>
                  <p className="text-white/80 leading-relaxed">
                    We use necessary cookies for core functionality and optional cookies for analytics and performance. You can manage cookies in your browser. If we offer a cookie banner or preferences tool, your selections will be honored. Your choices persist until cleared or expired.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">11) Communications and SMS terms</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    All email and SMS are sent in compliance with Canada's Anti-Spam Legislation (CASL). We record consent status and honor withdrawals promptly.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>Email marketing:</strong> sent under consent or lawful B2B interest. Unsubscribe any time.</li>
                    <li><strong>SMS:</strong> if you opt in, you agree to receive messages related to services, reminders, or marketing. Message frequency may vary. Msg & data rates may apply. Reply STOP to opt out and HELP for help. Delivery may be subject to carrier availability. We log SMS consent status as required.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">12) Children's privacy</h2>
                  <p className="text-white/80 leading-relaxed">
                    Our Site and Services are for business users. We do not knowingly collect Personal Information from children under 18. If you believe a child has provided data, contact us to delete it.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">13) Third-party links</h2>
                  <p className="text-white/80 leading-relaxed">
                    The Site may contain links to third-party websites or services. Their privacy practices govern those properties. Review their policies separately.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">14) Controller/processor addendum</h2>
                  <p className="text-white/80 leading-relaxed">
                    For clients, a Data Processing Addendum (DPA) is available on request. It governs processing of your customer data, including confidentiality, sub-processors, security, and deletion/return at termination. A current list of sub-processors is available on request, and we will notify you in advance of material changes to sub-processors where contractually required.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">15) Changes to this policy</h2>
                  <p className="text-white/80 leading-relaxed">
                    We may update this policy to reflect changes to laws, services, or operations. We will post updates with a new "Last updated" date. Material changes may be communicated by email or prominent notice on the Site.
                  </p>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <a
                  href="/H2Ops Privacy Policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF version</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
