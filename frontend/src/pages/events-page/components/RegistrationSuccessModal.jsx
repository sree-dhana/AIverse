import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccessModal = ({ registration, isOpen, onClose }) => {
  const handleDownloadTicket = () => {
    // Simulate ticket download
    const ticketData = {
      registrationId: registration?.id,
      eventTitle: registration?.eventTitle,
      participantName: registration?.name,
      email: registration?.email,
      registrationDate: registration?.registrationDate
    };
    
    console.log('Downloading ticket:', ticketData);
    // In a real app, this would generate and download a PDF ticket
  };

  const handleAddToCalendar = () => {
    // Simulate adding to calendar
    console.log('Adding event to calendar');
    // In a real app, this would create a calendar event
  };

  if (!registration) return null;

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
            className="relative w-full max-w-md glass rounded-2xl overflow-hidden"
          >
            {/* Success Animation */}
            <div className="text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-success to-success-400 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Icon name="Check" size={40} className="text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Registration Successful!
                </h2>
                <p className="text-text-secondary mb-6">
                  You've successfully registered for the event. A confirmation email has been sent to your registered email address.
                </p>
              </motion.div>

              {/* Registration Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-surface/30 rounded-lg p-4 mb-6 text-left"
              >
                <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
                  <Icon name="FileText" size={16} className="text-primary" />
                  <span>Registration Details</span>
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Registration ID:</span>
                    <span className="text-text-primary font-mono">#{registration?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Event:</span>
                    <span className="text-text-primary font-medium">{registration?.eventTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Name:</span>
                    <span className="text-text-primary">{registration?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Email:</span>
                    <span className="text-text-primary">{registration?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Status:</span>
                    <span className="text-success font-medium capitalize">{registration?.status}</span>
                  </div>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 text-left"
              >
                <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
                  <Icon name="Info" size={16} className="text-primary" />
                  <span>What's Next?</span>
                </h3>
                
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start space-x-2">
                    <Icon name="Mail" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Check your email for confirmation and event details</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Calendar" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Add the event to your calendar</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Users" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Join our community for updates and networking</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Download" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Download your event ticket for easy access</span>
                  </li>
                </ul>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    onClick={handleDownloadTicket}
                  >
                    Download Ticket
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={handleAddToCalendar}
                  >
                    Add to Calendar
                  </Button>
                </div>
                
                <Button
                  variant="default"
                  fullWidth
                  onClick={onClose}
                >
                  Continue Exploring
                </Button>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6 pt-4 border-t border-border text-center"
              >
                <p className="text-xs text-text-secondary">
                  Need help? Contact us at{' '}
                  <a href="mailto:support@aiverse.com" className="text-primary hover:underline">
                    support@aiverse.com
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationSuccessModal;