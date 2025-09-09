'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, BarChart3 } from 'lucide-react';
import Schedule from './Schedule';
import Standings from './Standings';
import Stats from './Stats';

const SportsSection = () => {
  const [activeTab, setActiveTab] = useState('schedule');

  const tabs = [
    {
      id: 'schedule',
      label: 'Schedule',
      icon: Calendar,
      component: Schedule
    },
    {
      id: 'standings',
      label: 'Standings',
      icon: Trophy,
      component: Standings
    },
    {
      id: 'stats',
      label: 'Stats',
      icon: BarChart3,
      component: Stats
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Schedule;

  return (
    <section className="py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-2 mb-8"
        >
          <nav className="flex space-x-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </section>
  );
};

export default SportsSection;