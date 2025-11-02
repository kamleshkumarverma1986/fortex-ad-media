"use client";
import ResponsiveImage from "./ResponsiveImage";

export default function BrandAmplifier() {
  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Social Media Visual */}
          <ResponsiveImage
            src="/images/social-medias.jpeg"
            alt="social-medias"
            fill
            className="w-full h-96"
            rounded="lg"
            overlay={
              <div>
                <h1 className="text-4xl font-bold mb-4">Amplify Your Brand</h1>
              </div>
            }
          />
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
