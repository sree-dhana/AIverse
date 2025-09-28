
import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats, period }) => {
  const statCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents,
      change: stats?.studentGrowth,
      icon: 'Users',
      color: 'primary',
      description: 'Active participants'
    },
    {
      title: 'Challenges Completed',
      value: stats?.challengesCompleted,
      change: stats?.challengeGrowth,
      icon: 'Code',
      color: 'accent',
      description: 'This ' + period?.slice(0, -2)
    },
    {
      title: 'Average Points',
      value: Math.round(stats?.averagePoints),
      change: stats?.pointsGrowth,
      icon: 'TrendingUp',
      color: 'success',
      description: 'Per student'
    },
    {
      title: 'Events Attended',
      value: stats?.eventsAttended,
      change: stats?.eventGrowth,
      icon: 'Calendar',
      color: 'secondary',
      description: 'Total participation'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'from-primary/20 to-primary/5',
        icon: 'bg-primary text-white',
        text: 'text-primary'
      },
      accent: {
        bg: 'from-accent/20 to-accent/5',
        icon: 'bg-accent text-white',
        text: 'text-accent'
      },
      success: {
        bg: 'from-success/20 to-success/5',
        icon: 'bg-success text-white',
        text: 'text-success'
      },
      secondary: {
        bg: 'from-secondary/20 to-secondary/5',
        icon: 'bg-secondary text-white',
        text: 'text-secondary'
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const formatValue = (value) => {
    if (value >= 1000000) {
      return (value / 1000000)?.toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000)?.toFixed(1) + 'K';
    }
    return value?.toLocaleString();
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-text-secondary';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards?.map((stat, index) => {
        const colors = getColorClasses(stat?.color);
        
        return (
          <motion.div
            key={stat?.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`glass rounded-xl p-6 bg-gradient-to-br ${colors?.bg} border border-border hover:shadow-elevated transition-all duration-300 group`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${colors?.icon} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <div className={`flex items-center space-x-1 ${getChangeColor(stat?.change)}`}>
                <Icon name={getChangeIcon(stat?.change)} size={16} />
                <span className="text-sm font-medium">
                  {stat?.change > 0 ? '+' : ''}{stat?.change}%
                </span>
              </div>
            </div>
            {/* Value */}
            <div className="mb-2">
              <div className={`text-3xl font-bold ${colors?.text} mb-1`}>
                {formatValue(stat?.value)}
              </div>
              <div className="text-text-secondary text-sm font-medium">
                {stat?.title}
              </div>
            </div>
            {/* Description */}
            <div className="text-text-muted text-xs">
              {stat?.description}
            </div>
            {/* Progress Bar (for visual appeal) */}
            <div className="mt-4 h-1 bg-surface/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (stat?.value / 1000) * 100)}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className={`h-full bg-gradient-to-r ${colors?.bg?.replace('/20', '')?.replace('/5', '')}`}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsOverview;