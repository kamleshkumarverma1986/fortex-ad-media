"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { FaUserShield, FaChartLine, FaCogs } from "react-icons/fa";

export default function AdminDashboard({ session }) {
  return (
    <section className="py-20 bg-[#1a1a1a] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome, {session?.user?.email || "Admin"} 👋
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Here’s a quick overview of your admin controls and insights.
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#222] border border-gray-700 hover:border-purple-500 transition">
              <CardHeader className="flex items-center gap-3">
                <FaUserShield className="text-3xl text-purple-400" />
                <h3 className="text-xl font-semibold">Admin Profile</h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-300">
                  Manage admin details, email credentials, and basic settings
                  here.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#222] border border-gray-700 hover:border-green-500 transition">
              <CardHeader className="flex items-center gap-3">
                <FaChartLine className="text-3xl text-green-400" />
                <h3 className="text-xl font-semibold">Analytics Overview</h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-300">
                  Get quick insights into your ad campaign performance and
                  engagement rates.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#222] border border-gray-700 hover:border-blue-500 transition">
              <CardHeader className="flex items-center gap-3">
                <FaCogs className="text-3xl text-blue-400" />
                <h3 className="text-xl font-semibold">System Settings</h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-300">
                  Fine-tune admin system preferences, appearance, and access
                  control options.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
