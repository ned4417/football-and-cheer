'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  const messages = [
    { text: '2025 Season Registration Open' },
    { text: 'Building Champions Since 1999' },
    { text: '1,200+ Athletes & Growing' },
    { text: 'Ages K-8th Grade Welcome' },
    { text: 'Character • Teamwork • Excellence' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  useEffect(() => {
    // Ensure page starts at the top
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { icon: Users, label: 'Athletes', value: '1,200+' },
    { icon: Trophy, label: 'Teams', value: '48+' },
    { icon: Star, label: 'Years', value: '25+' }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16">

      {/* Content */}
      <div className="relative z-10 container-padding max-w-7xl mx-auto text-center text-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <Image
                  src="/inyfc-big-logo.png"
                  alt="INYFC Big Logo"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center justify-center px-6 py-4 bg-primary-600/20 border border-primary-400/30 rounded-2xl text-lg font-semibold backdrop-blur-sm shadow-xl w-96 md:w-[28rem]">
                <motion.span
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-center whitespace-nowrap"
                >
                  {messages[currentMessageIndex].text}
                </motion.span>
              </div>
            </motion.div>
            
            <h1 className="font-display font-bold text-balance max-w-4xl mx-auto drop-shadow-2xl">
              <span className="block text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
                Inland Northwest
              </span>
              <span className="block text-primary-400 font-black" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
                Youth Football & Cheer
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              Empowering young athletes in Central to Eastern Washington through 
              football and cheerleading programs that build character, teamwork, and lifelong friendships.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#registration"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg bg-primary-600 text-white hover:bg-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-all duration-200 shadow-xl border-2 border-primary-400 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Register Your Athlete</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg border-2 border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-neutral-900 focus:outline-none focus:ring-4 focus:ring-accent-300 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto pt-12"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                    <Icon size={32} className="text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold font-display">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm font-medium mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
};

export default Hero;