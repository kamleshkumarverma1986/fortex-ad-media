"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <Spinner
        color="primary"
        size="lg"
        label="Loading..."
        labelColor="white"
      />
    </div>
  );
}
