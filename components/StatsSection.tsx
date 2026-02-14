import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Target, Zap, Award, Code2, Github, ExternalLink, Activity } from 'lucide-react';
import { LeetCodeStats, LeetCodeDaily } from '../types.ts';
import { LANGUAGE_STATS } from '../constants.tsx';

export const StatsSection: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [daily, setDaily] = useState<LeetCodeDaily | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, dailyRes] = await Promise.all([
          fetch('https://leetcode-api-pied.vercel.app/user/iustus'),
          fetch('https://leetcode-api-pied.vercel.app/daily')
        ]);
        const statsData = await statsRes.json();
        const dailyData = await dailyRes.json();
        setStats(statsData);
        setDaily(dailyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-[3px] border-ctp-blue/10 border-t-ctp-blue rounded-full animate-spin"></div>
        <div className="text-xs font-mono text-ctp-overlay1 uppercase tracking-[0.2em] animate-pulse">Fetching LeetCode data...</div>
      </div>
    );
  }

  if (!stats) return null;

  const acStats = stats.submitStats.acSubmissionNum;
  const pieData = [
    { name: 'Easy', value: acStats.find(s => s.difficulty === 'Easy')?.count || 0, color: '#a6e3a1' },
    { name: 'Medium', value: acStats.find(s => s.difficulty === 'Medium')?.count || 0, color: '#fab387' },
    { name: 'Hard', value: acStats.find(s => s.difficulty === 'Hard')?.count || 0, color: '#f38ba8' },
  ];

  return (
    <section id="stats" className="py-24 container mx-auto px-6">
      <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
           <h2 className="text-4xl font-bold mb-3 flex items-center gap-3">
            <span className="text-ctp-blue">02.</span> Live Stats
          </h2>
          <p className="text-ctp-subtext0 font-medium opacity-80">I like to keep my problem-solving skills sharp. Here's my current status.</p>
        </div>
        
        {daily && (
          <motion.a
            href={daily.link}
            target="_blank"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center bg-ctp-mantle/50 backdrop-blur-md p-5 rounded-3xl border border-ctp-blue/10 group hover:border-ctp-blue/40 hover:shadow-2xl hover:shadow-ctp-blue/5 transition-all"
          >
            <div className="bg-ctp-blue/10 p-3 rounded-2xl mr-4 group-hover:bg-ctp-blue/20 transition-colors">
              <Zap className="w-5 h-5 text-ctp-blue" />
            </div>
            <div className="text-left pr-4">
              <div className="text-[10px] uppercase font-bold text-ctp-overlay1 tracking-widest mb-1">Daily Challenge</div>
              <div className="text-sm font-bold text-ctp-text">{daily.question.title}</div>
            </div>
            <ExternalLink className="w-4 h-4 text-ctp-overlay1 group-hover:text-ctp-blue transition-colors" />
          </motion.a>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-ctp-mantle/40 backdrop-blur-sm rounded-[2.5rem] p-10 flex flex-col items-center text-center border border-ctp-surface0 h-full relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-ctp-blue/5 to-transparent pointer-events-none" />
          
          <div className="relative mb-8 group z-10">
            <div className="absolute inset-0 bg-ctp-blue/20 blur-[40px] rounded-full group-hover:bg-ctp-blue/30 transition-colors"></div>
            <img 
              src={stats.profile.userAvatar} 
              alt={stats.username} 
              className="relative w-36 h-36 rounded-full border-[6px] border-ctp-crust shadow-2xl transition-transform group-hover:scale-105"
            />
            <div className="absolute -bottom-2 -right-2 bg-ctp-blue p-3 rounded-full border-4 border-ctp-crust shadow-lg group-hover:rotate-12 transition-transform">
              <Award className="w-6 h-6 text-ctp-base" />
            </div>
          </div>
          
          <h3 className="text-3xl font-bold mb-2 text-ctp-text z-10">{stats.profile.realName}</h3>
          <p className="text-ctp-overlay1 font-mono text-xs mb-10 tracking-widest uppercase font-bold flex items-center z-10">
            <Github className="w-3.5 h-3.5 mr-2 text-ctp-blue" /> @iustus
          </p>
          
          <div className="grid grid-cols-2 gap-4 w-full mt-auto z-10">
            <div className="bg-ctp-crust/60 rounded-[1.5rem] p-6 border border-ctp-surface0">
              <div className="text-2xl font-bold text-ctp-text mb-1">#{Math.floor(stats.profile.ranking / 1000)}K</div>
              <div className="text-[10px] uppercase tracking-widest text-ctp-overlay1 font-bold">Global Rank</div>
            </div>
            <div className="bg-ctp-crust/60 rounded-[1.5rem] p-6 border border-ctp-surface0">
              <div className="text-2xl font-bold text-ctp-text mb-1">{stats.profile.solutionCount}</div>
              <div className="text-[10px] uppercase tracking-widest text-ctp-overlay1 font-bold">Solved</div>
            </div>
          </div>
        </motion.div>

        {/* Algorithm Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-ctp-mantle/40 backdrop-blur-sm rounded-[2.5rem] p-10 border border-ctp-surface0 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ctp-green/5 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between mb-12 z-10">
            <div className="flex items-center">
              <Activity className="w-6 h-6 text-ctp-green mr-4" />
              <h3 className="text-2xl font-bold text-ctp-text">Problem Distribution</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center flex-1 z-10">
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#181825', border: '1px solid #313244', borderRadius: '12px', fontSize: '12px', color: '#cdd6f4' }}
                    itemStyle={{ color: '#cdd6f4' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl font-bold text-ctp-text">{acStats[0].count}</span>
                <span className="text-[10px] text-ctp-overlay1 uppercase font-bold tracking-widest mt-2">Accepted</span>
              </div>
            </div>

            <div className="space-y-8">
              {pieData.map((d) => (
                <div key={d.name} className="group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-4 shadow-sm" style={{ backgroundColor: d.color }}></div>
                      <span className="text-ctp-subtext0 text-sm font-bold uppercase tracking-wider">{d.name}</span>
                    </div>
                    <span className="font-mono text-ctp-text text-sm font-bold">{d.value}</span>
                  </div>
                  <div className="w-full bg-ctp-crust h-2.5 rounded-full overflow-hidden border border-ctp-surface0/50">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(d.value / acStats[0].count) * 100}%` }}
                      transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stack Composition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-ctp-mantle/40 backdrop-blur-sm rounded-[2.5rem] p-12 border border-ctp-surface0 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-ctp-mauve/5 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between mb-16 z-10 relative">
            <div className="flex items-center">
              <Code2 className="w-7 h-7 text-ctp-mauve mr-4" />
              <h3 className="text-2xl font-bold text-ctp-text">Languages</h3>
            </div>
            <div className="text-[10px] font-mono text-ctp-overlay1 bg-ctp-crust/50 px-5 py-2 rounded-full border border-ctp-surface0 uppercase tracking-widest font-bold">
                Systems Focused
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16 relative z-10">
            {LANGUAGE_STATS.map((lang) => (
              <div key={lang.name} className="bg-ctp-crust/40 border border-ctp-surface0 p-8 rounded-[2rem] hover:border-ctp-blue/40 hover:bg-ctp-crust/60 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-ctp-blue/5 rounded-full -mr-8 -mt-8 group-hover:bg-ctp-blue/10 transition-colors"></div>
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-2.5 h-2.5 rounded-full mr-3 shadow-sm" style={{ backgroundColor: lang.color }}></div>
                  <span className="text-[10px] font-mono text-ctp-overlay1 uppercase tracking-widest font-bold group-hover:text-ctp-blue transition-colors">{lang.name}</span>
                </div>
                <div className="text-3xl font-bold text-ctp-text relative z-10">{lang.percent}%</div>
              </div>
            ))}
          </div>

          <div className="h-8 w-full flex rounded-[1rem] overflow-hidden shadow-lg border border-ctp-surface0 bg-ctp-crust p-1.5 relative z-10">
            {LANGUAGE_STATS.map((lang, idx) => (
              <motion.div
                key={idx}
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percent}%` }}
                transition={{ duration: 1.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: lang.color }}
                className="h-full relative group first:rounded-l-md last:rounded-r-md"
              >
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};