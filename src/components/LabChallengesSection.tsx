
import React, { useEffect, useState } from 'react';
import { Brain, Clock, Trophy, ChevronRight, ExternalLink, Github, Check, X } from 'lucide-react';

type Challenge = {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  timeSpent: string;
  description: string;
  approach: string;
  hint?: string;
  solution?: string;
  technologies: string[];
  complexity: string;
  results: string;
  link?: string;
};

const LabChallengesSection: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [query, setQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [completed, setCompleted] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const challenges: Challenge[] = [
    {
      id: 1,
      title: 'Distributed Cache System',
      difficulty: 'Hard',
      timeSpent: '8 hours',
      description: 'Design and implement a distributed caching system with consistent hashing and fault tolerance.',
      approach: 'Implemented using consistent hashing algorithm with virtual nodes for even distribution. Added replication factor of 3 for fault tolerance.',
      hint: 'Start by partitioning keys using consistent hashing. Use virtual nodes to balance the ring and replication for fault tolerance.',
      solution: 'Use a consistent-hashing ring with virtual nodes; each key maps to the first node clockwise. Replicate entries to the next 2 nodes. On node failure, rehash only affected key ranges.',
      technologies: ['Java', 'Redis', 'Consistent Hashing'],
      complexity: 'O(log N)',
      results: '99.9% uptime, 50ms average response time',
      link: ''
    },
    {
      id: 2,
      title: 'Real-time Graph Processing',
      difficulty: 'Hard',
      timeSpent: '12 hours',
      description: 'Process large-scale graph data in real-time with dynamic updates and efficient querying.',
      approach: 'Used incremental graph algorithms with delta processing. Implemented custom data structures for edge updates.',
      hint: 'Use streaming ingestion with a message broker; maintain incremental indices and process deltas instead of full recomputation.',
      solution: 'Ingest graph updates via Kafka, apply delta-based algorithms (e.g., incremental PageRank), and maintain sharded adjacency indices for low-latency queries.',
      technologies: ['Python', 'NetworkX', 'Apache Kafka'],
      complexity: 'O(E + V log V)',
      results: 'Processed 1M+ nodes with <100ms query time',
      link: ''
    },
    {
      id: 3,
      title: 'AI-Powered Code Optimizer',
      difficulty: 'Medium',
      timeSpent: '6 hours',
      description: 'Create an AI system that analyzes and optimizes code for better performance and readability.',
      approach: 'Trained transformer model on code patterns. Used AST parsing for structural analysis and optimization suggestions.',
      hint: 'Combine static AST analysis with model suggestions; prioritize safe refactorings and micro-optimizations first.',
      solution: 'Parse code into AST, apply pattern-based transformations for common inefficiencies, use a transformer to suggest improvements, and validate behavior via unit tests.',
      technologies: ['Python', 'Transformers', 'AST'],
      complexity: 'O(n²)',
      results: '35% average performance improvement',
      link: ''
    },
    {
      id: 4,
      title: 'Blockchain Consensus Algorithm',
      difficulty: 'Hard',
      timeSpent: '10 hours',
      description: 'Implement a novel consensus algorithm for blockchain networks with improved energy efficiency.',
      approach: 'Developed Proof-of-Efficiency algorithm combining stake and computational contribution. Added Byzantine fault tolerance.',
      hint: 'Consider combining economic stake with lightweight computation to deter Sybil attacks; use randomized leader election.',
      solution: 'Design a Proof-of-Efficiency that selects leaders based on stake weighted by a small verifiable computation; use BFT-style finality for low-latency commits.',
      technologies: ['Rust', 'Cryptography', 'P2P Networks'],
      complexity: 'O(n log n)',
      results: '60% less energy consumption than PoW',
      link: ''
    }
  ];

  // load completed from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('completedChallenges');
      if (raw) setCompleted(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  // persist completed
  useEffect(() => {
    try {
      localStorage.setItem('completedChallenges', JSON.stringify(completed));
    } catch (e) {
      // ignore
    }
  }, [completed]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  const filtered = challenges
    .filter(c => difficultyFilter === 'All' || c.difficulty === difficultyFilter)
    .filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase()));

  const openDetails = (c: Challenge) => {
    setSelectedChallenge(c);
    setShowHint(false);
    setShowSolution(false);
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
          <div>
            <div className="flex gap-3 mb-4">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search challenges..."
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
              <select
                value={difficultyFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDifficultyFilter(e.target.value as 'All' | 'Easy' | 'Medium' | 'Hard')}
                className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="All">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="space-y-4">
              {filtered.map(challenge => (
                <div
                  key={challenge.id}
                  onClick={() => openDetails(challenge)}
                  className={`bg-slate-900 rounded-xl p-5 border cursor-pointer transition-all duration-200 ${selectedChallenge?.id === challenge.id ? 'border-emerald-500' : 'border-slate-700 hover:border-slate-600'}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
                      <p className="text-slate-400 text-sm">{challenge.description}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>{challenge.difficulty}</div>
                      <div className="text-slate-400 text-sm mt-2">{challenge.timeSpent}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    {challenge.link ? (
                      <a href={challenge.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-300 hover:text-emerald-400 text-sm">
                        {challenge.link.includes('github.com') ? <Github className="w-4 h-4"/> : <ExternalLink className="w-4 h-4"/>}
                        Open
                      </a>
                    ) : null}
                    <button
                      onClick={(e) => { e.stopPropagation(); setCompleted(prev => prev.includes(challenge.id) ? prev.filter(id => id !== challenge.id) : [...prev, challenge.id]); }}
                      className={`ml-auto px-3 py-1 rounded text-sm ${completed.includes(challenge.id) ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                    >
                      {completed.includes(challenge.id) ? 'Completed' : 'Mark'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            {selectedChallenge ? (
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Brain className="w-7 h-7 text-emerald-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">{selectedChallenge.title}</h3>
                  </div>
                  <div className="text-slate-400">{selectedChallenge.timeSpent}</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400">Approach</h4>
                    <p className="text-slate-300 mt-2">{selectedChallenge.approach}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedChallenge.technologies.map(t => (
                        <span key={t} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-800 p-3 rounded">
                      <h5 className="text-xs text-slate-400">Complexity</h5>
                      <div className="font-mono text-emerald-400">{selectedChallenge.complexity}</div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded">
                      <h5 className="text-xs text-slate-400">Results</h5>
                      <div className="text-blue-400">{selectedChallenge.results}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setShowHint(s => !s)} className="px-3 py-1 rounded bg-slate-700 text-slate-300 text-sm">{showHint ? 'Hide Hint' : 'Show Hint'}</button>
                    <button onClick={() => setShowSolution(s => !s)} className="px-3 py-1 rounded bg-slate-700 text-slate-300 text-sm">{showSolution ? 'Hide Solution' : 'Show Solution'}</button>
                    <button onClick={() => setIsModalOpen(true)} className="px-3 py-1 rounded bg-emerald-600 text-white text-sm">Open Modal</button>
                  </div>

                  {showHint && selectedChallenge.hint ? (
                    <div className="bg-slate-800 p-3 rounded text-slate-300">
                      <strong className="text-emerald-400">Hint: </strong>{selectedChallenge.hint}
                    </div>
                  ) : null}

                  {showSolution && selectedChallenge.solution ? (
                    <div className="bg-slate-800 p-3 rounded text-slate-300">
                      <strong className="text-emerald-400">Solution: </strong>{selectedChallenge.solution}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 text-center">
                <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-400 mb-2">Select a Challenge</h3>
                <p className="text-slate-500">Click on a challenge to view details, hint and solution.</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3"><Trophy className="w-8 h-8 text-yellow-400"/></div>
            <div className="text-2xl font-bold text-yellow-400">50+</div>
            <div className="text-slate-400">Challenges Completed</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-3"><Brain className="w-8 h-8 text-emerald-400"/></div>
            <div className="text-2xl font-bold text-emerald-400">95%</div>
            <div className="text-slate-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-3"><Clock className="w-8 h-8 text-blue-400"/></div>
            <div className="text-2xl font-bold text-blue-400">200+</div>
            <div className="text-slate-400">Hours Invested</div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedChallenge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-slate-900 rounded-lg w-full max-w-3xl p-6 border border-slate-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedChallenge.title}</h3>
                  <div className="text-slate-400 text-sm">{selectedChallenge.timeSpent} • {selectedChallenge.difficulty}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
                </div>
              </div>

              <div className="space-y-4 text-slate-300">
                <div>
                  <h4 className="text-sm font-semibold text-emerald-400">Description</h4>
                  <p className="mt-1">{selectedChallenge.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-400">Approach</h4>
                  <p className="mt-1">{selectedChallenge.approach}</p>
                </div>
                {selectedChallenge.hint && (
                  <div className="bg-slate-800 p-3 rounded">
                    <strong className="text-emerald-400">Hint:</strong>
                    <p className="mt-1">{selectedChallenge.hint}</p>
                  </div>
                )}
                {selectedChallenge.solution && (
                  <div className="bg-slate-800 p-3 rounded">
                    <strong className="text-emerald-400">Solution:</strong>
                    <p className="mt-1">{selectedChallenge.solution}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedChallenge.technologies.map(t => <span key={t} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">{t}</span>)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-800 p-3 rounded">
                    <div className="text-xs text-slate-400">Complexity</div>
                    <div className="font-mono text-emerald-400">{selectedChallenge.complexity}</div>
                  </div>
                  <div className="bg-slate-800 p-3 rounded">
                    <div className="text-xs text-slate-400">Results</div>
                    <div className="text-blue-400">{selectedChallenge.results}</div>
                  </div>
                </div>
                {selectedChallenge.link && (
                  <a href={selectedChallenge.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white rounded">
                    {selectedChallenge.link.includes('github.com') ? <Github className="w-4 h-4"/> : <ExternalLink className="w-4 h-4"/>}
                    Open Link
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LabChallengesSection;
