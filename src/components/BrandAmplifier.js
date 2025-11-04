"use client";
import ResponsiveImage from "./ResponsiveImage";
import { TiltCard } from "./TiltCard";

export default function BrandAmplifier() {
  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Social Media Visual */}
          <TiltCard>
            <ResponsiveImage
              src="/images/social-medias.jpeg"
              alt="social-medias"
              fill
              className="w-full h-96"
              rounded="lg"
              overlay={
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Amplify Your Brand
                  </h1>
                </div>
              }
            />
          </TiltCard>
          {/* Right - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight text-center max-w-4xl mx-auto">
              Fortex AD Media: Your partner in crafting compelling Facebook and
              Instagram ad campaigns that drive growth and engagement.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
