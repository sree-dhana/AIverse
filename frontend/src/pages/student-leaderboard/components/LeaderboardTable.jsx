import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed duplicate AnimatePresence import
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LeaderboardTable = ({ students, period, onPeriodChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students?.filter(student =>
      student?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      student?.collegeId?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      student?.college?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [students, searchQuery, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedStudents?.length / itemsPerPage);
  const paginatedStudents = filteredAndSortedStudents?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleRowExpansion = (studentId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(studentId)) {
      newExpanded?.delete(studentId);
    } else {
      newExpanded?.add(studentId);
    }
    setExpandedRows(newExpanded);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return { icon: 'Crown', color: 'text-warning' };
      case 2:
        return { icon: 'Medal', color: 'text-slate-400' };
      case 3:
        return { icon: 'Award', color: 'text-amber-600' };
      default:
        return { icon: 'Hash', color: 'text-text-secondary' };
    }
  };

  const getPointsChange = (student) => {
    const change = student?.pointsChange || 0;
    if (change > 0) {
      return { icon: 'TrendingUp', color: 'text-success', text: `+${change}` };
    } else if (change < 0) {
      return { icon: 'TrendingDown', color: 'text-error', text: change?.toString() };
    }
    return { icon: 'Minus', color: 'text-text-secondary', text: '0' };
  };

  return (
    <div className="glass rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Student Rankings</h2>
            <p className="text-text-secondary">
              Showing {filteredAndSortedStudents?.length} students • Updated 2 minutes ago
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Period Toggle */}
            <div className="flex bg-surface/50 rounded-lg p-1 border border-border">
              <button
                onClick={() => onPeriodChange('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  period === 'monthly' ?'bg-primary text-white shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => onPeriodChange('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  period === 'yearly' ?'bg-primary text-white shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Yearly
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Input
                type="search"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-10 w-full sm:w-64"
              />
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface/30 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('rank')}
                  className="flex items-center space-x-2 text-text-secondary hover:text-text-primary font-medium text-sm"
                >
                  <span>Rank</span>
                  <Icon
                    name={sortConfig?.key === 'rank' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'}
                    size={16}
                    className={sortConfig?.key === 'rank' ? 'text-primary' : 'text-text-muted'}
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-text-secondary hover:text-text-primary font-medium text-sm"
                >
                  <span>Student</span>
                  <Icon
                    name={sortConfig?.key === 'name' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'}
                    size={16}
                    className={sortConfig?.key === 'name' ? 'text-primary' : 'text-text-muted'}
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-left hidden md:table-cell">
                <span className="text-text-secondary font-medium text-sm">College</span>
              </th>
              <th className="px-6 py-4 text-right">
                <button
                  onClick={() => handleSort('totalPoints')}
                  className="flex items-center space-x-2 text-text-secondary hover:text-text-primary font-medium text-sm ml-auto"
                >
                  <span>Points</span>
                  <Icon
                    name={sortConfig?.key === 'totalPoints' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'}
                    size={16}
                    className={sortConfig?.key === 'totalPoints' ? 'text-primary' : 'text-text-muted'}
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-center hidden lg:table-cell">
                <span className="text-text-secondary font-medium text-sm">Change</span>
              </th>
              <th className="px-6 py-4 text-center">
                <span className="text-text-secondary font-medium text-sm">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {paginatedStudents?.map((student, index) => {
                const rankInfo = getRankIcon(student?.rank);
                const pointsChange = getPointsChange(student);
                const isExpanded = expandedRows?.has(student?.id);

                return (
                  <React.Fragment key={student?.id}>
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-border hover:bg-surface/20 transition-colors duration-200"
                    >
                      {/* Rank */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <Icon name={rankInfo?.icon} size={20} className={rankInfo?.color} />
                          <span className="font-bold text-text-primary text-lg">
                            {student?.rank}
                          </span>
                        </div>
                      </td>

                      {/* Student Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                            <Image
                              src={student?.avatar}
                              alt={student?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-text-primary">{student?.name}</div>
                            <div className="text-text-secondary text-sm">{student?.collegeId}</div>
                          </div>
                        </div>
                      </td>

                      {/* College */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="text-text-secondary text-sm">{student?.college}</div>
                      </td>

                      {/* Points */}
                      <td className="px-6 py-4 text-right">
                        <div className="font-bold text-text-primary text-lg">
                          {student?.totalPoints?.toLocaleString()}
                        </div>
                        <div className="text-text-secondary text-sm">points</div>
                      </td>

                      {/* Change */}
                      <td className="px-6 py-4 text-center hidden lg:table-cell">
                        <div className={`flex items-center justify-center space-x-1 ${pointsChange?.color}`}>
                          <Icon name={pointsChange?.icon} size={16} />
                          <span className="text-sm font-medium">{pointsChange?.text}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                            onClick={() => toggleRowExpansion(student?.id)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Download"
                            onClick={() => window.open(student?.certificateUrl, '_blank')}
                          />
                        </div>
                      </td>
                    </motion.tr>
                    {/* Expanded Row */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-surface/10"
                        >
                          <td colSpan="6" className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {/* Challenges */}
                              <div className="bg-surface/30 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Icon name="Code" size={16} className="text-primary" />
                                  <span className="font-medium text-text-primary">Challenges</span>
                                </div>
                                <div className="text-2xl font-bold text-primary">
                                  {student?.challengesCompleted}
                                </div>
                                <div className="text-text-secondary text-sm">Completed</div>
                              </div>

                              {/* Streak */}
                              <div className="bg-surface/30 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Icon name="Flame" size={16} className="text-warning" />
                                  <span className="font-medium text-text-primary">Streak</span>
                                </div>
                                <div className="text-2xl font-bold text-warning">
                                  {student?.streak}
                                </div>
                                <div className="text-text-secondary text-sm">Days</div>
                              </div>

                              {/* Events */}
                              <div className="bg-surface/30 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Icon name="Calendar" size={16} className="text-accent" />
                                  <span className="font-medium text-text-primary">Events</span>
                                </div>
                                <div className="text-2xl font-bold text-accent">
                                  {student?.eventsAttended || 12}
                                </div>
                                <div className="text-text-secondary text-sm">Attended</div>
                              </div>

                              {/* Achievements */}
                              <div className="bg-surface/30 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Icon name="Award" size={16} className="text-success" />
                                  <span className="font-medium text-text-primary">Badges</span>
                                </div>
                                <div className="text-2xl font-bold text-success">
                                  {student?.achievements?.length}
                                </div>
                                <div className="text-text-secondary text-sm">Earned</div>
                              </div>
                            </div>

                            {/* Platform Links */}
                            <div className="mt-4 flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                iconName="ExternalLink"
                                iconPosition="right"
                                onClick={() => window.open(student?.hackerRankUrl, '_blank')}
                              >
                                HackerRank
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                iconName="ExternalLink"
                                iconPosition="right"
                                onClick={() => window.open(student?.leetCodeUrl, '_blank')}
                              >
                                LeetCode
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                iconName="Github"
                                iconPosition="right"
                                onClick={() => window.open(student?.githubUrl, '_blank')}
                              >
                                GitHub
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-text-secondary text-sm">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedStudents?.length)} of {filteredAndSortedStudents?.length} students
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronLeft"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronRight"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;