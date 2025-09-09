'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Clock, CheckCircle2, ArrowRight, Zap, Heart } from 'lucide-react';

const Registration = () => {
  const [selectedProgram, setSelectedProgram] = useState<'football' | 'cheer' | null>(null);
  const [selectedAge, setSelectedAge] = useState<string>('');

  const programs = [
    {
      id: 'football' as const,
      name: 'Football',
      icon: Zap,
      color: 'primary',
      ages: ['K-1st Grade', '2nd-3rd Grade', '4th-5th Grade', '6th-7th Grade', '8th Grade'],
      description: 'Build strength, strategy, and teamwork on the field',
      features: ['Professional Coaching', 'Safety Equipment Included', 'Weekly Games', 'Season Tournament']
    },
    {
      id: 'cheer' as const,
      name: 'Cheerleading',
      icon: Heart,
      color: 'accent',
      ages: ['K-2nd Grade', '3rd-5th Grade', '6th-8th Grade'],
      description: 'Develop confidence, coordination, and team spirit',
      features: ['Performance Training', 'Competition Prep', 'Uniform Included', 'Leadership Skills']
    }
  ];

  const registrationSteps = [
    {
      icon: Users,
      title: 'Choose Program',
      description: 'Select Football or Cheerleading'
    },
    {
      icon: Calendar,
      title: 'Pick Age Group',
      description: 'Find the right division for your athlete'
    },
    {
      icon: MapPin,
      title: 'Complete Registration',
      description: 'Fill out forms and submit payment'
    },
    {
      icon: CheckCircle2,
      title: 'Get Ready to Play',
      description: 'Receive schedule and equipment info'
    }
  ];

  const importantDates = [
    { date: 'March 1', event: 'Early Bird Registration Opens', status: 'active' },
    { date: 'June 15', event: 'Regular Registration Closes', status: 'upcoming' },
    { date: 'July 1', event: 'Equipment Distribution', status: 'upcoming' },
    { date: 'August 15', event: 'Season Begins', status: 'upcoming' }
  ];

  return (
    <section id="registration" className="py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Register Your Athlete</h2>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
            Join over 1,200 young athletes in our premiere youth sports programs. 
            Registration is now open for the 2025 season!
          </p>
        </motion.div>

        {/* Registration Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
        >
          {registrationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center relative">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mx-auto mb-4 shadow-xl border-2 border-primary-400/30">
                  <Icon size={32} className="text-white drop-shadow-sm" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{step.title}</h3>
                <p className="text-neutral-200 text-sm font-medium" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{step.description}</p>
                
                {/* Connection Line */}
                {index < registrationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 transform -translate-y-1/2 z-0 rounded-full shadow-lg">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full shadow-lg border-2 border-white"></div>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Important Dates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Clock className="text-primary-400" size={28} />
                <h3 className="text-2xl font-semibold text-white">Important Registration Dates</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {importantDates.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-neutral-700/50 rounded-xl border border-neutral-600">
                    <div className={`text-xs px-2 py-1 rounded-full mb-2 inline-block ${
                      item.status === 'active' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-neutral-600 text-neutral-200'
                    }`}>
                      {item.status === 'active' ? 'Open Now' : 'Upcoming'}
                    </div>
                    <div className="font-bold text-white text-lg">{item.date}</div>
                    <p className="text-sm text-neutral-300 mt-1">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Program Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-2 text-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Choose Your Program</h3>
              <p className="text-neutral-300 text-center mb-6">Select either Football or Cheerleading to get started</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((program) => {
                  const Icon = program.icon;
                  const isSelected = selectedProgram === program.id;
                  const colorClass = program.color === 'primary' ? 'primary' : 'accent';
                  
                  return (
                    <motion.div
                      key={program.id}
                      className={`relative cursor-pointer rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                        isSelected 
                          ? `border-${colorClass}-400 bg-gradient-to-br from-${colorClass}-500/20 to-${colorClass}-600/10 shadow-2xl ring-4 ring-${colorClass}-400/30` 
                          : 'border-neutral-600 bg-neutral-700/50 hover:border-neutral-500 hover:bg-neutral-700/70 shadow-lg hover:shadow-xl'
                      }`}
                      onClick={() => {
                        setSelectedProgram(program.id);
                        setSelectedAge('');
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Click Indicator */}
                      <div className="absolute top-3 right-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected 
                            ? `border-${colorClass}-400 bg-${colorClass}-500` 
                            : 'border-neutral-400 bg-transparent'
                        }`}>
                          {isSelected && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-center mb-4">
                          <div className={`w-16 h-16 bg-gradient-to-br from-${colorClass}-400 to-${colorClass}-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                            <Icon size={32} className="text-white drop-shadow-sm" />
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-2">{program.name}</h4>
                          <p className="text-neutral-300 text-sm">{program.description}</p>
                        </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {program.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <CheckCircle2 size={16} className={`text-${colorClass}-400`} />
                            <span className="text-sm text-neutral-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="border-t border-neutral-200 pt-4"
                        >
                          <p className="text-sm font-medium text-neutral-700 mb-3">Select Age Group:</p>
                          <div className="grid grid-cols-1 gap-2">
                            {program.ages.map((age) => (
                              <button
                                key={age}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAge(age);
                                }}
                                className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                  selectedAge === age
                                    ? `bg-${colorClass}-100 text-${colorClass}-700 border border-${colorClass}-200`
                                    : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                                }`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {selectedProgram && selectedAge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <button className="btn-primary w-full group">
                  <span>Continue Registration</span>
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
            </div>
          </motion.div>

          {/* Important Dates & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >

            {/* Pricing */}
            <div className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Registration Fees</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-600">
                    <span className="text-neutral-300">Early Bird (by May 1)</span>
                    <span className="font-semibold text-primary-400">$185</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-600">
                    <span className="text-neutral-300">Regular Registration</span>
                    <span className="font-semibold text-white">$225</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-neutral-300">Late Registration (after June 15)</span>
                    <span className="font-semibold text-white">$275</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-primary-600/20 rounded-lg border border-primary-500/30">
                  <p className="text-sm text-primary-300">
                    <strong>Save $40!</strong> Register by May 1st for early bird pricing.
                  </p>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-accent-500/50">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                <p className="text-neutral-300 mb-4">
                  Our registration team is here to help you through the process.
                </p>
                <div className="space-y-2 text-sm text-neutral-300">
                  <p>📧 Email: registration@inyfc.org</p>
                  <p>📞 Phone: (509) 555-0123</p>
                  <p>⏰ Mon-Fri: 9am-5pm</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Registration;