'use client';

import { motion } from 'framer-motion';

export default function PageWrapperRegister({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      style={{ perspective: 800 }} // perspektif untuk efek 3D
      initial={{ opacity: 0, scale: 0.8, rotateY: 90, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.9, rotateY: -45, filter: 'blur(5px)' }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.8,
        opacity: { duration: 0.3 },
        filter: { duration: 0.5 },
      }}
    >
      {children}
    </motion.div>
  );
}
