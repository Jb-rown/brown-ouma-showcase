
import React from 'react';
import { Download, Award, Calendar, ExternalLink } from 'lucide-react';

const CertificatesSection = () => {
  const certificates = [
    {
      id: 1,
      title: 'Hotstar Clone Bootcamp (HTML)',
      issuer: 'Devtown, GDS C Get University, AWS Community Builder',
      duration: '7 Days',
      issued: '29 Aug 2024',
      description: 'Successfully completed a 7-day bootcamp on building a Hotstar clone using HTML.',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Hotstar Clone Bootcamp (HTML)',
      issuer: 'Google Developer Student Clubs, Get University, Devtown',
      duration: '7 Days',
      issued: 'August 2024',
      description: 'Successfully completed a 7-day bootcamp on creating a Hotstar clone using HTML.',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Python and Artificial Intelligence Bootcamp',
      issuer: 'Google Developer Student Clubs, Get University, Devtown',
      duration: '7 Days',
      issued: 'August 2024',
      description: 'Successfully completed a 7-day bootcamp focusing on Python and AI fundamentals.',
      downloadUrl: '#'
    },
    {
      id: 4,
      title: 'Microsoft Student Ambassadors - Python and AI',
      issuer: 'Microsoft Learn Student Ambassador',
      event: 'Python and Artificial Intelligence',
      description: 'Recognized for attendance and completion of a Python and AI Event.',
      downloadUrl: '#'
    },
    {
      id: 5,
      title: 'Python and Artificial Intelligence Bootcamp (AWS)',
      issuer: 'AWS Community Builders, Devtown',
      duration: '7 Days',
      description: 'Successfully completed a 7-day bootcamp on Python and AI, hosted by AWS Community Builders.',
      downloadUrl: '#'
    },
    {
      id: 6,
      title: 'Data Science in Action Workshop',
      issuer: 'Xaltius',
      date: '15th February 2025',
      description: 'Attended a Workshop on solving real-world problems with data science.',
      downloadUrl: '#'
    },
    {
      id: 7,
      title: 'Cybersecurity in Action Workshop',
      issuer: 'Xaltius',
      date: '22nd February 2025',
      description: 'Attended a Workshop on real-world Cybersecurity case studies.',
      downloadUrl: '#'
    },
    {
      id: 8,
      title: 'Mastering Digital Marketing in an AI world workshop',
      issuer: 'Xaltius',
      date: '1st March 2025',
      description: 'Attended a workshop on digital Marketing strategies in AI-driven world.',
      downloadUrl: '#'
    },
    {
      id: 9,
      title: 'Devtown Campus Ambassador Certification',
      issuer: 'Devtown',
      date: '07 Nov 2024',
      description: 'Recognized for dedication and hardwork as a Devtown Campus Ambassador intern.',
      downloadUrl: '#'
    }
  ];

  return (
    <section id="certificates" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Professional certifications and workshop completions showcasing continuous learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 group"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <Award className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                <button
                  onClick={() => window.open(cert.downloadUrl, '_blank')}
                  className="flex items-center px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all duration-300 text-sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors leading-tight">
                {cert.title}
              </h3>

              <p className="text-yellow-400 font-medium mb-2 text-sm">
                {cert.issuer}
              </p>

              {cert.duration && (
                <div className="flex items-center text-slate-400 mb-2 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Duration: {cert.duration}
                </div>
              )}

              {cert.issued && (
                <div className="flex items-center text-slate-400 mb-2 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Issued: {cert.issued}
                </div>
              )}

              {cert.date && (
                <div className="flex items-center text-slate-400 mb-2 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Date: {cert.date}
                </div>
              )}

              {cert.event && (
                <p className="text-slate-300 mb-2 text-sm">
                  <span className="font-medium">Event:</span> {cert.event}
                </p>
              )}

              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {cert.description}
              </p>

              <div className="pt-2 border-t border-slate-700">
                <span className="inline-flex items-center px-2 py-1 bg-slate-800 text-yellow-400 text-xs rounded-full">
                  <Award className="w-3 h-3 mr-1" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm">
            All certificates are verified and can be downloaded for verification purposes
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
