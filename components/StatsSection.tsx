
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Target, TrendingUp, Award, Code2, Github, Zap, Brain, ChevronRight } from 'lucide-react';
import { LeetCodeStats, LeetCodeDaily } from '../types';
import { LANGUAGE_STATS } from '../constants';

interface StatsSectionProps {
  fullView?: boolean;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ fullView }) => {
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
      <div className="py-20 flex justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stats) return null;

  const acStats = stats.submitStats.acSubmissionNum;
  const pieData = [
    { name: 'Easy', value: acStats.find(s => s.difficulty === 'Easy')?.count || 0, color: '#10b981' },
    { name: 'Medium', value: acStats.find(s => s.difficulty === 'Medium')?.count || 0, color: '#f59e0b' },
    { name: 'Hard', value: acStats.find(s => s.difficulty === 'Hard')?.count || 0, color: '#ef4444' },
  ];

  const barData = acStats.filter(s => s.difficulty !== 'All').map(s => ({
    name: s.difficulty,
    count: s.count,
    submissions: s.submissions
  }));

  return (
    <section className={`py-12 ${fullView ? 'min-h-[80vh]' : ''}`}>
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Technical Vitals</h2>
          <p className="text-gray-400">Live signals from LeetCode and the GitHub ecosystem.</p>
        </div>
        {daily && !fullView && (
          <motion.a
            href={daily.link}
            target="_blank"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex items-center glass p-3 rounded-2xl border-blue-500/20 group hover:border-blue-500/50 transition-all"
          >
            <div className="bg-blue-600 p-2 rounded-xl mr-3 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Today's Daily</div>
              <div className="text-xs font-bold text-white max-w-[150px] truncate">{daily.question.title}</div>
            </div>
          </motion.a>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 flex flex-col items-center text-center h-fit border-blue-500/10"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
            <img 
              src={stats.profile.userAvatar} 
              alt={stats.username} 
              className="relative w-28 h-28 rounded-full border-4 border-gray-800 shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-full border-4 border-gray-950">
              <Award className="w-5 h-5 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats.profile.realName}</h3>
          <p className="text-gray-500 font-mono text-sm mb-8 flex items-center">
            <Github className="w-3 h-3 mr-2" /> iustus
          </p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-gray-950/50 rounded-2xl p-4 border border-gray-800">
              <div className="text-xl font-bold text-white mb-1">#{stats.profile.ranking.toLocaleString()}</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">World Rank</div>
            </div>
            <div className="bg-gray-950/50 rounded-2xl p-4 border border-gray-800">
              <div className="text-xl font-bold text-white mb-1">{stats.profile.solutionCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Authored</div>
            </div>
          </div>
        </motion.div>

        {/* LeetCode Mastery Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 glass rounded-3xl p-8 border-emerald-500/10"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Target className="w-5 h-5 text-emerald-500 mr-2" />
              <h3 className="font-bold">Algorithmic Distribution</h3>
            </div>
            <div className="text-xs font-mono text-gray-500 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
              SOLVED <span className="text-white font-bold ml-1">{acStats[0].count}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-extrabold text-white">{Math.round((acStats[0].count / 2500) * 100)}%</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Capacity</span>
              </div>
            </div>

            <div className="space-y-5">
              {pieData.map((d) => (
                <div key={d.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: d.color }}></div>
                      <span className="text-gray-400 text-sm font-medium">{d.name}</span>
                    </div>
                    <span className="font-mono text-white text-sm font-bold">{d.value}</span>
                  </div>
                  <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden border border-gray-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(d.value / acStats[0].count) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* GitHub Language Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="md:col-span-3 glass rounded-3xl p-8 border-blue-500/10"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Code2 className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="font-bold">Language Breakdown</h3>
            </div>
            <div className="flex space-x-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 uppercase">Systems Centric</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            {LANGUAGE_STATS.map((lang) => (
              <div key={lang.name} className="flex-1 min-w-[120px] bg-gray-950/30 border border-gray-800 p-4 rounded-2xl hover:border-blue-500/30 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: lang.color }}></div>
                  <span className="text-xs font-mono text-gray-400">{lang.name}</span>
                </div>
                <div className="text-xl font-bold text-white">{lang.percent}%</div>
              </div>
            ))}
          </div>

          <div className="h-5 w-full flex rounded-full overflow-hidden shadow-2xl border border-gray-800">
            {LANGUAGE_STATS.map((lang, idx) => (
              <motion.div
                key={idx}
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percent}%` }}
                transition={{ duration: 1.5, delay: idx * 0.1 }}
                style={{ backgroundColor: lang.color }}
                className="h-full relative group"
              >
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-900 text-[10px] px-2 py-1 rounded border border-gray-700 pointer-events-none z-10">
                  {lang.name}: {lang.percent}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily Challenge Card for Full View */}
        {fullView && daily && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-3 glass rounded-3xl p-8 border-blue-500/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 mr-6">
                  <Brain className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Today's Algorithm Challenge</h3>
                  <p className="text-gray-400 text-sm">Challenge yourself with the daily problem on LeetCode.</p>
                </div>
              </div>
              <a 
                href={daily.link} 
                target="_blank" 
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 group"
              >
                {daily.question.title}
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                daily.question.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                daily.question.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}>
                {daily.question.difficulty}
              </span>
              <span className="text-gray-500 text-xs font-mono">PROBLEM ID: {daily.question.questionId}</span>
            </div>
          </motion.div>
        )}

        {/* Efficiency Chart */}
        {fullView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-3 glass rounded-3xl p-8 border-gray-800"
          >
             <div className="flex items-center mb-10">
              <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="font-bold">Algorithmic Efficiency Breakdown</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}
                  />
                  <Bar dataKey="submissions" fill="rgba(59, 130, 246, 0.15)" radius={[6, 6, 0, 0]} barSize={40} name="Total Submissions" />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} name="Accepted" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
