import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import TabNavigation from './components/TabNavigation';
import HistoryTimeline from './components/HistoryTimeline';
import MembersGrid from './components/MembersGrid';
import PartnersSection from './components/PartnersSection';

const AlverseSection = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'members', label: 'Members', icon: 'Users' },
    { id: 'partners', label: 'Partners & Mentors', icon: 'Handshake' }
  ];

  useEffect(() => {
    // Simulate loading time for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Smooth scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="spinner w-12 h-12 mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading content...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'history':
        return <HistoryTimeline />;
      case 'members':
        return <MembersGrid />;
      case 'partners':
        return <PartnersSection />;
      default:
        return <HistoryTimeline />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Alverse Section - AIverse Frontend</title>
        <meta name="description" content="Explore the AIverse community through our comprehensive sections featuring history, members, and industry partners. Discover our journey, meet our team, and learn about our collaborations." />
        <meta name="keywords" content="AIverse, community, history, members, partners, mentors, AI education, collaboration" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="gradient-mesh absolute inset-0"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse-glow"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse-glow delay-300"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse-glow delay-500"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Users" size={16} />
                <span>Community Hub</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gradient-primary mb-6">
                Welcome to
                <span className="block text-gradient-accent">AIverse Community</span>
              </h1>
              
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
                Discover our rich history, meet our passionate community members, and explore our partnerships 
                with industry leaders and academic institutions that make AIverse a thriving ecosystem for AI innovation.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">5+</div>
                  <div className="text-text-secondary text-sm">Years Strong</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">1000+</div>
                  <div className="text-text-secondary text-sm">Active Members</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-accent mb-1">50+</div>
                  <div className="text-text-secondary text-sm">Industry Partners</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-success mb-1">25+</div>
                  <div className="text-text-secondary text-sm">Expert Mentors</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="relative py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TabNavigation 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              tabs={tabs} 
            />
          </div>
        </section>

        {/* Tab Content */}
        <section className="relative py-8 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="transition-all duration-500 ease-in-out">
              {renderTabContent()}
            </div>
          </div>
        </section>

        {/* Community CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass rounded-2xl p-12">
              <Icon name="Heart" size={48} className="text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gradient-primary mb-6">
                Join Our Growing Community
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
                Be part of a vibrant ecosystem where innovation meets collaboration. 
                Connect with like-minded individuals, learn from industry experts, and shape the future of AI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-600 transition-all duration-300 btn-hover-lift">
                  <Icon name="UserPlus" size={20} />
                  <span className="font-semibold">Become a Member</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-8 py-4 glass text-text-primary rounded-xl hover:bg-surface/50 transition-all duration-300 btn-hover-lift">
                  <Icon name="MessageCircle" size={20} />
                  <span className="font-semibold">Get in Touch</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-surface/30 border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Icon name="Zap" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gradient-primary">AIverse</h3>
                    <p className="text-xs text-text-secondary">Frontend Community</p>
                  </div>
                </div>
                <p className="text-text-secondary mb-4 max-w-md">
                  Empowering the next generation of AI innovators through education, collaboration, and community building.
                </p>
                <div className="flex space-x-4">
                  <button className="p-2 glass rounded-lg hover:bg-surface/50 transition-colors">
                    <Icon name="Github" size={20} className="text-text-secondary" />
                  </button>
                  <button className="p-2 glass rounded-lg hover:bg-surface/50 transition-colors">
                    <Icon name="Twitter" size={20} className="text-text-secondary" />
                  </button>
                  <button className="p-2 glass rounded-lg hover:bg-surface/50 transition-colors">
                    <Icon name="Linkedin" size={20} className="text-text-secondary" />
                  </button>
                  <button className="p-2 glass rounded-lg hover:bg-surface/50 transition-colors">
                    <Icon name="Mail" size={20} className="text-text-secondary" />
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary mb-4">Community</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Members</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Events</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Challenges</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Leaderboard</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Articles</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Tutorials</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Research</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Documentation</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center">
              <p className="text-text-secondary">
                © {new Date()?.getFullYear()} AIverse Frontend. All rights reserved. Built with ❤️ for the AI community.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AlverseSection;