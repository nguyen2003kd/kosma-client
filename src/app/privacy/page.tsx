import { PageHero } from "@/components/common";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kosmo DNC",
  description:
    "How Kosmo DNC collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Privacy Policy" },
        ]}
        backgroundImage="/images/living.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <div className="max-w-3xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-[13px] text-gray-500">
              Last updated: August 6, 2026
            </p>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                1. Introduction
              </h2>
              <p>
                Kosmo DNC (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your
                privacy and is committed to protecting your personal data. This
                Privacy Policy explains how we collect, use, and safeguard your
                information when you visit our website or use our services.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                2. Information We Collect
              </h2>
              <p>
                We may collect the following types of information when you
                interact with our website or submit a consultation request:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Contact details: name, email address, phone number, and
                  mailing address.
                </li>
                <li>
                  Project details: project type, preferred date and time,
                  address, and any message you provide.
                </li>
                <li>
                  Files you upload, such as inspiration images or floor plans.
                </li>
                <li>
                  Technical data: IP address, browser type, and pages visited.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Respond to your inquiries and schedule consultations.</li>
                <li>Prepare project quotes and design proposals.</li>
                <li>Provide and improve our services.</li>
                <li>Send updates about your project, if applicable.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                4. Sharing Your Information
              </h2>
              <p>
                We do not sell your personal information. We may share your data
                with trusted partners who assist us in delivering our services
                (e.g., subcontractors, material suppliers) only to the extent
                necessary to fulfill your project requirements.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                5. Data Security
              </h2>
              <p>
                We implement reasonable technical and organizational measures to
                protect your personal data against unauthorized access, loss, or
                misuse. However, no method of transmission over the internet is
                completely secure.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                6. Your Rights
              </h2>
              <p>
                You may request access to, correction of, or deletion of your
                personal data at any time. To exercise these rights, please
                contact us using the details below.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                7. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:info@kosmodnc.com"
                  className="text-ink underline"
                >
                  info@kosmodnc.com
                </a>{" "}
                or call (443) 736-0577.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
