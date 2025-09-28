import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EventCard from './components/EventCard';
import EventDetailsModal from './components/EventDetailsModal';
import RegistrationModal from './components/RegistrationModal';
import RegistrationSuccessModal from './components/RegistrationSuccessModal';
import AdminRegistrationTable from './components/AdminRegistrationTable';
import EventFilters from './components/EventFilters';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [showAdminView, setShowAdminView] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-asc');

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "AI Workshop: Introduction to Machine Learning",
      description: "Learn the fundamentals of machine learning with hands-on coding exercises. This workshop covers supervised learning, unsupervised learning, and neural networks basics.",
      fullDescription: `Join us for an intensive introduction to Machine Learning workshop designed for beginners and intermediate learners. This comprehensive session will cover the theoretical foundations and practical applications of ML algorithms.

You'll learn about different types of machine learning approaches, work with real datasets, and build your first ML models using Python and popular libraries like scikit-learn and pandas.

The workshop includes interactive coding sessions, group discussions, and a mini-project that you can add to your portfolio. All participants will receive a certificate of completion and access to exclusive learning resources.`,
      type: "Workshop",
      date: "2025-01-25",
      time: "10:00",
      venue: "Tech Auditorium, Main Campus",
      organizer: "AI Club",
      banner: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      registrationOpen: true,
      maxParticipants: 100,
      registeredCount: 67,
      price: 0,
      learningOutcomes: [
        "Understand core ML concepts and algorithms",
        "Hands-on experience with Python ML libraries",
        "Build and evaluate your first ML model",
        "Learn data preprocessing techniques",
        "Network with fellow AI enthusiasts"
      ],
      prerequisites: ["Basic Python Knowledge", "Laptop Required", "Mathematics Fundamentals"],
      agenda: [
        {
          time: "10:00 AM",
          title: "Welcome & Introduction",
          description: "Registration, networking, and overview of the workshop",
          speaker: "Dr. Sarah Johnson"
        },
        {
          time: "10:30 AM",
          title: "ML Fundamentals",
          description: "Core concepts, types of learning, and real-world applications",
          speaker: "Dr. Sarah Johnson"
        },
        {
          time: "12:00 PM",
          title: "Hands-on Coding Session",
          description: "Building your first ML model with Python",
          speaker: "Teaching Assistants"
        },
        {
          time: "02:00 PM",
          title: "Project Work & Q&A",
          description: "Work on mini-project and get expert guidance",
          speaker: "All Speakers"
        }
      ],
      speakers: [
        {
          name: "Dr. Sarah Johnson",
          title: "Senior AI Researcher",
          company: "Google DeepMind",
          bio: "Leading expert in machine learning with 10+ years of experience in AI research and development."
        }
      ]
    },
    {
      id: 2,
      title: "AI Hackathon 2025",
      description: "48-hour hackathon focused on solving real-world problems using artificial intelligence. Teams will compete for prizes worth ₹50,000.",
      fullDescription: `Get ready for the most exciting AI Hackathon of 2025! This 48-hour intensive coding marathon brings together the brightest minds to solve real-world challenges using cutting-edge AI technologies.

Teams of 2-4 members will work on problem statements provided by industry partners, ranging from healthcare AI solutions to environmental sustainability projects. Mentors from top tech companies will guide participants throughout the event.

The hackathon features workshops, networking sessions, and presentations by industry leaders. Winners will receive cash prizes, internship opportunities, and the chance to implement their solutions with our partner organizations.`,
      type: "Hackathon",
      date: "2025-02-15",
      time: "09:00",
      venue: "Innovation Hub, Tech Park",
      organizer: "TechFest Committee",
      banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
      registrationOpen: true,
      maxParticipants: 200,
      registeredCount: 156,
      price: 500,
      learningOutcomes: [
        "Develop AI solutions for real-world problems",
        "Collaborate with talented developers",
        "Learn from industry mentors",
        "Present to potential employers",
        "Win exciting prizes and recognition"
      ],
      prerequisites: ["Programming Experience", "Team Formation", "Laptop & Charger", "Problem-solving Skills"]
    },
    {
      id: 3,
      title: "Deep Learning Seminar",
      description: "Advanced seminar on deep learning architectures, covering CNNs, RNNs, and Transformers. Suitable for intermediate to advanced learners.",
      fullDescription: `Dive deep into the world of neural networks with this comprehensive seminar on Deep Learning architectures. This advanced session is designed for participants with prior ML experience who want to explore the cutting-edge of AI technology.

The seminar covers the evolution of neural networks, from basic perceptrons to modern transformer architectures. You'll understand the mathematical foundations, practical implementations, and real-world applications of various deep learning models.

Interactive demonstrations will show how these architectures work in practice, with examples from computer vision, natural language processing, and generative AI. The session includes hands-on coding exercises and case studies from industry applications.`,
      type: "Seminar",
      date: "2025-02-08",
      time: "14:00",
      venue: "Conference Hall A, Engineering Block",
      organizer: "Computer Science Department",
      banner: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      registrationOpen: true,
      maxParticipants: 80,
      registeredCount: 45,
      price: 200,
      learningOutcomes: [
        "Master deep learning architectures",
        "Understand CNN, RNN, and Transformer models",
        "Learn optimization techniques",
        "Explore real-world applications",
        "Get insights from research experts"
      ],
      prerequisites: ["Machine Learning Basics", "Python Programming", "Linear Algebra", "Statistics Knowledge"]
    },
    {
      id: 4,
      title: "Neural Networks Competition",
      description: "Competitive programming event focused on neural network optimization and architecture design. Cash prizes for top performers.",
      fullDescription: `Test your neural network expertise in this exciting competition that challenges participants to design, optimize, and implement efficient neural network architectures for various tasks.

The competition consists of multiple rounds, starting with theoretical questions about neural network fundamentals, followed by practical coding challenges where you'll implement networks from scratch, and culminating in an optimization challenge where efficiency and accuracy matter.

Participants will work with different datasets and problem types, from image classification to time series prediction. The competition emphasizes both theoretical understanding and practical implementation skills, making it perfect for students who want to showcase their deep learning expertise.`,
      type: "Competition",
      date: "2025-03-01",
      time: "10:00",
      venue: "Computer Lab 1 & 2, IT Building",
      organizer: "Coding Club",
      banner: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop",
      registrationOpen: true,
      maxParticipants: 60,
      registeredCount: 38,
      price: 100,
      learningOutcomes: [
        "Test neural network implementation skills",
        "Learn optimization techniques",
        "Compete with top programmers",
        "Win cash prizes and recognition",
        "Build competitive programming portfolio"
      ],
      prerequisites: ["Deep Learning Knowledge", "Python/PyTorch", "Competitive Programming", "Algorithm Design"]
    },
    {
      id: 5,
      title: "AI Ethics Webinar",
      description: "Online discussion about ethical considerations in AI development, bias in algorithms, and responsible AI practices.",
      fullDescription: `Join leading experts in a crucial discussion about the ethical implications of artificial intelligence in our society. This webinar addresses the growing need for responsible AI development and deployment practices.

The session covers key topics including algorithmic bias, fairness in machine learning, privacy concerns, and the societal impact of AI systems. Expert panelists from academia, industry, and policy-making will share insights and engage in meaningful discussions about the future of ethical AI.

Participants will learn about current frameworks for ethical AI development, case studies of AI bias in real-world applications, and practical strategies for building more inclusive and fair AI systems. The webinar includes interactive Q&A sessions and breakout discussions.`,
      type: "Webinar",
      date: "2025-01-30",
      time: "16:00",
      venue: "Online (Zoom)",
      organizer: "Ethics in Tech Society",
      banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      registrationOpen: true,
      maxParticipants: 500,
      registeredCount: 234,
      price: 0,
      learningOutcomes: [
        "Understand AI ethics frameworks",
        "Learn about algorithmic bias",
        "Explore responsible AI practices",
        "Engage with industry experts",
        "Develop ethical AI mindset"
      ],
      prerequisites: ["Basic AI Knowledge", "Stable Internet Connection", "Interest in Ethics"]
    },
    {
      id: 6,
      title: "Computer Vision Workshop",
      description: "Hands-on workshop on computer vision techniques using OpenCV and deep learning. Build image recognition applications.",
      fullDescription: `Explore the fascinating world of computer vision in this hands-on workshop that takes you from basic image processing to advanced deep learning applications. Perfect for students interested in visual AI and image recognition technologies.

The workshop covers fundamental computer vision concepts, image preprocessing techniques, feature extraction, and modern deep learning approaches for visual tasks. You'll work with popular libraries like OpenCV, TensorFlow, and PyTorch to build practical applications.

Participants will create several projects including object detection systems, facial recognition applications, and image classification models. The workshop emphasizes practical skills with real-world datasets and industry-standard tools and techniques.`,
      type: "Workshop",
      date: "2025-02-20",
      time: "09:30",
      venue: "AI Lab, Research Center",
      organizer: "Vision Research Group",
      banner: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      registrationOpen: false,
      maxParticipants: 40,
      registeredCount: 40,
      price: 300,
      learningOutcomes: [
        "Master computer vision fundamentals",
        "Build image recognition applications",
        "Learn OpenCV and deep learning",
        "Work with real-world datasets",
        "Create portfolio projects"
      ],
      prerequisites: ["Python Programming", "Basic ML Knowledge", "Image Processing Basics", "Laptop with GPU"]
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadEvents = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents(mockEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(event =>
        event?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        event?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        event?.organizer?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(event =>
        event?.type?.toLowerCase() === selectedCategory?.toLowerCase()
      );
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      const now = new Date();
      filtered = filtered?.filter(event => {
        const eventDate = new Date(event.date);
        switch (selectedStatus) {
          case 'open':
            return event?.registrationOpen;
          case 'closed':
            return !event?.registrationOpen;
          case 'upcoming':
            return eventDate > now;
          case 'ongoing':
            return eventDate?.toDateString() === now?.toDateString();
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'title-asc':
          return a?.title?.localeCompare(b?.title);
        case 'title-desc':
          return b?.title?.localeCompare(a?.title);
        case 'popularity':
          return (b?.registeredCount / b?.maxParticipants) - (a?.registeredCount / a?.maxParticipants);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  }, [events, searchQuery, selectedCategory, selectedStatus, sortBy]);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
    setShowEventDetails(false);
  };

  const handleRegistrationSuccess = (registration) => {
    setRegistrationData(registration);
    setShowSuccessModal(true);
    setShowRegistrationModal(false);
    
    // Update event registration count
    setEvents(prevEvents =>
      prevEvents?.map(event =>
        event?.id === registration?.eventId
          ? { ...event, registeredCount: event?.registeredCount + 1 }
          : event
      )
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSortBy('date-asc');
  };

  const getEventStats = () => {
    const totalEvents = events?.length;
    const openRegistrations = events?.filter(e => e?.registrationOpen)?.length;
    const totalRegistrations = events?.reduce((sum, e) => sum + e?.registeredCount, 0);
    const upcomingEvents = events?.filter(e => new Date(e.date) > new Date())?.length;

    return { totalEvents, openRegistrations, totalRegistrations, upcomingEvents };
  };

  const stats = getEventStats();

  return (
    <>
      <Helmet>
        <title>Events - AIverse Frontend</title>
        <meta name="description" content="Discover and register for AI-focused events, workshops, hackathons, and seminars. Join the AIverse community and enhance your artificial intelligence skills." />
        <meta name="keywords" content="AI events, machine learning workshops, hackathons, AI seminars, artificial intelligence, tech events" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gradient-primary mb-6">
                AI Events & Workshops
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                Discover cutting-edge AI events, workshops, and competitions. Join our community of learners and innovators shaping the future of artificial intelligence.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
                <div className="glass-card p-4">
                  <div className="text-2xl font-bold text-primary">{stats?.totalEvents}</div>
                  <div className="text-sm text-text-secondary">Total Events</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-2xl font-bold text-accent">{stats?.openRegistrations}</div>
                  <div className="text-sm text-text-secondary">Open Registration</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-2xl font-bold text-secondary">{stats?.totalRegistrations}</div>
                  <div className="text-sm text-text-secondary">Total Registrations</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-2xl font-bold text-success">{stats?.upcomingEvents}</div>
                  <div className="text-sm text-text-secondary">Upcoming Events</div>
                </div>
              </div>

              {/* Admin Toggle */}
              <div className="flex justify-center">
                <Button
                  variant={showAdminView ? "default" : "outline"}
                  iconName="Settings"
                  iconPosition="left"
                  onClick={() => setShowAdminView(!showAdminView)}
                >
                  {showAdminView ? 'Hide Admin View' : 'Show Admin View'}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <EventFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
            />

            {/* Events Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 })?.map((_, index) => (
                  <div key={index} className="glass-card animate-pulse">
                    <div className="h-48 bg-surface/30 rounded-t-xl" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-surface/30 rounded w-3/4" />
                      <div className="h-4 bg-surface/30 rounded w-1/2" />
                      <div className="space-y-2">
                        <div className="h-3 bg-surface/30 rounded" />
                        <div className="h-3 bg-surface/30 rounded w-5/6" />
                      </div>
                      <div className="h-10 bg-surface/30 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEvents?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents?.map((event, index) => (
                  <EventCard
                    key={event?.id}
                    event={event}
                    onViewDetails={handleViewDetails}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-surface/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Calendar" size={48} className="text-text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">No Events Found</h3>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                  We couldn't find any events matching your criteria. Try adjusting your filters or check back later for new events.
                </p>
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Admin Registration Table */}
            <AdminRegistrationTable isVisible={showAdminView} />
          </div>
        </section>

        {/* Modals */}
        <EventDetailsModal
          event={selectedEvent}
          isOpen={showEventDetails}
          onClose={() => setShowEventDetails(false)}
          onRegister={handleRegister}
        />

        <RegistrationModal
          event={selectedEvent}
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          onSuccess={handleRegistrationSuccess}
        />

        <RegistrationSuccessModal
          registration={registrationData}
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      </div>
    </>
  );
};

export default EventsPage;