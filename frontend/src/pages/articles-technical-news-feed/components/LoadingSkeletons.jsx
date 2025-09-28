import React from 'react';
import { motion } from 'framer-motion';


const ArticleCardSkeleton = () => (
  <div className="glass rounded-xl overflow-hidden">
    {/* Image Skeleton */}
    <div className="h-48 bg-surface animate-pulse"></div>
    
    {/* Content Skeleton */}
    <div className="p-6 space-y-4">
      {/* Tags */}
      <div className="flex space-x-2">
        <div className="h-6 w-16 bg-surface rounded-lg animate-pulse"></div>
        <div className="h-6 w-20 bg-surface rounded-lg animate-pulse"></div>
      </div>
      
      {/* Title */}
      <div className="space-y-2">
        <div className="h-6 bg-surface rounded animate-pulse"></div>
        <div className="h-6 w-3/4 bg-surface rounded animate-pulse"></div>
      </div>
      
      {/* Excerpt */}
      <div className="space-y-2">
        <div className="h-4 bg-surface rounded animate-pulse"></div>
        <div className="h-4 bg-surface rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-surface rounded animate-pulse"></div>
      </div>
      
      {/* Author and Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-surface rounded-full animate-pulse"></div>
          <div className="space-y-1">
            <div className="h-4 w-20 bg-surface rounded animate-pulse"></div>
            <div className="h-3 w-16 bg-surface rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-3 w-16 bg-surface rounded animate-pulse"></div>
          <div className="h-3 w-12 bg-surface rounded animate-pulse"></div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex space-x-4">
          <div className="h-8 w-12 bg-surface rounded animate-pulse"></div>
          <div className="h-8 w-12 bg-surface rounded animate-pulse"></div>
        </div>
        <div className="h-8 w-16 bg-surface rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

const SearchFiltersSkeleton = () => (
  <div className="space-y-6">
    {/* Search Bar Skeleton */}
    <div className="h-14 bg-surface/50 rounded-xl animate-pulse"></div>
    
    {/* Filter Tags Skeleton */}
    <div className="flex flex-wrap gap-3">
      {[...Array(6)]?.map((_, index) => (
        <div
          key={index}
          className="h-10 w-24 bg-surface rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
    
    {/* Advanced Filters Toggle */}
    <div className="flex items-center justify-between">
      <div className="h-8 w-32 bg-surface rounded animate-pulse"></div>
      <div className="h-8 w-20 bg-surface rounded animate-pulse"></div>
    </div>
  </div>
);

const LoadingSkeletons = ({ type = 'articles', count = 6 }) => {
  if (type === 'search-filters') {
    return <SearchFiltersSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)]?.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ArticleCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeletons;