"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "1",
    title: "Post Your Situation",
    description: "Share your dilemma, awkward moment, or big decision anonymously. Be honest, be dramatic, be real.",
    icon: "✍️",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "2",
    title: "People Judge It",
    description: "The internet votes: You're Right, You're Wrong, or It Depends. No filters, just honest opinions.",
    icon: "⚖️",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    number: "3",
    title: "See The Verdict",
    description: "Watch the votes come in and discover what the internet really thinks. You might be surprised!",
    icon: "👀",
    gradient: "from-orange-500 to-red-500",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/50 to-slate-50/50 dark:from-slate-900/50 dark:to-slate-950/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">How It Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Three simple steps to get judged by the internet 🌍
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connection lines (hidden on mobile) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div key={step.number} variants={itemVariants} className="relative">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full border border-gray-100 dark:border-slate-700">
                {/* Step number circle */}
                <div
                  className={`absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                >
                  {step.number}
                </div>

                <div className="pt-4">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fun fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-bold">Pro tip:</span>{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              The more dramatic your situation, the more judging you'll get! 🎭
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
