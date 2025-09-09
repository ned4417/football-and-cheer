'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Filter } from 'lucide-react';

const Standings = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>('All');

  const gradeGroups = [
    'K-1st Grade',
    '2nd-3rd Grade', 
    '4th-5th Grade',
    '6th-7th Grade',
    '8th Grade'
  ];

  // Mock standings data
  const generateStandings = () => {
    const teams = [
      'Pirates', 'Blackhawks', 'Panthers', 'G-Men', 'Highlanders', 
      'Bears', 'Falcons', 'United', 'Wildcats'
    ];

    const standings: Array<{
      grade: string;
      team: string;
      wins: number;
      losses: number;
      ties: number;
      points: number;
      pointsAgainst: number;
      streak: string;
      rank: number;
    }> = [];

    gradeGroups.forEach((grade) => {
      // Shuffle teams and assign random but realistic records
      const gradeTeams = [...teams].sort(() => Math.random() - 0.5);
      
      gradeTeams.forEach((team, index) => {
        // Generate realistic win/loss records (4-5 games played so far)
        const gamesPlayed = 4 + Math.floor(Math.random() * 2); // 4-5 games
        const wins = Math.floor(Math.random() * (gamesPlayed + 1));
        const losses = gamesPlayed - wins;
        const ties = Math.random() < 0.1 ? 1 : 0; // 10% chance of a tie
        
        // Points scored and against (realistic youth football scores)
        const points = wins * (12 + Math.floor(Math.random() * 20)) + losses * (6 + Math.floor(Math.random() * 10));
        const pointsAgainst = losses * (12 + Math.floor(Math.random() * 20)) + wins * (6 + Math.floor(Math.random() * 10));
        
        // Generate streak
        const streaks = ['W3', 'W2', 'W1', 'L1', 'L2', 'T1'];
        const streak = streaks[Math.floor(Math.random() * streaks.length)];

        standings.push({
          grade,
          team,
          wins,
          losses,
          ties,
          points,
          pointsAgainst,
          streak,
          rank: index + 1
        });
      });
    });

    // Sort by grade, then by wins (descending), then by point differential
    return standings.sort((a, b) => {
      if (a.grade !== b.grade) {
        return gradeGroups.indexOf(a.grade) - gradeGroups.indexOf(b.grade);
      }
      if (a.wins !== b.wins) return b.wins - a.wins;
      return (b.points - b.pointsAgainst) - (a.points - a.pointsAgainst);
    }).map((team, index, arr) => {
      // Recalculate rank within grade
      const gradeTeams = arr.filter(t => t.grade === team.grade);
      const gradeIndex = gradeTeams.findIndex(t => t.team === team.team);
      return { ...team, rank: gradeIndex + 1 };
    });
  };

  const standings = generateStandings();

  const filteredStandings = standings.filter(team => 
    selectedGrade === 'All' || team.grade === selectedGrade
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-400" size={20} />;
      case 2: return <Medal className="text-gray-400" size={20} />;
      case 3: return <Award className="text-orange-600" size={20} />;
      default: return <span className="text-neutral-400 font-bold">{rank}</span>;
    }
  };

  const getWinPercentage = (wins: number, losses: number, ties: number) => {
    const total = wins + losses + ties;
    if (total === 0) return 0;
    return ((wins + ties * 0.5) / total * 100).toFixed(1);
  };

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
          2025 Season Standings
        </h2>
        <p className="text-xl text-neutral-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
          Current team rankings and records through Week 4
        </p>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6 mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Filter className="text-primary-400" size={24} />
          <h3 className="text-xl font-semibold text-white">Filter Standings</h3>
        </div>
        
        <div className="max-w-xs">
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
      </motion.div>

      {/* Standings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Team</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-neutral-300 uppercase tracking-wider">W</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-neutral-300 uppercase tracking-wider">L</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-neutral-300 uppercase tracking-wider">T</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-neutral-300 uppercase tracking-wider">Win %</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-neutral-300 uppercase tracking-wider">PF</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-neutral-300 uppercase tracking-wider">PA</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-neutral-300 uppercase tracking-wider">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {filteredStandings.map((team, index) => (
                <motion.tr
                  key={`${team.grade}-${team.team}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-700/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRankIcon(team.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-medium">{team.team}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-primary-400 text-sm font-medium">{team.grade}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-white font-bold">
                    {team.wins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-white font-bold">
                    {team.losses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-white font-bold">
                    {team.ties}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-accent-400 font-medium">
                    {getWinPercentage(team.wins, team.losses, team.ties)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-green-400 font-medium">
                    {team.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-red-400 font-medium">
                    {team.pointsAgainst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      team.streak.startsWith('W') 
                        ? 'bg-green-900/50 text-green-400 border border-green-700' 
                        : team.streak.startsWith('L')
                        ? 'bg-red-900/50 text-red-400 border border-red-700'
                        : 'bg-yellow-900/50 text-yellow-400 border border-yellow-700'
                    }`}>
                      {team.streak}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredStandings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-400 text-lg">No standings found for the selected grade.</p>
        </div>
      )}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Legend</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div><span className="text-neutral-300">W, L, T:</span> <span className="text-white">Wins, Losses, Ties</span></div>
          <div><span className="text-neutral-300">Win %:</span> <span className="text-white">Winning Percentage</span></div>
          <div><span className="text-neutral-300">PF:</span> <span className="text-white">Points For</span></div>
          <div><span className="text-neutral-300">PA:</span> <span className="text-white">Points Against</span></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Standings;