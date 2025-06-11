
import React, { useEffect, useRef, useState } from 'react';
import { Code, Database, Globe, Server, Smartphone, Brain } from 'lucide-react';

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend Development',
      skills: [
        { name: 'JavaScript/TypeScript', level: 90 },
        { name: 'React/Next.js', level: 85 },
        { name: 'HTML5/CSS3', level: 95 },
        { name: 'Tailwind CSS', level: 90 }
      ]
    },
    {
      icon: Server,
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'REST APIs', level: 90 }
      ]
    },
    {
      icon: Database,
      title: 'Database & Cloud',
      skills: [
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'Docker', level: 75 }
      ]
    },
    {
      icon: Brain,
      title: 'Problem Solving',
      skills: [
        { name: 'Algorithms', level: 85 },
        { name: 'Data Structures', level: 90 },
        { name: 'System Design', level: 80 },
        { name: 'Debugging', level: 95 }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A comprehensive toolkit built through continuous learning and hands-on experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="bg-slate-900 rounded-xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 transform hover:scale-105"
              style={{
                animationDelay: isVisible ? `${categoryIndex * 200}ms` : '0ms'
              }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg mr-4">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-emerald-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: isVisible ? `${(categoryIndex * 200) + (skillIndex * 100)}ms` : '0ms'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">3+</div>
              <div className="text-slate-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-slate-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
              <div className="text-slate-400">Technologies Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">100+</div>
              <div className="text-slate-400">Problems Solved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
