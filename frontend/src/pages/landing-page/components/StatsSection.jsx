import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    students: 0,
    events: 0,
    challenges: 0,
    articles: 0
  });

  const finalStats = {
    students: 2500,
    events: 150,
    challenges: 50,
    articles: 300
  };

  const statsData = [
    {
      key: 'students',
      icon: 'Users',
      label: 'Active Students',
      suffix: '+',
      color: 'from-primary to-primary-600'
    },
    {
      key: 'events',
      icon: 'Calendar',
      label: 'Events Hosted',
      suffix: '+',
      color: 'from-accent to-accent-600'
    },
    {
      key: 'challenges',
      icon: 'Zap',
      label: 'Weekly Challenges',
      suffix: '+',
      color: 'from-secondary to-secondary-600'
    },
    {
      key: 'articles',
      icon: 'BookOpen',
      label: 'Technical Articles',
      suffix: '+',
      color: 'from-success to-success-600'
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalStats)?.map(key => {
      const finalValue = finalStats?.[key];
      const increment = finalValue / steps;
      let currentValue = 0;

      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          currentValue = finalValue;
          clearInterval(intervals?.find(interval => interval === this));
        }
        
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, stepDuration);
    });

    return () => {
      intervals?.forEach(interval => clearInterval(interval));
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-background via-background-secondary to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Growing <span className="text-gradient-accent">Community</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Join a thriving ecosystem of AI enthusiasts making real impact
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData?.map((stat, index) => (
              <motion.div
                key={stat?.key}
                variants={cardVariants}
                className="glass-card text-center group hover:scale-105 transition-transform duration-300"
              >
                {/* Icon */}
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  style={{ animationDelay: `${index * 0.5}s` }}
                  className={`w-16 h-16 bg-gradient-to-br ${stat?.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-glow-primary`}
                >
                  <Icon name={stat?.icon} size={28} className="text-white" />
                </motion.div>

                {/* Counter */}
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-gradient-primary">
                    {counters?.[stat?.key]?.toLocaleString()}{stat?.suffix}
                  </div>
                  <div className="text-text-secondary font-medium">
                    {stat?.label}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 w-full bg-surface/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat?.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(counters?.[stat?.key] / finalStats?.[stat?.key]) * 100}%` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievement Highlights */}
          <motion.div variants={cardVariants} className="mt-16">
            <div className="glass-card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning-600 rounded-xl flex items-center justify-center mx-auto">
                    <Icon name="Award" size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">Top Rated Platform</h3>
                  <p className="text-text-secondary">4.9/5 student satisfaction rating</p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-error to-error-600 rounded-xl flex items-center justify-center mx-auto">
                    <Icon name="TrendingUp" size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">Fastest Growing</h3>
                  <p className="text-text-secondary">200% growth in the last year</p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center mx-auto">
                    <Icon name="Globe" size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">Global Reach</h3>
                  <p className="text-text-secondary">Students from 50+ countries</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;