
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

  const DEFAULT_CHALLENGES: Challenge[] = [
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

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
      const raw = localStorage.getItem('labChallenges_v1');
      return raw ? JSON.parse(raw) as Challenge[] : DEFAULT_CHALLENGES;
    } catch (e) {
      return DEFAULT_CHALLENGES;
    }
  });

  // persist challenges when changed
  useEffect(() => {
    try {
      localStorage.setItem('labChallenges_v1', JSON.stringify(challenges));
    } catch (e) {
      // ignore
    }
  }, [challenges]);

  // controls for add form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDifficulty, setNewDifficulty] = useState<'Easy'|'Medium'|'Hard'|'Other'>('Easy');
  const [newDescription, setNewDescription] = useState('');
  const [newTechnologies, setNewTechnologies] = useState('');
  const [newApproach, setNewApproach] = useState('');
  const [newHint, setNewHint] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [newTimeSpent, setNewTimeSpent] = useState('');
  const [newResults, setNewResults] = useState('');
  const [newLink, setNewLink] = useState('');
  // edit flow
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDifficulty, setEditDifficulty] = useState<'Easy'|'Medium'|'Hard'|'Other'>('Easy');
  const [editDescription, setEditDescription] = useState('');
  const [editTechnologies, setEditTechnologies] = useState('');
  const [editApproach, setEditApproach] = useState('');
  const [editHint, setEditHint] = useState('');
  const [editSolution, setEditSolution] = useState('');
  const [editTimeSpent, setEditTimeSpent] = useState('');
  const [editResults, setEditResults] = useState('');
  const [editLink, setEditLink] = useState('');
  // delete confirmation
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  // undo snackbar state
  const [recentlyDeleted, setRecentlyDeleted] = useState<{ item: Challenge; index: number } | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const undoTimeoutRef = React.useRef<number | null>(null as unknown as number | null);

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

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-300">Add a new challenge</div>
                <button onClick={() => setShowAddForm(s => !s)} className="text-sm px-2 py-1 bg-slate-700 rounded text-white">{showAddForm ? 'Cancel' : 'Add'}</button>
              </div>

              {showAddForm && (
                <div className="bg-slate-900 p-3 rounded border border-slate-700">
                  <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" className="w-full mb-2 p-2 rounded bg-slate-800 text-white border border-slate-700" />
                  <select value={newDifficulty} onChange={e => setNewDifficulty(e.target.value as 'Easy'|'Medium'|'Hard'|'Other')} className="w-full mb-2 p-2 rounded bg-slate-800 text-white border border-slate-700">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Other">Other</option>
                  </select>
                  <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Short description" className="w-full mb-2 p-2 rounded bg-slate-800 text-white border border-slate-700" />
                  <input value={newTechnologies} onChange={e => setNewTechnologies(e.target.value)} placeholder="Technologies (comma separated)" className="w-full mb-2 p-2 rounded bg-slate-800 text-white border border-slate-700" />
                  <input value={newTimeSpent} onChange={e => setNewTimeSpent(e.target.value)} placeholder="Time spent (e.g. 6 hours)" className="w-full mb-2 p-2 rounded bg-slate-800 text-white border border-slate-700" />
                  <textarea value={newApproach} onChange={e => setNewApproach(e.target.value)} placeholder="Approach (optional)" className="w-full mb-2 p-2 rounded bg-slate-800 text-white border border-slate-700" />
                  <input value={newHint} onChange={e => setNewHint(e.target.value)} placeholder="Hint (optional)" className="w-full mb-2 p-2 rounded bg-slate-800 text-white border border-slate-700" />
                  <textarea value={newSolution} onChange={e => setNewSolution(e.target.value)} placeholder="Solution (optional)" className="w-full mb-2 p-2 rounded bg-slate-800 text-white border border-slate-700" />
                  <input value={newResults} onChange={e => setNewResults(e.target.value)} placeholder="Results (optional)" className="w-full mb-2 p-2 rounded bg-slate-800 text-white border border-slate-700" />
                  <input value={newLink} onChange={e => setNewLink(e.target.value)} placeholder="External link (optional)" className="w-full mb-2 p-2 rounded bg-slate-800 text-white border border-slate-700" />
                  <div className="flex gap-2">
                    <button onClick={() => {
                      // add
                      if (!newTitle.trim()) return;
                      const nextId = (challenges.reduce((max, c) => Math.max(max, c.id), 0) || 0) + 1;
                      const newCh: Challenge = {
                        id: nextId,
                        title: newTitle.trim(),
                        difficulty: newDifficulty,
                        timeSpent: newTimeSpent || '0 hours',
                        description: newDescription.trim(),
                        approach: newApproach.trim(),
                        hint: newHint.trim() || undefined,
                        solution: newSolution.trim() || undefined,
                        technologies: newTechnologies.split(',').map(s => s.trim()).filter(Boolean),
                        complexity: '',
                        results: newResults.trim(),
                        link: newLink.trim() || undefined,
                      } as Challenge;
                      setChallenges(prev => [newCh, ...prev]);
                      setNewTitle(''); setNewDescription(''); setNewTechnologies(''); setNewApproach(''); setNewHint(''); setNewSolution(''); setNewTimeSpent(''); setNewResults(''); setNewLink(''); setShowAddForm(false);
                    }} className="px-3 py-1 bg-emerald-600 rounded text-white">Save</button>
                    <button onClick={() => setShowAddForm(false)} className="px-3 py-1 bg-slate-700 rounded text-white">Cancel</button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {filtered.map((challenge, idx) => (
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
                      className={`px-3 py-1 rounded text-sm ${completed.includes(challenge.id) ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                    >
                      {completed.includes(challenge.id) ? 'Completed' : 'Mark'}
                    </button>

                    <button onClick={(e) => { e.stopPropagation(); setEditingIndex(idx); setEditTitle(challenge.title); setEditDifficulty(challenge.difficulty as 'Easy'|'Medium'|'Hard'|'Other'); setEditDescription(challenge.description); setEditTechnologies(challenge.technologies.join(', ')); }} className="px-3 py-1 rounded text-sm bg-blue-600 text-white">Edit</button>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteIndex(idx); }} className="px-3 py-1 rounded text-sm bg-red-600 text-white">Delete</button>
                  </div>

                  {editingIndex === idx && (
                    <div className="mt-3 bg-slate-800 p-3 rounded">
                      <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full mb-2 p-2 rounded bg-slate-900 text-white border border-slate-700" />
                      <select value={editDifficulty} onChange={e => setEditDifficulty(e.target.value as 'Easy'|'Medium'|'Hard'|'Other')} className="w-full mb-2 p-2 rounded bg-slate-900 text-white border border-slate-700">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                        <option>Other</option>
                      </select>
                      <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} className="w-full mb-2 p-2 rounded bg-slate-900 text-white border border-slate-700" />
                      <input value={editTechnologies} onChange={e => setEditTechnologies(e.target.value)} placeholder="Techs (comma)" className="w-full mb-2 p-2 rounded bg-slate-900 text-white border border-slate-700" />
                      <input value={editTimeSpent} onChange={e => setEditTimeSpent(e.target.value)} placeholder="Time spent" className="w-full mb-2 p-2 rounded bg-slate-900 text-white border border-slate-700" />
                      <textarea value={editApproach} onChange={e => setEditApproach(e.target.value)} placeholder="Approach" className="w-full mb-2 p-2 rounded bg-slate-900 text-white border border-slate-700" />
                      <input value={editHint} onChange={e => setEditHint(e.target.value)} placeholder="Hint" className="w-full mb-2 p-2 rounded bg-slate-900 text-white border border-slate-700" />
                      <textarea value={editSolution} onChange={e => setEditSolution(e.target.value)} placeholder="Solution" className="w-full mb-2 p-2 rounded bg-slate-900 text-white border border-slate-700" />
                      <input value={editResults} onChange={e => setEditResults(e.target.value)} placeholder="Results" className="w-full mb-2 p-2 rounded bg-slate-900 text-white border border-slate-700" />
                      <input value={editLink} onChange={e => setEditLink(e.target.value)} placeholder="Link" className="w-full mb-2 p-2 rounded bg-slate-900 text-white border border-slate-700" />
                      <div className="flex gap-2">
                        <button onClick={(ev) => { ev.stopPropagation(); const updated: Challenge = { ...challenge, title: editTitle, difficulty: editDifficulty as 'Easy'|'Medium'|'Hard'|'Other', timeSpent: editTimeSpent || challenge.timeSpent, description: editDescription, approach: editApproach, hint: editHint || undefined, solution: editSolution || undefined, technologies: editTechnologies.split(',').map(s => s.trim()).filter(Boolean), results: editResults, link: editLink || undefined }; setChallenges(prev => { const c = [...prev]; c[idx] = updated; return c; }); setEditingIndex(null); }} className="px-3 py-1 bg-emerald-600 rounded text-white">Save</button>
                        <button onClick={(ev) => { ev.stopPropagation(); setEditingIndex(null); }} className="px-3 py-1 bg-slate-700 rounded text-white">Cancel</button>
                      </div>
                    </div>
                  )}
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

        {/* export / import controls */}
        <div className="mt-6 flex items-center gap-2">
          <button onClick={() => {
            const blob = new Blob([JSON.stringify(challenges, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'lab-challenges.json';
            a.click();
            URL.revokeObjectURL(url);
          }} className="px-3 py-2 bg-slate-700 text-white rounded">Export challenges</button>

          <label className="px-3 py-2 bg-slate-700 text-white rounded cursor-pointer">
            Import
            <input type="file" accept="application/json" className="hidden" onChange={e => {
              const f = e.target.files?.[0];
              if (!f) return;
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  const data = JSON.parse(String(reader.result || ''));
                  if (Array.isArray(data)) {
                    // basic validation
                    const ok = data.every(d => d && typeof d.id === 'number' && typeof d.title === 'string');
                    if (ok) {
                      setChallenges(data as Challenge[]);
                      setSnackbarVisible(true);
                      setRecentlyDeleted(null);
                      return;
                    }
                  }
                  alert('Invalid file format');
                } catch (err) {
                  alert('Failed to parse file');
                }
              };
              reader.readAsText(f);
            }} />
          </label>
        </div>

        {/* undo snackbar */}
        {snackbarVisible && recentlyDeleted && (
          <div className="fixed bottom-6 left-6 z-50 bg-slate-900 border border-slate-700 p-3 rounded shadow-lg flex items-center gap-4">
            <div className="text-slate-200">"{recentlyDeleted.item.title}" deleted</div>
            <button onClick={() => {
              // restore
              setChallenges(prev => { const c = [...prev]; c.splice(recentlyDeleted.index, 0, recentlyDeleted.item); return c; });
              setSnackbarVisible(false);
              setRecentlyDeleted(null);
              if (undoTimeoutRef.current) { window.clearTimeout(undoTimeoutRef.current); undoTimeoutRef.current = null; }
            }} className="px-2 py-1 bg-emerald-600 text-white rounded">Undo</button>
          </div>
        )}
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

        {/* delete confirmation modal */}
        {deleteIndex !== null && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
            <div className="bg-slate-900 p-6 rounded border border-slate-700 w-full max-w-md">
              <h3 className="text-lg font-bold text-white mb-2">Confirm delete</h3>
              <p className="text-slate-300 mb-4">Are you sure you want to delete "{challenges[deleteIndex].title}"? This action cannot be undone.</p>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setDeleteIndex(null)} className="px-3 py-1 bg-slate-700 rounded text-white">Cancel</button>
                <button onClick={() => { 
                    if (deleteIndex !== null) {
                      const item = challenges[deleteIndex];
                      setChallenges(prev => prev.filter((_, i) => i !== deleteIndex));
                      setRecentlyDeleted({ item, index: deleteIndex });
                      setSnackbarVisible(true);
                      // auto-hide after 6s
                      if (undoTimeoutRef.current) window.clearTimeout(undoTimeoutRef.current);
                      undoTimeoutRef.current = window.setTimeout(() => { setSnackbarVisible(false); setRecentlyDeleted(null); }, 6000);
                    }
                    setDeleteIndex(null);
                  }} className="px-3 py-1 bg-red-600 rounded text-white">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LabChallengesSection;
