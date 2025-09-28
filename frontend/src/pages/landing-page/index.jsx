import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ArticlePreviewSection from './components/ArticlePreviewSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';

const LandingPage = () => {
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const target = e?.target?.getAttribute('href');
      if (target && target?.startsWith('#')) {
        e?.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links?.forEach(link => {
      link?.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup
    return () => {
      links?.forEach(link => {
        link?.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Features Section */}
        <section id="features">
          <FeaturesSection />
        </section>

        {/* Article Preview Section */}
        <section id="articles">
          <ArticlePreviewSection />
        </section>

        {/* Stats Section */}
        <section id="stats">
          <StatsSection />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-background-secondary border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gradient-primary">AIverse</h3>
                  <p className="text-text-secondary text-sm">Frontend</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Empowering the next generation of AI innovators through community-driven learning and competition.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/events-page" className="text-text-secondary hover:text-primary transition-colors">Events</a></li>
                <li><a href="/student-leaderboard" className="text-text-secondary hover:text-primary transition-colors">Leaderboard</a></li>
                <li><a href="/weekly-challenges-page" className="text-text-secondary hover:text-primary transition-colors">Challenges</a></li>
                <li><a href="/articles-technical-news-feed" className="text-text-secondary hover:text-primary transition-colors">Articles</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Community</h4>
              <ul className="space-y-2">
                <li><a href="/alverse-section" className="text-text-secondary hover:text-primary transition-colors">AIverse</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">LinkedIn</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="mailto:hello@aiverse.com" className="text-text-secondary hover:text-primary transition-colors">hello@aiverse.com</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm">
              © {new Date()?.getFullYear()} AIverse Frontend. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;