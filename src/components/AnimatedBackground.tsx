'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Bottom tapping animation - bubbles rising from bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-t from-blue-500/30 to-purple-500/30 rounded-full"
            style={{
              left: `${10 + (i * 12)}%`,
              bottom: '0px',
            }}
            animate={{
              y: [-10, -120, -10],
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Side tapping effects */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`left-tap-${i}`}
            className="w-4 h-4 bg-blue-400/20 rounded-full mb-8"
            animate={{
              x: [0, 40, 0],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`right-tap-${i}`}
            className="w-4 h-4 bg-purple-400/20 rounded-full mb-8"
            animate={{
              x: [0, -40, 0],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Corner tap effects */}
      <motion.div
        className="absolute top-20 left-20 w-6 h-6 border-2 border-blue-400/40 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-20 right-20 w-6 h-6 border-2 border-purple-400/40 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [360, 180, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1.5,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-6 h-6 border-2 border-green-400/40 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -180, -360],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0.8,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-6 h-6 border-2 border-pink-400/40 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [-360, -180, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2.3,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
