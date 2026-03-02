"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

const MAX_CHARACTERS = 500

interface SubmitFormProps {
  onSubmit: (content: string) => void
  isLoading: boolean
  error: string | null
}

export default function SubmitForm({ onSubmit, isLoading, error }: SubmitFormProps) {
  const [content, setContent] = useState("")
  const characterCount = content.length
  const percentageUsed = (characterCount / MAX_CHARACTERS) * 100

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(content)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700"
    >
      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <p className="text-red-700 dark:text-red-200 font-semibold">❌ {error}</p>
        </motion.div>
      )}

      {/* Textarea */}
      <div className="mb-6">
        <label htmlFor="situation" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          📝 What's Your Situation?
        </label>
        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          id="situation"
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARACTERS))}
          placeholder="Tell us about your dilemma, awkward moment, or big decision... (be as dramatic or funny as you want!)"
          maxLength={MAX_CHARACTERS}
          rows={6}
          disabled={isLoading}
          className="w-full px-5 py-4 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed resize-none transition-colors"
        />
      </div>

      {/* Character counter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Characters Used</span>
          <span
            className={`text-sm font-bold ${
              characterCount > MAX_CHARACTERS * 0.9
                ? "text-red-600 dark:text-red-400"
                : characterCount > MAX_CHARACTERS * 0.7
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {characterCount} / {MAX_CHARACTERS}
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              characterCount > MAX_CHARACTERS * 0.9
                ? "bg-red-500"
                : characterCount > MAX_CHARACTERS * 0.7
                  ? "bg-amber-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${percentageUsed}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      {/* Helper text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800"
      >
        <p className="text-sm text-purple-700 dark:text-purple-300">
          <span className="font-semibold">💡 Pro tip:</span> The more details you share, the better the internet can
          judge you! Include context, emotions, and what makes this situation tricky.
        </p>
      </motion.div>

      {/* Submit button */}
      <motion.button
        whileHover={!isLoading ? { scale: 1.02 } : undefined}
        whileTap={!isLoading ? { scale: 0.98 } : undefined}
        type="submit"
        disabled={isLoading || characterCount === 0}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
          isLoading || characterCount === 0
            ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:shadow-xl"
        }`}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="text-xl"
            >
              ⏳
            </motion.div>
            Posting...
          </>
        ) : (
          <>✍️ Post Your Situation</>
        )}
      </motion.button>

      {/* Back link */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
        >
          Changed your mind? Go back to judging →
        </Link>
      </div>
    </motion.form>
  )
}

import Link from "next/link"
