import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PartnersSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPartner, setSelectedPartner] = useState(null);

  const partnersData = [
    {
      id: 1,
      name: "Google AI",
      category: "industry",
      type: "Technology Partner",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop",
      description: "Leading technology company providing AI research resources and mentorship opportunities for students.",
      website: "https://ai.google",
      partnership_since: "2020",
      contributions: ["Research Grants", "Mentorship Program", "Cloud Credits", "Workshop Speakers"],
      contact_person: "Dr. Jennifer Liu",
      contact_email: "partnerships@google.com",
      focus_areas: ["Machine Learning", "Natural Language Processing", "Computer Vision"],
      opportunities: ["Internships", "Research Collaboration", "Hackathon Sponsorship"],
      isHighlighted: true
    },
    {
      id: 2,
      name: "Microsoft Research",
      category: "industry",
      type: "Research Partner",
      logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=100&h=100&fit=crop",
      description: "Global technology leader supporting AI education through research initiatives and student programs.",
      website: "https://research.microsoft.com",
      partnership_since: "2019",
      contributions: ["Azure Credits", "Research Funding", "Technical Workshops", "Career Guidance"],
      contact_person: "Prof. Michael Chen",
      contact_email: "research@microsoft.com",
      focus_areas: ["AI Ethics", "Quantum Computing", "Mixed Reality"],
      opportunities: ["Summer Internships", "PhD Fellowships", "Open Source Projects"],
      isHighlighted: true
    },
    {
      id: 3,
      name: "NVIDIA",
      category: "industry",
      type: "Hardware Partner",
      logo: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100&h=100&fit=crop",
      description: "Leading GPU manufacturer providing hardware resources and deep learning expertise to our community.",
      website: "https://nvidia.com/ai",
      partnership_since: "2021",
      contributions: ["GPU Access", "CUDA Training", "Deep Learning Workshops", "Hardware Donations"],
      contact_person: "Sarah Rodriguez",
      contact_email: "education@nvidia.com",
      focus_areas: ["Deep Learning", "GPU Computing", "AI Hardware"],
      opportunities: ["Hardware Access", "Technical Training", "Research Grants"],
      isHighlighted: false
    },
    {
      id: 4,
      name: "Dr. Andrew Ng",
      category: "mentor",
      type: "AI Pioneer & Mentor",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      description: "Renowned AI researcher and educator, founder of Coursera and former director of Stanford AI Lab.",
      website: "https://andrewng.org",
      partnership_since: "2020",
      contributions: ["Guest Lectures", "Career Mentorship", "Course Development", "Strategic Guidance"],
      contact_person: "Dr. Andrew Ng",
      contact_email: "mentorship@andrewng.org",
      focus_areas: ["Machine Learning Education", "AI Strategy", "Career Development"],
      opportunities: ["One-on-One Mentoring", "Guest Speaking", "Course Review"],
      isHighlighted: true
    },
    {
      id: 5,
      name: "Dr. Fei-Fei Li",
      category: "mentor",
      type: "Computer Vision Expert",
      logo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      description: "Professor at Stanford University and co-director of Human-Centered AI Institute, expert in computer vision.",
      website: "https://profiles.stanford.edu/fei-fei-li",
      partnership_since: "2021",
      contributions: ["Research Guidance", "PhD Mentorship", "Conference Speaking", "Grant Writing Support"],
      contact_person: "Dr. Fei-Fei Li",
      contact_email: "mentorship@stanford.edu",
      focus_areas: ["Computer Vision", "Human-Centered AI", "Research Methodology"],
      opportunities: ["Research Collaboration", "PhD Guidance", "Paper Reviews"],
      isHighlighted: true
    },
    {
      id: 6,
      name: "OpenAI",
      category: "industry",
      type: "AI Research Partner",
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop",
      description: "AI research company focused on developing safe and beneficial artificial general intelligence.",
      website: "https://openai.com",
      partnership_since: "2022",
      contributions: ["API Access", "Research Collaboration", "Safety Guidelines", "Technical Workshops"],
      contact_person: "Dr. Sarah Johnson",
      contact_email: "partnerships@openai.com",
      focus_areas: ["Large Language Models", "AI Safety", "Generative AI"],
      opportunities: ["API Credits", "Research Projects", "Safety Training"],
      isHighlighted: false
    },
    {
      id: 7,
      name: "MIT CSAIL",
      category: "academic",
      type: "Academic Partner",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop",
      description: "Computer Science and Artificial Intelligence Laboratory at MIT, leading research institution.",
      website: "https://csail.mit.edu",
      partnership_since: "2019",
      contributions: ["Research Exchange", "Joint Publications", "Student Exchange", "Lab Access"],
      contact_person: "Prof. Regina Barzilay",
      contact_email: "partnerships@csail.mit.edu",
      focus_areas: ["Natural Language Processing", "Machine Learning", "Robotics"],
      opportunities: ["Research Exchange", "Joint Projects", "Conference Presentations"],
      isHighlighted: false
    },
    {
      id: 8,
      name: "Dr. Yoshua Bengio",
      category: "mentor",
      type: "Deep Learning Pioneer",
      logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      description: "Turing Award winner and professor at University of Montreal, pioneer in deep learning research.",
      website: "https://yoshuabengio.org",
      partnership_since: "2020",
      contributions: ["Research Mentorship", "Conference Keynotes", "Grant Support", "Ethical AI Guidance"],
      contact_person: "Dr. Yoshua Bengio",
      contact_email: "mentorship@mila.quebec",
      focus_areas: ["Deep Learning", "AI Ethics", "Representation Learning"],
      opportunities: ["Research Mentorship", "Ethical AI Training", "Conference Speaking"],
      isHighlighted: true
    }
  ];

  const categories = [
    { id: 'all', label: 'All Partners', icon: 'Users' },
    { id: 'industry', label: 'Industry', icon: 'Building' },
    { id: 'academic', label: 'Academic', icon: 'GraduationCap' },
    { id: 'mentor', label: 'Mentors', icon: 'UserCheck' }
  ];

  const filteredPartners = selectedCategory === 'all' 
    ? partnersData 
    : partnersData?.filter(partner => partner?.category === selectedCategory);

  const PartnerCard = ({ partner }) => (
    <div className={`glass rounded-xl p-6 card-hover cursor-pointer transition-all duration-300 ${
      partner?.isHighlighted ? 'border-primary/30 shadow-glow-primary' : ''
    }`} onClick={() => setSelectedPartner(partner)}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary/20">
            <Image
              src={partner?.logo}
              alt={partner?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-bold text-text-primary truncate">{partner?.name}</h3>
            {partner?.isHighlighted && (
              <Icon name="Star" size={16} className="text-accent flex-shrink-0" />
            )}
          </div>
          
          <p className="text-primary font-medium text-sm mb-2">{partner?.type}</p>
          <p className="text-text-secondary text-sm mb-3 line-clamp-2">{partner?.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-text-muted text-xs">
              <Icon name="Calendar" size={12} />
              <span>Since {partner?.partnership_since}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ExternalLink" size={14} className="text-text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient-primary mb-4">Partners & Mentors</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Collaborating with industry leaders, academic institutions, and renowned experts to provide world-class opportunities for our community.
        </p>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories?.map(category => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              selectedCategory === category?.id
                ? 'bg-primary text-white shadow-lg'
                : 'glass text-text-secondary hover:text-text-primary hover:bg-surface/50'
            }`}
          >
            <Icon name={category?.icon} size={18} />
            <span className="font-medium">{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPartners?.map(partner => (
          <PartnerCard key={partner?.id} partner={partner} />
        ))}
      </div>
      {/* Partnership Inquiry CTA */}
      <div className="glass rounded-xl p-8 text-center mt-12">
        <Icon name="Handshake" size={48} className="text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-text-primary mb-4">Interested in Partnership?</h3>
        <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
          Join our growing network of partners and mentors to help shape the future of AI education and research.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" iconName="Mail" iconPosition="left">
            Partnership Inquiry
          </Button>
          <Button variant="outline" iconName="Users" iconPosition="left">
            Become a Mentor
          </Button>
        </div>
      </div>
      {/* Partner Detail Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-enter">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Partner Details</h2>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="p-2 hover:bg-surface/50 rounded-lg transition-colors"
                >
                  <Icon name="X" size={20} className="text-text-secondary" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-primary/20 mx-auto mb-4">
                      <Image
                        src={selectedPartner?.logo}
                        alt={selectedPartner?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{selectedPartner?.name}</h3>
                    <p className="text-primary font-medium mb-4">{selectedPartner?.type}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-text-secondary">
                        <Icon name="Calendar" size={16} />
                        <span>Partner since {selectedPartner?.partnership_since}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-text-secondary">
                        <Icon name="Globe" size={16} />
                        <span className="text-sm">{selectedPartner?.website}</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-lg p-4">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
                      <Icon name="User" size={16} />
                      <span>Contact</span>
                    </h4>
                    <p className="text-text-secondary text-sm mb-1">{selectedPartner?.contact_person}</p>
                    <p className="text-text-muted text-xs">{selectedPartner?.contact_email}</p>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">About</h4>
                    <p className="text-text-secondary leading-relaxed">{selectedPartner?.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">Focus Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner?.focus_areas?.map((area, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">Contributions</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedPartner?.contributions?.map((contribution, index) => (
                        <div key={index} className="flex items-center space-x-2 text-text-secondary">
                          <Icon name="CheckCircle" size={16} className="text-success" />
                          <span className="text-sm">{contribution}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">Opportunities</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedPartner?.opportunities?.map((opportunity, index) => (
                        <div key={index} className="flex items-center space-x-2 text-text-secondary">
                          <Icon name="Star" size={16} className="text-accent" />
                          <span className="text-sm">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                    <Button variant="default" iconName="Mail" iconPosition="left">
                      Contact Partner
                    </Button>
                    <Button variant="outline" iconName="ExternalLink" iconPosition="left">
                      Visit Website
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersSection;