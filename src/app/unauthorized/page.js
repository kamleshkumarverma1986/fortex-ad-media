// app/unauthorized/page.js
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          403 - Unauthorized
        </h1>
        <p className="text-gray-600 mb-6">
          You don&apos;t have permission to access this page.
        </p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
