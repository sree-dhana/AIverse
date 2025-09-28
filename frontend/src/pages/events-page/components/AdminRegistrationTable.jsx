import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AdminRegistrationTable = ({ isVisible }) => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('registrationDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock registration data
  const mockRegistrations = [
    {
      id: 1001,
      eventId: 1,
      eventTitle: "AI Workshop: Introduction to Machine Learning",
      name: "Arjun Sharma",
      email: "arjun.sharma@college.edu",
      phone: "9876543210",
      collegeId: "CS2021001",
      year: "3rd Year",
      branch: "Computer Science",
      experience: "Intermediate",
      registrationDate: "2025-01-15T10:30:00Z",
      status: "confirmed"
    },
    {
      id: 1002,
      eventId: 2,
      eventTitle: "AI Hackathon 2025",
      name: "Priya Patel",
      email: "priya.patel@college.edu",
      phone: "9876543211",
      collegeId: "IT2020045",
      year: "4th Year",
      branch: "Information Technology",
      experience: "Advanced",
      registrationDate: "2025-01-14T15:45:00Z",
      status: "confirmed"
    },
    {
      id: 1003,
      eventId: 1,
      eventTitle: "AI Workshop: Introduction to Machine Learning",
      name: "Rahul Kumar",
      email: "rahul.kumar@college.edu",
      phone: "9876543212",
      collegeId: "CS2022015",
      year: "2nd Year",
      branch: "Computer Science",
      experience: "Beginner",
      registrationDate: "2025-01-13T09:20:00Z",
      status: "pending"
    },
    {
      id: 1004,
      eventId: 3,
      eventTitle: "Deep Learning Seminar",
      name: "Sneha Reddy",
      email: "sneha.reddy@college.edu",
      phone: "9876543213",
      collegeId: "AI2021008",
      year: "3rd Year",
      branch: "Artificial Intelligence",
      experience: "Intermediate",
      registrationDate: "2025-01-12T14:10:00Z",
      status: "confirmed"
    },
    {
      id: 1005,
      eventId: 2,
      eventTitle: "AI Hackathon 2025",
      name: "Vikram Singh",
      email: "vikram.singh@college.edu",
      phone: "9876543214",
      collegeId: "CS2020032",
      year: "4th Year",
      branch: "Computer Science",
      experience: "Advanced",
      registrationDate: "2025-01-11T11:55:00Z",
      status: "cancelled"
    },
    {
      id: 1006,
      eventId: 4,
      eventTitle: "Neural Networks Competition",
      name: "Ananya Gupta",
      email: "ananya.gupta@college.edu",
      phone: "9876543215",
      collegeId: "ML2021019",
      year: "3rd Year",
      branch: "Machine Learning",
      experience: "Intermediate",
      registrationDate: "2025-01-10T16:30:00Z",
      status: "confirmed"
    },
    {
      id: 1007,
      eventId: 5,
      eventTitle: "AI Ethics Webinar",
      name: "Karthik Nair",
      email: "karthik.nair@college.edu",
      phone: "9876543216",
      collegeId: "CS2022028",
      year: "2nd Year",
      branch: "Computer Science",
      experience: "Beginner",
      registrationDate: "2025-01-09T13:15:00Z",
      status: "confirmed"
    },
    {
      id: 1008,
      eventId: 1,
      eventTitle: "AI Workshop: Introduction to Machine Learning",
      name: "Meera Joshi",
      email: "meera.joshi@college.edu",
      phone: "9876543217",
      collegeId: "IT2021042",
      year: "3rd Year",
      branch: "Information Technology",
      experience: "Intermediate",
      registrationDate: "2025-01-08T08:45:00Z",
      status: "confirmed"
    }
  ];

  useEffect(() => {
    // Load registrations from localStorage and merge with mock data
    const storedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
    const allRegistrations = [...mockRegistrations, ...storedRegistrations];
    setRegistrations(allRegistrations);
  }, []);

  useEffect(() => {
    let filtered = [...registrations];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(reg =>
        reg?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        reg?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        reg?.collegeId?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        reg?.eventTitle?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered?.filter(reg => reg?.status === filterStatus);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];

      if (sortBy === 'registrationDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredRegistrations(filtered);
    setCurrentPage(1);
  }, [registrations, searchQuery, filterStatus, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleStatusChange = (registrationId, newStatus) => {
    const updatedRegistrations = registrations?.map(reg =>
      reg?.id === registrationId ? { ...reg, status: newStatus } : reg
    );
    setRegistrations(updatedRegistrations);
    
    // Update localStorage
    const storedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
    const updatedStored = storedRegistrations?.map(reg =>
      reg?.id === registrationId ? { ...reg, status: newStatus } : reg
    );
    localStorage.setItem('eventRegistrations', JSON.stringify(updatedStored));
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Event', 'Name', 'Email', 'Phone', 'College ID', 'Year', 'Branch', 'Experience', 'Registration Date', 'Status'];
    const csvContent = [
      headers?.join(','),
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...filteredRegistrations?.map(reg => [
        reg?.id,
        `"${reg?.eventTitle}"`,
        `"${reg?.name}"`,
        reg?.email,
        reg?.phone,
        reg?.collegeId,
        `"${reg?.year}"`,
        `"${reg?.branch}"`,
        reg?.experience,
        new Date(reg.registrationDate)?.toLocaleDateString(),
        reg?.status
      ]?.join(','))
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-registrations-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/20 border-success/30';
      case 'pending': return 'text-warning-400 bg-warning/20 border-warning/30';
      case 'cancelled': return 'text-error bg-error/20 border-error/30';
      default: return 'text-text-secondary bg-surface/30 border-border';
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredRegistrations?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRegistrations = filteredRegistrations?.slice(startIndex, endIndex);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card mt-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Registration Management</h2>
          <p className="text-text-secondary">
            Manage and track event registrations ({filteredRegistrations?.length} total)
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={exportToCSV}
          >
            Export CSV
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search registrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="px-4 py-2 bg-surface/50 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="px-4 py-2 bg-surface/50 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="registrationDate-desc">Latest First</option>
            <option value="registrationDate-asc">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="eventTitle-asc">Event A-Z</option>
          </select>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface/30">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>ID</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                <button
                  onClick={() => handleSort('eventTitle')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Event</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Participant</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Academic</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                <button
                  onClick={() => handleSort('registrationDate')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Registered</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentRegistrations?.map((registration) => (
              <tr key={registration?.id} className="hover:bg-surface/20 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-text-primary">#{registration?.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {registration?.eventTitle}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{registration?.name}</p>
                    <p className="text-sm text-text-secondary">{registration?.collegeId}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-text-primary">{registration?.email}</p>
                    <p className="text-sm text-text-secondary">{registration?.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-text-primary">{registration?.year}</p>
                    <p className="text-sm text-text-secondary">{registration?.branch}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-text-primary">
                    {new Date(registration.registrationDate)?.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {new Date(registration.registrationDate)?.toLocaleTimeString()}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={registration?.status}
                    onChange={(e) => handleStatusChange(registration?.id, e?.target?.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(registration?.status)}`}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-primary hover:text-primary-600 transition-colors">
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="text-text-secondary hover:text-text-primary transition-colors">
                      <Icon name="Edit" size={16} />
                    </button>
                    <button className="text-error hover:text-error-600 transition-colors">
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredRegistrations?.length)} of {filteredRegistrations?.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            />
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminRegistrationTable;