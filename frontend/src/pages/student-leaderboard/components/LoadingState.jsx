import React from 'react';
import { motion } from 'framer-motion';


const LoadingState = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-surface/30 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-surface/20 rounded-lg w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Developer Highlights Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[1, 2]?.map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
              className="glass rounded-2xl p-6 border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-surface/30 rounded-xl animate-pulse"></div>
                  <div>
                    <div className="h-6 bg-surface/30 rounded w-48 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-surface/20 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
                <div className="w-12 h-6 bg-surface/30 rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-surface/30 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-6 bg-surface/30 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-surface/20 rounded w-24 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-surface/20 rounded w-40 animate-pulse"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[1, 2, 3]?.map((stat) => (
                  <div key={stat} className="text-center">
                    <div className="h-8 bg-surface/30 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-4 bg-surface/20 rounded w-12 mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2 mb-6">
                {[1, 2, 3]?.map((badge) => (
                  <div key={badge} className="h-6 bg-surface/20 rounded-full w-20 animate-pulse"></div>
                ))}
              </div>

              <div className="flex space-x-3">
                <div className="h-8 bg-surface/30 rounded flex-1 animate-pulse"></div>
                <div className="h-8 bg-surface/30 rounded flex-1 animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Overview Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4]?.map((stat) => (
            <motion.div
              key={stat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: stat * 0.1 }}
              className="glass rounded-xl p-6 border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-surface/30 rounded-lg animate-pulse"></div>
                <div className="w-12 h-4 bg-surface/20 rounded animate-pulse"></div>
              </div>
              <div className="h-8 bg-surface/30 rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-4 bg-surface/20 rounded w-24 mb-4 animate-pulse"></div>
              <div className="h-1 bg-surface/20 rounded-full animate-pulse"></div>
            </motion.div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="glass rounded-2xl border border-border overflow-hidden">
          {/* Table Header Skeleton */}
          <div className="p-6 border-b border-border">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <div className="h-8 bg-surface/30 rounded w-48 mb-2 animate-pulse"></div>
                <div className="h-4 bg-surface/20 rounded w-64 animate-pulse"></div>
              </div>
              <div className="flex space-x-4">
                <div className="h-10 bg-surface/30 rounded w-32 animate-pulse"></div>
                <div className="h-10 bg-surface/30 rounded w-48 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Table Content Skeleton */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface/30 border-b border-border">
                <tr>
                  {['Rank', 'Student', 'College', 'Points', 'Change', 'Actions']?.map((header) => (
                    <th key={header} className="px-6 py-4 text-left">
                      <div className="h-4 bg-surface/20 rounded w-16 animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8]?.map((row) => (
                  <tr key={row} className="border-b border-border">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-surface/30 rounded animate-pulse"></div>
                        <div className="h-6 bg-surface/30 rounded w-8 animate-pulse"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-surface/30 rounded-full animate-pulse"></div>
                        <div>
                          <div className="h-4 bg-surface/30 rounded w-24 mb-1 animate-pulse"></div>
                          <div className="h-3 bg-surface/20 rounded w-16 animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="h-4 bg-surface/20 rounded w-32 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-6 bg-surface/30 rounded w-16 ml-auto mb-1 animate-pulse"></div>
                      <div className="h-3 bg-surface/20 rounded w-12 ml-auto animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 text-center hidden lg:table-cell">
                      <div className="h-4 bg-surface/20 rounded w-12 mx-auto animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 bg-surface/30 rounded animate-pulse"></div>
                        <div className="w-8 h-8 bg-surface/30 rounded animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-surface/20 rounded w-48 animate-pulse"></div>
              <div className="flex items-center space-x-2">
                <div className="h-8 bg-surface/30 rounded w-20 animate-pulse"></div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5]?.map((page) => (
                    <div key={page} className="w-8 h-8 bg-surface/30 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-8 bg-surface/30 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;