"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Decorative top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6"
        >
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-800">
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ✨ Your Anonymous Opinion Matters
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl sm:text-7xl font-bold mb-6 text-balance"
        >
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Judge Me ⚖️
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 text-balance font-light leading-relaxed"
        >
          Post your dilemma. <span className="font-semibold">Let the internet judge you.</span>
          <br className="hidden sm:block" />
          No authentication. Pure opinions. Maximum fun. 😏
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/submit"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2">✍️ Post Your Situation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <button
            onClick={() => document.querySelector(".grid")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gradient-to-r from-indigo-600 to-purple-600 text-indigo-600 dark:text-purple-400 rounded-full font-bold text-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-300"
          >
            👀 Start Judging
          </button>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          className="mt-16 text-6xl"
        >
          ⚖️
        </motion.div>
      </div>
    </section>
  )
}
