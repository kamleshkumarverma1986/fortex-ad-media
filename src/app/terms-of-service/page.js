"use client";
import { Card, CardBody, Button } from "@heroui/react";

export default function TermsOfService() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#001a4d] to-[#000b2a] py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto mb-16">
          Please read these terms carefully before using Fortex Ad Media’s
          website and services. By accessing our platform, you agree to the
          following terms.
        </p>

        <Card className="bg-white/5 border border-white/10 shadow-xl backdrop-blur-md text-left">
          <CardBody className="space-y-10 p-10 leading-relaxed text-white/80">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By using our website, you agree to these Terms of Service. If
                you do not agree, please discontinue using our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                2. Intellectual Property
              </h2>
              <p>
                All website content, branding, graphics, and code are owned by
                Fortex Ad Media. You may not copy, reproduce, or redistribute
                without written permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                3. Limitation of Liability
              </h2>
              <p>
                Fortex Ad Media is not liable for indirect damages, data loss,
                or downtime arising from the use of our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                4. Termination
              </h2>
              <p>
                We reserve the right to terminate or restrict access to users
                who violate our terms or engage in harmful activity.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                5. Governing Law
              </h2>
              <p>
                These terms are governed by the laws of India. Any disputes
                shall be resolved under the jurisdiction of Indian courts.
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
