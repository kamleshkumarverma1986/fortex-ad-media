"use client";

import { Card, CardBody } from "@heroui/react";
import { TiltCard } from "./TiltCard";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah L",
      handle: "@SarahL",
      text: "Fortex AD Media transformed our social media presence! Their strategic campaigns drove significant traffic and boosted our sales. Highly recommended! Thank you, Anand!",
      hashtag: "#FortexAD",
    },
    {
      name: "Ashley P",
      handle: "@AshleyP",
      text: "Fortex AD Media is a top-notch agency. Their team is responsive, knowledgeable, and dedicated to helping us succeed. We highly recommend their services!",
      hashtag: "#TopNotch",
    },
    {
      name: "Kevin W",
      handle: "@KevinW",
      text: "Working with Fortex AD Media has been a game-changer for our business. Their innovative strategies and personalized service have helped us achieve our goals.",
      hashtag: "#GameChanger",
    },
    {
      name: "Linda S",
      handle: "@LindaS",
      text: "Fortex AD Media's expertise in ad optimization is unparalleled. They continuously refine our campaigns to ensure we're getting the best possible results.",
      hashtag: "#AdOptimization",
    },
    {
      name: "Michael B",
      handle: "@MichaelB",
      text: "We've seen a remarkable increase in leads and conversions since partnering with Fortex AD Media. Their strategic approach and attention to detail are impressive.",
      hashtag: "#LeadGen",
    },
    {
      name: "Jessica M",
      handle: "@JessicaM",
      text: "The team at Fortex AD Media is fantastic! They truly understand the nuances of social media advertising and delivered exceptional results for our business.",
      hashtag: "#SocialBoost",
    },
    {
      name: "David K",
      handle: "@DavidK",
      text: "Fortex AD Media exceeded our expectations. Their targeted ads and creative content significantly improved our brand awareness and customer acquisition.",
      hashtag: "#AdExcellence",
    },
    {
      name: "Emily R",
      handle: "@EmilyR",
      text: "Incredible results! Fortex AD Media's expertise in Facebook and Instagram ads is unmatched. Our engagement soared, and we saw a huge ROI. Thanks!",
      hashtag: "#FortexSuccess",
    },
  ];

  return (
    <section id="testimonial" className="py-20 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-16">
          What Our Clients Are Saying
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TiltCard key={index}>
              <Card className="bg-transparent h-full">
                <CardBody className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        👤
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-white font-semibold break-words">
                          {testimonial.name}
                        </h3>
                        <p className="text-white/60 text-sm break-words">
                          {testimonial.handle}
                        </p>
                      </div>
                    </div>
                    <span className="text-blue-400 font-semibold text-sm ml-2 flex-shrink-0">
                      in
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mb-3 leading-relaxed flex-grow break-words">
                    {testimonial.text}
                  </p>
                  <p className="text-blue-400 text-sm font-medium break-words">
                    {testimonial.hashtag}
                  </p>
                </CardBody>
              </Card>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
