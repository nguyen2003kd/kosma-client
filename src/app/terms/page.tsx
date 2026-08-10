import { PageHero } from "@/components/common";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Kosmo DNC",
  description:
    "The terms and conditions governing your use of Kosmo DNC's website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        subtitle="The terms and conditions governing your use of our website and services."
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Terms of Service" },
        ]}
        backgroundImage="/images/exterior.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <div className="max-w-3xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-[13px] text-gray-500">
              Last updated: August 6, 2026
            </p>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the Kosmo DNC website and services, you
                agree to be bound by these Terms of Service. If you do not agree
                with any part of these terms, please do not use our website or
                services.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                2. Services
              </h2>
              <p>
                Kosmo DNC provides design, construction, and branding services.
                The specifics of each engagement will be governed by a separate
                contract or proposal agreed between you and Kosmo DNC.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                3. Use of Website
              </h2>
              <p>
                You agree to use this website only for lawful purposes and in a
                manner that does not infringe the rights of others. You must
                not misuse the website by introducing viruses, attempting to
                gain unauthorized access, or interfering with its normal
                operation.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                4. Intellectual Property
              </h2>
              <p>
                All content on this website, including text, images, designs,
                and logos, is the property of Kosmo DNC or its licensors and is
                protected by intellectual property laws. You may not reproduce
                or distribute any content without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                5. User Submissions
              </h2>
              <p>
                When you submit information through our forms (e.g.,
                consultation requests, design inquiries, uploaded files), you
                confirm that you have the right to share that content and grant
                Kosmo DNC a non-exclusive license to use it for the purpose of
                providing our services.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Kosmo DNC shall not be
                liable for any indirect, incidental, or consequential damages
                arising from your use of this website or our services.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                7. Changes to These Terms
              </h2>
              <p>
                We may update these Terms of Service from time to time. Any
                changes will be posted on this page with an updated revision
                date.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-3">
                8. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, please contact us
                at{" "}
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
