"use client";

import { Button, Input } from "@heroui/react";
import Link from "next/link";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className="bg-[#001a4d] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-4">Fortex AD</h3>
            <p className="text-white/70 mb-6">
              Fortex AD Media crafts impactful Facebook and Instagram ad
              campaigns, driving measurable results and maximizing your
              brand&apos;s reach and engagement.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
                <span className="text-white">f</span>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
                <span className="text-white">in</span>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
                <span className="text-white">tw</span>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
                <span className="text-white">in</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">COMPANY</h4>
            <div className="space-y-3">
              <Link
                href="/about"
                className="block text-white/70 hover:text-white transition"
              >
                About
              </Link>
              <Link
                href="/services"
                className="block text-white/70 hover:text-white transition"
              >
                Service
              </Link>
              <Link
                href="/contact"
                className="block text-white/70 hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Column 3 - Help */}
          <div>
            <h4 className="text-white font-semibold mb-4">HELP</h4>
            <div className="space-y-3">
              <Link
                href="/support"
                className="block text-white/70 hover:text-white transition"
              >
                Support
              </Link>
              <Link
                href="/terms"
                className="block text-white/70 hover:text-white transition"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="block text-white/70 hover:text-white transition"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              SUBSCRIBE TO NEWSLETTER
            </h4>
            <Input
              type="email"
              placeholder="Enter your email"
              variant="bordered"
              className="mb-4"
              classNames={{
                input: "text-white",
                inputWrapper: "border-white/30",
              }}
            />
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60">
            <Copyright />
          </p>
        </div>
      </div>
    </footer>
  );
}
