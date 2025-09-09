'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#' },
    { 
      name: 'About', 
      href: '#about',
      submenu: [
        { name: 'Our League', href: '#about' },
        { name: 'Board Members', href: '#board' },
        { name: 'Volunteers', href: '#volunteers' }
      ]
    },
    { name: 'Registration', href: '#registration' },
    { 
      name: 'Programs', 
      href: '#programs',
      submenu: [
        { name: 'Football', href: '#football' },
        { name: 'Cheer', href: '#cheer' },
        { name: 'Age Groups', href: '#ages' }
      ]
    },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-medium' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-lg border border-white/20 p-1.5">
              <Image
                src="/inyfc-small-logo.png"
                alt="INYFC Small Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col justify-center h-12 md:h-14">
              <h2 className={`font-display font-bold text-sm md:text-base leading-tight ${
                isScrolled ? 'text-neutral-800' : 'text-white'
              }`} style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                INYFC
              </h2>
              <p className={`text-xs md:text-sm leading-tight ${
                isScrolled ? 'text-neutral-600' : 'text-white/90'
              }`} style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                Youth Football & Cheer
              </p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <motion.a
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    isScrolled 
                      ? 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50' 
                      : 'text-white hover:text-primary-200 hover:bg-white/10'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDown size={14} />}
                </motion.a>
                
                {/* Desktop Dropdown */}
                {item.submenu && (
                  <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-large opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2">
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="#registration" className="btn-primary">
              Register Now
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled 
                ? 'text-neutral-700 hover:bg-neutral-100' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-neutral-200"
          >
            <div className="container-padding py-4 space-y-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="pt-4"
              >
                <a 
                  href="#registration" 
                  className="btn-primary w-full justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Register Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;