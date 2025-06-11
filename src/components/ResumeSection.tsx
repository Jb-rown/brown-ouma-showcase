
import React from 'react';
import { Download, GraduationCap, Briefcase, Award, Calendar } from 'lucide-react';

const ResumeSection = () => {
  const education = [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'University of Technology',
      period: '2020 - 2024',
      gpa: '3.8/4.0',
      achievements: ['Dean\'s List', 'Computer Science Excellence Award', 'Research Assistant']
    }
  ];

  const experience = [
    {
      role: 'Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: 'Jan 2023 - Present',
      description: 'Led development of scalable web applications serving 100K+ users. Implemented microservices architecture and improved system performance by 40%.',
      achievements: [
        'Reduced API response time by 60%',
        'Mentored 3 junior developers',
        'Architected CI/CD pipeline'
      ]
    },
    {
      role: 'Software Engineering Intern',
      company: 'StartupXYZ',
      period: 'Jun 2022 - Dec 2022',
      description: 'Developed React components and RESTful APIs. Collaborated with cross-functional teams to deliver features on schedule.',
      achievements: [
        'Built user authentication system',
        'Optimized database queries',
        'Implemented responsive design'
      ]
    }
  ];

  const achievements = [
    {
      title: 'HackerRank 5-Star Problem Solver',
      description: 'Achieved 5-star rating in Java and Python',
      year: '2023'
    },
    {
      title: 'National Coding Competition - 2nd Place',
      description: 'Competed against 500+ participants',
      year: '2023'
    },
    {
      title: 'Open Source Contributor',
      description: '100+ contributions to popular repositories',
      year: '2022-2024'
    }
  ];

  const skills = [
    'JavaScript/TypeScript', 'React/Next.js', 'Node.js', 'Python', 'Java',
    'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'Linux', 'Agile/Scrum'
  ];

  return (
    <section id="resume" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Professional Background
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            A journey of continuous learning and professional growth
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl">
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Education */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="flex items-center mb-6">
                <GraduationCap className="w-6 h-6 text-emerald-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-emerald-500 pl-6 pb-6">
                  <h4 className="text-xl font-semibold text-white mb-2">{edu.degree}</h4>
                  <p className="text-emerald-400 font-medium mb-1">{edu.institution}</p>
                  <div className="flex items-center text-slate-400 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    {edu.period}
                  </div>
                  <p className="text-slate-300 mb-3">GPA: {edu.gpa}</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement) => (
                      <span
                        key={achievement}
                        className="px-3 py-1 bg-slate-700 text-emerald-400 text-sm rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="flex items-center mb-6">
                <Briefcase className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Professional Experience</h3>
              </div>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-xl font-semibold text-white mb-1">{exp.role}</h4>
                    <p className="text-blue-400 font-medium mb-1">{exp.company}</p>
                    <div className="flex items-center text-slate-400 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </div>
                    <p className="text-slate-300 mb-4 leading-relaxed">{exp.description}</p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-slate-400 flex items-start">
                          <span className="text-emerald-400 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="text-xl font-bold text-white">Achievements</h3>
              </div>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-white text-sm">{achievement.title}</h4>
                    <p className="text-slate-400 text-sm mb-1">{achievement.description}</p>
                    <span className="text-yellow-400 text-xs">{achievement.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Languages</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">English</span>
                  <span className="text-emerald-400">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Swahili</span>
                  <span className="text-emerald-400">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">French</span>
                  <span className="text-blue-400">Intermediate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
