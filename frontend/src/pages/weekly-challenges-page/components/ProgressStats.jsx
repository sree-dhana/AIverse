import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressStats = ({ stats, weeklyProgress }) => {
  const progressPercentage = stats?.total > 0 ? (stats?.completed / stats?.total) * 100 : 0;

  const statCards = [
    {
      title: 'Total Challenges',
      value: stats?.total,
      icon: 'Target',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      title: 'Completed',
      value: stats?.completed,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      title: 'In Progress',
      value: stats?.pending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    {
      title: 'Total Points',
      value: stats?.totalPoints,
      icon: 'Award',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    }
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div
            key={index}
            className={`glass-card ${stat?.bgColor} ${stat?.borderColor} border transition-all duration-300 hover:transform hover:-translate-y-1`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div>
                <p className="text-text-secondary text-sm">{stat?.title}</p>
                <p className={`text-2xl font-bold ${stat?.color}`}>{stat?.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Progress Overview */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} />
            <span>Progress Overview</span>
          </h3>
          <span className="text-sm text-text-secondary">
            {progressPercentage?.toFixed(1)}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-surface/50 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out animate-progress"
              style={{ '--progress-width': `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-text-secondary">
            <span>0</span>
            <span>{stats?.completed} / {stats?.total} challenges</span>
            <span>{stats?.total}</span>
          </div>
        </div>

        {/* Weekly Progress */}
        <div>
          <h4 className="font-medium text-text-primary mb-3">This Week's Activity</h4>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress?.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-text-secondary mb-1">{day?.day}</div>
                <div
                  className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                    day?.completed > 0
                      ? 'bg-success/20 text-success border border-success/30' :'bg-surface/30 text-text-muted border border-border'
                  }`}
                >
                  {day?.completed}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-text-primary mb-3">Recent Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {stats?.completed >= 5 && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full border border-success/20">
                <Icon name="Award" size={14} />
                <span className="text-sm font-medium">Problem Solver</span>
              </div>
            )}
            {stats?.completed >= 10 && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                <Icon name="Target" size={14} />
                <span className="text-sm font-medium">Dedicated Learner</span>
              </div>
            )}
            {stats?.completed >= 20 && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/20">
                <Icon name="Zap" size={14} />
                <span className="text-sm font-medium">Challenge Master</span>
              </div>
            )}
            {progressPercentage >= 50 && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 text-warning rounded-full border border-warning/20">
                <Icon name="TrendingUp" size={14} />
                <span className="text-sm font-medium">Half Way There</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;