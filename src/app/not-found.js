"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { FaHome, FaSearch, FaRocket, FaSadTear } from "react-icons/fa";
import { MdOutlineExplore, MdArrowBack } from "react-icons/md";
import { motion } from "framer-motion";
import { helpCenterWhatsappLink } from "@/utils/helper";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 leading-none drop-shadow-2xl">
            404
          </h1>
        </motion.div>

        {/* Sad Icon with Animation */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <FaSadTear className="text-6xl md:text-8xl text-blue-300 mx-auto animate-bounce" />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            The page you&apos;re looking for seems to have drifted into the
            digital void. Don&apos;t worry, we&apos;ll help you find your way
            back!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            color="primary"
            variant="shadow"
            startContent={<FaHome className="text-xl" />}
            onPress={() => router.push("/")}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-8 py-6 text-lg hover:scale-105 transition-transform"
          >
            Go Home
          </Button>

          <Button
            size="lg"
            color="secondary"
            variant="bordered"
            startContent={<MdArrowBack className="text-xl" />}
            onPress={() => router.back()}
            className="border-2 border-purple-400 text-purple-300 font-semibold px-8 py-6 text-lg hover:bg-purple-500/20 hover:scale-105 transition-all"
          >
            Go Back
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12"
        >
          <p className="text-gray-400 mb-4">Or explore these pages:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/about"
              className="text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-2"
            >
              <MdOutlineExplore /> About Us
            </a>
            <a
              href="/contact"
              className="text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-2"
            >
              <FaRocket /> Contact
            </a>
            <a
              href={helpCenterWhatsappLink}
              className="text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-2"
            >
              <FaSearch /> Help Center
            </a>
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 text-gray-500 text-sm"
        >
          Error Code: 404 | Page Not Found
        </motion.div>
      </div>
    </div>
  );
}
