"use client";

import { Card, CardBody } from "@heroui/react";

export default function TeamSection() {
  const team = [
    {
      name: "Anand Kumar",
      role: "founder and CEO",
      image: "👤",
    },
    {
      name: "Rakesh Tiwari",
      role: "Chief Marketing Officer (CMO)",
      image: "👤",
    },
    {
      name: "G. Arun",
      role: "Chief Financial Officer (CFO)",
      image: "👤",
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
            <Card key={index} className="bg-white/5 border border-white/10">
              <CardBody className="text-center p-8">
                <div className="w-32 h-32 mx-auto bg-white/10 rounded-lg flex items-center justify-center text-5xl mb-6">
                  {member.image}
                </div>
                <h3 className="text-white text-xl font-bold mb-2">
                  {member.name}
                </h3>
                <p className="text-white/70">{member.role}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
