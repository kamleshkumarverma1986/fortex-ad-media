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
      className="relative min-h-screen flex items-center justify-center bg-[#0F172A] py-20"
    >
      {/* Decorative Circle */}
      <div className="absolute top-20 right-40 w-80 h-80 bg-[#9F6B6B] rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-4xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="relative inline-block group">
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></span>
              <span
                className="relative bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent font-extrabold"
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(255, 255, 255, 0.15))",
                }}
              >
                Contact Us
              </span>
            </span>
          </h2>
        </div>

        {/* Contact Card */}
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
          <CardBody className="p-8 md:p-12">
            <p className="text-white/70 text-lg mb-10 text-center md:text-left">
              You may contact us using the information below:
            </p>

            <div className="space-y-8">
              {/* Merchant Legal Entity */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
                <div className="p-3 rounded-lg bg-[#9F6B6B]/20 flex-shrink-0">
                  <FaBuilding className="text-2xl text-[#9F6B6B]" />
                </div>
                <div>
                  <span className="text-white font-semibold text-sm uppercase tracking-wider block mb-2">
                    Merchant Legal entity name:
                  </span>
                  <span className="text-white/90 text-lg">Fortex AD Media</span>
                </div>
              </div>

              {/* Registered Address */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
                <div className="p-3 rounded-lg bg-[#9F6B6B]/20 flex-shrink-0">
                  <FaMapMarkerAlt className="text-2xl text-[#9F6B6B]" />
                </div>
                <div>
                  <span className="text-white font-semibold text-sm uppercase tracking-wider block mb-2">
                    Registered Address:
                  </span>
                  <span className="text-white/90 leading-relaxed">
                    house no. 782, block no.66, kabir nagar, raipur,
                    chhattisgarh, india, 492001, RAIPUR, CHHATTISGARH, PIN:
                    492001
                  </span>
                </div>
              </div>

              {/* Operational Address */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
                <div className="p-3 rounded-lg bg-[#9F6B6B]/20 flex-shrink-0">
                  <FaMapMarkerAlt className="text-2xl text-[#9F6B6B]" />
                </div>
                <div>
                  <span className="text-white font-semibold text-sm uppercase tracking-wider block mb-2">
                    Operational Address:
                  </span>
                  <span className="text-white/90 leading-relaxed">
                    house no. 782, block no.66, kabir nagar, raipur,
                    chhattisgarh, india, 492001, RAIPUR, CHHATTISGARH, PIN:
                    492001
                  </span>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
                <div className="p-3 rounded-lg bg-[#9F6B6B]/20 flex-shrink-0">
                  <FaPhone className="text-2xl text-[#9F6B6B]" />
                </div>
                <div>
                  <span className="text-white font-semibold text-sm uppercase tracking-wider block mb-2">
                    Telephone No:
                  </span>
                  <a
                    href="tel:9752999609"
                    className="text-white/90 text-lg hover:text-[#9F6B6B] transition-colors"
                  >
                    9752999609
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
                <div className="p-3 rounded-lg bg-[#9F6B6B]/20 flex-shrink-0">
                  <FaEnvelope className="text-2xl text-[#9F6B6B]" />
                </div>
                <div>
                  <span className="text-white font-semibold text-sm uppercase tracking-wider block mb-2">
                    E-Mail ID:
                  </span>
                  <a
                    href="mailto:nest.dream@yahoo.com"
                    className="text-white/90 text-lg hover:text-[#9F6B6B] transition-colors break-all"
                  >
                    nest.dream@yahoo.com
                  </a>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
