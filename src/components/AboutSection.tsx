
import React from 'react';
import { User, Code, Heart, Target } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Passionate developer with a love for creating innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-purple-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Who I Am</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                I'm a dedicated software developer with a passion for creating impactful digital solutions. 
                With expertise spanning full-stack development, AI/ML, and data science, I thrive on turning 
                complex problems into elegant, user-friendly applications.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-pink-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">What I Love</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                I'm passionate about leveraging technology to solve real-world problems. From building 
                responsive web applications to implementing AI solutions, I enjoy the challenge of 
                learning new technologies and applying them to create meaningful impact.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="flex items-center mb-4">
                <Code className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">My Approach</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                I believe in writing clean, maintainable code and following best practices. My approach 
                combines technical excellence with user-centered design, ensuring that every project 
                delivers both functionality and exceptional user experience.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">My Goals</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                I'm committed to continuous learning and growth in the ever-evolving tech landscape. 
                My goal is to contribute to innovative projects that make a positive difference while 
                building a successful career in software development and AI.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">Always Learning</div>
              <div className="text-slate-400">Staying updated with latest tech trends</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-3xl font-bold text-pink-400 mb-2">Problem Solver</div>
              <div className="text-slate-400">Turning challenges into opportunities</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">Team Player</div>
              <div className="text-slate-400">Collaborating for better outcomes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
