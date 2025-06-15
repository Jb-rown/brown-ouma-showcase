
import React, { useState, useEffect } from 'react';
import { Users, Eye, Globe, TrendingUp, Clock, MapPin } from 'lucide-react';

const LiveAnalytics = () => {
  const [visitors, setVisitors] = useState(247);
  const [pageViews, setPageViews] = useState(1834);
  const [onlineNow, setOnlineNow] = useState(12);
  const [todayVisits, setTodayVisits] = useState(89);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly update visitor count
      if (Math.random() > 0.7) {
        setVisitors(prev => prev + Math.floor(Math.random() * 3) + 1);
        setPageViews(prev => prev + Math.floor(Math.random() * 5) + 1);
      }
      
      // Update online users (fluctuate between 8-20)
      if (Math.random() > 0.8) {
        setOnlineNow(prev => Math.max(8, Math.min(20, prev + (Math.random() > 0.5 ? 1 : -1))));
      }

      // Update today's visits
      if (Math.random() > 0.9) {
        setTodayVisits(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Users,
      label: 'Total Visitors',
      value: visitors.toLocaleString(),
      change: '+12%',
      color: 'text-emerald-400'
    },
    {
      icon: Eye,
      label: 'Page Views',
      value: pageViews.toLocaleString(),
      change: '+8%',
      color: 'text-blue-400'
    },
    {
      icon: Globe,
      label: 'Online Now',
      value: onlineNow.toString(),
      change: 'Live',
      color: 'text-green-400'
    },
    {
      icon: TrendingUp,
      label: 'Today\'s Visits',
      value: todayVisits.toString(),
      change: '+5%',
      color: 'text-purple-400'
    }
  ];

  const recentActivity = [
    { country: 'United States', time: '2 min ago', flag: '🇺🇸' },
    { country: 'Kenya', time: '5 min ago', flag: '🇰🇪' },
    { country: 'Canada', time: '8 min ago', flag: '🇨🇦' },
    { country: 'United Kingdom', time: '12 min ago', flag: '🇬🇧' },
    { country: 'Germany', time: '15 min ago', flag: '🇩🇪' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-lg p-4 w-80 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-semibold text-white">Live Analytics</h3>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Clock className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-slate-400">{stat.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">{stat.value}</span>
                <span className={`text-xs ${stat.color}`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="border-t border-slate-700 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">Recent Visitors</span>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span>{activity.flag}</span>
                  <span className="text-slate-300">{activity.country}</span>
                </div>
                <span className="text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Minimize/Expand toggle */}
        <div className="flex justify-center mt-3 pt-2 border-t border-slate-700">
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalytics;
