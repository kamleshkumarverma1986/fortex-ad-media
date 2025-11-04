"use client";

import GradientButton from "@/components/GradientButton";
import { useRouter } from "next/navigation";
import { FaBullhorn, FaChartLine, FaUsers, FaHandshake } from "react-icons/fa";

export default function LearnMore() {
  const router = useRouter();
  return (
    <section id="learn-more" className="py-20 bg-[#0B1120] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Learn More About Us
        </h2>
        <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          At <span className="text-blue-400 font-semibold">Forex AD Media</span>
          , we specialize in empowering offline stores to achieve greater
          business growth through strategic advertising. We understand the
          unique challenges offline businesses face in attracting customers and
          increasing sales.
        </p>
        <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          Our approach blends creative storytelling, smart targeting, and
          performance-driven insights to help your brand stand out. Whether
          you’re promoting special offers, launching new products, or simply
          building stronger customer trust — we’re here to turn visibility into
          measurable growth.
        </p>

        {/* Icons Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: <FaBullhorn className="text-blue-400 text-3xl" />,
              title: "Creative Campaigns",
              desc: "Engaging ad content that captures attention and drives action.",
            },
            {
              icon: <FaChartLine className="text-green-400 text-3xl" />,
              title: "Data-Driven Strategy",
              desc: "We track performance metrics to maximize every ad’s impact.",
            },
            {
              icon: <FaUsers className="text-yellow-400 text-3xl" />,
              title: "Audience Targeting",
              desc: "Reach the right customers with precision and relevance.",
            },
            {
              icon: <FaHandshake className="text-pink-400 text-3xl" />,
              title: "Partnership Approach",
              desc: "We grow with you — your success is our top priority.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-transparent border border-white/20 rounded-2xl px-6 py-8 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center gap-4">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Discover how we can help your business grow by connecting you with
          more customers and boosting your sales through effective, impactful
          advertising solutions.
        </p>
        <GradientButton
          onPress={() => {
            router.push("/pricing");
          }}
        >
          Get Started Today
        </GradientButton>
      </div>
    </section>
  );
}
