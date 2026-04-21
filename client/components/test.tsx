'use client'
import { motion } from "motion/react"
import { Bot, HandFist, HeartPulse } from "lucide-react";

export default function Test () {
    return (
            <div className="h-10 w-10">
            <motion.ul 
            whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 2.95 }}
  onHoverStart={() => console.log('hover started!')}

            >
            <HandFist/>
            </motion.ul >
            </div>
            
        
    
    )
}