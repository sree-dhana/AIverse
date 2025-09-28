import React from 'react';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      icon: "Calendar",
      title: "AI Events & Workshops",
      description: "Join exclusive AI events, workshops, and seminars led by industry experts and researchers.",
      stats: "150+ Events",
      color: "from-primary to-primary-600",
      route: "/events-page"
    },
    {
      id: 2,
      icon: "Trophy",
      title: "Competitive Leaderboard",
      description: "Track your progress and compete with peers through our comprehensive ranking system.",
      stats: "2,500+ Students",
      color: "from-accent to-accent-600",
      route: "/student-leaderboard"
    },
    {
      id: 3,
      icon: "Zap",
      title: "Weekly Challenges",
      description: "Solve coding challenges and improve your AI/ML skills with our curated problem sets.",
      stats: "50+ Challenges",
      color: "from-secondary to-secondary-600",
      route: "/weekly-challenges-page"
    },
    {
      id: 4,
      icon: "Users",
      title: "AIverse Community",
      description: "Connect with like-minded AI enthusiasts, mentors, and industry professionals.",
      stats: "Active Network",
      color: "from-success to-success-600",
      route: "/alverse-section"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background-tertiary to-background">
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
              Why Choose <span className="text-gradient-primary">AIverse?</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Everything you need to excel in your AI journey, all in one comprehensive platform
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features?.map((feature) => (
              <motion.div
                key={feature?.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="glass-card group cursor-pointer"
                onClick={() => navigate(feature?.route)}
              >
                {/* Feature Icon */}
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className={`w-16 h-16 bg-gradient-to-br ${feature?.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-glow-primary`}
                >
                  <Icon name={feature?.icon} size={28} className="text-white" />
                </motion.div>

                {/* Feature Content */}
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                    {feature?.title}
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {feature?.description}
                  </p>

                  {/* Stats Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-surface/50 rounded-full border border-border">
                    <span className="text-sm font-medium text-primary">{feature?.stats}</span>
                  </div>

                  {/* Hover Arrow */}
                  <div className="flex items-center justify-center pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="ArrowRight" size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call-to-Action */}
          <motion.div variants={cardVariants} className="text-center">
            <div className="glass-card max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    Ready to Start Your AI Journey?
                  </h3>
                  <p className="text-text-secondary">
                    Join thousands of students already advancing their AI skills
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="UserPlus"
                    iconPosition="left"
                    className="btn-hover-lift"
                  >
                    Join Community
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Play"
                    iconPosition="left"
                    className="btn-hover-lift"
                  >
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;