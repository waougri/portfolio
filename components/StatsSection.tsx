import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Zap, Award, Code2, Github, ExternalLink, Activity, Trophy, GitBranch, Star, TrendingUp } from 'lucide-react';
import { LeetCodeStats, LeetCodeDaily, GitHubRepo } from '../types.ts';

// Catppuccin Palette for Charts
const COLORS = {
  easy: '#a6e3a1',    // Green
  medium: '#fab387',  // Peach
  hard: '#f38ba8',    // Red
  languages: [
    '#89b4fa', // Blue
    '#cba6f7', // Mauve
    '#f5c2e7', // Pink
    '#94e2d5', // Teal
    '#f9e2af', // Yellow
    '#eba0ac', // Maroon
  ]
};

const GITHUB_USERNAME = 'waougri';
const LEETCODE_USERNAME = 'iustus';

export const StatsSection: React.FC = () => {
  const [lcStats, setLcStats] = useState<LeetCodeStats | null>(null);
  const [lcDaily, setLcDaily] = useState<LeetCodeDaily | null>(null);
  const [ghStats, setGhStats] = useState<{languages: {name: string, count: number}[], totalStars: number, totalRepos: number} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch LeetCode Data
        const [lcDataRes, lcDailyRes] = await Promise.all([
          fetch(`https://leetcode-api-pied.vercel.app/user/${LEETCODE_USERNAME}`),
          fetch('https://leetcode-api-pied.vercel.app/daily')
        ]);
        const lcData = await lcDataRes.json();
        const dailyData = await lcDailyRes.json();
        setLcStats(lcData);
        setLcDaily(dailyData);

        // 2. Fetch GitHub Data (Repo languages)
        const ghRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        const repos: GitHubRepo[] = await ghRes.json();
        
        // Process GitHub Languages
        const langMap: Record<string, number> = {};
        let stars = 0;
        repos.forEach(repo => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
          stars += repo.stargazers_count;
        });

        // Convert to array and sort
        const langArray = Object.entries(langMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6); // Top 6 languages

        setGhStats({
          languages: langArray,
          totalStars: stars,
          totalRepos: repos.length
        });

      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-ctp-surface0 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-ctp-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-sm font-mono text-ctp-overlay1 uppercase tracking-widest animate-pulse">Synchronizing Telemetry...</div>
      </div>
    );
  }

  if (!lcStats || !ghStats) return null;

  // Prepare LeetCode Pie Data
  const acStats = lcStats.submitStats.acSubmissionNum;
  const totalSolved = acStats[0].count;
  const pieData = [
    { name: 'Easy', value: acStats.find(s => s.difficulty === 'Easy')?.count || 0, color: COLORS.easy },
    { name: 'Medium', value: acStats.find(s => s.difficulty === 'Medium')?.count || 0, color: COLORS.medium },
    { name: 'Hard', value: acStats.find(s => s.difficulty === 'Hard')?.count || 0, color: COLORS.hard },
  ];

  return (
    <section id="stats" className="py-24 container mx-auto px-6 relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-ctp-blue/5 rounded-full blur-[120px] -z-10" />
      
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-4 text-ctp-text">
          <span className="text-ctp-blue font-mono text-2xl">02.</span> 
          <span>Live Metrics</span>
        </h2>
        <p className="text-ctp-subtext0 max-w-xl text-lg">
          Real-time data streams from my development activity. 
          <span className="text-ctp-mauve"> Building</span> on GitHub vs. 
          <span className="text-ctp-green"> Solving</span> on LeetCode.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* Large Card: GitHub Tech Stack (Bar Chart) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-6 lg:col-span-2 lg:row-span-2 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-ctp-base rounded-xl border border-ctp-surface0">
                <Github className="w-6 h-6 text-ctp-mauve" />
              </div>
              <div>
                <h3 className="font-bold text-ctp-text text-lg">Engineering Stack</h3>
                <p className="text-xs text-ctp-subtext0 font-mono uppercase tracking-wider">
                  Based on <span className="text-ctp-blue font-bold">{ghStats.totalRepos}</span> Public Repos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-ctp-yellow/10 rounded-full border border-ctp-yellow/20">
              <Star className="w-3.5 h-3.5 text-ctp-yellow fill-ctp-yellow" />
              <span className="text-xs font-bold text-ctp-yellow">{ghStats.totalStars} Stars</span>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ghStats.languages} layout="vertical" margin={{ left: 10, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: '#cdd6f4', fontSize: 12, fontFamily: 'JetBrains Mono' }} 
                  width={90}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#313244', opacity: 0.4 }}
                  contentStyle={{ 
                    backgroundColor: '#181825', 
                    border: '1px solid #45475a', 
                    borderRadius: '8px',
                    color: '#cdd6f4'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  barSize={24}
                  radius={[0, 4, 4, 0]}
                >
                  {ghStats.languages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.languages[index % COLORS.languages.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs text-ctp-overlay1 text-center font-mono">
            * Data fetched dynamically from GitHub API
          </div>
        </motion.div>

        {/* Medium Card: LeetCode Donut */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-6 lg:col-span-2 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-ctp-green/10 rounded-full blur-[60px]" />

          <div className="flex-1 space-y-4 z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-ctp-base rounded-xl border border-ctp-surface0">
                <Code2 className="w-6 h-6 text-ctp-green" />
              </div>
              <div>
                <h3 className="font-bold text-ctp-text text-lg">Problem Solving</h3>
                <div className="flex items-center gap-2 text-xs text-ctp-overlay1 font-mono uppercase tracking-wider">
                  <span>@{lcStats.username}</span>
                  <span className="w-1 h-1 bg-ctp-surface1 rounded-full" />
                  <span>Rank {Math.floor(lcStats.profile.ranking / 1000)}k</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-ctp-overlay1 mb-1">{d.name}</span>
                  <div className="text-xl font-bold font-mono" style={{ color: d.color }}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[160px] h-[160px] relative z-10 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-ctp-text font-mono">{totalSolved}</span>
              <span className="text-[9px] uppercase tracking-widest text-ctp-overlay1">Solved</span>
            </div>
          </div>
        </motion.div>

        {/* Small Card: Daily Challenge */}
        {lcDaily && (
          <motion.a
            href={lcDaily.link}
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-6 group hover:border-ctp-blue/30 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ctp-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2 bg-ctp-blue/10 rounded-lg text-ctp-blue">
                <Zap className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-ctp-overlay1 group-hover:text-ctp-blue transition-colors" />
            </div>
            
            <div className="relative z-10">
              <div className="text-xs font-bold text-ctp-blue uppercase tracking-widest mb-2">Daily Quest</div>
              <h4 className="text-sm font-semibold text-ctp-text line-clamp-2 mb-1 group-hover:text-ctp-blue transition-colors">
                {lcDaily.question.title}
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                lcDaily.question.difficulty === 'Easy' ? 'border-ctp-green text-ctp-green' :
                lcDaily.question.difficulty === 'Medium' ? 'border-ctp-peach text-ctp-peach' :
                'border-ctp-red text-ctp-red'
              }`}>
                {lcDaily.question.difficulty}
              </span>
            </div>
          </motion.a>
        )}

        {/* Small Card: Profile / Social */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           viewport={{ once: true }}
           className="glass-panel rounded-3xl p-6 flex flex-col justify-between"
        >
          <div className="flex items-center gap-4">
             <img 
               src={lcStats.profile.userAvatar} 
               alt="Avatar" 
               className="w-12 h-12 rounded-full border-2 border-ctp-surface1"
             />
             <div>
               <div className="font-bold text-ctp-text">{lcStats.profile.realName}</div>
               <div className="text-xs text-ctp-overlay1 flex items-center gap-1">
                 <Trophy className="w-3 h-3 text-ctp-yellow" />
                 Top {((lcStats.profile.ranking / 5000000) * 100).toFixed(2)}%
               </div>
             </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <div className="h-1 flex-1 bg-ctp-surface0 rounded-full overflow-hidden">
               <div className="h-full bg-ctp-green w-[70%]" />
            </div>
            <div className="h-1 flex-1 bg-ctp-surface0 rounded-full overflow-hidden">
               <div className="h-full bg-ctp-blue w-[40%]" />
            </div>
          </div>
          <div className="mt-2 text-[10px] text-ctp-overlay1 text-right">
             Consistency Score: 92%
          </div>
        </motion.div>

      </div>
    </section>
  );
};