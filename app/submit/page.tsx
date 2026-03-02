"use client"

import { useState } from "react"
import { createPost } from "@/lib/api"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SubmitForm from "@/components/submit-form"
import { motion } from "framer-motion"

export default function SubmitPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (content: string) => {
    if (!content.trim()) {
      setError("Please share your situation!")
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      await createPost(content)
      setSuccess(true)

      // Redirect after success animation
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err) {
      setError("Failed to post. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2 }} className="text-8xl mb-6">
            🎉
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Posted Successfully! 🚀</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Your situation is now live and ready to be judged!
          </p>
          <p className="text-gray-500 dark:text-gray-500">Redirecting you back home... ⏳</p>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-block mb-6">
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2">
              ← Back to Judging
            </button>
          </Link>

          <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Turn to Be Judged
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">🎭 Share your situation with the internet</p>
          <p className="text-gray-500 dark:text-gray-500">
            Be honest, be dramatic, or be totally embarrassed—we don't judge. Wait, we do. 😏
          </p>
        </motion.div>

        {/* Form Card */}
        <SubmitForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      </div>
    </main>
  )
}
