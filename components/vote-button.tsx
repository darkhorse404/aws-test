"use client"

import { motion } from "framer-motion"

interface VoteButtonProps {
  type: "youreRight" | "youreWrong" | "depends"
  label: string
  icon: string
  onClick: () => void
  disabled: boolean
  color: "green" | "red" | "amber"
}

const colorClasses = {
  green:
    "bg-green-500 hover:bg-green-600 text-white disabled:bg-green-500/50 disabled:cursor-not-allowed disabled:opacity-70",
  red: "bg-red-500 hover:bg-red-600 text-white disabled:bg-red-500/50 disabled:cursor-not-allowed disabled:opacity-70",
  amber:
    "bg-amber-500 hover:bg-amber-600 text-white disabled:bg-amber-500/50 disabled:cursor-not-allowed disabled:opacity-70",
}

export default function VoteButton({ type, label, icon, onClick, disabled, color }: VoteButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center gap-1 px-3 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${colorClasses[color]}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="hidden sm:inline text-xs">{label.split(" ")[0]}</span>
    </motion.button>
  )
}
