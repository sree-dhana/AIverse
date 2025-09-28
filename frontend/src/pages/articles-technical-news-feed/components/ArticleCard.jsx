// ArticleCard.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const ArticleCard = ({ article, onBookmark, onShare, onRead }) => {
  const [isBookmarked, setIsBookmarked] = useState(article?.isBookmarked || false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleBookmark = (e) => {
    e?.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark?.(article?.id, !isBookmarked);
  };

  const handleShare = (e) => {
    e?.stopPropagation();
    onShare?.(article);
  };

  const handleCardClick = () => {
    onRead?.(article);
  };

  const getTagColor = (tag) => {
    const colors = {
      'Hackathons': 'bg-accent/20 text-accent border-accent/30',
      'Tutorials': 'bg-success/20 text-success border-success/30',
      'AI News': 'bg-secondary/20 text-secondary border-secondary/30',
      'Research': 'bg-warning/20 text-warning border-warning/30',
      'Industry': 'bg-primary/20 text-primary border-primary/30'
    };
    return colors?.[tag] || 'bg-surface/50 text-text-secondary border-border';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className="glass rounded-xl overflow-hidden cursor-pointer group hover:shadow-elevated transition-all duration-300"
    >
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden bg-surface">
        <Image
          src={article?.image}
          alt={article?.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-text-muted" />
          </div>
        )}
        
        {/* Reading Time Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-lg text-xs text-text-secondary">
          {article?.readingTime} min read
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background/90 transition-colors"
        >
          <Icon
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
            size={16}
            className={isBookmarked ? "text-accent" : "text-text-secondary"}
          />
        </button>
      </div>
      {/* Article Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {article?.tags?.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-medium rounded-lg border ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article?.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {article?.excerpt}
        </p>

        {/* Author and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {article?.author?.name?.split(' ')?.map(n => n?.[0])?.join('')}
              </span>
            </div>
            <div>
              <p className="text-text-primary text-sm font-medium">{article?.author?.name}</p>
              <p className="text-text-muted text-xs">{article?.author?.role}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-text-secondary text-xs">{formatDate(article?.publishedAt)}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Icon name="Eye" size={12} className="text-text-muted" />
              <span className="text-text-muted text-xs">{article?.views}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Heart"
              iconPosition="left"
              className="text-text-secondary hover:text-error"
            >
              {article?.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              className="text-text-secondary"
            >
              {article?.comments}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            onClick={handleShare}
            className="text-text-secondary hover:text-primary"
          >
            Share
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default ArticleCard;