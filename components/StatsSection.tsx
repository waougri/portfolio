import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Target, TrendingUp, Award, Code2, Github, Zap, ExternalLink } from 'lucide-react';
import { LeetCodeStats, LeetCodeDaily } from '../types.ts';
import { LANGUAGE_STATS } from '../constants.tsx';

export const StatsSection: React.FC<{ fullView?: boolean }> = ({ fullView }) => {
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
      <div className="py-20 flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-[3px] border-mocha-blue/10 border-t-mocha-blue rounded-full animate-spin"></div>
        <div className="text-[10px] font-mono text-mocha-overlay1 uppercase tracking-[0.4em] animate-pulse">Establishing Connection...</div>
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
    <section className="py-12">
      <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl font-bold mb-3 text-mocha-text tracking-tight">Telemetry Analytics</h2>
          <p className="text-mocha-subtext0 font-medium opacity-80">Real-time performance metrics synced from LeetCode core.</p>
        </div>
        {daily && (
          <motion.a
            href={daily.link}
            target="_blank"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center glass p-5 rounded-3xl border border-mocha-blue/10 group hover:border-mocha-blue/40 hover:shadow-2xl hover:shadow-mocha-blue/5 transition-all"
          >
            <div className="bg-mocha-blue/10 p-3 rounded-2xl mr-4 group-hover:bg-mocha-blue/20 transition-colors">
              <Zap className="w-5 h-5 text-mocha-blue" />
            </div>
            <div className="text-left pr-4">
              <div className="text-[9px] uppercase font-black text-mocha-overlay1 tracking-[0.3em] mb-1">Today's Protocol</div>
              <div className="text-sm font-bold text-mocha-text">{daily.question.title}</div>
            </div>
            <ExternalLink className="w-4 h-4 text-mocha-overlay1 group-hover:text-mocha-blue transition-colors" />
          </motion.a>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass rounded-[2.5rem] p-10 flex flex-col items-center text-center border-mocha-blue/5 h-full"
        >
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-mocha-blue/20 blur-[40px] rounded-full group-hover:bg-mocha-blue/30 transition-colors"></div>
            <img 
              src={stats.profile.userAvatar} 
              alt={stats.username} 
              className="relative w-36 h-36 rounded-full border-[6px] border-mocha-crust shadow-2xl transition-transform group-hover:scale-105"
            />
            <div className="absolute -bottom-2 -right-2 bg-mocha-blue p-3 rounded-full border-4 border-mocha-crust shadow-lg group-hover:rotate-12 transition-transform">
              <Award className="w-6 h-6 text-mocha-base" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-2 text-mocha-text">{stats.profile.realName}</h3>
          <p className="text-mocha-overlay1 font-mono text-[11px] mb-10 tracking-[0.2em] uppercase font-bold flex items-center">
            <Github className="w-3.5 h-3.5 mr-2.5 text-mocha-blue" /> @iustus
          </p>
          
          <div className="grid grid-cols-2 gap-4 w-full mt-auto">
            <div className="bg-mocha-crust/40 rounded-[1.5rem] p-6 border border-mocha-surface0">
              <div className="text-2xl font-black text-mocha-text mb-1 tracking-tighter">#{Math.floor(stats.profile.ranking / 1000)}K</div>
              <div className="text-[9px] uppercase tracking-widest text-mocha-overlay1 font-black opacity-60">Global Rank</div>
            </div>
            <div className="bg-mocha-crust/40 rounded-[1.5rem] p-6 border border-mocha-surface0">
              <div className="text-2xl font-black text-mocha-text mb-1 tracking-tighter">{stats.profile.solutionCount}</div>
              <div className="text-[9px] uppercase tracking-widest text-mocha-overlay1 font-black opacity-60">Solutions</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass rounded-[2.5rem] p-10 border-mocha-green/5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <Target className="w-6 h-6 text-mocha-green mr-4" />
              <h3 className="text-2xl font-bold text-mocha-text tracking-tight">Algorithmic Distribution</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center flex-1">
            <div className="h-72 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={80}
                    outerRadius={105}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#181825', border: '1px solid #313244', borderRadius: '20px', fontSize: '12px' }}
                    itemStyle={{ color: '#cdd6f4' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl font-black text-mocha-text tracking-tighter">{acStats[0].count}</span>
                <span className="text-[10px] text-mocha-overlay1 uppercase font-black tracking-[0.3em] mt-2">Accepted</span>
              </div>
            </div>

            <div className="space-y-8">
              {pieData.map((d) => (
                <div key={d.name} className="group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-4 shadow-[0_0_10px_rgba(0,0,0,0.3)]" style={{ backgroundColor: d.color }}></div>
                      <span className="text-mocha-subtext0 text-sm font-bold uppercase tracking-wider">{d.name}</span>
                    </div>
                    <span className="font-mono text-mocha-text text-sm font-black">{d.value}</span>
                  </div>
                  <div className="w-full bg-mocha-crust/50 h-3 rounded-full overflow-hidden border border-mocha-surface0 p-0.5">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 glass rounded-[2.5rem] p-12 border-mocha-blue/5"
        >
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center">
              <Code2 className="w-7 h-7 text-mocha-blue mr-4" />
              <h3 className="text-2xl font-bold text-mocha-text">Stack Composition</h3>
            </div>
            <div className="text-[10px] font-mono text-mocha-overlay1 bg-mocha-crust px-5 py-2 rounded-full border border-mocha-surface0 uppercase tracking-[0.3em] font-black">
                Systems Oriented
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {LANGUAGE_STATS.map((lang) => (
              <div key={lang.name} className="bg-mocha-crust/30 border border-mocha-surface0 p-8 rounded-[2rem] hover:border-mocha-blue/40 hover:bg-mocha-crust/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-mocha-blue/5 rounded-full -mr-8 -mt-8 group-hover:bg-mocha-blue/10 transition-colors"></div>
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-2.5 h-2.5 rounded-full mr-3 shadow-sm" style={{ backgroundColor: lang.color }}></div>
                  <span className="text-[10px] font-mono text-mocha-overlay1 uppercase tracking-widest font-black group-hover:text-mocha-blue transition-colors">{lang.name}</span>
                </div>
                <div className="text-3xl font-black text-mocha-text tracking-tighter relative z-10">{lang.percent}%</div>
              </div>
            ))}
          </div>

          <div className="h-8 w-full flex rounded-[1rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-mocha-surface0 bg-mocha-crust p-1.5">
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