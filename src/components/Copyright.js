"use client";

import { Link } from "@heroui/react";

export default function Copyright() {
  return (
    <p className="text-sm text-gray-400 text-center">
      {`© Copyright ${new Date().getFullYear()} `}
      <Link
        href="/"
        underline="hover"
        className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
      >
        Fortex Ad Media
      </Link>
      . All Rights Reserved
    </p>
  );
}
