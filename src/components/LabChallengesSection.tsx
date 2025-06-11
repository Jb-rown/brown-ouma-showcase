
import React, { useState } from 'react';
import { Brain, Clock, Trophy, ChevronRight } from 'lucide-react';

const LabChallengesSection = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const challenges = [
    {
      id: 1,
      title: 'Distributed Cache System',
      difficulty: 'Hard',
      timeSpent: '8 hours',
      description: 'Design and implement a distributed caching system with consistent hashing and fault tolerance.',
      approach: 'Implemented using consistent hashing algorithm with virtual nodes for even distribution. Added replication factor of 3 for fault tolerance.',
      technologies: ['Java', 'Redis', 'Consistent Hashing'],
      complexity: 'O(log N)',
      results: '99.9% uptime, 50ms average response time'
    },
    {
      id: 2,
      title: 'Real-time Graph Processing',
      difficulty: 'Hard',
      timeSpent: '12 hours',
      description: 'Process large-scale graph data in real-time with dynamic updates and efficient querying.',
      approach: 'Used incremental graph algorithms with delta processing. Implemented custom data structures for edge updates.',
      technologies: ['Python', 'NetworkX', 'Apache Kafka'],
      complexity: 'O(E + V log V)',
      results: 'Processed 1M+ nodes with <100ms query time'
    },
    {
      id: 3,
      title: 'AI-Powered Code Optimizer',
      difficulty: 'Medium',
      timeSpent: '6 hours',
      description: 'Create an AI system that analyzes and optimizes code for better performance and readability.',
      approach: 'Trained transformer model on code patterns. Used AST parsing for structural analysis and optimization suggestions.',
      technologies: ['Python', 'Transformers', 'AST'],
      complexity: 'O(n²)',
      results: '35% average performance improvement'
    },
    {
      id: 4,
      title: 'Blockchain Consensus Algorithm',
      difficulty: 'Hard',
      timeSpent: '10 hours',
      description: 'Implement a novel consensus algorithm for blockchain networks with improved energy efficiency.',
      approach: 'Developed Proof-of-Efficiency algorithm combining stake and computational contribution. Added Byzantine fault tolerance.',
      technologies: ['Rust', 'Cryptography', 'P2P Networks'],
      complexity: 'O(n log n)',
      results: '60% less energy consumption than PoW'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  return (
    <section id="lab" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Lab Challenges
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Complex technical challenges solved through analytical thinking and innovative approaches
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Challenge List */}
          <div className="space-y-6">
            {challenges.map((challenge, index) => (
              <div
                key={challenge.id}
                className={`bg-slate-900 rounded-xl p-6 border cursor-pointer transition-all duration-300 ${
                  selectedChallenge?.id === challenge.id
                    ? 'border-emerald-500 bg-slate-900/80'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setSelectedChallenge(challenge)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {challenge.title}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>

                <p className="text-slate-400 mb-4">{challenge.description}</p>

                <div className="flex flex-wrap items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <div className="flex items-center text-slate-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{challenge.timeSpent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Challenge Details */}
          <div className="lg:sticky lg:top-24">
            {selectedChallenge ? (
              <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
                <div className="flex items-center mb-6">
                  <Brain className="w-8 h-8 text-emerald-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white">{selectedChallenge.title}</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-2">Approach</h4>
                    <p className="text-slate-300 leading-relaxed">{selectedChallenge.approach}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedChallenge.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-800 text-blue-400 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-slate-400 mb-1">Time Complexity</h5>
                      <p className="text-emerald-400 font-mono">{selectedChallenge.complexity}</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-slate-400 mb-1">Results</h5>
                      <p className="text-blue-400 text-sm">{selectedChallenge.results}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 text-center">
                <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">Select a Challenge</h3>
                <p className="text-slate-500">Click on any challenge to view detailed analysis and approach</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
            <div className="text-slate-400">Challenges Completed</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">95%</div>
            <div className="text-slate-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">200+</div>
            <div className="text-slate-400">Hours Invested</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabChallengesSection;
