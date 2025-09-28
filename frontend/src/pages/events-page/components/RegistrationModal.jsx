import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationModal = ({ event, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeId: '',
    year: '',
    branch: '',
    experience: '',
    expectations: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone?.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData?.collegeId?.trim()) {
      newErrors.collegeId = 'College ID is required';
    } else if (formData?.collegeId?.trim()?.length < 3) {
      newErrors.collegeId = 'College ID must be at least 3 characters';
    }

    if (!formData?.year) {
      newErrors.year = 'Academic year is required';
    }

    if (!formData?.branch?.trim()) {
      newErrors.branch = 'Branch/Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store registration data in localStorage
      const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
      const newRegistration = {
        id: Date.now(),
        eventId: event?.id,
        eventTitle: event?.title,
        ...formData,
        registrationDate: new Date()?.toISOString(),
        status: 'confirmed'
      };
      
      registrations?.push(newRegistration);
      localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
      
      onSuccess(newRegistration);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        collegeId: '',
        year: '',
        branch: '',
        experience: '',
        expectations: ''
      });
      
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!event) return null;

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
            className="relative w-full max-w-2xl max-h-[90vh] glass rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Register for Event</h2>
                <p className="text-text-secondary mt-1">{event?.title}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-surface/50 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-8rem)] overflow-y-auto">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="User" size={20} className="text-primary" />
                  <span>Personal Information</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    error={errors?.name}
                    required
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    error={errors?.email}
                    required
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    error={errors?.phone}
                    required
                  />
                  
                  <Input
                    label="College ID"
                    type="text"
                    name="collegeId"
                    value={formData?.collegeId}
                    onChange={handleInputChange}
                    placeholder="Your student ID"
                    error={errors?.collegeId}
                    required
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="GraduationCap" size={20} className="text-secondary" />
                  <span>Academic Information</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Academic Year *
                    </label>
                    <select
                      name="year"
                      value={formData?.year}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-surface/50 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      required
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                    {errors?.year && (
                      <p className="text-error text-sm mt-1">{errors?.year}</p>
                    )}
                  </div>
                  
                  <Input
                    label="Branch/Department"
                    type="text"
                    name="branch"
                    value={formData?.branch}
                    onChange={handleInputChange}
                    placeholder="e.g., Computer Science"
                    error={errors?.branch}
                    required
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="MessageSquare" size={20} className="text-accent" />
                  <span>Additional Information</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Prior Experience Level
                    </label>
                    <select
                      name="experience"
                      value={formData?.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-surface/50 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    >
                      <option value="">Select Experience Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      What do you hope to learn from this event?
                    </label>
                    <textarea
                      name="expectations"
                      value={formData?.expectations}
                      onChange={handleInputChange}
                      placeholder="Share your expectations and learning goals..."
                      rows={3}
                      className="w-full px-4 py-3 bg-surface/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Event Details Summary */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-2">Event Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Event:</span>
                    <span className="text-text-primary font-medium">{event?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Date:</span>
                    <span className="text-text-primary">
                      {new Date(event.date)?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Time:</span>
                    <span className="text-text-primary">{event?.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Venue:</span>
                    <span className="text-text-primary">{event?.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Fee:</span>
                    <span className="text-text-primary font-semibold">
                      {event?.price === 0 ? 'Free' : `₹${event?.price}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  loading={isSubmitting}
                  iconName="UserPlus"
                  iconPosition="left"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register Now'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;