import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Computer Science Student",
      college: "IIT Delhi",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "AIverse has completely transformed my learning journey. The weekly challenges pushed me to think beyond textbooks, and the community support is incredible. I landed my dream internship at Google thanks to the skills I developed here!",
      rating: 5,
      achievement: "Google Intern 2025"
    },
    {
      id: 2,
      name: "Arjun Patel",
      role: "AI Research Enthusiast",
      college: "MIT",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The technical articles and expert-led workshops on AIverse are top-notch. I've published two research papers using concepts I learned from this platform. The leaderboard system keeps me motivated to continuously improve.",
      rating: 5,
      achievement: "Published Researcher"
    },
    {
      id: 3,
      name: "Sarah Chen",
      role: "Machine Learning Engineer",
      college: "Stanford University",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "From a beginner to landing a role at OpenAI, AIverse was my constant companion. The structured learning path, real-world projects, and mentorship opportunities are unmatched. Highly recommend to anyone serious about AI!",
      rating: 5,
      achievement: "OpenAI Engineer"
    },
    {
      id: 4,
      name: "Rahul Kumar",
      role: "Data Science Student",
      college: "Carnegie Mellon",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The events and hackathons organized through AIverse are phenomenal. I've won three major competitions and built an amazing network of like-minded peers. The platform's emphasis on practical learning is what sets it apart.",
      rating: 5,
      achievement: "3x Hackathon Winner"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  const testimonialVariants = {
    enter: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3 }
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-text-muted"}
      />
    ));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background-secondary">
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
              Student <span className="text-gradient-primary">Success Stories</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Hear from students who transformed their careers with AIverse
            </p>
          </motion.div>

          {/* Main Testimonial */}
          <motion.div variants={cardVariants} className="mb-12">
            <div className="glass-card max-w-4xl mx-auto relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  variants={testimonialVariants}
                  initial={{ opacity: 0, x: 100 }}
                  animate="enter"
                  exit="exit"
                  className="p-8 md:p-12"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Icon name="Quote" size={80} className="text-primary" />
                  </div>

                  <div className="relative z-10">
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-6">
                      {renderStars(testimonials?.[currentTestimonial]?.rating)}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-xl md:text-2xl text-text-primary leading-relaxed mb-8 font-medium">
                      "{testimonials?.[currentTestimonial]?.content}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Image
                          src={testimonials?.[currentTestimonial]?.avatar}
                          alt={testimonials?.[currentTestimonial]?.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                          <Icon name="Check" size={12} className="text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold text-text-primary">
                          {testimonials?.[currentTestimonial]?.name}
                        </h4>
                        <p className="text-text-secondary">
                          {testimonials?.[currentTestimonial]?.role} • {testimonials?.[currentTestimonial]?.college}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Icon name="Award" size={14} className="text-accent" />
                          <span className="text-accent text-sm font-medium">
                            {testimonials?.[currentTestimonial]?.achievement}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="flex justify-center space-x-2 pb-6">
                {testimonials?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-primary scale-125' :'bg-text-muted hover:bg-text-secondary'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Testimonial Grid */}
          <motion.div variants={cardVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials?.map((testimonial, index) => (
                <motion.div
                  key={testimonial?.id}
                  className={`glass-card cursor-pointer transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'ring-2 ring-primary scale-105' :'hover:scale-102'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-text-primary text-sm">
                        {testimonial?.name}
                      </h4>
                      <p className="text-text-secondary text-xs">
                        {testimonial?.college}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(testimonial?.rating)}
                  </div>
                  
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                    {testimonial?.content}
                  </p>
                  
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center space-x-1">
                      <Icon name="Award" size={12} className="text-accent" />
                      <span className="text-accent text-xs font-medium">
                        {testimonial?.achievement}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;