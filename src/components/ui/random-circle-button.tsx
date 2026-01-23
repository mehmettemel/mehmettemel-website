"use client";

import { Shuffle } from "lucide-react";
import { useState } from "react";

interface RandomCircleButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function RandomCircleButton({
  onClick,
  disabled = false,
  loading = false,
}: RandomCircleButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isAnimating = loading || isHovered;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      aria-label="Random"
    >
      {/* Animated Border */}
      <svg
        className={`absolute inset-0 w-full h-full -rotate-90 ${loading ? 'animate-spin' : ''}`}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-primary-foreground/20"
        />
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="301.59"
          strokeDashoffset={isAnimating ? "0" : "301.59"}
          className="text-primary-foreground transition-all duration-700 ease-out"
          style={{
            strokeLinecap: "round",
          }}
        />
      </svg>

      {/* Icon */}
      <Shuffle
        size={24}
        className="relative z-10"
      />
    </button>
  );
}
