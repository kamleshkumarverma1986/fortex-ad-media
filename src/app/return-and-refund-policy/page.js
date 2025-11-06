"use client";
import { Card, CardBody, Button } from "@heroui/react";

export default function ReturnAndRefundPolicy() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#001a4d] to-[#000b2a] py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
            Return And Refund Policy
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            At FORTEX AD MEDIA, we are committed to helping grow your offline
            store through our social media marketing services. We believe in the
            quality and effectiveness of our efforts, which is why we offer the
            following refund policy.
          </p>
        </div>

        <Card className="bg-white/5 border border-white/10 shadow-xl backdrop-blur-md text-left">
          <CardBody className="space-y-8 p-8 md:p-12 leading-relaxed text-white/80">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">1.</span> 100% Refund Guarantee
              </h2>
              <p>
                If we do not generate any measurable business results for your
                offline store through our social media marketing services within
                a period of one (1) month from the service start date, you are
                entitled to a 100% refund of the fees paid during that period.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">2.</span> Qualification
                Requirements
              </h2>
              <p>
                To qualify for this refund, you must provide all requested
                access and information necessary for service delivery promptly
                and cooperate reasonably with our team.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">3.</span> How to Request a
                Refund
              </h2>
              <p>
                Requests for refunds under this policy must be made in writing
                via email to{" "}
                <a
                  href="mailto:fortex.tech@yahoo.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  fortex.tech@yahoo.com
                </a>{" "}
                within 7 days after the completion of the one-month period.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">4.</span> Policy Scope
              </h2>
              <p>
                This refund policy applies only to the initial one-month service
                period and does not apply to any subsequent services or
                contracts.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">5.</span> Verification Process
              </h2>
              <p>
                We reserve the right to verify the outcome and engagement
                metrics before processing any refund.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">6.</span> Exclusions
              </h2>
              <p>
                This policy does not cover refunds due to client
                non-cooperation, delays in providing required content or
                approvals, or services outside the scope of social media
                marketing for offline store growth.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">7.</span> Contact Information
              </h2>
              <p className="mb-2">
                For any questions or to initiate a refund request, please
                contact us at:
              </p>
              <div className="pl-6 space-y-1">
                <p>
                  <span className="text-white/60">Email:</span>{" "}
                  <a
                    href="mailto:fortex.tech@yahoo.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    fortex.tech@yahoo.com
                  </a>
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="mt-12 text-center">
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
