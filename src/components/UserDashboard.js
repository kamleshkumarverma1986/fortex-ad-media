"use client";

export default function UserDashboard({ session }) {
  return (
    <section className="py-20 bg-[#1a1a1a] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome user, {session?.user?.email || "User"} 👋
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">You are just user</p>
        </div>
      </div>
    </section>
  );
}
