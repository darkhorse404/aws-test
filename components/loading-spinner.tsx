"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex gap-4 mb-8">
        {["🤔", "⚖️", "📋"].map((emoji, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
            className="text-5xl"
          >
            {emoji}
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="text-lg font-semibold text-gray-600 dark:text-gray-400 text-center"
      >
        Gathering the hottest takes... 🔥
      </motion.p>
    </div>
  )
}
