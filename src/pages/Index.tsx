
import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import LabChallengesSection from '../components/LabChallengesSection';
import ResumeSection from '../components/ResumeSection';
import ContactSection from '../components/ContactSection';
import Navigation from '../components/Navigation';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'projects', 'lab', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Navigation activeSection={activeSection} />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <LabChallengesSection />
        <ResumeSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
