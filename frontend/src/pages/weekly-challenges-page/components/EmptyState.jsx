import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  title = "No challenges found", 
  description = "Try adjusting your filters or search terms to find more challenges.",
  onReset,
  showResetButton = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-surface/30 rounded-full flex items-center justify-center mb-6">
        <Icon name="Search" size={32} className="text-text-muted" />
      </div>
      
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary max-w-md mb-6">{description}</p>
      
      {showResetButton && onReset && (
        <Button
          variant="outline"
          onClick={onReset}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset Filters
        </Button>
      )}
      
      <div className="mt-8 flex items-center space-x-4 text-text-muted">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} />
          <span className="text-sm">Practice coding</span>
        </div>
        <div className="w-1 h-1 bg-text-muted rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} />
          <span className="text-sm">Improve skills</span>
        </div>
        <div className="w-1 h-1 bg-text-muted rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} />
          <span className="text-sm">Earn points</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;