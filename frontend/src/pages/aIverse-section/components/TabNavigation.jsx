import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex flex-col sm:flex-row bg-surface/30 rounded-xl p-2 backdrop-blur-sm border border-border">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
            activeTab === tab?.id
              ? 'bg-primary text-white shadow-lg transform scale-105'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
          }`}
        >
          <Icon name={tab?.icon} size={20} />
          <span className="hidden sm:inline">{tab?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;