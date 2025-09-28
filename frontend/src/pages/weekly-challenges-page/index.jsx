import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ChallengeCard from './components/ChallengeCard';
import ChallengeFilters from './components/ChallengeFilters';
import ProgressStats from './components/ProgressStats';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';

const WeeklyChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    status: 'all',
    topic: 'all',
    platform: 'all'
  });

  // Mock challenges data
  const mockChallenges = [
    {
      id: 1,
      title: "Two Sum Problem",
      description: "Given an array of integers and a target sum, return indices of two numbers that add up to the target.",
      fullDescription: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
      difficulty: "Easy",
      estimatedTime: "15-30 min",
      points: 50,
      platform: "LeetCode",
      externalLink: "https://leetcode.com/problems/two-sum/",
      tags: ["Arrays", "Hash Table", "Algorithms"],
      hints: [
        "Try using a hash map to store the complement of each number",
        "For each number, check if its complement exists in the hash map"
      ],
      approach: "Use a hash map to store numbers and their indices. For each number, calculate its complement and check if it exists in the map.",
      constraints: [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
        "-10⁹ ≤ target ≤ 10⁹"
      ]
    },
    {
      id: 2,
      title: "Binary Tree Traversal",
      description: "Implement inorder, preorder, and postorder traversal of a binary tree using both recursive and iterative approaches.",
      fullDescription: `Given the root of a binary tree, implement three different traversal methods:\n\n1. Inorder Traversal (Left, Root, Right)\n2. Preorder Traversal (Root, Left, Right)\n3. Postorder Traversal (Left, Right, Root)\n\nImplement both recursive and iterative solutions for each traversal method.`,
      difficulty: "Medium",
      estimatedTime: "45-60 min",
      points: 100,
      platform: "HackerRank",
      externalLink: "https://www.hackerrank.com/challenges/tree-traversal",
      tags: ["Trees", "Recursion", "Stack", "DFS"],
      hints: [
        "For iterative solutions, use a stack to simulate recursion",
        "Consider the order in which nodes are processed vs visited"
      ],
      approach: "Use recursion for simple implementation, or stack-based iteration for space-efficient solutions.",
      constraints: [
        "The number of nodes is in range [0, 100]",
        "-100 ≤ Node.val ≤ 100"
      ]
    },
    {
      id: 3,
      title: "Neural Network Backpropagation",
      description: "Implement backpropagation algorithm for a simple neural network with one hidden layer.",
      fullDescription: `Build a neural network from scratch with the following specifications:\n\n1. Input layer with variable number of features\n2. One hidden layer with configurable neurons\n3. Output layer for binary classification\n4. Implement forward propagation\n5. Implement backpropagation with gradient descent\n6. Train on a simple dataset and evaluate accuracy`,
      difficulty: "Hard",
      estimatedTime: "2-3 hours",
      points: 200,
      platform: "CodeChef",
      externalLink: "https://www.codechef.com/problems/NEURAL",
      tags: ["Machine Learning", "Neural Networks", "Mathematics", "AI"],
      hints: [
        "Start with sigmoid activation function for simplicity",
        "Use chain rule for computing gradients",
        "Initialize weights randomly with small values"
      ],
      approach: "Implement matrix operations for efficient computation. Use vectorization to handle batch processing.",
      constraints: [
        "Input features: 2-10",
        "Hidden neurons: 3-20",
        "Training samples: 100-1000"
      ]
    },
    {
      id: 4,
      title: "Dynamic Programming - Coin Change",
      description: "Find the minimum number of coins needed to make a given amount using dynamic programming.",
      fullDescription: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.`,
      difficulty: "Medium",
      estimatedTime: "30-45 min",
      points: 120,
      platform: "LeetCode",
      externalLink: "https://leetcode.com/problems/coin-change/",
      tags: ["Dynamic Programming", "Arrays", "Optimization"],
      hints: [
        "Use bottom-up DP approach",
        "For each amount, try all possible coins",
        "Build solution from smaller subproblems"
      ],
      approach: "Create a DP array where dp[i] represents minimum coins needed for amount i. Fill the array bottom-up.",
      constraints: [
        "1 ≤ coins.length ≤ 12",
        "1 ≤ coins[i] ≤ 2³¹ - 1",
        "0 ≤ amount ≤ 10⁴"
      ]
    },
    {
      id: 5,
      title: "Graph Shortest Path - Dijkstra",
      description: "Implement Dijkstra's algorithm to find shortest path between nodes in a weighted graph.",
      fullDescription: `Given a weighted, undirected graph and a source vertex, implement Dijkstra's algorithm to find the shortest path from the source to all other vertices.\n\nThe graph is represented as an adjacency list where each edge has a positive weight.\n\nReturn an array of shortest distances from source to all vertices.`,
      difficulty: "Hard",
      estimatedTime: "60-90 min",
      points: 180,
      platform: "Codeforces",
      externalLink: "https://codeforces.com/problemset/problem/20/C",
      tags: ["Graphs", "Shortest Path", "Priority Queue", "Algorithms"],
      hints: [
        "Use a priority queue (min-heap) for efficient vertex selection",
        "Keep track of visited vertices to avoid cycles",
        "Update distances only when a shorter path is found"
      ],
      approach: "Use priority queue to always process the vertex with minimum distance. Relax edges and update distances.",
      constraints: [
        "1 ≤ vertices ≤ 1000",
        "1 ≤ edges ≤ 5000",
        "1 ≤ weight ≤ 100"
      ]
    },
    {
      id: 6,
      title: "String Pattern Matching - KMP",
      description: "Implement the Knuth-Morris-Pratt algorithm for efficient string pattern matching.",
      fullDescription: `Given a text string and a pattern string, implement the KMP (Knuth-Morris-Pratt) algorithm to find all occurrences of the pattern in the text.\n\nThe KMP algorithm uses a failure function to avoid unnecessary character comparisons, achieving O(n + m) time complexity where n is the length of text and m is the length of pattern.\n\nReturn all starting indices where the pattern occurs in the text.`,
      difficulty: "Medium",
      estimatedTime: "45-75 min",
      points: 150,
      platform: "HackerRank",
      externalLink: "https://www.hackerrank.com/challenges/kmp-fp",
      tags: ["Strings", "Pattern Matching", "KMP", "Algorithms"],
      hints: [
        "First build the failure function (LPS array)",
        "Use the failure function to skip characters efficiently",
        "The failure function represents longest proper prefix which is also suffix"
      ],
      approach: "Build LPS array first, then use it during pattern matching to avoid redundant comparisons.",
      constraints: [
        "1 ≤ text.length ≤ 10⁶",
        "1 ≤ pattern.length ≤ 10³",
        "Strings contain only lowercase letters"
      ]
    },
    {
      id: 7,
      title: "Machine Learning - Linear Regression",
      description: "Implement linear regression from scratch using gradient descent optimization.",
      fullDescription: `Build a linear regression model from scratch without using ML libraries:\n\n1. Implement the hypothesis function: h(x) = θ₀ + θ₁x₁ + θ₂x₂ + ... + θₙxₙ\n2. Implement the cost function (Mean Squared Error)\n3. Implement gradient descent to optimize parameters\n4. Train the model on a given dataset\n5. Make predictions on test data\n6. Calculate R² score to evaluate model performance`,
      difficulty: "Medium",
      estimatedTime: "60-90 min",
      points: 160,
      platform: "CodeChef",
      externalLink: "https://www.codechef.com/problems/LINREG",
      tags: ["Machine Learning", "Linear Regression", "Gradient Descent", "Mathematics"],
      hints: [
        "Normalize features for better convergence",
        "Use appropriate learning rate (try 0.01 to start)",
        "Monitor cost function to ensure it's decreasing"
      ],
      approach: "Vectorize operations using matrix multiplication. Implement batch gradient descent for efficiency.",
      constraints: [
        "Training samples: 100-5000",
        "Features: 1-10",
        "Learning rate: 0.001-0.1"
      ]
    },
    {
      id: 8,
      title: "Sorting Algorithm - Quick Sort",
      description: "Implement the Quick Sort algorithm with different partitioning strategies and analyze time complexity.",
      fullDescription: `Implement Quick Sort algorithm with the following requirements:\n\n1. Basic Quick Sort with last element as pivot\n2. Randomized Quick Sort with random pivot selection\n3. Three-way partitioning for handling duplicate elements\n4. Iterative version using explicit stack\n5. Analyze and compare performance on different input types\n6. Handle edge cases like empty arrays and single elements`,
      difficulty: "Easy",
      estimatedTime: "30-45 min",
      points: 80,
      platform: "LeetCode",
      externalLink: "https://leetcode.com/problems/sort-an-array/",
      tags: ["Sorting", "Divide and Conquer", "Recursion", "Algorithms"],
      hints: [
        "Choose pivot carefully to avoid worst-case O(n²) complexity",
        "Use three-way partitioning for arrays with many duplicates",
        "Consider switching to insertion sort for small subarrays"
      ],
      approach: "Use divide-and-conquer approach. Partition array around pivot, then recursively sort subarrays.",
      constraints: [
        "1 ≤ array.length ≤ 5 × 10⁴",
        "-5 × 10⁴ ≤ array[i] ≤ 5 × 10⁴"
      ]
    }
  ];

  // Load completed challenges from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedChallenges');
    if (saved) {
      setCompletedChallenges(new Set(JSON.parse(saved)));
    }
  }, []);

  // Simulate loading challenges
  useEffect(() => {
    const loadChallenges = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setChallenges(mockChallenges);
      setLoading(false);
    };

    loadChallenges();
  }, []);

  // Save completed challenges to localStorage
  const saveCompletedChallenges = (completed) => {
    localStorage.setItem('completedChallenges', JSON.stringify([...completed]));
  };

  // Toggle challenge completion
  const handleToggleComplete = (challengeId) => {
    const newCompleted = new Set(completedChallenges);
    if (newCompleted?.has(challengeId)) {
      newCompleted?.delete(challengeId);
    } else {
      newCompleted?.add(challengeId);
    }
    setCompletedChallenges(newCompleted);
    saveCompletedChallenges(newCompleted);
  };

  // Filter challenges based on search and filters
  const filteredChallenges = useMemo(() => {
    return challenges?.filter(challenge => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        challenge?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        challenge?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        challenge?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase())) ||
        challenge?.platform?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      // Difficulty filter
      const matchesDifficulty = filters?.difficulty === 'all' || 
        challenge?.difficulty?.toLowerCase() === filters?.difficulty;

      // Status filter
      const isCompleted = completedChallenges?.has(challenge?.id);
      const matchesStatus = filters?.status === 'all' || 
        (filters?.status === 'completed' && isCompleted) ||
        (filters?.status === 'pending' && !isCompleted);

      // Topic filter
      const matchesTopic = filters?.topic === 'all' || 
        challenge?.tags?.some(tag => tag?.toLowerCase()?.includes(filters?.topic?.toLowerCase()));

      // Platform filter
      const matchesPlatform = filters?.platform === 'all' || 
        challenge?.platform?.toLowerCase() === filters?.platform;

      return matchesSearch && matchesDifficulty && matchesStatus && matchesTopic && matchesPlatform;
    });
  }, [challenges, searchQuery, filters, completedChallenges]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = challenges?.length;
    const completed = completedChallenges?.size;
    const pending = total - completed;
    const totalPoints = challenges?.filter(challenge => completedChallenges?.has(challenge?.id))?.reduce((sum, challenge) => sum + challenge?.points, 0);

    const easy = challenges?.filter(c => c?.difficulty?.toLowerCase() === 'easy')?.length;
    const medium = challenges?.filter(c => c?.difficulty?.toLowerCase() === 'medium')?.length;
    const hard = challenges?.filter(c => c?.difficulty?.toLowerCase() === 'hard')?.length;

    return { total, completed, pending, totalPoints, easy, medium, hard };
  }, [challenges, completedChallenges]);

  // Generate weekly progress data
  const weeklyProgress = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days?.map(day => ({
      day,
      completed: Math.floor(Math.random() * 4) // Mock data
    }));
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      difficulty: 'all',
      status: 'all',
      topic: 'all',
      platform: 'all'
    });
    setSearchQuery('');
  };

  // Handle search
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    // Search is handled by the filter effect
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Weekly Challenges - AIverse Frontend</title>
          <meta name="description" content="Practice coding challenges and improve your AI and programming skills with our curated weekly challenges." />
        </Helmet>
        <Header />
        <main className="pt-20">
          <LoadingSpinner message="Loading weekly challenges..." />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Weekly Challenges - AIverse Frontend</title>
        <meta name="description" content="Practice coding challenges and improve your AI and programming skills with our curated weekly challenges." />
        <meta name="keywords" content="coding challenges, programming, AI, algorithms, data structures, practice" />
      </Helmet>
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 mb-4">
              <Icon name="Zap" size={16} />
              <span className="text-sm font-medium">Weekly Challenges</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-4">
              Code. Learn. Grow.
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Challenge yourself with carefully curated coding problems designed to enhance your programming skills and prepare you for technical interviews. Track your progress and compete with peers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="default"
                size="lg"
                iconName="Target"
                iconPosition="left"
                onClick={() => document.getElementById('challenges-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Solving
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="TrendingUp"
                iconPosition="left"
                onClick={() => document.getElementById('progress-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Progress
              </Button>
            </div>
          </div>

          {/* Progress Stats */}
          <div id="progress-section">
            <ProgressStats stats={stats} weeklyProgress={weeklyProgress} />
          </div>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />

          {/* Filters */}
          <ChallengeFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            challengeStats={stats}
          />

          {/* Challenges Section */}
          <div id="challenges-section">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-primary">
                Challenges ({filteredChallenges?.length})
              </h2>
              
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Info" size={16} />
                <span className="text-sm">Click cards to expand details</span>
              </div>
            </div>

            {/* Challenge Cards */}
            {filteredChallenges?.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredChallenges?.map((challenge) => (
                  <ChallengeCard
                    key={challenge?.id}
                    challenge={challenge}
                    onToggleComplete={handleToggleComplete}
                    isCompleted={completedChallenges?.has(challenge?.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No challenges match your criteria"
                description="Try adjusting your search terms or filters to find more challenges that match your interests."
                onReset={handleClearFilters}
                showResetButton={searchQuery !== '' || Object.values(filters)?.some(f => f !== 'all')}
              />
            )}
          </div>

          {/* Call to Action */}
          {filteredChallenges?.length > 0 && (
            <div className="mt-16 text-center">
              <div className="glass-card max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon name="Award" size={32} className="text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Ready for More Challenges?
                </h3>
                
                <p className="text-text-secondary mb-6">
                  Join our community of learners and compete on the leaderboard. Track your progress and earn achievements as you solve more challenges.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="default"
                    iconName="Trophy"
                    iconPosition="left"
                    onClick={() => window.location.href = '/student-leaderboard'}
                  >
                    View Leaderboard
                  </Button>
                  
                  <Button
                    variant="outline"
                    iconName="Users"
                    iconPosition="left"
                    onClick={() => window.location.href = '/alverse-section'}
                  >
                    Join Community
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WeeklyChallengesPage;