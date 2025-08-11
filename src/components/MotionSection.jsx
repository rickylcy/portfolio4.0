"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function MotionSection({
  children,
  delay = 0,
  as = "section",
  className = "",
}) {
  const shouldReduce = useReducedMotion();
  const Tag = motion[as] || motion.section;

  return (
    <Tag
      initial={shouldReduce ? false : { opacity: 0, y: 12 }}
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}
