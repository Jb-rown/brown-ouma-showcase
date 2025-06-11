
import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'Passionate Software Developer',
    'Computer Science Innovator',
    'Problem Solver',
    'Full-Stack Engineer'
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, currentPhraseIndex, isDeleting, phrases]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              John Brown Ouma
            </span>
          </h1>
          
          <div className="h-16 mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-300">
              {displayText}
              <span className="animate-pulse text-emerald-400">|</span>
            </h2>
          </div>

          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Crafting elegant solutions to complex problems through innovative software development. 
            Passionate about creating technology that makes a difference.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-emerald-500/25"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-slate-600 text-slate-300 rounded-lg font-semibold hover:border-emerald-400 hover:text-emerald-400 transform hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transform hover:scale-110 transition-all duration-300 group"
            >
              <Github className="w-6 h-6 text-slate-400 group-hover:text-emerald-400" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transform hover:scale-110 transition-all duration-300 group"
            >
              <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-blue-400" />
            </a>
            <a
              href="mailto:john@example.com"
              className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transform hover:scale-110 transition-all duration-300 group"
            >
              <Mail className="w-6 h-6 text-slate-400 group-hover:text-purple-400" />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('skills')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-slate-400 hover:text-emerald-400 transition-colors" />
      </button>
    </section>
  );
};

export default HeroSection;
