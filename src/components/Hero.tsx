import React from 'react';
import { motion } from 'framer-motion';
import { Code, Rocket, PenTool as Tool } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Crafting Digital Solutions for Real-World Problems
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Explore a collection of tools and applications designed to make your life easier.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow-md">
              <Code className="w-5 h-5 text-blue-500" />
              <span>Modern Tech Stack</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow-md">
              <Rocket className="w-5 h-5 text-purple-500" />
              <span>Performance Focused</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow-md">
              <Tool className="w-5 h-5 text-green-500" />
              <span>Problem Solving</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};