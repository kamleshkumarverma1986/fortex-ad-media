"use client";

import { Button, Input, Textarea, Checkbox } from "@heroui/react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-[#001a4d]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Connect With Our Ad Experts Today
            </h2>
            <p className="text-lg text-white/70 mb-12">
              Get in touch with our team to explore collaborations and discuss
              your advertising needs.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-xl mt-1">✓</span>
                <p className="text-white/90">
                  Expert Consultation and Strategy Sessions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-xl mt-1">✓</span>
                <p className="text-white/90">
                  Customized Ad Solutions for Your Brand
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-xl mt-1">✓</span>
                <p className="text-white/90">
                  Dedicated Support for Campaign Success and Optimization
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-xl mt-1">✓</span>
                <p className="text-white/90">
                  Data-Driven Insights for Continuous Improvement and Growth
                </p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#1a1a1a] rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Let&apos;s Discuss Your Needs
            </h3>
            <p className="text-white/70 mb-8">
              Reach out to explore collaborations and inquiries.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First name"
                  placeholder="First Name"
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    label: "text-white/70",
                  }}
                />
                <Input
                  label="Last name"
                  placeholder="Last Name"
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    label: "text-white/70",
                  }}
                />
              </div>

              <Input
                type="email"
                label="Email"
                placeholder="your@email.com"
                variant="bordered"
                classNames={{
                  input: "text-white",
                  label: "text-white/70",
                }}
              />

              <Input
                type="tel"
                label="Phone number"
                placeholder="+1234567890"
                variant="bordered"
                classNames={{
                  input: "text-white",
                  label: "text-white/70",
                }}
              />

              <Textarea
                label="Message"
                placeholder="Message"
                variant="bordered"
                minRows={4}
                classNames={{
                  input: "text-white",
                  label: "text-white/70",
                }}
              />

              <Checkbox
                classNames={{
                  label: "text-white/70 text-sm",
                }}
              >
                You agree to our friendly{" "}
                <span className="underline">privacy policy.</span>
              </Checkbox>

              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Send message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
