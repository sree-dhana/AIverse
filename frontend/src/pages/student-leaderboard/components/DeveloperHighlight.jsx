import React from 'react';
import { motion } from 'framer-motion';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DeveloperHighlight = ({ developer, type, rank }) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'month':
        return {
          title: 'Developer of the Month',
          icon: 'Calendar',
          gradient: 'from-accent to-primary',
          bgGradient: 'from-accent/20 to-primary/20',
          period: 'September 2025'
        };
      case 'year':
        return {
          title: 'Developer of the Year',
          icon: 'Trophy',
          gradient: 'from-warning to-error',
          bgGradient: 'from-warning/20 to-error/20',
          period: '2025'
        };
      default:
        return {
          title: 'Top Developer',
          icon: 'Award',
          gradient: 'from-primary to-secondary',
          bgGradient: 'from-primary/20 to-secondary/20',
          period: 'Current'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: rank * 0.1 }}
      className={`relative glass rounded-2xl p-6 bg-gradient-to-br ${config?.bgGradient} border border-border hover:shadow-elevated transition-all duration-300`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
      </div>
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${config?.gradient} shadow-glow-primary`}>
            <Icon name={config?.icon} size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-lg">{config?.title}</h3>
            <p className="text-text-secondary text-sm">{config?.period}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${config?.gradient} text-white text-sm font-semibold`}>
            #{rank}
          </div>
        </div>
      </div>
      {/* Developer Info */}
      <div className="relative z-10 flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
            <Image
              src={developer?.avatar}
              alt={developer?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
            <Icon name="Check" size={12} className="text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-text-primary text-xl">{developer?.name}</h4>
          <p className="text-text-secondary">{developer?.collegeId}</p>
          <p className="text-text-secondary text-sm">{developer?.college}</p>
        </div>
      </div>
      {/* Stats */}
      <div className="relative z-10 grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className={`text-2xl font-bold text-gradient-primary`}>
            {developer?.totalPoints?.toLocaleString()}
          </div>
          <div className="text-text-secondary text-sm">Total Points</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {developer?.challengesCompleted}
          </div>
          <div className="text-text-secondary text-sm">Challenges</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">
            {developer?.streak}
          </div>
          <div className="text-text-secondary text-sm">Day Streak</div>
        </div>
      </div>
      {/* Achievements */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-6">
        {developer?.achievements?.slice(0, 3)?.map((achievement, index) => (
          <div
            key={index}
            className="flex items-center space-x-1 px-3 py-1 bg-surface/50 rounded-full border border-border"
          >
            <Icon name="Award" size={14} className="text-accent" />
            <span className="text-text-secondary text-xs">{achievement}</span>
          </div>
        ))}
        {developer?.achievements?.length > 3 && (
          <div className="px-3 py-1 bg-surface/50 rounded-full border border-border">
            <span className="text-text-secondary text-xs">
              +{developer?.achievements?.length - 3} more
            </span>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="relative z-10 flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          className="flex-1"
        >
          Certificate
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          className="flex-1"
        >
          Profile
        </Button>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 opacity-10">
        <Icon name="Sparkles" size={32} className="text-primary" />
      </div>
    </motion.div>
  );
};

export default DeveloperHighlight;