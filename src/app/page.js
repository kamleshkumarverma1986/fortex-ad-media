"use client";

import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Fortex AD Media</h1>
        <p className="text-xl text-white/90 mb-8">
          Your partner in crafting compelling ad campaigns
        </p>
        <Button color="primary" size="lg" className="font-semibold">
          Get Started
        </Button>
      </div>
    </div>
  );
}
