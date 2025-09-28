import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChallengeCard = ({ challenge, onToggleComplete, isCompleted }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-success bg-success/10 border-success/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'hard':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-text-secondary bg-surface/50 border-border';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'hackerrank':
        return 'Code';
      case 'leetcode':
        return 'Terminal';
      case 'codechef':
        return 'Coffee';
      case 'codeforces':
        return 'Zap';
      default:
        return 'ExternalLink';
    }
  };

  return (
    <div className={`glass-card transition-all duration-300 hover:transform hover:-translate-y-1 ${
      isCompleted ? 'border-success/30 bg-success/5' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className={`text-lg font-semibold ${
              isCompleted ? 'text-success' : 'text-text-primary'
            }`}>
              {challenge?.title}
            </h3>
            {isCompleted && (
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={20} />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
              getDifficultyColor(challenge?.difficulty)
            }`}>
              {challenge?.difficulty}
            </span>
            
            <div className="flex items-center space-x-1 text-text-secondary">
              <Icon name="Clock" size={16} />
              <span className="text-sm">{challenge?.estimatedTime}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-text-secondary">
              <Icon name="Award" size={16} />
              <span className="text-sm">{challenge?.points} pts</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleComplete(challenge?.id)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isCompleted
                ? 'bg-success/20 text-success hover:bg-success/30' :'bg-surface/50 text-text-secondary hover:bg-surface hover:text-text-primary'
            }`}
          >
            <Icon name={isCompleted ? "CheckCircle" : "Circle"} size={20} />
          </button>
        </div>
      </div>
      {/* Description */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {challenge?.description}
      </p>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {challenge?.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Platform and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name={getPlatformIcon(challenge?.platform)} size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">{challenge?.platform}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Details
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => window.open(challenge?.externalLink, '_blank')}
          >
            Solve
          </Button>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border animate-modal-enter">
          <div className="space-y-4">
            {/* Full Description */}
            <div>
              <h4 className="font-medium text-text-primary mb-2">Problem Description</h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                {challenge?.fullDescription}
              </p>
            </div>

            {/* Hints */}
            {challenge?.hints && challenge?.hints?.length > 0 && (
              <div>
                <h4 className="font-medium text-text-primary mb-2">Hints</h4>
                <ul className="space-y-1">
                  {challenge?.hints?.map((hint, index) => (
                    <li key={index} className="text-text-secondary text-sm flex items-start space-x-2">
                      <Icon name="Lightbulb" size={14} className="mt-0.5 text-warning" />
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Approach */}
            {challenge?.approach && (
              <div>
                <h4 className="font-medium text-text-primary mb-2">Suggested Approach</h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {challenge?.approach}
                </p>
              </div>
            )}

            {/* Constraints */}
            {challenge?.constraints && (
              <div>
                <h4 className="font-medium text-text-primary mb-2">Constraints</h4>
                <ul className="space-y-1">
                  {challenge?.constraints?.map((constraint, index) => (
                    <li key={index} className="text-text-secondary text-sm flex items-start space-x-2">
                      <span className="text-accent">•</span>
                      <span>{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;