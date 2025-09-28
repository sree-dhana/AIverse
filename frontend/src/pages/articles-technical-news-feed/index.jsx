import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ArticleCard from './components/ArticleCard';
import SearchAndFilters from './components/SearchAndFilters';
import ArticleSubmissionModal from './components/ArticleSubmissionModal';
import LoadingSkeletons from './components/LoadingSkeletons';
import EmptyState from './components/EmptyState';

const ArticlesTechnicalNewsFeed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    sort: 'latest',
    time: 'all-time'
  });
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const articlesPerPage = 9;

  // Mock articles data
  const mockArticles = [
    {
      id: 1,
      title: "Getting Started with Machine Learning: A Comprehensive Guide for Beginners",
      excerpt: "Dive into the world of machine learning with this beginner-friendly guide covering fundamental concepts, algorithms, and practical applications.",
      content: `Machine learning has revolutionized the way we approach problem-solving in technology. This comprehensive guide will walk you through the essential concepts you need to understand before diving into ML projects.\n\nWe'll cover supervised learning, unsupervised learning, and reinforcement learning, along with practical examples and code snippets to help you get started on your ML journey.`,
      author: {
        name: "Dr. Sarah Chen",
        role: "AI Research Professor",
        email: "sarah.chen@university.edu"
      },
      publishedAt: "2024-01-15T10:30:00Z",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      tags: ["Machine Learning", "Python", "Data Science", "Beginner"],
      category: "tutorials",
      readingTime: 8,
      views: 2847,
      likes: 156,
      comments: 23,
      isBookmarked: false
    },
    {
      id: 2,
      title: "HackAI 2024: The Ultimate AI Hackathon Experience",
      excerpt: "Join thousands of developers in the biggest AI hackathon of the year. Build innovative solutions and compete for amazing prizes.",
      content: `HackAI 2024 is set to be the most exciting AI hackathon event of the year. Participants will have 48 hours to build innovative AI solutions that address real-world problems.\n\nWith over $100,000 in prizes and mentorship from industry leaders, this is an opportunity you don't want to miss. Registration opens next week!`,
      author: {
        name: "Alex Rodriguez",
        role: "Event Coordinator",
        email: "alex@hackai.com"
      },
      publishedAt: "2024-01-14T14:20:00Z",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      tags: ["Hackathon", "AI", "Competition", "Innovation"],
      category: "hackathons",
      readingTime: 5,
      views: 1923,
      likes: 89,
      comments: 15,
      isBookmarked: true
    },
    {
      id: 3,
      title: "OpenAI Releases GPT-4 Turbo: What Developers Need to Know",
      excerpt: "Explore the latest features and improvements in GPT-4 Turbo, including enhanced context length and reduced costs for API usage.",
      content: `OpenAI has announced the release of GPT-4 Turbo, bringing significant improvements to developers and businesses using AI in their applications.\n\nKey features include 128K context length, knowledge cutoff updated to April 2024, and 3x cheaper pricing for input tokens. This update represents a major step forward in making advanced AI more accessible.`,
      author: {
        name: "Michael Zhang",
        role: "Tech Journalist",
        email: "michael@technews.com"
      },
      publishedAt: "2024-01-13T09:15:00Z",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      tags: ["OpenAI", "GPT-4", "API", "AI News"],
      category: "ai-news",
      readingTime: 6,
      views: 3456,
      likes: 234,
      comments: 45,
      isBookmarked: false
    },
    {
      id: 4,
      title: "Building Responsive Web Apps with React 18 and TypeScript",
      excerpt: "Learn modern React development patterns and best practices for creating scalable, type-safe web applications.",
      content: `React 18 introduced several groundbreaking features that change how we think about building user interfaces. Combined with TypeScript, developers can create more robust and maintainable applications.\n\nThis tutorial covers concurrent features, automatic batching, and the new Suspense improvements, along with TypeScript integration patterns that will make your code more reliable.`,
      author: {
        name: "Emma Thompson",
        role: "Senior Frontend Developer",
        email: "emma@webdev.io"
      },
      publishedAt: "2024-01-12T16:45:00Z",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      tags: ["React", "TypeScript", "Web Development", "Frontend"],
      category: "tutorials",
      readingTime: 12,
      views: 1876,
      likes: 98,
      comments: 19,
      isBookmarked: true
    },
    {
      id: 5,
      title: "The Ethics of AI: Navigating Bias and Fairness in Machine Learning",
      excerpt: "Examine the critical ethical considerations in AI development and learn strategies for building more fair and inclusive systems.",
      content: `As AI systems become more prevalent in society, addressing bias and ensuring fairness has become a critical concern for developers and researchers.\n\nThis article explores common sources of bias in ML models, techniques for bias detection and mitigation, and frameworks for ethical AI development that prioritize fairness and inclusivity.`,
      author: {
        name: "Dr. Aisha Patel",
        role: "AI Ethics Researcher",
        email: "aisha@ethicsai.org"
      },
      publishedAt: "2024-01-11T11:30:00Z",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      tags: ["AI Ethics", "Bias", "Fairness", "Research"],
      category: "research",
      readingTime: 10,
      views: 2134,
      likes: 167,
      comments: 31,
      isBookmarked: false
    },
    {
      id: 6,
      title: "Cloud Computing Trends 2024: What's Next for Developers",
      excerpt: "Discover the latest trends in cloud computing and how they're shaping the future of software development and deployment.",
      content: `The cloud computing landscape continues to evolve rapidly, with new services and paradigms emerging that change how we build and deploy applications.\n\nFrom serverless computing to edge computing and AI-powered cloud services, this article examines the trends that will define cloud development in 2024 and beyond.`,
      author: {
        name: "James Wilson",
        role: "Cloud Architect",
        email: "james@cloudtech.com"
      },
      publishedAt: "2024-01-10T13:20:00Z",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      tags: ["Cloud Computing", "Serverless", "DevOps", "Industry"],
      category: "industry",
      readingTime: 7,
      views: 1654,
      likes: 78,
      comments: 12,
      isBookmarked: false
    },
    {
      id: 7,
      title: "Deep Learning for Computer Vision: Advanced Techniques",
      excerpt: "Explore advanced computer vision techniques using deep learning, including object detection, image segmentation, and neural style transfer.",
      content: `Computer vision has been transformed by deep learning, enabling applications that were previously impossible. This advanced tutorial covers cutting-edge techniques in the field.\n\nWe'll explore convolutional neural networks, transfer learning, and state-of-the-art architectures like Vision Transformers, with practical implementations and real-world applications.`,
      author: {
        name: "Dr. Kevin Liu",
        role: "Computer Vision Researcher",
        email: "kevin@visionlab.edu"
      },
      publishedAt: "2024-01-09T08:45:00Z",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=400&fit=crop",
      tags: ["Deep Learning", "Computer Vision", "CNN", "Advanced"],
      category: "tutorials",
      readingTime: 15,
      views: 2987,
      likes: 201,
      comments: 38,
      isBookmarked: true
    },
    {
      id: 8,
      title: "CodeFest 2024: Student Developer Competition Announced",
      excerpt: "The annual CodeFest competition is back with exciting challenges and opportunities for student developers to showcase their skills.",
      content: `CodeFest 2024 promises to be the biggest student developer competition yet, with challenges spanning web development, mobile apps, and AI/ML projects.\n\nStudents from universities worldwide can participate in this month-long competition, with mentorship from industry professionals and prizes worth over $50,000.`,
      author: {
        name: "Lisa Park",
        role: "Student Program Manager",
        email: "lisa@codefest.org"
      },
      publishedAt: "2024-01-08T15:10:00Z",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
      tags: ["Competition", "Students", "Coding", "Hackathon"],
      category: "hackathons",
      readingTime: 4,
      views: 1432,
      likes: 67,
      comments: 9,
      isBookmarked: false
    },
    {
      id: 9,
      title: "Natural Language Processing: From Basics to BERT",
      excerpt: "A comprehensive journey through NLP concepts, from traditional approaches to modern transformer-based models like BERT and GPT.",
      content: `Natural Language Processing has evolved dramatically with the introduction of transformer architectures. This comprehensive guide takes you from basic NLP concepts to advanced models.\n\nWe'll cover tokenization, word embeddings, attention mechanisms, and dive deep into how BERT and similar models have revolutionized language understanding tasks.`,
      author: {
        name: "Dr. Maria Garcia",
        role: "NLP Research Scientist",
        email: "maria@nlplab.com"
      },
      publishedAt: "2024-01-07T12:00:00Z",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      tags: ["NLP", "BERT", "Transformers", "Language Models"],
      category: "tutorials",
      readingTime: 11,
      views: 2456,
      likes: 143,
      comments: 27,
      isBookmarked: false
    }
  ];

  // Filter and search articles
  const filteredArticles = useMemo(() => {
    let filtered = [...mockArticles];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(article =>
        article?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        article?.excerpt?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        article?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase())) ||
        article?.author?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilters?.category && activeFilters?.category !== 'all') {
      filtered = filtered?.filter(article => article?.category === activeFilters?.category);
    }

    // Apply time filter
    if (activeFilters?.time && activeFilters?.time !== 'all-time') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (activeFilters?.time) {
        case 'today':
          filterDate?.setDate(now?.getDate() - 1);
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'year':
          filterDate?.setFullYear(now?.getFullYear() - 1);
          break;
      }
      
      filtered = filtered?.filter(article => new Date(article.publishedAt) >= filterDate);
    }

    // Apply sorting
    switch (activeFilters?.sort) {
      case 'popular':
        filtered?.sort((a, b) => (b?.views + b?.likes) - (a?.views + a?.likes));
        break;
      case 'trending':
        filtered?.sort((a, b) => b?.likes - a?.likes);
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      default: // latest
        filtered?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    return filtered;
  }, [searchQuery, activeFilters]);

  // Paginated articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticles?.slice(0, endIndex);
  }, [filteredArticles, currentPage]);

  // Load articles (simulate API call)
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      try {
        setArticles(mockArticles);
        setLoading(false);
      } catch {
        setError('Failed to load articles');
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Update URL search params
  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  // Check if there are more articles to load
  useEffect(() => {
    setHasMore(paginatedArticles?.length < filteredArticles?.length);
  }, [paginatedArticles?.length, filteredArticles?.length]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (type, value) => {
    if (type === 'clear') {
      setActiveFilters({
        category: 'all',
        sort: 'latest',
        time: 'all-time'
      });
      setSearchQuery('');
      setCurrentPage(1);
    } else {
      setActiveFilters(prev => ({ ...prev, [type]: value }));
      setCurrentPage(1);
    }
  };

  const handleBookmark = (articleId, isBookmarked) => {
    setArticles(prev =>
      prev?.map(article =>
        article?.id === articleId ? { ...article, isBookmarked } : article
      )
    );
  };

  const handleShare = (article) => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location?.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(`${article?.title}\n${window.location?.href}`);
      // You could show a toast notification here
    }
  };

  const handleReadArticle = (article) => {
    // In a real app, this would navigate to the full article page
    console.log('Reading article:', article?.title);
  };

  const handleSubmitArticle = (articleData) => {
    const newArticle = {
      ...articleData,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
      views: 0,
      likes: 0,
      comments: 0
    };
    
    setArticles(prev => [newArticle, ...prev]);
    setShowSubmissionModal(false);
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const getEmptyStateType = () => {
    if (error) return 'loading-error';
    if (searchQuery && filteredArticles?.length === 0) return 'no-search-results';
    if (activeFilters?.category !== 'all' && filteredArticles?.length === 0) return 'no-filtered-results';
    return 'no-articles';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
              Articles & Technical News
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Discover the latest insights, tutorials, and news in AI, machine learning, and technology. 
              Share your knowledge and learn from the community.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="FileText" size={20} />
                <span>{filteredArticles?.length} Articles</span>
              </div>
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Users" size={20} />
                <span>50+ Contributors</span>
              </div>
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Eye" size={20} />
                <span>100K+ Views</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setShowSubmissionModal(true)}
                className="animate-pulse-glow"
              >
                Submit Article
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName={viewMode === 'grid' ? 'List' : 'Grid3X3'}
                iconPosition="left"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            {loading ? (
              <LoadingSkeletons type="search-filters" />
            ) : (
              <SearchAndFilters
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
                searchQuery={searchQuery}
              />
            )}
          </motion.div>

          {/* Articles Grid/List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {loading ? (
              <LoadingSkeletons type="articles" count={6} />
            ) : filteredArticles?.length === 0 ? (
              <EmptyState
                type={getEmptyStateType()}
                searchQuery={searchQuery}
                activeFilters={activeFilters}
                onClearFilters={() => handleFilterChange('clear')}
                onReset={() => handleFilterChange('clear')}
                onSubmitArticle={() => setShowSubmissionModal(true)}
              />
            ) : (
              <>
                <div className={`${
                  viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'
                }`}>
                  <AnimatePresence>
                    {paginatedArticles?.map((article, index) => (
                      <motion.div
                        key={article?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ArticleCard
                          article={article}
                          onBookmark={handleBookmark}
                          onShare={handleShare}
                          onRead={handleReadArticle}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-12"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="ChevronDown"
                      iconPosition="right"
                      onClick={loadMore}
                      className="min-w-[200px]"
                    >
                      Load More Articles
                    </Button>
                    <p className="text-text-muted text-sm mt-3">
                      Showing {paginatedArticles?.length} of {filteredArticles?.length} articles
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </main>
      {/* Article Submission Modal */}
      <ArticleSubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={handleSubmitArticle}
      />
      {/* Floating Action Button for Mobile */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSubmissionModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-elevated flex items-center justify-center text-white fab-pulse lg:hidden z-40"
      >
        <Icon name="Plus" size={24} />
      </motion.button>
      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 w-12 h-12 glass rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors z-40"
      >
        <Icon name="ArrowUp" size={20} />
      </motion.button>
    </div>
  );
};

export default ArticlesTechnicalNewsFeed;