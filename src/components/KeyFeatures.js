"use client";

export default function KeyFeatures() {
  const features = [
    "Expert Campaign Management",
    "A/B Testing",
    "Compelling Ad Creatives",
    "Precise Audience Targeting",
    "Advanced Analytics Tracking",
    "ROI Tracking",
    "Ad Retargeting",
    "Real-Time Reporting",
  ];

  return (
    <section id="services" className="py-20 bg-[#0F172A]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Key Features
        </h2>
        <p className="text-lg text-white/70 mb-12 max-w-3xl mx-auto">
          We offer data-driven strategies, creative ad designs, and expert
          campaign management to maximize your ROI and growth.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-transparent border border-white/20 rounded-xl px-6 py-8 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <h3 className="text-white text-lg font-medium">{feature}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
