import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  emoji: string;
}

export default function App() {
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create floating particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      emoji: ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)],
    }));
    setParticles(newParticles);
  }, []);

  const handleYes = () => {
    setResponse('yes');
  };

  const handleNo = () => {
    setResponse('no');
  };

  const handleReset = () => {
    setResponse(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0015] via-[#1a0b2e] via-[#2d1b4e] to-[#0f0520]">
      {/* Animated Background Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-20, 20, -20],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
          x: [20, -20, 20],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Floating Background Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          {/* Main Content Card */}
          <motion.div
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Decorative Top Border */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
                <span className="text-3xl">💝</span>
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
              </motion.div>
            </div>

            {/* Teddy Bear with Heart */}
            <motion.div
              className="flex justify-center items-center mb-8 relative"
              animate={
                response === 'yes'
                  ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }
                  : response === 'no'
                  ? { y: [0, 8, 0] }
                  : { scale: [1, 1.05, 1] }
              }
              transition={{
                duration: response === 'yes' ? 0.6 : response === 'no' ? 2 : 4,
                repeat: response === 'no' || !response ? Infinity : 0,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            >
              <div className="relative">
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 blur-2xl opacity-50"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="text-9xl">
                    {response === 'yes' ? '🎉' : response === 'no' ? '💔' : '❤️'}
                  </div>
                </motion.div>
                
                <div className="relative flex items-center gap-4">
                  <span className="text-[120px] drop-shadow-2xl">
                    {response === 'yes' ? '😊' : response === 'no' ? '😢' : '🧸'}
                  </span>
                  {!response && (
                    <motion.span
                      className="text-[100px] drop-shadow-2xl"
                      animate={{
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      ❤️
                    </motion.span>
                  )}
                  {response === 'yes' && (
                    <span className="text-[120px] drop-shadow-2xl">🧸</span>
                  )}
                  {response === 'no' && (
                    <span className="text-[120px] drop-shadow-2xl">🧸</span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Kisses Animation for Yes */}
            <AnimatePresence>
              {response === 'yes' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-5xl filter drop-shadow-lg"
                      initial={{
                        x: '50vw',
                        y: '50vh',
                        opacity: 1,
                        scale: 0,
                        rotate: 0,
                      }}
                      animate={{
                        x: `${20 + Math.random() * 60}vw`,
                        y: `${10 + Math.random() * 80}vh`,
                        opacity: 0,
                        scale: [0, 1.5, 0.8, 0],
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 2.5,
                        delay: i * 0.08,
                        ease: 'easeOut',
                      }}
                    >
                      {['💋', '💕', '💖', '💗'][Math.floor(Math.random() * 4)]}
                    </motion.div>
                  ))}
                  
                  {/* Confetti */}
                  {[...Array(40)].map((_, i) => (
                    <motion.div
                      key={`confetti-${i}`}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        background: ['#ff69b4', '#ff1493', '#ff69b4', '#ffc0cb', '#ff85b3'][Math.floor(Math.random() * 5)],
                      }}
                      initial={{
                        x: '50vw',
                        y: '50vh',
                        opacity: 1,
                      }}
                      animate={{
                        x: `${Math.random() * 100}vw`,
                        y: `${Math.random() * 100}vh`,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.05,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Tears Animation for No */}
            <AnimatePresence>
              {response === 'no' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-4xl filter drop-shadow-lg"
                      initial={{
                        x: 0,
                        y: -50,
                        opacity: 1,
                        scale: 0,
                      }}
                      animate={{
                        y: 300,
                        opacity: 0,
                        scale: [0, 1.2, 1, 1],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.15,
                        repeat: Infinity,
                        ease: 'easeIn',
                      }}
                      style={{
                        left: `calc(50% + ${(i - 6) * 25}px)`,
                      }}
                    >
                      💧
                    </motion.div>
                  ))}
                  
                  {/* Broken Hearts */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`broken-${i}`}
                      className="absolute text-3xl"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                      }}
                      animate={{
                        x: (i % 2 === 0 ? -1 : 1) * (100 + i * 20),
                        y: 100 + i * 30,
                        opacity: 0,
                        rotate: (i % 2 === 0 ? -1 : 1) * 180,
                      }}
                      transition={{
                        duration: 2.5,
                        delay: 0.5 + i * 0.2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                    >
                      💔
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Message */}
            <motion.div
              className="text-center mb-12 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.p
                className="text-2xl tracking-[0.3em] uppercase opacity-80 text-pink-200"
                style={{ fontFamily: "'Cinzel', serif" }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                From Mine to You
              </motion.p>
              
              <motion.div
                className="relative inline-block"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 100 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-pink-500/30 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <h1
                  className="relative text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 bg-clip-text text-transparent tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Lweendo Chibilika
                </h1>
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-3 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <motion.div
                  className="w-16 h-px bg-gradient-to-r from-transparent to-pink-400"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
                <span className="text-xl text-pink-300">❦</span>
                <motion.div
                  className="w-16 h-px bg-gradient-to-l from-transparent to-pink-400"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </motion.div>

              <motion.p
                className="text-4xl md:text-5xl text-white mt-6 leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                Will you be my <span className="italic font-semibold text-pink-300">Valentine</span>?
              </motion.p>
            </motion.div>

            {/* Response Message */}
            <AnimatePresence mode="wait">
              {response === 'yes' && (
                <motion.div
                  className="text-center mb-10"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <motion.p
                    className="text-5xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text text-transparent mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    You've made my heart soar!
                  </motion.p>
                  <p
                    className="text-2xl text-pink-200 italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Forever grateful for this beautiful moment 💕
                  </p>
                </motion.div>
              )}
              {response === 'no' && (
                <motion.div
                  className="text-center mb-10"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <motion.p
                    className="text-5xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 bg-clip-text text-transparent mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    My heart weeps in sorrow...
                  </motion.p>
                  <p
                    className="text-2xl text-blue-200 italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Perhaps another time, my love 💔
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            {!response && (
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <motion.button
                  onClick={handleYes}
                  className="group relative px-16 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white text-3xl font-bold rounded-full shadow-2xl overflow-hidden"
                  style={{ fontFamily: "'Cinzel', serif" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(236, 72, 153, 0.5)',
                      '0 0 40px rgba(236, 72, 153, 0.8)',
                      '0 0 20px rgba(236, 72, 153, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 1,
                    }}
                  />
                  <span className="relative flex items-center gap-3">
                    Yes! 💖
                  </span>
                </motion.button>

                <motion.button
                  onClick={handleNo}
                  className="group relative px-16 py-5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-white text-3xl font-bold rounded-full shadow-2xl overflow-hidden border-2 border-gray-500/50"
                  style={{ fontFamily: "'Cinzel', serif" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative flex items-center gap-3">
                    No 😔
                  </span>
                </motion.button>
              </motion.div>
            )}

            {/* Reset Button */}
            {response && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
              >
                <motion.button
                  onClick={handleReset}
                  className="px-12 py-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 text-white text-2xl font-semibold rounded-full shadow-xl border border-white/20"
                  style={{ fontFamily: "'Cinzel', serif" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ask Again ✨
                </motion.button>
              </motion.div>
            )}

            {/* Decorative Bottom Border */}
            <motion.div
              className="flex justify-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
                <motion.span
                  className="text-2xl"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  ✨
                </motion.span>
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
