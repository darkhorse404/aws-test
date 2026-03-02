"use client"

import { useState, useEffect } from "react"
import { getPosts, vote } from "@/lib/api"
import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"
import RoastSection from "@/components/roast-section"
import PostCard from "@/components/post-card"
import LoadingSpinner from "@/components/loading-spinner"
import EmptyState from "@/components/empty-state"

interface Post {
  id?: string
  postId?: string
  content: string
  rightCount: number
  wrongCount: number
  dependsCount: number
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [voted, setVoted] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Load voted posts from sessionStorage
    const votedFromStorage = sessionStorage.getItem("judgeMe_voted")
    if (votedFromStorage) {
      setVoted(new Set(JSON.parse(votedFromStorage)))
    }

    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await getPosts()
      // Reverse posts so newest appear at the top
      setPosts(Array.isArray(data) ? [...data].reverse() : [])
      setError(null)
    } catch (err) {
      setError("Failed to load posts. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (postId: string, voteType: "youreRight" | "youreWrong" | "depends") => {
    if (!postId) {
      console.error("Post ID missing!")
      return
    }
    if (voted.has(postId)) return

    try {
      await vote(postId, voteType)

      const newVoted = new Set(voted)
      newVoted.add(postId)
      setVoted(newVoted)
      sessionStorage.setItem("judgeMe_voted", JSON.stringify(Array.from(newVoted)))

      // Map frontend vote types to API property names for local update
      const votePropertyMap = {
        youreRight: "rightCount",
        youreWrong: "wrongCount",
        depends: "dependsCount",
      } as const

      const targetProperty = votePropertyMap[voteType]

      // Update post votes locally
      console.log("Updating post locally:", postId, targetProperty)
      setPosts(posts.map((post) => {
        const currentId = post.postId || post.id
        if (currentId === postId) {
          console.log("Matched post for update:", currentId)
          return { ...post, [targetProperty]: Number(post[targetProperty] || 0) + 1 }
        }
        return post
      }))
    } catch (err) {
      console.error("Failed to vote:", err)
    }
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <RoastSection />

      {/* Posts Feed Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-center text-balance">
            What's Being Judged Right Now 📋
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-lg">
            Dive in and let the internet know what you think
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center mb-8">
            <p className="text-red-700 dark:text-red-200">{error}</p>
            <button
              onClick={fetchPosts}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const currentId = post.postId || post.id || `post-${index}`
              return (
                <PostCard 
                  key={currentId} 
                  post={post} 
                  hasVoted={voted.has(currentId)} 
                  onVote={handleVote} 
                />
              )
            })}
          </div>
        )}

        {posts.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={fetchPosts}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              🔄 Refresh Feed
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
