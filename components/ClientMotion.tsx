"use client";

import { motion } from "framer-motion";

// By re-exporting motion components from a "use client" file,
// we can import and use them in Server Components.
export const MotionDiv = motion.div;
export const MotionHeader = motion.header;
export const MotionP = motion.p;
export const MotionH1 = motion.h1;
export const MotionLi = motion.li;
