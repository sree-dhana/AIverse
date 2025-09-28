import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { motion } from 'framer-motion';

const EventFilters = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  selectedStatus, 
  onStatusChange,
  sortBy,
  onSortChange,
  onClearFilters 
}) => {
  const categories = [
    { value: 'all', label: 'All Events', icon: 'Calendar' },
    { value: 'workshop', label: 'Workshops', icon: 'Wrench' },
    { value: 'hackathon', label: 'Hackathons', icon: 'Code' },
    { value: 'seminar', label: 'Seminars', icon: 'Users' },
    { value: 'competition', label: 'Competitions', icon: 'Trophy' },
    { value: 'webinar', label: 'Webinars', icon: 'Video' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'open', label: 'Registration Open' },
    { value: 'closed', label: 'Registration Closed' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' }
  ];

  const sortOptions = [
    { value: 'date-asc', label: 'Date: Earliest First' },
    { value: 'date-desc', label: 'Date: Latest First' },
    { value: 'title-asc', label: 'Title: A-Z' },
    { value: 'title-desc', label: 'Title: Z-A' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all' || sortBy !== 'date-asc';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card mb-8"
    >
      <div className="p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search events by title, description, or organizer..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-12"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Event Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <button
                key={category?.value}
                onClick={() => onCategoryChange(category?.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                  selectedCategory === category?.value
                    ? 'bg-primary/20 text-primary border-primary/30' :'bg-surface/30 text-text-secondary border-border hover:text-text-primary hover:bg-surface/50'
                }`}
              >
                <Icon name={category?.icon} size={16} />
                <span className="text-sm font-medium">{category?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Status and Sort Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Registration Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e?.target?.value)}
              className="w-full px-4 py-2 bg-surface/50 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            >
              {statusOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e?.target?.value)}
              className="w-full px-4 py-2 bg-surface/50 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={onClearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
            <span className="text-sm text-text-secondary">Active filters:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                <Icon name="Search" size={12} />
                <span>"{searchQuery}"</span>
                <button onClick={() => onSearchChange('')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
                <Icon name={categories?.find(c => c?.value === selectedCategory)?.icon || 'Tag'} size={12} />
                <span>{categories?.find(c => c?.value === selectedCategory)?.label}</span>
                <button onClick={() => onCategoryChange('all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                <Icon name="Filter" size={12} />
                <span>{statusOptions?.find(s => s?.value === selectedStatus)?.label}</span>
                <button onClick={() => onStatusChange('all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventFilters;