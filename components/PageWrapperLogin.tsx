'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== 'undefined' ? window.location.pathname : 'page'}
        initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.8, filter: 'blur(6px)', y: 20 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          filter: { duration: 0.4 },
        }}
        style={{ overflow: 'hidden' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
