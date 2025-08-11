"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const MButton = motion.create(Button);

export default function AnimatedButton(props) {
  return (
    <MButton
      {...props}
      aria-label={props["aria-label"] || "action"}
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatDelay: 1.4,
        ease: "easeInOut",
      }}
      whileHover={{ y: -2 }}
      className={"animate-none " + (props.className || "")}
    />
  );
}
