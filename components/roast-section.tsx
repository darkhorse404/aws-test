"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { generateRoast } from "@/app/actions"
import { Sparkles, Flame, Loader2 } from "lucide-react"

export default function RoastSection() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [situation, setSituation] = useState("")
  const [roast, setRoast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGetRoast = async () => {
    if (!situation.trim()) return
    
    setLoading(true)
    setRoast(null)
    
    try {
      const result = await generateRoast(situation)
      if (result.roast) {
        setRoast(result.roast)
      } else if (result.error) {
        setRoast(result.error)
      }
    } catch (error) {
      setRoast("Something went wrong. Maybe your situation is too powerful for AI.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 relative z-10">
          <div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent inline-flex items-center gap-2">
              Roast Me 😈
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Need more than just judgment? Get a playful roast of your situation.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
            <Label htmlFor="roast-mode" className="font-semibold cursor-pointer text-pink-600 dark:text-pink-400">Roast Me 😈</Label>
            <Switch 
              id="roast-mode" 
              checked={isEnabled} 
              onCheckedChange={setIsEnabled}
              className="data-[state=checked]:bg-pink-600"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isEnabled ? (
            <motion.div
              key="roast-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="situation" className="text-lg font-medium">Your Situation</Label>
                  <Textarea
                    id="situation"
                    placeholder="e.g., I've been ignoring my boss's Slack messages for 3 days because I'm scared of the feedback..."
                    className="min-h-30 text-lg bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-pink-500/20"
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={handleGetRoast}
                    disabled={loading || !situation.trim()}
                    className="bg-linear-to-r from-pink-600 to-orange-600 hover:scale-105 transition-transform px-8 py-6 rounded-full text-lg font-bold shadow-lg shadow-pink-500/25"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Flame className="mr-2 h-5 w-5" />
                    )}
                    {loading ? "Roasting..." : "Get Roasted 🔥"}
                  </Button>
                </div>

                <AnimatePresence>
                  {roast && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="mt-8 p-6 rounded-2xl bg-linear-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 border border-pink-100 dark:border-pink-800/50"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-pink-100 dark:bg-pink-800 p-3 rounded-xl">
                          <Sparkles className="h-6 w-6 text-pink-600 dark:text-pink-300" />
                        </div>
                        <div>
                          <h4 className="font-bold text-pink-900 dark:text-pink-100 mb-1">The Verdict:</h4>
                          <p className="text-lg text-slate-700 dark:text-slate-300 italic leading-relaxed">
                            "{roast}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="roast-placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-600 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl"
            >
              <Flame className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-center font-medium">Turn on "Roast Me" mode to get some spicy feedback.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
