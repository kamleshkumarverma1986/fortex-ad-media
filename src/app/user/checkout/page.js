import { Suspense } from "react";
import Checkout from "@/components/Checkout";

export default function ServerCheckoutPage() {
  return (
    <Suspense
      fallback={<div className="text-white text-center p-10">Loading...</div>}
    >
      <Checkout />
    </Suspense>
  );
}
