import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {  AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchAndFilters = ({ onSearch, onFilterChange, activeFilters, searchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const filterTags = [
    { id: 'all', label: 'All Articles', icon: 'FileText', count: 156 },
    { id: 'hackathons', label: 'Hackathons', icon: 'Trophy', count: 24 },
    { id: 'tutorials', label: 'Tutorials', icon: 'BookOpen', count: 45 },
    { id: 'ai-news', label: 'AI News', icon: 'Zap', count: 38 },
    { id: 'research', label: 'Research', icon: 'Microscope', count: 29 },
    { id: 'industry', label: 'Industry', icon: 'Building', count: 20 }
  ];

  const sortOptions = [
    { id: 'latest', label: 'Latest First', icon: 'Clock' },
    { id: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { id: 'trending', label: 'Trending', icon: 'Flame' },
    { id: 'alphabetical', label: 'A-Z', icon: 'ArrowUpDown' }
  ];

  const timeFilters = [
    { id: 'all-time', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' }
  ];

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch?.(localSearchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearchQuery, onSearch]);

  const handleFilterClick = (filterId) => {
    onFilterChange?.('category', filterId);
  };

  const handleSortChange = (sortId) => {
    onFilterChange?.('sort', sortId);
  };

  const handleTimeFilterChange = (timeId) => {
    onFilterChange?.('time', timeId);
  };

  const clearAllFilters = () => {
    setLocalSearchQuery('');
    onFilterChange?.('clear');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (activeFilters?.category && activeFilters?.category !== 'all') count++;
    if (activeFilters?.sort && activeFilters?.sort !== 'latest') count++;
    if (activeFilters?.time && activeFilters?.time !== 'all-time') count++;
    if (localSearchQuery) count++;
    return count;
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className={`transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
          <Input
            type="search"
            placeholder="Search articles, tutorials, news..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e?.target?.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-12 pr-12 py-4 text-lg bg-surface/50 border-border focus:border-primary/50 focus:ring-primary/20"
          />
          <Icon
            name="Search"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          {localSearchQuery && (
            <button
              onClick={() => setLocalSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {isSearchFocused && localSearchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 glass rounded-xl border border-border shadow-elevated z-10"
            >
              <div className="p-4">
                <p className="text-text-secondary text-sm mb-3">Popular searches</p>
                <div className="space-y-2">
                  {['Machine Learning Basics', 'React Hooks Tutorial', 'AI Ethics', 'Python for Beginners']?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setLocalSearchQuery(suggestion)}
                      className="w-full text-left px-3 py-2 text-text-primary hover:bg-surface/50 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Icon name="Search" size={16} className="text-text-muted" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Filter Tags */}
      <div className="flex flex-wrap gap-3">
        {filterTags?.map((tag) => (
          <Button
            key={tag?.id}
            variant={activeFilters?.category === tag?.id ? "default" : "outline"}
            size="sm"
            iconName={tag?.icon}
            iconPosition="left"
            onClick={() => handleFilterClick(tag?.id)}
            className="transition-all duration-200 hover:scale-105"
          >
            {tag?.label}
            <span className="ml-2 px-2 py-0.5 bg-current/20 rounded-full text-xs">
              {tag?.count}
            </span>
          </Button>
        ))}
      </div>
      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
          iconPosition="left"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-text-secondary"
        >
          Advanced Filters
        </Button>

        <div className="flex items-center space-x-3">
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={clearAllFilters}
              className="text-text-secondary hover:text-error"
            >
              Clear All ({getActiveFiltersCount()})
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-6 border border-border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sort Options */}
              <div>
                <h4 className="text-text-primary font-medium mb-3 flex items-center space-x-2">
                  <Icon name="ArrowUpDown" size={16} />
                  <span>Sort By</span>
                </h4>
                <div className="space-y-2">
                  {sortOptions?.map((option) => (
                    <button
                      key={option?.id}
                      onClick={() => handleSortChange(option?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        activeFilters?.sort === option?.id
                          ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                      }`}
                    >
                      <Icon name={option?.icon} size={16} />
                      <span>{option?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Filters */}
              <div>
                <h4 className="text-text-primary font-medium mb-3 flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span>Time Period</span>
                </h4>
                <div className="space-y-2">
                  {timeFilters?.map((filter) => (
                    <button
                      key={filter?.id}
                      onClick={() => handleTimeFilterChange(filter?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        activeFilters?.time === filter?.id
                          ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        activeFilters?.time === filter?.id ? 'bg-primary' : 'bg-text-muted'
                      }`}></div>
                      <span>{filter?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAndFilters;