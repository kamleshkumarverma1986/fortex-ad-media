"use client";
import { Card, CardBody, Button } from "@heroui/react";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#001a4d] to-[#000b2a] py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto mb-16">
          Your privacy matters to us. This policy explains how Fortex Ad Media
          collects, uses, and protects your information while using our
          services.
        </p>

        <Card className="bg-white/5 border border-white/10 shadow-xl backdrop-blur-md text-left">
          <CardBody className="space-y-10 p-10 leading-relaxed text-white/80">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                1. Information We Collect
              </h2>
              <p>
                We may collect your name, email, and business details when you
                contact us or use our services. We also collect anonymous usage
                data for analytics and optimization.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                2. How We Use Data
              </h2>
              <p>
                Information is used to improve our website, personalize
                campaigns, and communicate relevant updates. We never sell your
                data to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                3. Cookies & Tracking
              </h2>
              <p>
                We use cookies to enhance site performance and analyze visitor
                interactions. You can disable cookies in your browser settings
                anytime.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                4. Data Protection
              </h2>
              <p>
                Fortex Ad Media uses advanced encryption and access control to
                safeguard your data against unauthorized use or disclosure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                5. Contact
              </h2>
              <p>
                For privacy-related queries, reach us at{" "}
                <a
                  href="mailto:privacy@fortexadmedia.com"
                  className="text-blue-400 underline"
                >
                  privacy@fortexadmedia.com
                </a>
                .
              </p>
            </div>

            <p className="text-sm text-white/50">Last updated: November 2025</p>
          </CardBody>
        </Card>

        <div className="mt-16">
          <Button
            as="a"
            href="/"
            color="primary"
            variant="shadow"
            size="lg"
            className="font-semibold"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
