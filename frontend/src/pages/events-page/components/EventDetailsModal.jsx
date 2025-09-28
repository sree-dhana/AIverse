import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventDetailsModal = ({ event, isOpen, onClose, onRegister }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!event) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'agenda', label: 'Agenda', icon: 'Clock' },
    { id: 'speakers', label: 'Speakers', icon: 'Users' },
    { id: 'location', label: 'Location', icon: 'MapPin' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-text-primary mb-3">About This Event</h4>
              <p className="text-text-secondary leading-relaxed">
                {event?.fullDescription || event?.description}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary mb-3">What You'll Learn</h4>
              <ul className="space-y-2">
                {event?.learningOutcomes?.map((outcome, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
                    <span className="text-text-secondary">{outcome}</span>
                  </li>
                )) || (
                  <>
                    <li className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
                      <span className="text-text-secondary">Hands-on experience with latest AI technologies</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
                      <span className="text-text-secondary">Networking opportunities with industry experts</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
                      <span className="text-text-secondary">Certificate of participation</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary mb-3">Prerequisites</h4>
              <div className="flex flex-wrap gap-2">
                {event?.prerequisites?.map((prereq, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    {prereq}
                  </span>
                )) || (
                  <>
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      Basic Programming Knowledge
                    </span>
                    <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
                      Laptop Required
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 'agenda':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-text-primary mb-4">Event Schedule</h4>
            {event?.agenda?.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-surface/30 rounded-lg">
                <div className="text-primary font-semibold min-w-[80px]">
                  {item?.time}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary">{item?.title}</h5>
                  <p className="text-text-secondary text-sm mt-1">{item?.description}</p>
                  {item?.speaker && (
                    <p className="text-accent text-sm mt-2">Speaker: {item?.speaker}</p>
                  )}
                </div>
              </div>
            )) || (
              <>
                <div className="flex items-start space-x-4 p-4 bg-surface/30 rounded-lg">
                  <div className="text-primary font-semibold min-w-[80px]">09:00 AM</div>
                  <div className="flex-1">
                    <h5 className="font-medium text-text-primary">Registration & Welcome</h5>
                    <p className="text-text-secondary text-sm mt-1">Check-in and networking breakfast</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-surface/30 rounded-lg">
                  <div className="text-primary font-semibold min-w-[80px]">10:00 AM</div>
                  <div className="flex-1">
                    <h5 className="font-medium text-text-primary">Opening Keynote</h5>
                    <p className="text-text-secondary text-sm mt-1">Introduction to AI trends and opportunities</p>
                    <p className="text-accent text-sm mt-2">Speaker: Dr. Sarah Johnson</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-surface/30 rounded-lg">
                  <div className="text-primary font-semibold min-w-[80px]">11:30 AM</div>
                  <div className="flex-1">
                    <h5 className="font-medium text-text-primary">Hands-on Workshop</h5>
                    <p className="text-text-secondary text-sm mt-1">Interactive coding session with real-world projects</p>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 'speakers':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-text-primary mb-4">Featured Speakers</h4>
            {event?.speakers?.map((speaker, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-surface/30 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-lg">
                    {speaker?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-text-primary">{speaker?.name}</h5>
                  <p className="text-primary text-sm">{speaker?.title}</p>
                  <p className="text-text-secondary text-sm mt-1">{speaker?.company}</p>
                  <p className="text-text-secondary text-sm mt-2">{speaker?.bio}</p>
                </div>
              </div>
            )) || (
              <>
                <div className="flex items-start space-x-4 p-4 bg-surface/30 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-lg">SJ</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-text-primary">Dr. Sarah Johnson</h5>
                    <p className="text-primary text-sm">Senior AI Researcher</p>
                    <p className="text-text-secondary text-sm mt-1">Google DeepMind</p>
                    <p className="text-text-secondary text-sm mt-2">Leading expert in machine learning with 10+ years of experience in AI research and development.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-surface/30 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-lg">MK</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-text-primary">Michael Kumar</h5>
                    <p className="text-primary text-sm">CTO & Co-founder</p>
                    <p className="text-text-secondary text-sm mt-1">TechVision AI</p>
                    <p className="text-text-secondary text-sm mt-2">Entrepreneur and technologist specializing in AI applications for business transformation.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-text-primary mb-4">Venue Details</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium text-text-primary">{event?.venue}</p>
                    <p className="text-text-secondary text-sm">
                      {event?.address || "123 Tech Campus, Innovation District, Bangalore - 560001"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Navigation" size={20} className="text-accent mt-1" />
                  <div>
                    <p className="font-medium text-text-primary">Getting There</p>
                    <p className="text-text-secondary text-sm">
                      Nearest Metro: MG Road Station (500m walk)\nParking: Available on-site\nPublic Transport: Multiple bus routes available
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="h-64 bg-surface/30 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={event?.venue}
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=12.9716,77.5946&z=14&output=embed"
                className="border-0"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] glass rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={event?.banner}
                alt={event?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <Icon name="X" size={20} />
              </button>

              {/* Event Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                    {event?.type}
                  </span>
                  <span className={`px-3 py-1 backdrop-blur-sm rounded-full text-sm font-medium ${
                    event?.registrationOpen 
                      ? 'bg-success/80 text-white' :'bg-error/80 text-white'
                  }`}>
                    {event?.registrationOpen ? 'Registration Open' : 'Registration Closed'}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{event?.title}</h2>
                <div className="flex items-center space-x-6 text-white/90">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} />
                    <span>{formatDate(event?.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>{formatTime(event?.time)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span>{event?.venue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col h-[calc(90vh-16rem)]">
              {/* Tabs */}
              <div className="flex border-b border-border px-6">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span className="font-medium">{tab?.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {renderTabContent()}
              </div>

              {/* Footer */}
              <div className="border-t border-border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {event?.registeredCount}
                      </div>
                      <div className="text-sm text-text-secondary">Registered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">
                        {event?.maxParticipants - event?.registeredCount}
                      </div>
                      <div className="text-sm text-text-secondary">Spots Left</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">
                        {event?.price === 0 ? 'Free' : `₹${event?.price}`}
                      </div>
                      <div className="text-sm text-text-secondary">Price</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      iconName="Share"
                      iconPosition="left"
                    >
                      Share Event
                    </Button>
                    <Button
                      variant="default"
                      iconName="UserPlus"
                      iconPosition="left"
                      disabled={!event?.registrationOpen}
                      onClick={() => onRegister(event)}
                    >
                      {event?.registrationOpen ? 'Register Now' : 'Registration Closed'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventDetailsModal;