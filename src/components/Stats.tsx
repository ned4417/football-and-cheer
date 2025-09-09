'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target, Zap, Shield, Filter, Star } from 'lucide-react';

const Stats = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('team');

  const gradeGroups = [
    'K-1st Grade',
    '2nd-3rd Grade', 
    '4th-5th Grade',
    '6th-7th Grade',
    '8th Grade'
  ];

  const teams = [
    'Pirates', 'Blackhawks', 'Panthers', 'G-Men', 'Highlanders', 
    'Bears', 'Falcons', 'United', 'Wildcats'
  ];

  // Generate mock team stats
  const generateTeamStats = () => {
    const stats: Array<{
      grade: string;
      team: string;
      gamesPlayed: number;
      totalPoints: number;
      totalPointsAllowed: number;
      avgPointsPerGame: number;
      avgPointsAllowedPerGame: number;
      biggestWin: number;
      longestTouchdown: number;
      totalYards: number;
      avgYardsPerGame: number;
    }> = [];

    gradeGroups.forEach((grade) => {
      teams.forEach((team) => {
        const gamesPlayed = 4 + Math.floor(Math.random() * 2); // 4-5 games
        const totalPoints = Math.floor(Math.random() * 120) + 80; // 80-200 points
        const totalPointsAllowed = Math.floor(Math.random() * 100) + 60; // 60-160 points
        const avgPointsPerGame = Math.round(totalPoints / gamesPlayed * 10) / 10;
        const avgPointsAllowedPerGame = Math.round(totalPointsAllowed / gamesPlayed * 10) / 10;
        const biggestWin = Math.floor(Math.random() * 30) + 10; // 10-40 point margin
        const longestTouchdown = Math.floor(Math.random() * 60) + 25; // 25-85 yard TD
        const totalYards = Math.floor(Math.random() * 2000) + 1500; // 1500-3500 yards
        const avgYardsPerGame = Math.round(totalYards / gamesPlayed);

        stats.push({
          grade,
          team,
          gamesPlayed,
          totalPoints,
          totalPointsAllowed,
          avgPointsPerGame,
          avgPointsAllowedPerGame,
          biggestWin,
          longestTouchdown,
          totalYards,
          avgYardsPerGame
        });
      });
    });

    return stats;
  };

  // Generate mock player stats
  const generatePlayerStats = () => {
    const positions = ['QB', 'RB', 'WR', 'LB', 'DB', 'DL'];
    const firstNames = ['Jake', 'Emma', 'Mason', 'Sophia', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Isabella', 'Lucas', 'Mia', 'Alex', 'Charlotte', 'Ryan', 'Amelia'];
    const lastNames = ['Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor'];
    
    const stats: Array<{
      grade: string;
      team: string;
      playerName: string;
      position: string;
      touchdowns: number;
      yards: number;
      tackles: number;
      interceptions: number;
      fumbleRecoveries: number;
      avgYardsPerCarry: number;
    }> = [];

    gradeGroups.forEach((grade) => {
      teams.forEach((team) => {
        // Generate 3-5 top players per team
        const numPlayers = 3 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < numPlayers; i++) {
          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
          const position = positions[Math.floor(Math.random() * positions.length)];
          
          // Stats vary by position
          let touchdowns = 0;
          let yards = 0;
          let tackles = 0;
          let interceptions = 0;
          let fumbleRecoveries = 0;
          
          if (['QB', 'RB', 'WR'].includes(position)) {
            touchdowns = Math.floor(Math.random() * 8) + 2; // 2-10 TDs
            yards = Math.floor(Math.random() * 800) + 200; // 200-1000 yards
            tackles = Math.floor(Math.random() * 15); // 0-15 tackles
          } else {
            touchdowns = Math.floor(Math.random() * 3); // 0-3 TDs
            yards = Math.floor(Math.random() * 200); // 0-200 yards
            tackles = Math.floor(Math.random() * 40) + 10; // 10-50 tackles
            interceptions = Math.floor(Math.random() * 4); // 0-4 INTs
            fumbleRecoveries = Math.floor(Math.random() * 3); // 0-3 FR
          }

          const avgYardsPerCarry = yards > 0 ? Math.round((yards / (Math.floor(Math.random() * 20) + 10)) * 10) / 10 : 0;

          stats.push({
            grade,
            team,
            playerName: `${firstName} ${lastName}`,
            position,
            touchdowns,
            yards,
            tackles,
            interceptions,
            fumbleRecoveries,
            avgYardsPerCarry
          });
        }
      });
    });

    return stats.sort((a, b) => b.touchdowns - a.touchdowns);
  };

  const teamStats = generateTeamStats();
  const playerStats = generatePlayerStats();

  const filteredTeamStats = teamStats.filter(stat => 
    selectedGrade === 'All' || stat.grade === selectedGrade
  ).sort((a, b) => b.avgPointsPerGame - a.avgPointsPerGame);

  const filteredPlayerStats = playerStats.filter(stat => 
    selectedGrade === 'All' || stat.grade === selectedGrade
  ).sort((a, b) => {
    if (b.touchdowns !== a.touchdowns) return b.touchdowns - a.touchdowns;
    return b.yards - a.yards;
  }).slice(0, 20); // Top 20 players

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          2025 Season Statistics
        </h2>
        <p className="text-xl text-neutral-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
          Team and player performance through Week 4
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6 mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Filter className="text-primary-400" size={24} />
          <h3 className="text-xl font-semibold text-white">Filter Statistics</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Grade Level</label>
            <select 
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Grades</option>
              {gradeGroups.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="team">Team Stats</option>
              <option value="player">Player Stats</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Team Stats */}
      {selectedCategory === 'team' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 overflow-hidden mb-8"
        >
          <div className="px-6 py-4 bg-neutral-700/50 border-b border-neutral-600">
            <div className="flex items-center space-x-2">
              <BarChart3 className="text-primary-400" size={24} />
              <h3 className="text-lg font-semibold text-white">Team Statistics</h3>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-700/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Grade</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">GP</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">Pts/G</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">PA/G</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">Yds/G</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">Long TD</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">Big Win</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                {filteredTeamStats.map((stat, index) => (
                  <motion.tr
                    key={`${stat.grade}-${stat.team}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-neutral-700/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{stat.team}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-primary-400 text-sm">{stat.grade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-neutral-300">{stat.gamesPlayed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-green-400 font-bold">{stat.avgPointsPerGame}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-red-400 font-bold">{stat.avgPointsAllowedPerGame}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-accent-400 font-medium">{stat.avgYardsPerGame}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-white">{stat.longestTouchdown}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-white">{stat.biggestWin}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Player Stats */}
      {selectedCategory === 'player' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 overflow-hidden mb-8"
        >
          <div className="px-6 py-4 bg-neutral-700/50 border-b border-neutral-600">
            <div className="flex items-center space-x-2">
              <Star className="text-primary-400" size={24} />
              <h3 className="text-lg font-semibold text-white">Player Statistics Leaders</h3>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-700/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Player</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Grade</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">Pos</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">TDs</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">Yards</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">Tackles</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-300 uppercase">INTs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                {filteredPlayerStats.map((stat, index) => (
                  <motion.tr
                    key={`${stat.grade}-${stat.team}-${stat.playerName}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-neutral-700/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index < 3 && <Star className="text-yellow-400 mr-2" size={16} />}
                        <span className="text-white font-medium">{stat.playerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-neutral-300">{stat.team}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-primary-400 text-sm">{stat.grade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-2 py-1 bg-accent-900/50 text-accent-400 rounded text-xs font-medium">
                        {stat.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-green-400 font-bold">{stat.touchdowns}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-white font-medium">{stat.yards}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-blue-400 font-medium">{stat.tackles}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-purple-400 font-medium">{stat.interceptions}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Quick Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6 text-center">
          <Target className="text-green-400 mx-auto mb-3" size={32} />
          <div className="text-2xl font-bold text-white mb-1">
            {Math.max(...filteredTeamStats.map(s => s.avgPointsPerGame)).toFixed(1)}
          </div>
          <div className="text-neutral-300 text-sm">Highest Avg Points</div>
        </div>

        <div className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6 text-center">
          <Zap className="text-yellow-400 mx-auto mb-3" size={32} />
          <div className="text-2xl font-bold text-white mb-1">
            {Math.max(...filteredTeamStats.map(s => s.longestTouchdown))}
          </div>
          <div className="text-neutral-300 text-sm">Longest Touchdown</div>
        </div>

        <div className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6 text-center">
          <Shield className="text-blue-400 mx-auto mb-3" size={32} />
          <div className="text-2xl font-bold text-white mb-1">
            {Math.min(...filteredTeamStats.map(s => s.avgPointsAllowedPerGame)).toFixed(1)}
          </div>
          <div className="text-neutral-300 text-sm">Best Defense (PA/G)</div>
        </div>

        <div className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6 text-center">
          <BarChart3 className="text-purple-400 mx-auto mb-3" size={32} />
          <div className="text-2xl font-bold text-white mb-1">
            {Math.max(...filteredTeamStats.map(s => s.avgYardsPerGame))}
          </div>
          <div className="text-neutral-300 text-sm">Most Yards Per Game</div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Abbreviations</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div><span className="text-neutral-300">GP:</span> <span className="text-white">Games Played</span></div>
          <div><span className="text-neutral-300">Pts/G:</span> <span className="text-white">Points Per Game</span></div>
          <div><span className="text-neutral-300">PA/G:</span> <span className="text-white">Points Allowed Per Game</span></div>
          <div><span className="text-neutral-300">Yds/G:</span> <span className="text-white">Yards Per Game</span></div>
          <div><span className="text-neutral-300">Long TD:</span> <span className="text-white">Longest Touchdown</span></div>
          <div><span className="text-neutral-300">TDs:</span> <span className="text-white">Touchdowns</span></div>
          <div><span className="text-neutral-300">INTs:</span> <span className="text-white">Interceptions</span></div>
          <div><span className="text-neutral-300">Pos:</span> <span className="text-white">Position</span></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Stats;