"use client";

export default function BrandAmplifier() {
  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Social Media Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 h-[500px] flex items-center justify-center relative overflow-hidden">
              {/* Social Media Icons Placeholder */}
              <div className="text-white text-6xl font-bold opacity-20">📱</div>
              <div className="absolute bottom-8 left-8 bg-[#0F172A] px-6 py-4 rounded-xl">
                <h3 className="text-white text-2xl font-bold">
                  Amplify Your Brand
                </h3>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Fortex AD Media: Your partner in crafting compelling Facebook and
              Instagram ad campaigns that drive growth and engagement.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
