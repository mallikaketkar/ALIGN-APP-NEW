"use client"

import { Button } from "@/components/ui/button"

interface WelcomePageProps {
  onNext: () => void
}

export default function WelcomePage({ onNext }: WelcomePageProps) {
  return (
    <div
      className="min-h-screen bg-gray-800 p-4 text-white relative overflow-hidden flex flex-col"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      {/* Logo and Brand - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center">
          {/* ALIGN Logo - Three Circles in Triangle/Venn Diagram Formation */}
          <div className="mb-8">
            <svg width="200" height="180" viewBox="0 0 200 180" className="w-48 h-44 mx-auto">
              {/* Black Circle (top) - adjusted for even intersection */}
              <circle cx="100" cy="50" r="40" fill="none" stroke="#000000" strokeWidth="8" />

              {/* Red Circle (bottom left) - adjusted for even intersection */}
              <circle cx="75" cy="110" r="40" fill="none" stroke="#DC2626" strokeWidth="8" />

              {/* White Circle (bottom right) - adjusted for even intersection */}
              <circle cx="125" cy="110" r="40" fill="none" stroke="#FFFFFF" strokeWidth="8" />
            </svg>
          </div>

          {/* Brand Text - Under the logo */}
          <div className="space-y-3">
            <h1
              className="text-5xl font-black tracking-wider text-white"
              style={{
                fontFamily: "Arial Black, Arial, sans-serif",
                fontWeight: 900,
                letterSpacing: "0.05em",
              }}
            >
              ALIGN
            </h1>
            <div className="space-y-1">
              <p
                className="text-sm font-normal tracking-wide text-gray-200"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                }}
              >
                Integrated data-driven solutions
              </p>
              <p
                className="text-xs font-bold tracking-widest text-gray-300 uppercase"
                style={{
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: "0.15em",
                  fontWeight: 700,
                }}
              >
                BY ATHLETES, FOR ATHLETES
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started Button - Bottom of screen */}
      <div className="pb-8 px-4 relative z-10">
        <Button
          onClick={onNext}
          className="w-full bg-white text-gray-900 hover:bg-gray-100 font-medium tracking-wide py-4 text-lg rounded-xl"
          size="lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}
