"use client";

import { Card, CardBody } from "@heroui/react";
import { TiltCard } from "./TiltCard";
import { PremiumCard } from "./PremiumCard";
import ResponsiveImage from "./ResponsiveImage";

export default function TeamSection() {
  const team = [
    {
      name: "Anand Kumar",
      role: "founder and CEO",
      image: "anand-member",
    },
    {
      name: "Rakesh Tiwari",
      role: "Chief Marketing Officer (CMO)",
      image: "rakesh-member",
    },
    {
      name: "G. Arun",
      role: "Chief Financial Officer (CFO)",
      image: "arun-member",
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#001a4d]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Meet Our Experts
        </h2>
        <p className="text-lg text-white/70 mb-16 max-w-2xl mx-auto">
          Our team of experts is dedicated to crafting successful ad campaigns
          for your business.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <PremiumCard key={index}>
              <Card className="bg-white/5 border border-white/10">
                <CardBody className="text-center">
                  <ResponsiveImage
                    src={`/images/${member.image}.jpeg`}
                    alt="members"
                    fill
                    className="w-full h-96"
                    rounded="lg"
                    overlay={
                      <div>
                        <h1 className="text-4xl font-bold mb-4">
                          {member.name}
                        </h1>
                        <h4>{member.role}</h4>
                      </div>
                    }
                  />
                </CardBody>
              </Card>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  );
}
