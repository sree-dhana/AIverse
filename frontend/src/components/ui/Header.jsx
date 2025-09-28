import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Challenge Available', message: 'Weekly AI Challenge #47 is now live!', time: '2 min ago', unread: true },
    { id: 2, title: 'Achievement Unlocked', message: 'You earned the "Problem Solver" badge!', time: '1 hour ago', unread: true },
    { id: 3, title: 'Event Reminder', message: 'AI Workshop starts in 30 minutes', time: '30 min ago', unread: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState({
    name: 'Alex Chen',
    avatar: '/assets/images/avatar-placeholder.png',
    isAuthenticated: true,
    role: 'student'
  });
  const [showUserMenu, setShowUserMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/landing-page', icon: 'Home' },
    { name: 'Events', path: '/events-page', icon: 'Calendar' },
    { name: 'Articles', path: '/articles-technical-news-feed', icon: 'BookOpen' },
    { name: 'Leaderboard', path: '/student-leaderboard', icon: 'Trophy' },
    { name: 'Challenges', path: '/weekly-challenges-page', icon: 'Zap' },
    { name: 'AIverse', path: '/alverse-section', icon: 'Users' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
      if (!event?.target?.closest('.user-menu-dropdown')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/articles-technical-news-feed?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === notificationId ? { ...notif, unread: false } : notif
      )
    );
  };

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setUser({ ...user, isAuthenticated: false });
    setShowUserMenu(false);
    navigate('/landing-page');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass backdrop-blur-xl border-b border-border' :'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/landing-page')}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-primary">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse-glow"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gradient-primary">AIverse</h1>
              <p className="text-xs text-text-secondary -mt-1">Frontend</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-medium">{item?.name}</span>
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <div className={`flex items-center transition-all duration-250 ${
                isSearchFocused ? 'w-96' : 'w-64'
              }`}>
                <input
                  type="text"
                  placeholder="Search articles, challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full px-4 py-2 pl-10 bg-surface/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 backdrop-blur-sm"
                />
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 text-text-secondary" 
                />
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search */}
            <button className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors">
              <Icon name="Search" size={20} />
            </button>

            {/* Notifications */}
            <div className="relative notification-dropdown">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center animate-pulse-glow">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 glass rounded-xl border border-border shadow-elevated animate-modal-enter">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-text-primary">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications?.map((notification) => (
                      <div
                        key={notification?.id}
                        onClick={() => handleNotificationClick(notification?.id)}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-surface/30 transition-colors ${
                          notification?.unread ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification?.unread ? 'bg-primary' : 'bg-transparent'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-text-primary text-sm">{notification?.title}</h4>
                            <p className="text-text-secondary text-sm mt-1">{notification?.message}</p>
                            <p className="text-text-muted text-xs mt-2">{notification?.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            {user?.isAuthenticated ? (
              <div className="relative user-menu-dropdown">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-surface/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <Icon name="ChevronDown" size={16} className="text-text-secondary" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-56 glass rounded-xl border border-border shadow-elevated animate-modal-enter">
                    <div className="p-4 border-b border-border">
                      <p className="font-semibold text-text-primary">{user?.name}</p>
                      <p className="text-text-secondary text-sm capitalize">{user?.role}</p>
                    </div>
                    <div className="py-2">
                      <button className="w-full px-4 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-surface/30 transition-colors flex items-center space-x-2">
                        <Icon name="User" size={16} />
                        <span>Profile</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-surface/30 transition-colors flex items-center space-x-2">
                        <Icon name="Settings" size={16} />
                        <span>Settings</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-surface/30 transition-colors flex items-center space-x-2">
                        <Icon name="Award" size={16} />
                        <span>Achievements</span>
                      </button>
                      <div className="border-t border-border my-2"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-error hover:bg-error/10 transition-colors flex items-center space-x-2"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button variant="default" size="sm" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass border-t border-border animate-slide-down">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full px-4 py-3 pl-10 bg-surface/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Icon name="Search" size={18} className="absolute left-3 top-3.5 text-text-secondary" />
              </form>

              {/* Mobile Navigation Items */}
              <nav className="space-y-2">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActivePath(item?.path)
                        ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;