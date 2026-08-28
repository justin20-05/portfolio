import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Globe, Activity, Terminal, Sparkles, Layers, Mail, MapPin, X, ExternalLink } from 'lucide-react';
import ParticlesBackground from './components/particlesbackground';
import profileImage from './assets/profile-cutout.png';

const projects = [
  {
    id: 'verifai',
    category: 'ai',
    title: 'VerifAI System',
    subtitle: 'Neural Visual Verification Platform',
    description: 'Machine learning-based AI image detection system leveraging MT-YOLOv6 for real-time visual validation and object classification.',
    tech: ['MT-YOLOv6', 'PyTorch', 'React', 'Tailwind CSS'],
    icon: Cpu,
    accent: 'from-cyan-500/20 to-blue-500/10',
    highlight: 'Sub-100ms Inference Pipeline',
    deepDive: {
      problem: 'Inefficient manual visual inspections causing throughput bottlenecks.',
      solution: 'Automated defect detection using custom trained neural networks.',
      architecture: 'ML microservice (PyTorch) connected via REST API to a React frontend dashboard.'
    }
  },
  {
    id: 'ibt-system',
    category: 'web',
    title: 'Integrated Bus Terminal System',
    subtitle: 'Transit Operations Engine',
    description: 'Centralized management platform built for scheduling bus trips, managing terminal fees, and tracking bus company metrics.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    icon: Globe,
    accent: 'from-blue-500/20 to-indigo-500/10',
    highlight: 'Php Currency Formatting & Billing Log',
    deepDive: {
      problem: 'Disjointed terminal management, manual logging, and frequent revenue discrepancies.',
      solution: 'An integrated web platform digitizing trip scheduling, fee calculation, and operator access.',
      architecture: 'Full MERN Stack (MongoDB, Express, React, Node.js) with role-based authentication.'
    }
  },
  {
    id: 'iot-energy',
    category: 'iot',
    title: 'Smart Electricity Monitor',
    subtitle: 'Hardware Telemetry & Analytics',
    description: 'IoT telemetry system designed to monitor per-device energy consumption using smart plugs and physical current sensors.',
    tech: ['IoT Sensors', 'Node.js', 'Express', 'WebSockets'],
    icon: Activity,
    accent: 'from-emerald-500/20 to-teal-500/10',
    highlight: 'Real-time Hardware-to-Web Telemetry',
    deepDive: {
      problem: 'Lack of granular power visibility leading to phantom energy loss.',
      solution: 'Networked hardware sensors streaming per-second consumption data to a WebSocket server.',
      architecture: 'Hardware nodes (IoT Sensors) communication via MQTT/WebSockets to Node.js backend.'
    }
  },
  {
    id: 'supplier-tracker',
    category: 'web',
    title: 'Supplier Tracker & Platform',
    subtitle: 'Asset & Contract Ledger',
    description: 'Modular tracker managing supplier logs, contract renewals, and transactional audit trails for operational platforms.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js'],
    icon: Layers,
    accent: 'from-purple-500/20 to-cyan-500/10',
    highlight: 'Dynamic Contract Renewal Engine',
    deepDive: {
      problem: 'Unorganized vendor contracts, leading to missed renewals and complex financial auditing.',
      solution: 'Unified visual interface with real-time tracking, notification engine, and transactional history.',
      architecture: 'React frontend with heavy use of context API; Node.js backend for transaction ledger.'
    }
  }
];

