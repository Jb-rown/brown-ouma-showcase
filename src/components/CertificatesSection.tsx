
import React, { useState } from 'react';
import { Download, Award, Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { certificates as certGroups } from '../lib/certificates';

const CertificatesSection: React.FC = () => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (group: string) => {
    setOpenGroups(s => ({ ...s, [group]: !s[group] }));
  };

  return (
    <section id="certificates" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Certifications & Achievements</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">Professional certifications and workshop completions showcasing continuous learning</p>
        </div>

        <div className="space-y-6">
          {certGroups.map((group) => (
            <div key={group.group} className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
              <button onClick={() => toggleGroup(group.group)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="text-white font-semibold">{group.group}</div>
                    <div className="text-slate-400 text-sm">{group.items.length} item{group.items.length > 1 ? 's' : ''}</div>
                  </div>
                </div>
                <div className="text-slate-400">
                  {openGroups[group.group] ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
                </div>
              </button>

              {openGroups[group.group] && (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((item) => (
                    <div key={item.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex flex-col justify-between">
                      <div>
                        <h4 className="text-white font-medium mb-1 line-clamp-2">{item.title}</h4>
                        <p className="text-slate-400 text-sm mb-2">{item.file}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded hover:bg-yellow-500/30 transition">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </a>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm underline">Open</a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm">All certificates are available for download.</p>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
