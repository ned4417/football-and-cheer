'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Filter } from 'lucide-react';

const Schedule = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedWeek, setSelectedWeek] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedTeam, setSelectedTeam] = useState<string>('All');

  const teams = [
    'Pirates', 'Blackhawks', 'Panthers', 'G-Men', 'Highlanders', 
    'Bears', 'Falcons', 'United', 'Wildcats'
  ];

  const locations = [
    {
      name: 'Valley Christian School',
      fields: ['Field 1', 'Field 2'],
      address: '10212 East 9th Avenue, Spokane Valley, WA 99206'
    },
    {
      name: 'Ferris High School', 
      fields: ['Field 1', 'Field 2'],
      address: '3020 East 37th Avenue, Spokane, WA 99223-4520'
    },
    {
      name: 'Mt. Spokane High School',
      fields: ['Field 1', 'Field 2'], 
      address: '6015 East Mount Spokane Park Drive, Mead, WA 99021-9468'
    }
  ];

  const gradeGroups = [
    'K-1st Grade',
    '2nd-3rd Grade', 
    '4th-5th Grade',
    '6th-7th Grade',
    '8th Grade'
  ];

  // Generate schedule starting Sept 13th for 6 weeks
  const generateSchedule = () => {
    const games: Array<{
      id: string;
      week: number;
      date: string;
      shortDate: string;
      time: string;
      grade: string;
      homeTeam: string;
      awayTeam: string;
      location: string;
      field: string;
      address: string;
    }> = [];
    const startDate = new Date('2025-09-13'); // Sept 13th, 2025
    
    // Predefined team matchups to ensure consistent rendering
    const teamMatchups = [
      ['Pirates', 'Blackhawks'], ['Panthers', 'G-Men'], ['Highlanders', 'Bears'],
      ['Falcons', 'United'], ['Wildcats', 'Pirates'], ['Blackhawks', 'Panthers'],
      ['G-Men', 'Highlanders'], ['Bears', 'Falcons'], ['United', 'Wildcats'],
      ['Pirates', 'Panthers'], ['Blackhawks', 'G-Men'], ['Highlanders', 'Falcons'],
      ['Bears', 'United'], ['Wildcats', 'G-Men'], ['Pirates', 'Highlanders'],
      ['Blackhawks', 'Bears'], ['Panthers', 'Falcons'], ['United', 'G-Men'],
      ['Wildcats', 'Blackhawks'], ['Pirates', 'Bears'], ['Highlanders', 'Panthers'],
      ['G-Men', 'Falcons'], ['United', 'Pirates'], ['Wildcats', 'Highlanders'],
      ['Blackhawks', 'Falcons'], ['Panthers', 'United'], ['Bears', 'Wildcats'],
      ['G-Men', 'Pirates'], ['Highlanders', 'Blackhawks'], ['Falcons', 'Panthers']
    ];
    
    let matchupIndex = 0;
    
    for (let week = 0; week < 6; week++) {
      const gameDate = new Date(startDate);
      gameDate.setDate(startDate.getDate() + (week * 7));
      
      gradeGroups.forEach((grade, gradeIndex) => {
        // Create 2-3 games per grade level per week
        const gamesPerGrade = grade === 'K-1st Grade' ? 2 : 3;
        
        for (let gameNum = 0; gameNum < gamesPerGrade; gameNum++) {
          const location = locations[gameNum % locations.length];
          const field = location.fields[gameNum % 2];
          
          // Use predefined matchups instead of random selection
          const matchup = teamMatchups[matchupIndex % teamMatchups.length];
          const homeTeam = matchup[0];
          const awayTeam = matchup[1];
          matchupIndex++;
          
          // Game times: 9:00 AM, 11:00 AM, 1:00 PM, 3:00 PM
          const times = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'];
          const gameTime = times[gameNum % times.length];
          
          games.push({
            id: `${week}-${gradeIndex}-${gameNum}`,
            week: week + 1,
            date: gameDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            shortDate: gameDate.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            }),
            time: gameTime,
            grade,
            homeTeam,
            awayTeam,
            location: location.name,
            field,
            address: location.address
          });
        }
      });
    }
    
    return games.sort((a, b) => {
      if (a.week !== b.week) return a.week - b.week;
      return a.time.localeCompare(b.time);
    });
  };

  const schedule = generateSchedule();

  const filteredSchedule = schedule.filter(game => {
    const gradeMatch = selectedGrade === 'All' || game.grade === selectedGrade;
    const weekMatch = selectedWeek === 'All' || game.week.toString() === selectedWeek;
    const locationMatch = selectedLocation === 'All' || game.location === selectedLocation;
    const teamMatch = selectedTeam === 'All' || game.homeTeam === selectedTeam || game.awayTeam === selectedTeam;
    return gradeMatch && weekMatch && locationMatch && teamMatch;
  });

  const weeks = Array.from(new Set(schedule.map(game => game.week))).sort();

  return (
    <section id="schedule" className="py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            2025 Season Schedule
          </h2>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
            Games run every Saturday for 6 weeks starting September 13th
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
            <h3 className="text-xl font-semibold text-white">Filter Schedule</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <label className="block text-sm font-medium text-neutral-300 mb-2">Week</label>
              <select 
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All Weeks</option>
                {weeks.map(week => (
                  <option key={week} value={week.toString()}>Week {week}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Location</label>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All Locations</option>
                {locations.map(location => (
                  <option key={location.name} value={location.name}>{location.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Team</label>
              <select 
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All Teams</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Schedule Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-4"
        >
          {filteredSchedule.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="grid md:grid-cols-4 gap-4 items-center">
                {/* Date & Time */}
                <div className="text-center md:text-left">
                  <div className="flex items-center space-x-2 text-primary-400 mb-1">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">Week {game.week}</span>
                  </div>
                  <div className="text-white font-semibold">{game.shortDate}</div>
                  <div className="flex items-center space-x-2 text-neutral-300 text-sm">
                    <Clock size={14} />
                    <span>{game.time}</span>
                  </div>
                </div>

                {/* Teams */}
                <div className="text-center">
                  <div className="text-xs text-primary-400 font-medium mb-1">{game.grade}</div>
                  <div className="text-lg font-bold text-white">
                    {game.awayTeam} <span className="text-neutral-400">vs</span> {game.homeTeam}
                  </div>
                </div>

                {/* Location */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-accent-400 mb-1">
                    <MapPin size={16} />
                    <span className="text-sm font-medium">{game.field}</span>
                  </div>
                  <div className="text-white font-medium">{game.location}</div>
                  <div className="text-neutral-300 text-xs">{game.address}</div>
                </div>

                {/* Actions */}
                <div className="text-center">
                  <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                    Get Directions
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredSchedule.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-400 text-lg">No games found for the selected filters.</p>
          </div>
        )}

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-700 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Game Locations</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {locations.map((location, index) => (
              <div key={index} className="text-center">
                <h4 className="font-medium text-white mb-1">{location.name}</h4>
                <p className="text-sm text-neutral-300">{location.address}</p>
                <div className="text-xs text-primary-400 mt-1">
                  {location.fields.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Schedule;