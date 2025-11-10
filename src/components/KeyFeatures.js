"use client";

export default function KeyFeatures() {
  const features = [
    "Ads that reach the right people (using PPC & Social Media)",
    "Active on Social Media",
    "Online-to-Offline (O2O) Deals",
    "Targeting the Right People",
    "Optimized Google Business Profile",
    "Monitoring Your Return on Investment (ROI)",
    "Maintaining consistent brand messaging across all platforms and communications.",
    "100% Result",
  ];

  return (
    <section id="services" className="py-20 bg-[#0F172A]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
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
              className="bg-transparent border border-white/20 rounded-xl px-6 py-6 hover:border-blue-500 transition-all duration-300"
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
