import React, { useState, useEffect } from 'react';
import {  AnimatePresence } from 'framer-motion';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ArticleSubmissionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    category: '',
    authorName: '',
    authorRole: '',
    authorEmail: '',
    estimatedReadingTime: '',
    featuredImage: null,
    isDraft: false,
    allowComments: true,
    notifyOnPublish: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const categories = [
    { value: 'hackathons', label: 'Hackathons' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'ai-news', label: 'AI News' },
    { value: 'research', label: 'Research' },
    { value: 'industry', label: 'Industry' }
  ];

  const availableTags = [
    'Machine Learning', 'Deep Learning', 'Python', 'JavaScript', 'React',
    'AI Ethics', 'Computer Vision', 'NLP', 'Data Science', 'Web Development',
    'Mobile Development', 'Cloud Computing', 'DevOps', 'Blockchain', 'IoT'
  ];

  useEffect(() => {
    if (isOpen) {
      // Load draft from localStorage if exists
      const savedDraft = localStorage.getItem('article-draft');
      if (savedDraft) {
        try {
          const draftData = JSON.parse(savedDraft);
          setFormData(draftData);
        } catch (error) {
          console.error('Error loading draft:', error);
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-save draft to localStorage
    if (formData?.title || formData?.content) {
      localStorage.setItem('article-draft', JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    // Calculate word count
    const words = formData?.content?.trim()?.split(/\s+/)?.filter(word => word?.length > 0);
    setWordCount(words?.length);
    
    // Estimate reading time (average 200 words per minute)
    const estimatedTime = Math.max(1, Math.ceil(words?.length / 200));
    setFormData(prev => ({ ...prev, estimatedReadingTime: estimatedTime?.toString() }));
  }, [formData?.content]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev?.tags?.includes(tag)
        ? prev?.tags?.filter(t => t !== tag)
        : [...(Array.isArray(prev?.tags) ? prev.tags : []), tag]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) newErrors.title = 'Title is required';
    if (!formData?.excerpt?.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData?.content?.trim()) newErrors.content = 'Content is required';
    if (!formData?.category) newErrors.category = 'Category is required';
    if (!formData?.authorName?.trim()) newErrors.authorName = 'Author name is required';
    if (!formData?.authorRole?.trim()) newErrors.authorRole = 'Author role is required';
    if (!formData?.authorEmail?.trim()) newErrors.authorEmail = 'Author email is required';
    if (formData?.tags?.length === 0) newErrors.tags = 'At least one tag is required';

    if (formData?.title?.length > 100) newErrors.title = 'Title must be less than 100 characters';
    if (formData?.excerpt?.length > 300) newErrors.excerpt = 'Excerpt must be less than 300 characters';
    if (wordCount < 100) newErrors.content = 'Content must be at least 100 words';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const articleData = {
        ...formData,
        id: Date.now(),
        publishedAt: new Date()?.toISOString(),
        views: 0,
        likes: 0,
        comments: 0,
        isBookmarked: false
      };

      onSubmit?.(articleData);
      
      // Clear draft from localStorage
      localStorage.removeItem('article-draft');
      
      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        tags: [],
        category: '',
        authorName: '',
        authorRole: '',
        authorEmail: '',
        estimatedReadingTime: '',
        featuredImage: null,
        isDraft: false,
        allowComments: true,
        notifyOnPublish: true
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting article:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (formData?.title || formData?.content) {
      if (window.confirm('You have unsaved changes. Do you want to save as draft?')) {
        localStorage.setItem('article-draft', JSON.stringify(formData));
      }
    }
    onClose();
  };

  const clearDraft = () => {
    localStorage.removeItem('article-draft');
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      tags: [],
      category: '',
      authorName: '',
      authorRole: '',
      authorEmail: '',
      estimatedReadingTime: '',
      featuredImage: null,
      isDraft: false,
      allowComments: true,
      notifyOnPublish: true
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass rounded-2xl border border-border shadow-elevated overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Submit Article</h2>
              <p className="text-text-secondary mt-1">Share your knowledge with the community</p>
            </div>
            <div className="flex items-center space-x-2">
              {!showPreview && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={() => setShowPreview(true)}
                >
                  Preview
                </Button>
              )}
              {showPreview && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  onClick={() => setShowPreview(false)}
                >
                  Edit
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={handleClose}
              />
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            {!showPreview ? (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="lg:col-span-2">
                    <Input
                      label="Article Title"
                      type="text"
                      placeholder="Enter a compelling title..."
                      value={formData?.title}
                      onChange={(e) => handleInputChange('title', e?.target?.value)}
                      error={errors?.title}
                      required
                      className="text-lg"
                    />
                    <p className="text-xs text-text-muted mt-1">
                      {formData?.title?.length}/100 characters
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    <Input
                      label="Excerpt"
                      type="text"
                      placeholder="Brief description of your article..."
                      value={formData?.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e?.target?.value)}
                      error={errors?.excerpt}
                      required
                    />
                    <p className="text-xs text-text-muted mt-1">
                      {formData?.excerpt?.length}/300 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Category *
                    </label>
                    <div className="space-y-2">
                      {categories?.map((category) => (
                        <button
                          key={category?.value}
                          type="button"
                          onClick={() => handleInputChange('category', category?.value)}
                          className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                            formData?.category === category?.value
                              ? 'bg-primary/20 text-primary border-primary/30' :'bg-surface/50 text-text-secondary border-border hover:bg-surface/70'
                          }`}
                        >
                          {category?.label}
                        </button>
                      ))}
                    </div>
                    {errors?.category && (
                      <p className="text-error text-xs mt-1">{errors?.category}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Tags * (Select up to 5)
                    </label>
                    <div className="max-h-40 overflow-y-auto space-y-1 border border-border rounded-lg p-3 bg-surface/30">
                      {availableTags?.map((tag) => (
                        <label
                          key={tag}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-surface/50 p-1 rounded"
                        >
                          <Checkbox
                            checked={formData?.tags?.includes(tag)}
                            onChange={() => handleTagToggle(tag)}
                            disabled={!formData?.tags?.includes(tag) && formData?.tags?.length >= 5}
                          />
                          <span className="text-sm text-text-secondary">{tag}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                      {formData?.tags?.length}/5 tags selected
                    </p>
                    {errors?.tags && (
                      <p className="text-error text-xs mt-1">{errors?.tags}</p>
                    )}
                  </div>
                </div>

                {/* Author Information */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Author Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Full Name"
                      type="text"
                      placeholder="Your name"
                      value={formData?.authorName}
                      onChange={(e) => handleInputChange('authorName', e?.target?.value)}
                      error={errors?.authorName}
                      required
                    />
                    <Input
                      label="Role/Title"
                      type="text"
                      placeholder="e.g., Student, Professor, Developer"
                      value={formData?.authorRole}
                      onChange={(e) => handleInputChange('authorRole', e?.target?.value)}
                      error={errors?.authorRole}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData?.authorEmail}
                      onChange={(e) => handleInputChange('authorEmail', e?.target?.value)}
                      error={errors?.authorEmail}
                      required
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="border-t border-border pt-6">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Article Content *
                  </label>
                  <textarea
                    placeholder="Write your article content here... You can use Markdown formatting."
                    value={formData?.content}
                    onChange={(e) => handleInputChange('content', e?.target?.value)}
                    rows={12}
                    className="w-full px-4 py-3 bg-surface/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-text-muted">
                      {wordCount} words • ~{formData?.estimatedReadingTime} min read
                    </p>
                    <p className="text-xs text-text-secondary">
                      Supports Markdown formatting
                    </p>
                  </div>
                  {errors?.content && (
                    <p className="text-error text-xs mt-1">{errors?.content}</p>
                  )}
                </div>

                {/* Settings */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Publication Settings</h3>
                  <div className="space-y-3">
                    <Checkbox
                      label="Save as draft (don't publish immediately)"
                      checked={formData?.isDraft}
                      onChange={(e) => handleInputChange('isDraft', e?.target?.checked)}
                    />
                    <Checkbox
                      label="Allow comments on this article"
                      checked={formData?.allowComments}
                      onChange={(e) => handleInputChange('allowComments', e?.target?.checked)}
                    />
                    <Checkbox
                      label="Notify me when article is published"
                      checked={formData?.notifyOnPublish}
                      onChange={(e) => handleInputChange('notifyOnPublish', e?.target?.checked)}
                    />
                  </div>
                </div>
              </form>
            ) : (
              /* Preview Mode */
              (<div className="p-6">
                <div className="glass rounded-xl p-6 border border-border">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-lg border bg-primary/20 text-primary border-primary/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h1 className="text-3xl font-bold text-text-primary mb-4">
                    {formData?.title || 'Article Title'}
                  </h1>
                  
                  <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-border">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {formData?.authorName ? formData?.authorName?.split(' ')?.map(n => n?.[0])?.join('') : 'A'}
                      </span>
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">
                        {formData?.authorName || 'Author Name'}
                      </p>
                      <p className="text-text-secondary text-sm">
                        {formData?.authorRole || 'Author Role'} • {formData?.estimatedReadingTime || '5'} min read
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary text-lg mb-6 italic">
                    {formData?.excerpt || 'Article excerpt will appear here...'}
                  </p>
                  
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-text-primary">
                      {formData?.content || 'Article content will appear here...'}
                    </div>
                  </div>
                </div>
              </div>)
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border bg-surface/30">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={clearDraft}
                className="text-error hover:text-error"
              >
                Clear Draft
              </Button>
              <p className="text-xs text-text-muted">
                Auto-saved to drafts
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              {!showPreview && (
                <Button
                  type="submit"
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="right"
                  onClick={handleSubmit}
                >
                  {formData?.isDraft ? 'Save Draft' : 'Publish Article'}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ArticleSubmissionModal;