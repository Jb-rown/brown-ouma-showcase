
import React from 'react';
import { Download, GraduationCap, Briefcase, Award, Calendar, ExternalLink, Github } from 'lucide-react';

const ResumeSection = () => {
  // Contact and profile from user's provided content
  const contact = {
    name: 'JOHN BROWN OUMA',
    title: 'SOFTWARE DEVELOPER',
    phone: '+254703285635',
    email: 'brownjohn9870@gmail.com',
    location: 'Tudor, Mombasa, Kenya',
    linkedin: 'http://www.linkedin.com/in/john-brown-ouma',
    github: 'https://github.com/Jb-rown'
  };

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Technical University of Mombasa',
      period: 'SEP 2021 – NOV 2025',
      note: 'Awaiting graduation'
    }
  ];

  // Certificates with links provided by the user
  const certificates = [
    {
      title: 'AI for Software Engineering (Power Learn Project)',
      period: 'FEB 2025 - NOV 2025',
      note: 'Awaiting graduation',
      link: ''
    },
    {
      title: 'Kubernetes & Cloud Native (Andela Kubernetes African Training)',
      period: '2025 (Ongoing)',
      link: 'https://drive.google.com/drive/folders/1Iw4cqLLyYiYKOt2cWMMfyS7lBzCZWr0d?usp=sharing'
    },
    {
      title: 'Data & AI Specialization (Cyber Shujaa)',
      period: 'MAY 2025 - AUG 2025',
      note: 'Grade: Distinction',
      link: 'https://drive.google.com/file/d/1oLvscjccmEM4Ah8VbOUX4IMfB4laeegl/view?usp=sharing'
    },
    {
      title: 'Data & AI Articles',
      link: 'https://drive.google.com/drive/folders/1z_wyVeplOyYO4WNf_CENo0kNT_8zEifF?usp=sharing'
    },
    {
      title: 'Cybersecurity specialization (Coursera)',
      period: '2025',
      link: 'https://drive.google.com/drive/folders/1h4227sCZ2Czr0kwY67ZdpD68YrrfGeSO?usp=sharing'
    }
  ];

  const experience = [
    {
      role: 'Growth Hacking Intern',
      company: 'Excelerate (Remote)',
      period: 'AUG 2025 – SEPT 2025',
      bullets: [
        'Designed and optimized a growth funnel for MindNest using the AARRR framework.',
        'Ran simulated A/B testing, producing insights that improved sign-up conversion rates by 50%.',
        'Tracked and analyzed CTR, conversion rate, retention, CPA and viral coefficient to guide growth recommendations.',
        'Developed referral model, influencer outreach plan, and viral content strategy.'
      ]
    },
    {
      role: 'Intern Software Developer',
      company: 'Swahilipot Hub Foundation - Mombasa',
      period: 'MAY 2024 – AUG 2024',
      bullets: [
        'Developed and maintained web applications using Django, Python, Next.js and React.',
        'Debugged and optimized code for performance and scalability.',
        'Collaborated with cross-functional teams to implement user-centric features.'
      ]
    },
    {
      role: 'Volunteer Software Developer',
      company: 'Mombasa Red Cross Lab - Mombasa',
      period: 'SEP 2023 – DEC 2023',
      bullets: [
        'Developed a digital microscope using Arduino and C++, integrating hardware and software for real-time image capture.',
        'Implemented sensor integration and hardware control modules.'
      ]
    }
  ];

  const technicalSkills = [
    'Python', 'JavaScript', 'C/C++', 'Java', 'Scala', 'PHP', 'C#', 'SQL', 'HTML/CSS3',
    'Django', 'React', 'Next.js', 'Node.js', 'Git', 'Docker', 'Kubernetes',
    'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite',
    'Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'Pandas', 'NumPy', 'OpenCV',
    'AWS', 'Firebase', 'Linux', 'Jenkins', 'Arduino', 'Raspberry Pi'
  ];

  // Add project links here (set `link` to a URL to show a 'View' button)
  const projects = [
    { title: 'Clinic Appointment Reminder System', note: 'Automated reminders to reduce no-shows', link: 'https://embrace-cancer-care.netlify.app/' },
    { title: 'Predictive Employee Retention System', note: 'ML model with ~85% accuracy; Next.js dashboard for HR analytics', link: 'https://employee-turnover.netlify.app/' },
    { title: 'Solar Energy Production Prediction System', note: 'R² > 0.90; Streamlit dashboard for visualization', link: 'https://solar-energy-system.streamlit.app/' },
    { title: 'COVID-19 Global Data Tracker', note: 'Interactive Streamlit dashboard using Our World in Data', link: 'https://covid-19-data-tracker.streamlit.app/' },
    { title: 'Sneaker E-Commerce Web App', note: 'Responsive e-commerce app with product catalog and checkout', link: 'https://splendorous-parfait-1d24aa.netlify.app/' },
    { title: 'Asset Management System', note: 'Full-featured system to track and optimize resources', link: 'https://sphub-ams.vercel.app/' }
  ];

  const awards = [
    { title: 'Microsoft Student Ambassador – Python & AI', when: 'Aug 2024', note: 'Microsoft Learn' }
  ];

  return (
    <section id="resume" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{contact.name}</h1>
          <p className="text-lg text-emerald-400 font-semibold mb-3">{contact.title}</p>
          <div className="text-slate-400 text-sm">
            <span>{contact.phone}</span>
            <span className="mx-3">•</span>
            <a href={`mailto:${contact.email}`} className="text-slate-300 hover:underline">{contact.email}</a>
            <span className="mx-3">•</span>
            <span>{contact.location}</span>
          </div>
          <div className="mt-3 text-sm">
            <a href={contact.linkedin} className="text-slate-300 hover:underline mr-4">LinkedIn</a>
            <a href={contact.github} className="text-slate-300 hover:underline">GitHub</a>
          </div>
          <div className="mt-6">
            <a
              href={encodeURI('/John Brown Ouma Resume.pdf')}
              download
              aria-label="Download John Brown Oma resume"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-md font-semibold hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-md"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-3">Profile</h3>
              <p className="text-slate-300 leading-relaxed">
                Aspiring Software Developer graduating in November 2025 with over 2 years of hands-on
                experience through internships, academic projects, and freelance work in full-stack
                development, AI integration and machine learning, and cloud-native solutions. Skilled at
                designing, developing, and optimizing software applications across multiple languages and frameworks.
                Adept at collaborating in agile teams, contributing innovative solutions, and eager to apply technical
                expertise in a professional setting.
              </p>
            </div>

            {/* Education & Certificates */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-5 h-5 text-emerald-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Education & Certificates</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="">
                    <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                    <p className="text-emerald-400">{edu.institution} • {edu.period}</p>
                    <p className="text-slate-300 text-sm">{edu.note}</p>
                  </div>
                ))}

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Certificates & Links</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {certificates.map((cert, idx) => (
                      <div key={idx} className="bg-slate-700 p-3 rounded-md flex items-start justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">{cert.title}</div>
                          {cert.period && <div className="text-xs text-slate-400">{cert.period}</div>}
                          {cert.note && <div className="text-xs text-slate-400">{cert.note}</div>}
                        </div>
                        {cert.link ? (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 inline-flex items-center px-2 py-1 bg-emerald-500 text-white rounded text-xs"
                            title={cert.link}
                          >
                            View
                          </a>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Professional Experience</h3>
              </div>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx} className="">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
                        <p className="text-blue-400 text-sm">{exp.company}</p>
                      </div>
                      <div className="text-slate-400 text-sm">{exp.period}</div>
                    </div>
                    <ul className="list-disc list-inside text-slate-300 mt-3 space-y-1">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-3">Projects</h3>
              <div className="space-y-4 text-slate-300">
                {projects.map((p, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-white">{p.title}</h4>
                      <p className="text-sm">{p.note}</p>
                    </div>
                    {p.link ? (
                      (() => {
                        const link = p.link;
                        const isRepo = link.includes('github.com') || link.includes('gitlab.com') || link.includes('bitbucket.org');
                        const isStreamlit = link.includes('streamlit.app');
                        const isLive = link.includes('netlify.app') || link.includes('vercel.app');
                        const label = isRepo ? 'Repo' : isStreamlit ? 'Streamlit' : isLive ? 'Live' : 'Demo';
                        const Icon = isRepo ? Github : ExternalLink;

                        return (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={link}
                            aria-label={`Open ${label} for ${p.title}`}
                            className={`ml-4 inline-flex items-center px-3 py-1 rounded-md text-sm hover:opacity-90 ${isStreamlit ? 'bg-amber-400 text-slate-900' : 'bg-emerald-500 text-white'}`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span>{label}</span>
                            </span>
                          </a>
                        );
                      })()
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Skills */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-3">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((s) => (
                  <span key={s} className="px-3 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">{s}</span>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center mb-3">
                <Award className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="text-xl font-bold text-white">Awards</h3>
              </div>
              <div className="text-slate-300 text-sm space-y-2">
                {awards.map((a, i) => (
                  <div key={i}>
                    <div className="font-semibold text-white">{a.title}</div>
                    <div className="text-slate-400 text-xs">{a.when} • {a.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* References */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">References</h3>
              <p className="text-slate-300 text-sm">Available upon request.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
