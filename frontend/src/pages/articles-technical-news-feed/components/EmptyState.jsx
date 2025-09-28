import React from 'react';
import { motion } from 'framer-motion';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type = 'no-articles', 
  searchQuery = '', 
  onClearFilters,
  onSubmitArticle 
}) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-search-results':
        return {
          icon: 'Search',
          title: 'No articles found',
          description: `We couldn't find any articles matching "${searchQuery}". Try adjusting your search terms or filters.`,
          actions: [
            {
              label: 'Clear Filters',
              variant: 'outline',
              iconName: 'X',
              onClick: onClearFilters
            },
            {
              label: 'Submit Article',
              variant: 'default',
              iconName: 'Plus',
              onClick: onSubmitArticle
            }
          ]
        };
      
      case 'no-filtered-results':
        return {
          icon: 'Filter',
          title: 'No articles in this category',
          description: 'There are no articles matching your current filters. Try selecting different categories or time periods.',
          actions: [
            {
              label: 'Clear Filters',
              variant: 'outline',
              iconName: 'X',
              onClick: onClearFilters
            },
            {
              label: 'View All Articles',
              variant: 'default',
              iconName: 'FileText',
              onClick: () => onClearFilters?.()
            }
          ]
        };
      
      case 'loading-error':
        return {
          icon: 'AlertCircle',
          title: 'Failed to load articles',
          description: 'We encountered an error while loading articles. Please check your connection and try again.',
          actions: [
            {
              label: 'Try Again',
              variant: 'default',
              iconName: 'RefreshCw',
              onClick: () => window.location?.reload()
            }
          ]
        };
      
      default:
        return {
          icon: 'FileText',
          title: 'No articles yet',
          description: 'Be the first to share your knowledge with the community. Submit an article and help others learn!',
          actions: [
            {
              label: 'Submit First Article',
              variant: 'default',
              iconName: 'Plus',
              onClick: onSubmitArticle
            }
          ]
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-surface/50 rounded-full flex items-center justify-center mb-6"
      >
        <Icon 
          name={content?.icon} 
          size={48} 
          className="text-text-muted" 
        />
      </motion.div>
      {/* Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-text-primary mb-3"
      >
        {content?.title}
      </motion.h3>
      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-text-secondary max-w-md mb-8 leading-relaxed"
      >
        {content?.description}
      </motion.p>
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        {content?.actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            iconName={action?.iconName}
            iconPosition="left"
            onClick={action?.onClick}
            className="min-w-[140px]"
          >
            {action?.label}
          </Button>
        ))}
      </motion.div>
      {/* Additional Info */}
      {type === 'no-search-results' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 glass rounded-lg border border-border max-w-md"
        >
          <h4 className="text-text-primary font-medium mb-2 flex items-center space-x-2">
            <Icon name="Lightbulb" size={16} />
            <span>Search Tips</span>
          </h4>
          <ul className="text-text-secondary text-sm space-y-1 text-left">
            <li>• Try using different keywords</li>
            <li>• Check your spelling</li>
            <li>• Use broader search terms</li>
            <li>• Remove some filters</li>
          </ul>
        </motion.div>
      )}
      {/* Popular Tags Suggestion */}
      {(type === 'no-search-results' || type === 'no-filtered-results') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <p className="text-text-secondary text-sm mb-3">Popular topics:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Machine Learning', 'React', 'Python', 'AI Ethics', 'Web Development']?.map((tag, index) => (
              <button
                key={index}
                className="px-3 py-1 text-xs bg-surface/50 text-text-secondary rounded-lg border border-border hover:bg-surface/70 hover:text-text-primary transition-colors"
                onClick={() => {
                  // This would trigger a search for the tag
                  console.log(`Search for: ${tag}`);
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;