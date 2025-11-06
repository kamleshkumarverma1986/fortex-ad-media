"use client";
import { Card, CardBody, Button } from "@heroui/react";

export default function TermsOfService() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#001a4d] to-[#000b2a] py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Welcome to FORTEX AD MEDIA. By using our services, you agree to
            comply with and be bound by the following terms and conditions.
            Please read them carefully.
          </p>
        </div>

        <Card className="bg-white/5 border border-white/10 shadow-xl backdrop-blur-md text-left">
          <CardBody className="space-y-8 p-8 md:p-12 leading-relaxed text-white/80">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">1.</span> Services Provided
              </h2>
              <p>
                FORTEX AD MEDIA offers social media marketing services aimed at
                growing offline stores through various platforms. We agree to
                provide the services as described in your project agreement or
                campaign plan.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">2.</span> Client
                Responsibilities
              </h2>
              <ul className="space-y-2 pl-6 list-disc list-outside">
                <li>
                  You agree to provide accurate and complete information
                  necessary for executing the marketing services.
                </li>
                <li>
                  You are responsible for reviewing and approving all content,
                  ads, and campaigns before and after publication.
                </li>
                <li>
                  You grant us authorized access to your social media accounts
                  and any relevant platforms necessary for service delivery.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">3.</span> Payment and Fees
              </h2>
              <ul className="space-y-2 pl-6 list-disc list-outside">
                <li>
                  Payment terms, including amounts, schedules, and methods, will
                  be set forth in the project agreement.
                </li>
                <li>
                  Payments are to be made promptly as per the agreed schedule.
                  Delays may lead to suspension of services.
                </li>
                <li>
                  Additional costs or third-party fees will be communicated and
                  require approval before being charged.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">4.</span> Intellectual Property
              </h2>
              <ul className="space-y-2 pl-6 list-disc list-outside">
                <li>
                  All creative materials and campaigns developed remain the
                  property of FORTEX AD MEDIA until full payment is received.
                </li>
                <li>
                  Upon full payment, ownership rights are transferred to the
                  client, excluding any third-party materials.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">5.</span> Confidentiality
              </h2>
              <p>
                Both parties agree to keep confidential information private and
                not disclose it to unauthorized third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">6.</span> Limitation of
                Liability
              </h2>
              <ul className="space-y-2 pl-6 list-disc list-outside">
                <li>
                  FORTEX AD MEDIA will use best efforts to achieve desired
                  results but does not guarantee specific outcomes or business
                  results.
                </li>
                <li>
                  We are not liable for any indirect, incidental, or
                  consequential damages from the use or inability to use
                  services.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">7.</span> Termination
              </h2>
              <ul className="space-y-2 pl-6 list-disc list-outside">
                <li>
                  Either party may terminate the agreement with a 30-day written
                  notice.
                </li>
                <li>
                  Early termination by the client may require payment of fees as
                  compensation, per the agreement terms.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">8.</span> Amendments
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Updates
                will be communicated and posted on our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">9.</span> Governing Law
              </h2>
              <p>
                This agreement is governed by the laws of the jurisdiction where
                FORTEX AD MEDIA operates, and subject to Raipur jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">10.</span> Contact Information
              </h2>
              <p className="mb-2">
                For any questions or concerns, please contact:
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
                <p>
                  <span className="text-white/60">Address:</span> 45, Housing
                  Board Colony, Kabir Nagar, Raipur, Chhattisgarh, 492001
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
