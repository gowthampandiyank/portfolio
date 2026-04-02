import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const speedLines = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 0.8,
  width: `${40 + Math.random() * 60}%`,
  height: `${1 + Math.random() * 3}px`,
}));

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Speed lines */}
          {speedLines.map((line) => (
            <div
              key={line.id}
              className="absolute bg-primary/30"
              style={{
                top: line.top,
                left: 0,
                width: line.width,
                height: line.height,
                animation: `speed-line 1.2s ${line.delay}s ease-in-out infinite`,
              }}
            />
          ))}

          {/* Manga burst pattern */}
          <motion.div
            className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 origin-left bg-primary/20"
                style={{
                  height: "250px",
                  transform: `rotate(${i * 45}deg)`,
                  transformOrigin: "0 0",
                }}
              />
            ))}
          </motion.div>

          {/* Center content */}
          <div className="relative z-10 text-center">
            {/* Name with manga impact */}
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold tracking-wider text-foreground"
              initial={{ scale: 3, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className="text-primary">G</span>owtham
            </motion.h1>

            <motion.p
              className="text-sm md:text-base text-muted-foreground tracking-[0.3em] uppercase mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              Data Analyst & Developer
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="mt-8 w-48 md:w-64 h-1 bg-muted rounded-full mx-auto overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            <motion.p
              className="text-xs text-muted-foreground mt-2 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/40 rounded-full"
              style={{
                left: `${15 + i * 14}%`,
                bottom: "20%",
                animation: `float-particle 2s ${i * 0.3}s ease-in-out infinite`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