// Reusable Project Modal Component (Spatial UI)
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  const IconComponent = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-slate-900 border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-10 shadow-[0_0_60px_rgba(6,182,212,0.15)] group"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/60 text-slate-500 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 rounded-xl bg-gradient-to-br ${project.accent} border border-cyan-800/40`}>
            <IconComponent className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white">{project.title}</h2>
            <p className="text-cyan-400 font-medium">{project.subtitle}</p>
          </div>
        </div>

        <p className="text-slate-300 text-lg leading-relaxed mb-8">{project.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="p-6 rounded-2xl bg-slate-950 border border-white/5 space-y-4">
            <h4 className="font-semibold text-cyan-300 text-sm uppercase tracking-wider">Problem Statement</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{project.deepDive.problem}</p>
            <h4 className="font-semibold text-cyan-300 text-sm uppercase tracking-wider pt-2">Engineered Solution</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{project.deepDive.solution}</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-950 border border-white/5">
            <h4 className="font-semibold text-cyan-300 text-sm uppercase tracking-wider mb-3">System Architecture</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{project.deepDive.architecture}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-8 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                {tech}
              </span>
            ))}
          </div>
          <a href="#" className="flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            View Live Deployment <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 relative overflow-hidden font-sans">
      {/* Dynamic 3D React Three Fiber Background */}
      <ParticlesBackground />

      {/* Spatial Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Interactive Modal Portal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* Spatial Navigation */}
      <nav className="p-6 border-b border-white/10 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center px-8">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg tracking-wider">
          <Sparkles className="w-5 h-5" />
          <span>DEVELOPER.PORTFOLIO</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-400">
          <a href="#overview" className="hover:text-cyan-400 transition-colors">Overview</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="overview" className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-10"
        >
          {/* Spatial Cutout Card (Left Side) */}
          <div className="relative shrink-0 group">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-600/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" />

            {/* Spatial Glass Container */}
            <div className="relative w-52 h-64 md:w-64 md:h-80 rounded-3xl bg-slate-900/60 border border-cyan-500/30 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex items-end justify-center transition-all duration-500 group-hover:border-cyan-400/60">
              
              {/* Radial Top Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

              {/* Cutout Image */}
              <img 
                src={profileImage} 
                alt="Profile Cutout" 
                className="relative z-10 h-[92%] w-auto object-cover object-bottom filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
              />

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-20 pointer-events-none" />
            </div>

            {/* Status Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-400/50 text-[10px] font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-1.5 shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>System Node</span>
            </div>
          </div>

          {/* Heading & Intro Text (Right Side) */}
          <div className="text-center md:text-left max-w-2xl">
            <span className="px-3.5 py-1 text-xs rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 uppercase tracking-widest font-semibold inline-block">
              Full-Stack • AI / Machine Learning • IoT Engineering
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mt-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
              Architecting Web Systems, Visual AI & Hardware
            </h1>

            <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed">
              Engineering dynamic MERN stack applications, deep learning image verification models, and real-time IoT energy monitoring solutions.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Project Gallery Section */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
            <Terminal className="text-cyan-400" /> Featured Engineering Systems
          </h2>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            {['all', 'web', 'ai', 'iot'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  filter === cat 
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`cursor-pointer rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 relative group overflow-hidden bg-gradient-to-br ${project.accent}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <IconComponent className="w-5 h-5" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{project.category}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-800/40 bg-cyan-950/40 text-cyan-300 group-hover:border-cyan-500 transition-colors">
                      {project.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">{project.title}</h3>
                  <p className="text-xs text-cyan-400/80 font-medium mb-2">{project.subtitle}</p>
                  <p className="text-slate-400 text-sm line-clamp-2">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2 pt-5 border-t border-white/5">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-slate-950/60 text-slate-300 border border-white/5">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs text-slate-500 pt-1">+{project.tech.length - 3} more</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Glassmorphism Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 md:p-16 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] relative group overflow-hidden"
        >
          {/* Subtle internal glow */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-600/20 transition-all duration-700" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
            {/* Contact Info */}
            <div className="md:col-span-5 space-y-8">
              <div>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/50 uppercase tracking-widest font-semibold">
                  System Connection
                </span>
                <h3 className="text-4xl font-extrabold text-white mt-4 tracking-tight">Initiate Project Inquiry</h3>
                <p className="text-slate-400 mt-4 text-base leading-relaxed">
                  Connect to discuss MERN stack development, neural visual verification, or custom IoT telemetry integration.
                </p>
              </div>

              <div className="space-y-5 text-slate-300 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span>developer@system.local</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>Integrated Systems Lab</span>
                </div>
              </div>
            </div>

            {/* Glassmorphism Form */}
            <form className="md:col-span-7 space-y-6 bg-slate-950/40 p-8 rounded-2xl border border-white/5 backdrop-blur-lg shadow-inner">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Operational Name" 
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-sm"
                />
                <input 
                  type="email" 
                  placeholder="Contact Email / ID" 
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-sm"
                />
              </div>
              <input 
                type="text" 
                placeholder="Project Subject / System Title" 
                className="w-full px-5 py-3.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-sm"
              />
              <textarea 
                placeholder="Message transmission / Operational brief..." 
                rows="5"
                className="w-full px-5 py-4 rounded-xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-sm resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Transmit Query
                <Sparkles className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}