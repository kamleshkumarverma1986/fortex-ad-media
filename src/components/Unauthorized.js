"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center px-6 py-12 max-w-md">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 w-24 h-24 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-4">
          403
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-100 mb-3">
          Access Denied
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          You don&apos;t have permission to access this page. Please contact an
          administrator if you believe this is a mistake.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            as={Link}
            href="/"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
            size="lg"
            radius="lg"
          >
            Go to Home
          </Button>

          <Button
            onPress={() => router.back()}
            variant="bordered"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
            size="lg"
            radius="lg"
          >
            Go Back
          </Button>
        </div>

        {/* Additional info */}
        <p className="text-gray-600 text-sm mt-8">
          Error Code: UNAUTHORIZED_ACCESS
        </p>
      </div>
    </div>
  );
}
