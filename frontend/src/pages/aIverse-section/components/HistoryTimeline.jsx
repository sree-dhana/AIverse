import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HistoryTimeline = () => {
  const timelineData = [
    {
      id: 1,
      year: "2019",
      title: "Foundation of AIverse",
      description: "AIverse was established as a student-led initiative to promote AI education and research among college students.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      achievements: ["50+ founding members", "First AI workshop conducted", "Partnership with 3 colleges"],
      isHighlight: true
    },
    {
      id: 2,
      year: "2020",
      title: "Digital Transformation",
      description: "Adapted to online learning during the pandemic, launching virtual events and expanding our digital presence.",
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?w=400&h=250&fit=crop",
      achievements: ["100+ virtual events", "5000+ students reached", "AI mentorship program launched"],
      isHighlight: false
    },
    {
      id: 3,
      year: "2021",
      title: "Community Growth",
      description: "Significant expansion in membership and partnerships with industry leaders and academic institutions.",
      image: "https://images.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg?w=400&h=250&fit=crop",
      achievements: ["1000+ active members", "20+ industry partners", "First annual AI conference"],
      isHighlight: true
    },
    {
      id: 4,
      year: "2022",
      title: "Innovation Hub",
      description: "Established research labs and innovation centers, fostering cutting-edge AI projects and startups.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
      achievements: ["5 research labs established", "50+ AI projects completed", "10 student startups incubated"],
      isHighlight: false
    },
    {
      id: 5,
      year: "2023",
      title: "Global Recognition",
      description: "Received international recognition for contributions to AI education and community building.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?w=400&h=250&fit=crop",
      achievements: ["UNESCO AI Education Award", "50+ countries represented", "Global AI summit hosted"],
      isHighlight: true
    },
    {
      id: 6,
      year: "2024",
      title: "Future Forward",
      description: "Launching advanced AI curriculum and preparing for the next generation of artificial intelligence.",
      image: "https://images.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg?w=400&h=250&fit=crop",
      achievements: ["Advanced AI curriculum", "Quantum computing lab", "5000+ graduates placed"],
      isHighlight: false
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gradient-primary mb-4">Our Journey Through Time</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          From humble beginnings to global recognition, explore the milestones that shaped AIverse into the thriving community it is today.
        </p>
      </div>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

        {timelineData?.map((item, index) => (
          <div key={item?.id} className={`relative flex items-center mb-12 ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}>
            {/* Timeline Dot */}
            <div className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center z-10 ${
              item?.isHighlight ? 'bg-primary' : 'bg-secondary'
            }`}>
              <Icon name={item?.isHighlight ? "Star" : "Circle"} size={16} className="text-white" />
            </div>

            {/* Content Card */}
            <div className={`ml-16 md:ml-0 md:w-5/12 ${
              index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
            }`}>
              <div className={`glass rounded-xl p-6 card-hover ${
                item?.isHighlight ? 'border-primary/30 shadow-glow-primary' : ''
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`text-2xl font-bold px-3 py-1 rounded-lg ${
                    item?.isHighlight ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
                  }`}>
                    {item?.year}
                  </span>
                  {item?.isHighlight && (
                    <div className="flex items-center space-x-1 text-accent">
                      <Icon name="Award" size={16} />
                      <span className="text-sm font-medium">Milestone</span>
                    </div>
                  )}
                </div>

                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-3">{item?.title}</h3>
                <p className="text-text-secondary mb-4 leading-relaxed">{item?.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-text-primary flex items-center space-x-2">
                    <Icon name="Trophy" size={16} className="text-accent" />
                    <span>Key Achievements</span>
                  </h4>
                  <ul className="space-y-1">
                    {item?.achievements?.map((achievement, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-text-secondary">
                        <Icon name="CheckCircle" size={14} className="text-success" />
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Statistics Summary */}
      <div className="glass rounded-xl p-8 mt-12">
        <h3 className="text-2xl font-bold text-center text-gradient-primary mb-8">Impact Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5000+</div>
            <div className="text-text-secondary">Students Impacted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">100+</div>
            <div className="text-text-secondary">Events Conducted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">50+</div>
            <div className="text-text-secondary">Industry Partners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">25+</div>
            <div className="text-text-secondary">Research Projects</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTimeline;