import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearchSubmit();
  };

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="glass-card mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center transition-all duration-300 ${
          isFocused ? 'ring-2 ring-primary/50' : ''
        } rounded-lg overflow-hidden`}>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search challenges by title, topic, or platform..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full px-4 py-3 pl-12 pr-10 bg-surface/30 border border-border text-text-primary placeholder-text-secondary focus:outline-none focus:bg-surface/50 transition-all duration-200"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
          
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Icon name="Search" size={18} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>
      {/* Search Suggestions */}
      {isFocused && searchQuery?.length > 0 && (
        <div className="mt-3 p-3 bg-surface/20 rounded-lg border border-border">
          <p className="text-sm text-text-secondary mb-2">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {['Arrays', 'Dynamic Programming', 'Machine Learning', 'Graphs', 'Sorting']?.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSearchChange(suggestion)}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-md hover:bg-primary/20 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;