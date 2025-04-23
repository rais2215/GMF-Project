'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function PageWrapperRegister({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, filter: 'blur(8px)' }}
      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
      exit={{ scale: 0.9, opacity: 0, filter: 'blur(4px)' }}
      transition={{
        duration: 0.1,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.4 },
        filter: { duration: 0.5 },
      }}
      style={{ overflow: 'hidden' }}
      className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-xl p-8 text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-105"
    >
      {children}
    </motion.div>
  );
}
