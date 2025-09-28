import React from 'react';
import { motion } from 'framer-motion';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onViewDetails, index }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'workshop': return 'Wrench';
      case 'hackathon': return 'Code';
      case 'seminar': return 'Users';
      case 'competition': return 'Trophy';
      case 'webinar': return 'Video';
      default: return 'Calendar';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'workshop': return 'text-accent';
      case 'hackathon': return 'text-primary';
      case 'seminar': return 'text-secondary';
      case 'competition': return 'text-warning-400';
      case 'webinar': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card group cursor-pointer hover:shadow-elevated transition-all duration-300"
      onClick={() => onViewDetails(event)}
    >
      {/* Event Banner */}
      <div className="relative overflow-hidden rounded-t-xl h-48">
        <Image
          src={event?.banner}
          alt={event?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Event Type Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <Icon 
              name={getEventTypeIcon(event?.type)} 
              size={14} 
              className={getEventTypeColor(event?.type)} 
            />
            <span className={`text-sm font-medium ${getEventTypeColor(event?.type)}`}>
              {event?.type}
            </span>
          </div>
        </div>

        {/* Registration Status */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            event?.registrationOpen 
              ? 'bg-success/20 text-success border border-success/30' :'bg-error/20 text-error border border-error/30'
          }`}>
            {event?.registrationOpen ? 'Open' : 'Closed'}
          </div>
        </div>

        {/* Event Date Overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="text-primary text-lg font-bold">
              {new Date(event.date)?.getDate()}
            </div>
            <div className="text-text-secondary text-xs -mt-1">
              {new Date(event.date)?.toLocaleDateString('en-US', { month: 'short' })}
            </div>
          </div>
        </div>
      </div>
      {/* Event Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {event?.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {event?.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          {/* Date & Time */}
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="text-text-primary font-medium">
              {formatDate(event?.date)}
            </span>
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-text-primary">
              {formatTime(event?.time)}
            </span>
          </div>

          {/* Venue */}
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="MapPin" size={16} className="text-secondary" />
            <span className="text-text-primary">
              {event?.venue}
            </span>
          </div>

          {/* Organizer */}
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="User" size={16} className="text-text-secondary" />
            <span className="text-text-secondary">
              Organized by {event?.organizer}
            </span>
          </div>
        </div>

        {/* Registration Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {event?.registeredCount}/{event?.maxParticipants} registered
            </span>
          </div>
          <div className="text-sm font-medium text-primary">
            {event?.price === 0 ? 'Free' : `₹${event?.price}`}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.min((event?.registeredCount / event?.maxParticipants) * 100, 100)}%` 
            }}
          />
        </div>

        {/* Action Button */}
        <Button
          variant="default"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          className="group-hover:bg-primary-600 transition-colors"
          disabled={!event?.registrationOpen}
        >
          {event?.registrationOpen ? 'View Details' : 'Registration Closed'}
        </Button>
      </div>
    </motion.div>
  );
};

export default EventCard;