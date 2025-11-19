"use client";

import { Card, CardBody } from "@nextui-org/react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0F1E] via-[#0F172A] to-[#0A0F1E] py-24 overflow-hidden"
    >
      {/* Decorative Lights */}
      <div className="absolute top-32 right-20 w-96 h-96 bg-[#9F6B6B]/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 left-16 w-96 h-96 bg-[#9F6B6B]/20 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-[#9F6B6B]/0 via-[#9F6B6B]/40 to-[#9F6B6B]/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></span>
              <span className="relative bg-gradient-to-r from-[#ffffff] to-[#cfcfcf] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
                Contact Us
              </span>
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We&apos;re here to help — reach out anytime using the information
            below.
          </p>
        </div>

        {/* Contact Card */}
        <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-[#9F6B6B]/30 transition-all duration-500 rounded-3xl">
          <CardBody className="p-10 md:p-14 space-y-10">
            <p className="text-white/70 text-lg text-center md:text-left">
              You may contact us using the information below:
            </p>

            <div className="space-y-10">
              {/* Top Row - Legal Entity + Phone + Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ContactItem
                  icon={<FaBuilding className="text-2xl text-[#9F6B6B]" />}
                  title="Merchant Legal entity name"
                  value="Fortex AD Media"
                />

                <ContactItem
                  icon={<FaPhone className="text-2xl text-[#9F6B6B]" />}
                  title="Telephone No"
                  value={
                    <a
                      href="tel:9752999609"
                      className="hover:text-[#9F6B6B] transition-colors"
                    >
                      9752999609
                    </a>
                  }
                />

                <ContactItem
                  icon={<FaEnvelope className="text-2xl text-[#9F6B6B]" />}
                  title="E-Mail ID"
                  value={
                    <a
                      href="mailto:nest.dream@yahoo.com"
                      className="hover:text-[#9F6B6B] transition-colors break-all"
                    >
                      nest.dream@yahoo.com
                    </a>
                  }
                />
              </div>

              {/* Bottom Row - Addresses Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactItem
                  icon={<FaMapMarkerAlt className="text-2xl text-[#9F6B6B]" />}
                  title="Registered Address"
                  value="house no. 782, block no.66, kabir nagar, raipur, chhattisgarh, india, 492001, RAIPUR, CHHATTISGARH, PIN: 492001"
                />

                <ContactItem
                  icon={<FaMapMarkerAlt className="text-2xl text-[#9F6B6B]" />}
                  title="Operational Address"
                  value="house no. 782, block no.66, kabir nagar, raipur, chhattisgarh, india, 492001, RAIPUR, CHHATTISGARH, PIN: 492001"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

/* ---------------------------- Reusable Item ---------------------------- */
function ContactItem({ icon, title, value }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[#9F6B6B]/20 group">
      <div className="rounded-xl bg-[#9F6B6B]/10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <span className="text-white font-semibold text-sm uppercase tracking-widest block mb-2 opacity-80">
          {title}:
        </span>
        <span className="text-white/90 text-lg leading-relaxed">{value}</span>
      </div>
    </div>
  );
}
