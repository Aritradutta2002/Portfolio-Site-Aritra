'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Pure dark blue to black gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-black"></div>
      
      {/* Subtle blue mesh overlay - no pink */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.1),transparent_50%),radial-gradient(circle_at_20%_80%,rgba(29,78,216,0.1),transparent_50%)]"></div>
      
      {/* Subtle mesh gradient overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.3) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.3) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.3) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.3) 0px, transparent 50%)
          `,
        }}
      ></div>

      {/* Dot pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)',
          backgroundSize: '60px 60px',
        }}
      ></div>
      
      {/* Large primary gradient orb - Top Right */}
      <motion.div
        className="absolute -top-64 -right-64 w-[900px] h-[900px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.18) 25%, rgba(236, 72, 153, 0.12) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
          x: [0, 80, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Large secondary gradient orb - Bottom Left */}
      <motion.div
        className="absolute -bottom-64 -left-64 w-[1000px] h-[1000px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.22) 0%, rgba(236, 72, 153, 0.16) 25%, rgba(59, 130, 246, 0.12) 50%, transparent 70%)',
          filter: 'blur(110px)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.6, 0.4, 0.6],
          x: [0, -60, 0],
          y: [0, -70, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Medium accent orb - Top Left */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.18) 0%, rgba(147, 51, 234, 0.14) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          y: [0, -60, 0],
          x: [0, 50, 0],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Medium accent orb - Bottom Right */}
      <motion.div
        className="absolute bottom-1/4 right-1/6 w-[650px] h-[650px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.16) 0%, rgba(59, 130, 246, 0.12) 40%, transparent 70%)',
          filter: 'blur(85px)',
        }}
        animate={{
          y: [0, 60, 0],
          x: [0, -45, 0],
          opacity: [0.25, 0.45, 0.25],
          scale: [1, 1.18, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Center floating orb with rotation */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)',
          filter: 'blur(70px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Additional small accent orbs for depth */}
      <motion.div
        className="absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          filter: 'blur(65px)',
        }}
        animate={{
          x: [0, 50, 0],
          opacity: [0.18, 0.32, 0.18],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Enhanced Particle System */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: [
                'rgba(59, 130, 246, 0.4)',
                'rgba(37, 99, 235, 0.4)',
                'rgba(29, 78, 216, 0.4)',
                'rgba(30, 64, 175, 0.4)',
                'rgba(30, 58, 138, 0.4)',
              ][Math.floor(Math.random() * 5)],
              boxShadow: '0 0 20px currentColor',
            }}
            animate={{
              y: [0, -100 - Math.random() * 200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Aurora Borealis Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(120deg, rgba(29, 78, 216, 0.12), rgba(37, 99, 235, 0.12), rgba(59, 130, 246, 0.12), rgba(30, 64, 175, 0.12))',
          backgroundSize: '400% 400%',
          filter: 'blur(80px)',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Radial pulse waves */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: '800px',
            height: '800px',
            marginLeft: '-400px',
            marginTop: '-400px',
            border: '2px solid rgba(99, 102, 241, 0.1)',
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Shimmer waves */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['-200% 0', '200% 0'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Ambient light spots */}
      {[
        { color: 'rgba(37, 99, 235, 0.12)', x: '15%', y: '20%' },
        { color: 'rgba(29, 78, 216, 0.12)', x: '85%', y: '30%' },
        { color: 'rgba(59, 130, 246, 0.12)', x: '50%', y: '70%' },
        { color: 'rgba(30, 64, 175, 0.12)', x: '20%', y: '85%' },
      ].map((spot, i) => (
        <motion.div
          key={`spot-${i}`}
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${spot.color}, transparent 70%)`,
            left: spot.x,
            top: spot.y,
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [-30, 30, -30],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)]"></div>
    </div>
  )
}
