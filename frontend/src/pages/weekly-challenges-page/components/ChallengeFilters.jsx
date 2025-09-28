import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChallengeFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  challengeStats 
}) => {
  const difficultyOptions = [
    { value: 'all', label: 'All Levels', count: challengeStats?.total },
    { value: 'easy', label: 'Easy', count: challengeStats?.easy },
    { value: 'medium', label: 'Medium', count: challengeStats?.medium },
    { value: 'hard', label: 'Hard', count: challengeStats?.hard }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Challenges', count: challengeStats?.total },
    { value: 'completed', label: 'Completed', count: challengeStats?.completed },
    { value: 'pending', label: 'Pending', count: challengeStats?.pending }
  ];

  const topicOptions = [
    { value: 'all', label: 'All Topics' },
    { value: 'arrays', label: 'Arrays' },
    { value: 'strings', label: 'Strings' },
    { value: 'dynamic-programming', label: 'Dynamic Programming' },
    { value: 'graphs', label: 'Graphs' },
    { value: 'trees', label: 'Trees' },
    { value: 'sorting', label: 'Sorting' },
    { value: 'searching', label: 'Searching' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'deep-learning', label: 'Deep Learning' }
  ];

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'hackerrank', label: 'HackerRank' },
    { value: 'leetcode', label: 'LeetCode' },
    { value: 'codechef', label: 'CodeChef' },
    { value: 'codeforces', label: 'Codeforces' }
  ];

  const hasActiveFilters = filters?.difficulty !== 'all' || 
                          filters?.status !== 'all' || 
                          filters?.topic !== 'all' || 
                          filters?.platform !== 'all';

  return (
    <div className="glass-card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filter Challenges</span>
        </h3>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Difficulty Level
          </label>
          <div className="space-y-2">
            {difficultyOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onFilterChange('difficulty', option?.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  filters?.difficulty === option?.value
                    ? 'bg-primary/20 text-primary border border-primary/30' :'bg-surface/30 text-text-secondary hover:bg-surface/50 hover:text-text-primary'
                }`}
              >
                <span>{option?.label}</span>
                <span className="text-xs opacity-70">({option?.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Completion Status
          </label>
          <div className="space-y-2">
            {statusOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onFilterChange('status', option?.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  filters?.status === option?.value
                    ? 'bg-primary/20 text-primary border border-primary/30' :'bg-surface/30 text-text-secondary hover:bg-surface/50 hover:text-text-primary'
                }`}
              >
                <span>{option?.label}</span>
                <span className="text-xs opacity-70">({option?.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Topic Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Topic
          </label>
          <select
            value={filters?.topic}
            onChange={(e) => onFilterChange('topic', e?.target?.value)}
            className="w-full px-3 py-2 bg-surface/30 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
          >
            {topicOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Platform
          </label>
          <select
            value={filters?.platform}
            onChange={(e) => onFilterChange('platform', e?.target?.value)}
            className="w-full px-3 py-2 bg-surface/30 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
          >
            {platformOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ChallengeFilters;