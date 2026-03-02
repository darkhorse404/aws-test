"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20"
    >
      <motion.div
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        className="text-8xl mb-6 inline-block"
      >
        📭
      </motion.div>

      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">No Situations Yet</h3>

      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Be the first to post! Share your awkward moment, tough decision, or funny situation and let the internet judge
        you. 😏
      </p>

      <Link
        href="/submit"
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
      >
        ✍️ Post First Situation
      </Link>
    </motion.div>
  )
}
