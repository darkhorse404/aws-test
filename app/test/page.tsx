"use client"

import { useState } from "react"

export default function TestPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testCreatePost = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        "https://6imqoeivb9.execute-api.us-east-1.amazonaws.com/prod/createPost",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: "Proxy integration CORS fix test",
          }),
        }
      )
      const data = await response.json()
      setResults(data)
      console.log("✅ Success:", data)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setError(errorMsg)
      console.error("❌ Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const testGetPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        "https://6imqoeivb9.execute-api.us-east-1.amazonaws.com/prod/getPosts"
      )
      const data = await response.json()
      setResults(data)
      console.log("✅ Success:", data)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setError(errorMsg)
      console.error("❌ Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const testVote = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        "https://6imqoeivb9.execute-api.us-east-1.amazonaws.com/prod/vote",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId: "test-id",
            voteType: "youreRight",
          }),
        }
      )
      const data = await response.json()
      setResults(data)
      console.log("✅ Success:", data)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setError(errorMsg)
      console.error("❌ Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          API Test Suite 🧪
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 space-y-6">
          {/* Test Buttons */}
          <div className="space-y-3">
            <button
              onClick={testCreatePost}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? "Testing..." : "📝 Test Create Post"}
            </button>

            <button
              onClick={testGetPosts}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? "Testing..." : "📋 Test Get Posts"}
            </button>

            <button
              onClick={testVote}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? "Testing..." : "✅ Test Vote"}
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="font-bold text-green-700 dark:text-green-300 mb-3">✅ Success!</h3>
              <pre className="bg-green-100 dark:bg-green-900 p-4 rounded text-sm text-green-900 dark:text-green-100 overflow-auto">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          )}

          {/* Errors */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="font-bold text-red-700 dark:text-red-300 mb-3">❌ Error</h3>
              <p className="text-red-600 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Console Note */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 <strong>Tip:</strong> Check your browser's developer console (F12) to see detailed logs of each test.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
