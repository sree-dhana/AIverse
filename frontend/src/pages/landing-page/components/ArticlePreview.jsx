import React from 'react';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ArticlePreviewSection = () => {
  const navigate = useNavigate();

  const latestArticles = [
    {
      id: 1,
      title: "Advanced Neural Network Architectures: Transformers and Beyond",
      excerpt: "Explore the latest developments in transformer architectures and their applications in natural language processing and computer vision.",
      author: "Dr. Sarah Chen",
      publishedAt: "2025-01-15T10:30:00Z",
      readTime: "8 min read",
      category: "AI Research",
      tags: ["Neural Networks", "Transformers", "Deep Learning"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Building Scalable Machine Learning Pipelines with MLOps",
      excerpt: "Learn how to implement robust MLOps practices for deploying and maintaining machine learning models in production environments.",
      author: "Alex Rodriguez",
      publishedAt: "2025-01-14T14:15:00Z",
      readTime: "12 min read",
      category: "MLOps",
      tags: ["MLOps", "DevOps", "Production"],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Computer Vision in Healthcare: Revolutionary Applications",
      excerpt: "Discover how computer vision is transforming medical diagnosis, treatment planning, and patient care across various healthcare domains.",
      author: "Dr. Michael Park",
      publishedAt: "2025-01-13T09:45:00Z",
      readTime: "10 min read",
      category: "Healthcare AI",
      tags: ["Computer Vision", "Healthcare", "Medical AI"],
      image: "https://images.pixabay.com/photo/2017/10/03/18/55/medical-2815456_1280.jpg?w=800&h=400&fit=crop",
      featured: false
    }
  ];

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleArticleClick = (articleId) => {
    navigate(`/articles-technical-news-feed?article=${articleId}`);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background-secondary to-background-tertiary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                <Icon name="BookOpen" size={24} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
                Latest <span className="text-gradient-accent">Insights</span>
              </h2>
            </div>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Stay ahead with cutting-edge articles, tutorials, and research from the AI community
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {latestArticles?.map((article, index) => (
              <motion.div
                key={article?.id}
                variants={cardVariants}
                className={`glass-card card-hover cursor-pointer group ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
                onClick={() => handleArticleClick(article?.id)}
              >
                {/* Article Image */}
                <div className={`relative overflow-hidden rounded-lg mb-6 ${
                  index === 0 ? 'h-64 lg:h-80' : 'h-48'
                }`}>
                  <Image
                    src={article?.image}
                    alt={article?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                      {article?.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {article?.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 px-2 py-1 bg-accent/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                        <Icon name="Star" size={12} />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="space-y-4">
                  <h3 className={`font-bold text-text-primary group-hover:text-primary transition-colors ${
                    index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                  }`}>
                    {article?.title}
                  </h3>
                  
                  <p className={`text-text-secondary leading-relaxed ${
                    index === 0 ? 'text-lg' : 'text-base'
                  }`}>
                    {article?.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {article?.tags?.slice(0, 3)?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-surface/50 text-text-secondary text-xs rounded-md border border-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {article?.author?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-text-primary text-sm font-medium">{article?.author}</p>
                        <p className="text-text-muted text-xs">{formatDate(article?.publishedAt)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-text-secondary text-sm">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{article?.readTime}</span>
                      </div>
                      <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Articles Button */}
          <motion.div variants={cardVariants} className="text-center">
            <Button
              variant="outline"
              size="lg"
              iconName="BookOpen"
              iconPosition="left"
              onClick={() => navigate('/articles-technical-news-feed')}
              className="btn-hover-lift"
            >
              View All Articles
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlePreviewSection;