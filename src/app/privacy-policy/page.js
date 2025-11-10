"use client";
import { Card, CardBody, Button } from "@nextui-org/react";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#001a4d] to-[#000b2a] py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            FORTEX AD MEDIA (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you engage with our services or visit our website
            and social media platforms.
          </p>
        </div>

        <Card className="bg-white/5 border border-white/10 shadow-xl backdrop-blur-md text-left">
          <CardBody className="space-y-8 p-8 md:p-12 leading-relaxed text-white/80">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">1.</span> Information We Collect
              </h2>
              <p className="mb-2">
                We may collect the following types of information:
              </p>
              <ul className="space-y-2 pl-6 list-disc list-outside">
                <li>
                  Contact details (such as name, email address, phone number)
                </li>
                <li>
                  Business and store details necessary to deliver our marketing
                  services
                </li>
                <li>
                  Information you provide during consultations or via our
                  website contact forms
                </li>
                <li>
                  Usage data about your interactions with our site, campaigns,
                  or social media content (IP address, browser information,
                  referring/exit pages, etc.)
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">2.</span> How We Use Your
                Information
              </h2>
              <p className="mb-2">
                We use your personal and business information to:
              </p>
              <ul className="space-y-2 pl-6 list-disc list-outside">
                <li>
                  Provide, operate, and improve our marketing and advertising
                  services
                </li>
                <li>
                  Communicate with you about your inquiries or our offerings
                </li>
                <li>
                  Analyze campaign effectiveness and improve user experience
                </li>
                <li>Send promotional communications with your consent</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">3.</span> Data Sharing and
                Disclosure
              </h2>
              <p className="mb-2">
                We do not sell your personal information. We may share your data
                with:
              </p>
              <ul className="space-y-2 pl-6 list-disc list-outside">
                <li>
                  Service providers who support our business operations (such as
                  analytics tools, hosting providers, payment processors)
                </li>
                <li>
                  Legal authorities if required by law or to protect our rights
                  and interests
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">4.</span> Data Retention
              </h2>
              <p>
                We retain your information only as long as necessary to fulfill
                the purposes outlined in this policy, unless a longer retention
                is required by law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">5.</span> Cookies and Tracking
              </h2>
              <p>
                Our platforms may use cookies and similar technologies to
                improve your browsing experience, analyze site traffic, and
                understand user interactions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">6.</span> Children&apos;s
                Privacy
              </h2>
              <p>
                Our services are not directed to children under 13. We do not
                knowingly collect personal data from minors. If you believe we
                have collected data from a child, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">7.</span> Your Rights and
                Choices
              </h2>
              <p>
                Depending on your location, you may have rights regarding your
                personal information, such as accessing, correcting, or
                requesting deletion of your data. To exercise these rights or
                for any queries, contact us using the information below.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">8.</span> Policy Updates
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with the updated date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">9.</span> Contact Information
              </h2>
              <p className="mb-2">
                For questions, concerns, or requests related to your privacy,
                please contact:
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
                  Board Colony, Gol Chouk, Raipur C.G, 492001
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
