import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MembersGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const membersData = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Faculty Advisor",
      department: "Computer Science",
      college: "MIT",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Leading researcher in machine learning and neural networks with 15+ years of experience in AI education.",
      expertise: ["Machine Learning", "Deep Learning", "Computer Vision"],
      email: "sarah.chen@mit.edu",
      linkedin: "https://linkedin.com/in/sarahchen",
      joinDate: "2019-01-15",
      achievements: ["Best Faculty Award 2023", "Published 50+ research papers", "Mentored 100+ students"],
      isCore: true
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      role: "President",
      department: "Artificial Intelligence",
      college: "Stanford University",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Passionate AI enthusiast leading the community towards innovative solutions and collaborative learning.",
      expertise: ["Natural Language Processing", "Robotics", "AI Ethics"],
      email: "alex.rodriguez@stanford.edu",
      linkedin: "https://linkedin.com/in/alexrodriguez",
      joinDate: "2020-08-20",
      achievements: ["Led 25+ successful events", "Increased membership by 300%", "AI Innovation Award 2024"],
      isCore: true
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Vice President",
      department: "Data Science",
      college: "Carnegie Mellon",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Data science expert with a passion for making AI accessible to everyone through education and outreach.",
      expertise: ["Data Analytics", "Statistical Learning", "Big Data"],
      email: "priya.sharma@cmu.edu",
      linkedin: "https://linkedin.com/in/priyasharma",
      joinDate: "2020-09-10",
      achievements: ["Data Science Workshop Series", "Community Outreach Leader", "Research Excellence Award"],
      isCore: true
    },
    {
      id: 4,
      name: "Marcus Johnson",
      role: "Technical Lead",
      department: "Software Engineering",
      college: "UC Berkeley",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Full-stack developer specializing in AI-powered applications and scalable machine learning systems.",
      expertise: ["MLOps", "Cloud Computing", "Software Architecture"],
      email: "marcus.johnson@berkeley.edu",
      linkedin: "https://linkedin.com/in/marcusjohnson",
      joinDate: "2021-02-14",
      achievements: ["Built AIverse Platform", "Open Source Contributor", "Tech Innovation Award"],
      isCore: true
    },
    {
      id: 5,
      name: "Emma Thompson",
      role: "Events Coordinator",
      department: "Business Administration",
      college: "Harvard University",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      bio: "Event management specialist ensuring seamless execution of workshops, conferences, and networking events.",
      expertise: ["Event Planning", "Project Management", "Community Building"],
      email: "emma.thompson@harvard.edu",
      linkedin: "https://linkedin.com/in/emmathompson",
      joinDate: "2021-05-22",
      achievements: ["Organized 50+ events", "Partnership Development", "Excellence in Leadership"],
      isCore: true
    },
    {
      id: 6,
      name: "David Kim",
      role: "Research Coordinator",
      department: "Cognitive Science",
      college: "Yale University",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      bio: "Research enthusiast coordinating collaborative projects and fostering innovation in AI research.",
      expertise: ["Research Methodology", "AI Ethics", "Cognitive Computing"],
      email: "david.kim@yale.edu",
      linkedin: "https://linkedin.com/in/davidkim",
      joinDate: "2021-08-30",
      achievements: ["15+ Research Publications", "Grant Funding Success", "Research Excellence Award"],
      isCore: true
    },
    {
      id: 7,
      name: "Lisa Wang",
      role: "Member",
      department: "Computer Science",
      college: "Princeton University",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      bio: "Computer vision researcher working on innovative applications of deep learning in healthcare.",
      expertise: ["Computer Vision", "Healthcare AI", "Deep Learning"],
      email: "lisa.wang@princeton.edu",
      linkedin: "https://linkedin.com/in/lisawang",
      joinDate: "2022-01-18",
      achievements: ["Healthcare AI Project", "Conference Speaker", "Academic Excellence"],
      isCore: false
    },
    {
      id: 8,
      name: "James Wilson",
      role: "Member",
      department: "Electrical Engineering",
      college: "Georgia Tech",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      bio: "Hardware enthusiast working on AI chip design and optimization for edge computing applications.",
      expertise: ["AI Hardware", "Edge Computing", "Chip Design"],
      email: "james.wilson@gatech.edu",
      linkedin: "https://linkedin.com/in/jameswilson",
      joinDate: "2022-03-25",
      achievements: ["AI Chip Innovation", "Patent Applications", "Technical Excellence"],
      isCore: false
    },
    {
      id: 9,
      name: "Sofia Martinez",
      role: "Member",
      department: "Psychology",
      college: "University of Chicago",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      bio: "Interdisciplinary researcher exploring the intersection of psychology and artificial intelligence.",
      expertise: ["Cognitive Psychology", "Human-AI Interaction", "Behavioral Analysis"],
      email: "sofia.martinez@uchicago.edu",
      linkedin: "https://linkedin.com/in/sofiamartinez",
      joinDate: "2022-06-12",
      achievements: ["Psychology-AI Research", "Interdisciplinary Collaboration", "Innovation Award"],
      isCore: false
    }
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Faculty Advisor', label: 'Faculty Advisor' },
    { value: 'President', label: 'President' },
    { value: 'Vice President', label: 'Vice President' },
    { value: 'Technical Lead', label: 'Technical Lead' },
    { value: 'Events Coordinator', label: 'Events Coordinator' },
    { value: 'Research Coordinator', label: 'Research Coordinator' },
    { value: 'Member', label: 'Member' }
  ];

  const filteredMembers = membersData?.filter(member => {
    const matchesSearch = member?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         member?.department?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         member?.college?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesRole = selectedRole === '' || member?.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const coreMembers = filteredMembers?.filter(member => member?.isCore);
  const regularMembers = filteredMembers?.filter(member => !member?.isCore);

  const MemberCard = ({ member }) => (
    <div className="glass rounded-xl p-6 card-hover cursor-pointer transition-all duration-300"
         onClick={() => setSelectedMember(member)}>
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src={member?.avatar}
              alt={member?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {member?.isCore && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Star" size={12} className="text-white" />
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-text-primary mb-1">{member?.name}</h3>
        <p className="text-primary font-medium text-sm mb-2">{member?.role}</p>
        <p className="text-text-secondary text-sm mb-3">{member?.department}</p>
        <p className="text-text-muted text-xs mb-4">{member?.college}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {member?.expertise?.slice(0, 2)?.map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-surface/50 text-text-secondary text-xs rounded-full">
              {skill}
            </span>
          ))}
          {member?.expertise?.length > 2 && (
            <span className="px-2 py-1 bg-surface/50 text-text-secondary text-xs rounded-full">
              +{member?.expertise?.length - 2}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
            <Icon name="Mail" size={16} />
          </button>
          <button className="p-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition-colors">
            <Icon name="Linkedin" size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient-primary mb-4">Our Community</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Meet the passionate individuals who make AIverse a thriving community of learners, researchers, and innovators.
        </p>
      </div>
      {/* Search and Filter */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search members by name, department, or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="md:w-64">
            <Select
              placeholder="Filter by role"
              options={roleOptions}
              value={selectedRole}
              onChange={setSelectedRole}
            />
          </div>
        </div>
      </div>
      {/* Core Team Section */}
      {coreMembers?.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Icon name="Users" size={24} className="text-primary" />
            <h3 className="text-2xl font-bold text-text-primary">Core Team</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coreMembers?.map(member => (
              <MemberCard key={member?.id} member={member} />
            ))}
          </div>
        </div>
      )}
      {/* Regular Members Section */}
      {regularMembers?.length > 0 && (
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <Icon name="UserCheck" size={24} className="text-secondary" />
            <h3 className="text-2xl font-bold text-text-primary">Members</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-secondary/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularMembers?.map(member => (
              <MemberCard key={member?.id} member={member} />
            ))}
          </div>
        </div>
      )}
      {/* No Results */}
      {filteredMembers?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="UserX" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">No members found</h3>
          <p className="text-text-secondary">Try adjusting your search criteria or filters.</p>
        </div>
      )}
      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-enter">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Member Profile</h2>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-2 hover:bg-surface/50 rounded-lg transition-colors"
                >
                  <Icon name="X" size={20} className="text-text-secondary" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                        <Image
                          src={selectedMember?.avatar}
                          alt={selectedMember?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {selectedMember?.isCore && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          <Icon name="Star" size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{selectedMember?.name}</h3>
                    <p className="text-primary font-medium mb-1">{selectedMember?.role}</p>
                    <p className="text-text-secondary text-sm mb-2">{selectedMember?.department}</p>
                    <p className="text-text-muted text-sm">{selectedMember?.college}</p>
                  </div>
                </div>

                <div className="md:w-2/3 space-y-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">About</h4>
                    <p className="text-text-secondary leading-relaxed">{selectedMember?.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember?.expertise?.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">Achievements</h4>
                    <ul className="space-y-2">
                      {selectedMember?.achievements?.map((achievement, index) => (
                        <li key={index} className="flex items-center space-x-2 text-text-secondary">
                          <Icon name="Award" size={14} className="text-accent" />
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-4 pt-4 border-t border-border">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
                      <Icon name="Mail" size={16} />
                      <span>Contact</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition-colors">
                      <Icon name="Linkedin" size={16} />
                      <span>LinkedIn</span>
                    </button>
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

export default MembersGrid;