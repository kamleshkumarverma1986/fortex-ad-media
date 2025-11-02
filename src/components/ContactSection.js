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
              {[
                "Expert Consultation and Strategy Sessions",
                "Customized Ad Solutions for Your Brand",
                "Dedicated Support for Campaign Success and Optimization",
                "Data-Driven Insights for Continuous Improvement and Growth",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl mt-1">✓</span>
                  <p className="text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#0f0f0f] rounded-2xl p-8 border border-white/10 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2">
              Let&apos;s Discuss Your Needs
            </h3>
            <p className="text-white/70 mb-8">
              Reach out to explore collaborations and inquiries.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First name"
                  variant="bordered"
                  classNames={{
                    // remove native outline, keep placeholder subtle
                    input:
                      "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                    // control border visually from wrapper and show single ring on focus-within
                    inputWrapper:
                      "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-1 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0",
                  }}
                />
                <Input
                  placeholder="Last name"
                  variant="bordered"
                  classNames={{
                    input:
                      "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                    inputWrapper:
                      "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-1 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0",
                  }}
                />
              </div>

              <Input
                type="email"
                placeholder="Email"
                variant="bordered"
                classNames={{
                  input:
                    "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                  inputWrapper:
                    "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-1 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0",
                }}
              />

              <Input
                type="tel"
                placeholder="Phone number"
                variant="bordered"
                classNames={{
                  input:
                    "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                  inputWrapper:
                    "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-1 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0",
                }}
              />

              <Textarea
                placeholder="Message"
                variant="bordered"
                minRows={4}
                classNames={{
                  input:
                    "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                  inputWrapper:
                    "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-2 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0",
                }}
              />
              <Button
                size="lg"
                radius="sm"
                className="bg-sky-700 hover:bg-sky-800 text-white"
                endContent={<span> → </span>}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
