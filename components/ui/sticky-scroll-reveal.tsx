'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface StickyScrollProps {
  content: React.ReactNode[]
}

export const StickyScroll: React.FC<StickyScrollProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const { top, height } = containerRef.current.getBoundingClientRect()
      const scrollPosition = window.innerHeight - top
      const index = Math.min(
        Math.max(Math.floor((scrollPosition / height) * content.length), 0),
        content.length - 1
      )
      setActiveIndex(index)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [content.length])

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity }} className="w-full max-w-4xl">
          {content.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}