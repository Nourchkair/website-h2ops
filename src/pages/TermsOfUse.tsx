import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import BackgroundAuroraParticles from "@/components/layout/BackgroundAuroraParticles";

export default function TermsOfUse() {
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
              H2Ops Terms of Use
            </h1>

            <p className="text-white/60 text-sm mb-6">
              Last updated: October 23, 2025
            </p>

            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              These Terms govern your use of H2Ops websites and services. Please read carefully before using our platform.
            </p>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="space-y-8">
                <p className="text-white/80 leading-relaxed">
                  These Terms of Use ("Terms") govern your access to horizon2operations.com (the "Site") and any H2Ops services, trials, demos, and related software or automations (the "Services"). By accessing the Site or using the Services, you agree to these Terms.
                </p>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1) Who we are</h2>
                  <p className="text-white/80 leading-relaxed">
                    H2Ops ("Horizon 2 Operations," "we," "our," "us") provides B2B solutions: websites, CRM implementations, internal automations, and AI voice/text agents. Contacts: <a href="mailto:sammi@horizon2operations.com" className="text-sky-400 hover:text-sky-300 underline">sammi@horizon2operations.com</a>, <a href="mailto:nourchkair@horizon2operations.com" className="text-sky-400 hover:text-sky-300 underline">nourchkair@horizon2operations.com</a>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2) Scope and hierarchy</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>Website Terms</strong> apply to all visitors.</li>
                    <li><strong>Service Terms</strong> apply when you order paid work (proposal, order form, or statement of work, each an SOW). If there is a conflict, the SOW controls, then these Terms, then the Privacy Policy, then any other policy.</li>
                    <li><strong>Service Levels:</strong> Any uptime, response-time, or remedy commitments will be stated in the applicable SOW or SLA. If no SLA is specified, Services are provided without uptime commitments.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3) Eligibility and accounts</h2>
                  <p className="text-white/80 leading-relaxed">
                    You must be of legal contracting age and authorized to bind your company. Keep credentials confidential. You are responsible for activity under your account.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4) Orders, fees, and taxes</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>Pricing models:</strong> one-time build fees and ongoing retainers; usage-based charges may apply (e.g., telephony, API calls, data volumes).</li>
                    <li><strong>Invoices:</strong> due on receipt unless the SOW states otherwise. Late amounts may trigger suspension.</li>
                    <li><strong>Taxes:</strong> you pay applicable taxes and government charges.</li>
                    <li><strong>Refunds:</strong> fees are non-refundable unless required by law or stated in the SOW.</li>
                    <li><strong>Change requests:</strong> out-of-scope work is billed at agreed rates or as a new SOW.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5) Acceptable use</h2>
                  <p className="text-white/80 leading-relaxed mb-3">Do not:</p>
                  <ul className="list-none space-y-2 text-white/80">
                    <li>(a) violate laws;</li>
                    <li>(b) infringe IP or privacy;</li>
                    <li>(c) penetrate, scan, or disrupt systems;</li>
                    <li>(d) send spam or unlawful robocalls;</li>
                    <li>(e) upload malicious code;</li>
                    <li>(f) misuse scraping, rate limits, or quotas;</li>
                    <li>(g) misrepresent identity;</li>
                    <li>(h) resell or provide the Services to third parties without permission.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6) Third-party services</h2>
                  <p className="text-white/80 leading-relaxed">
                    The Services may integrate third-party platforms (e.g., Google, Airtable, ClickUp, Twilio, Vapi, n8n, Apollo, Instantly, Apify, Bolt). Their terms and privacy policies apply to those components. We are not responsible for third-party acts or omissions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7) AI and automation specifics</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>No emergency services:</strong> H2Ops numbers and AI agents do <strong>not</strong> support 911/112 or other emergency calling.</li>
                    <li><strong>Recording and consent:</strong> enable call recording or SMS features only where lawful and with required notices/consents.</li>
                    <li><strong>Human review:</strong> AI outputs can be inaccurate or incomplete. You must review before relying on them for legal, medical, financial, or safety-critical decisions.</li>
                    <li><strong>Compliance:</strong> you are responsible for telemarketing, anti-spam (including CASL), and data-protection compliance when using the Services.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8) Data protection and privacy</h2>
                  <p className="text-white/80 leading-relaxed">
                    Our handling of personal information is described in the <strong>H2Ops Privacy Policy</strong>. A Data Processing Addendum (DPA) is available for clients that process customer data through our automations. Security obligations are reasonable and proportionate to risk.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9) Intellectual property</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>Our IP:</strong> We own the Site, brand, templates, playbooks, and pre-existing tools. We grant you a non-exclusive, non-transferable license to use deliverables internally once paid in full.</li>
                    <li><strong>Your IP:</strong> You retain rights in your content, data, and marks. You grant us a limited license to use your materials solely to provide the Services.</li>
                    <li><strong>Open-source/third-party:</strong> Some deliverables may include components governed by separate licenses. Those licenses control their components.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10) Feedback and publicity</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>Feedback:</strong> If you provide ideas or suggestions, we may use them without restriction or payment.</li>
                    <li><strong>Publicity:</strong> We may list your name and logo as a customer and describe general results, unless your SOW says otherwise or you opt out by notice.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">11) Confidentiality</h2>
                  <p className="text-white/80 leading-relaxed">
                    Each party will protect the other's non-public information with at least reasonable care and use it only to perform under these Terms or an SOW. Exceptions apply for information that is public, independently developed, or rightfully received from another source.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">12) Warranties and disclaimers</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>Mutual authority:</strong> Each party warrants it has authority to enter these Terms.</li>
                    <li><strong>Client content:</strong> You warrant you have rights to the content and data you provide and that your use is lawful.</li>
                    <li><strong>Disclaimer:</strong> The Site and Services are provided "as is" and "as available" without warranties of merchantability, fitness for a particular purpose, or non-infringement.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">13) Indemnification</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>By you:</strong> You will defend and indemnify H2Ops against claims arising from your content, your use of the Services, or your breach of these Terms or law.</li>
                    <li><strong>By us:</strong> We will defend and indemnify you against claims that our pre-existing H2Ops materials used in the Services infringe a third party's IP right, excluding claims caused by your materials, specifications, or combinations not supplied by us. Remedies may include modification, replacement, or refund of pre-paid unused fees.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">14) Limitation of liability</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>No indirect damages:</strong> Neither party is liable for lost profits, revenues, or indirect, incidental, special, consequential, or punitive damages.</li>
                    <li><strong>Cap:</strong> Each party's total liability arising out of or related to the Terms is limited to the greater of CAD $1,000 or fees paid by you to H2Ops for the Services giving rise to the claim in the 12 months before the event. These limits apply to the fullest extent permitted by law.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">15) Term, suspension, termination, and data return</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    These Terms start when you first access the Site or order Services and continue until terminated. We may suspend or terminate access for non-payment, security risk, or material breach. You may terminate a Service per your SOW. Sections that by nature should survive will survive (IP, fees, confidentiality, disclaimers, limits, indemnities, governing law).
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    <strong>Data return and deletion:</strong> Upon termination or request, you may export or request a copy of your data in our possession for 30 days. After this window, we may delete or de-identify data per our retention policies, unless law requires longer retention. Reasonable assistance beyond standard export may be billed at professional-services rates.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">16) Export, sanctions, anti-corruption</h2>
                  <p className="text-white/80 leading-relaxed">
                    You will comply with export controls and sanctions and will not use the Services where prohibited. You will comply with anti-corruption laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">17) Governing law and venue</h2>
                  <p className="text-white/80 leading-relaxed">
                    These Terms are governed by the laws of <strong>Ontario, Canada</strong>, without regard to conflicts rules. Courts located in <strong>Ottawa, Ontario</strong> have exclusive jurisdiction. You and H2Ops waive class actions to the extent permitted by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">18) Changes to the Terms</h2>
                  <p className="text-white/80 leading-relaxed">
                    We may update these Terms. Changes apply when posted to the Site with a new "Last updated" date. Material changes may be communicated by notice or email.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">19) Notices</h2>
                  <p className="text-white/80 leading-relaxed">
                    Legal notices should be sent to <a href="mailto:sammi@horizon2operations.com" className="text-sky-400 hover:text-sky-300 underline">sammi@horizon2operations.com</a>. Routine messages may be sent through product interfaces or email.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">20) General</h2>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li><strong>Assignment:</strong> You may not assign without our consent; we may assign as part of a reorganization or sale.</li>
                    <li><strong>Subcontractors:</strong> We may use subcontractors; we remain responsible for obligations.</li>
                    <li><strong>Force majeure:</strong> Neither party is liable for delays due to events beyond reasonable control.</li>
                    <li><strong>Severability:</strong> If a provision is unenforceable, the rest remains in effect.</li>
                    <li><strong>No waiver:</strong> Failure to enforce a right is not a waiver.</li>
                    <li><strong>Entire agreement:</strong> These Terms plus any SOW constitute the entire agreement for the subject matter and supersede prior discussions.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">21) Version history</h2>
                  <p className="text-white/80 leading-relaxed">
                    On request, we will provide a record of changes to these Terms. The current version and "Last updated" date appear at the top of the Terms page.
                  </p>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <a
                  href="/H2Ops Terms Of Use.pdf"
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
