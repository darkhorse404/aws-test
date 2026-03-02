"use client"

import { motion } from "framer-motion"
import VoteButton from "./vote-button"

interface Post {
  id?: string
  postId?: string
  content: string
  rightCount: number
  wrongCount: number
  dependsCount: number
}

interface PostCardProps {
  post: Post
  hasVoted: boolean
  onVote: (postId: string, voteType: "youreRight" | "youreWrong" | "depends") => void
}

const cardGradients = [
  "from-blue-50 to-blue-100/50",
  "from-purple-50 to-purple-100/50",
  "from-rose-50 to-rose-100/50",
  "from-amber-50 to-amber-100/50",
  "from-emerald-50 to-emerald-100/50",
  "from-indigo-50 to-indigo-100/50",
  "from-cyan-50 to-cyan-100/50",
  "from-orange-50 to-orange-100/50",
  "from-fuchsia-50 to-fuchsia-100/50",
]

export default function PostCard({ post, hasVoted, onVote }: PostCardProps) {
  // Select a gradient based on the postId (or content length as fallback)
  const identifier = post.postId || post.id || post.content
  const hash = identifier.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0)
  const gradientClass = cardGradients[hash % cardGradients.length]

  // Ensure vote counts are numbers with fallback to 0
  const rightCount = Number(post.rightCount) || 0
  const wrongCount = Number(post.wrongCount) || 0
  const dependsCount = Number(post.dependsCount) || 0
  
  const totalVotes = rightCount + wrongCount + dependsCount

  const rightPercentage = totalVotes > 0 ? (rightCount / totalVotes) * 100 : 0
  const wrongPercentage = totalVotes > 0 ? (wrongCount / totalVotes) * 100 : 0
  const dependsPercentage = totalVotes > 0 ? (dependsCount / totalVotes) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className={`bg-gradient-to-br ${gradientClass} dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700`}>
        {/* Card content */}
        <div className="p-8">
          {/* Situation text */}
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100 mb-8 text-balance">{post.content}</p>

          {/* Vote stats */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                The Verdict {totalVotes > 0 && `(${totalVotes} votes)`}
              </span>
            </div>

            {/* Vote bars */}
            <div className="space-y-3">
              {/* You're Right bar */}
              <div className="group/bar">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">✅ Yess</span>
                  <span className="text-sm font-bold text-green-700 dark:text-green-400">{rightCount}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${rightPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>

              {/* You're Wrong bar */}
              <div className="group/bar">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-700 dark:text-red-400">❌ Noo</span>
                  <span className="text-sm font-bold text-red-700 dark:text-red-400">{wrongCount}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-400 to-pink-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${wrongPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>

              {/* Depends bar */}
              <div className="group/bar">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-400">🤷 Depends</span>
                  <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{dependsCount}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${dependsPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vote buttons */}
          <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
              {hasVoted ? "🎉 Your vote is in!" : "Cast Your Vote:"}
            </p>
            <div className="grid grid-cols-3 gap-3">
              <VoteButton
                type="youreRight"
                label="Right"
                icon="✅"
                onClick={() => onVote(post.postId || post.id, "youreRight")}
                disabled={hasVoted}
                color="green"
              />
              <VoteButton
                type="youreWrong"
                label="Wrong"
                icon="❌"
                onClick={() => onVote(post.postId || post.id, "youreWrong")}
                disabled={hasVoted}
                color="red"
              />
              <VoteButton
                type="depends"
                label="Depends"
                icon="🤷"
                onClick={() => onVote(post.postId || post.id, "depends")}
                disabled={hasVoted}
                color="amber"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
