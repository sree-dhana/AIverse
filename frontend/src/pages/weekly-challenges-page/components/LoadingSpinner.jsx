import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ message = "Loading challenges..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="Zap" size={24} className="text-primary animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-text-secondary text-lg">{message}</p>
      <div className="mt-2 flex space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-0"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;