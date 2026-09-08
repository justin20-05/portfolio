import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  MapPin,
  X,
  Menu,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Download,
} from 'lucide-react';
import ParticlesBackground from './components/ParticlesBackground';
import SpotlightCard from './components/SpotlightCard';
import profileImage from './assets/profile-cutout.png';
import { person, projects, expertise, filters } from './data/portfolio';

const cvFile = {
  href: '/cv.pdf',
  filename: 'Justin-James-Alviar-CV.pdf',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const ProjectModal = ({ project, onClose }) => {
  const Icon = project.icon;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const blocks = [
    { title: 'Problem', body: project.deepDive.problem },
    { title: 'Solution', body: project.deepDive.solution },
    { title: 'Architecture', body: project.deepDive.architecture },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-6 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 32 }}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#101218] p-7 sm:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mute hover:text-ink hover:bg-white/5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4 pr-10">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
              {project.category} · {project.highlight}
            </p>
            <h2 id="project-title" className="font-display mt-1.5 text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-mute">{project.subtitle}</p>
          </div>
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-zinc-300">
          {project.description}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="rounded-2xl border border-white/8 bg-canvas/60 p-4"
            >
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {block.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{block.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 px-4 py-2.5 text-xs font-semibold text-ink hover:border-accent/40 hover:text-accent transition-colors"
              >
                GitHub Code
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-canvas hover:bg-accent-dim transition-colors"
              >
                Live Preview
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [formError, setFormError] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(person.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setNavHidden(y > lastY && y > 80);
      lastY = y;

      const ids = ['overview', 'work', 'about', 'contact'];
      const position = y + 140;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (position >= top && position < top + height) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeProject = useCallback(() => setSelectedProject(null), []);

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const updateField = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitInquiry = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError('');

    try {
      const api = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${api}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error || 'Could not send right now.');
      }

      setFormStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (err) {
      setFormStatus('error');
      setFormError(err.message || 'Message could not be delivered. You can email me directly instead.');
    }
  };

  const fieldClass =
    'w-full rounded-xl border border-white/10 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30';

  return (
    <div className="relative min-h-screen bg-canvas text-ink">
      <ParticlesBackground />
      <div className="noise" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] grid-fade"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]"
        aria-hidden="true"
      />

      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeProject} />
        )}
      </AnimatePresence>

      <header
        className={`sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-canvas/75 transition-transform duration-300 ${
          navHidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#overview" className="flex items-center gap-2.5 group">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/25 bg-accent/10 font-display text-[11px] font-bold tracking-wide text-accent">
              JJEA
            </span>
            <span className="hidden sm:block text-sm font-medium tracking-tight text-ink group-hover:text-accent transition-colors">
              {person.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-white/10 text-ink'
                    : 'text-mute hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-canvas hover:bg-accent-dim transition-colors"
            >
              Let’s talk
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              className="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/[0.04] text-ink"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/5 bg-canvas/95"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-xl px-3 py-3 text-sm ${
                      activeSection === link.id ? 'bg-white/8 text-ink' : 'text-mute'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={cvFile.href}
                  download={cvFile.filename}
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm font-medium text-ink"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-accent px-3 py-3 text-center text-sm font-semibold text-canvas"
                >
                  Let’s talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="overview" className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-center lg:text-left"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Available for projects
              </p>

              <h1 className="font-display mt-6 text-[2.6rem] leading-[1.08] font-semibold tracking-tight sm:text-6xl">
                {person.name}
              </h1>
              <p className="mt-3 text-lg text-mute sm:text-xl">
                {person.role} — web systems, visual AI &amp; hardware.
              </p>

              <p className="mt-6 mx-auto lg:mx-0 max-w-xl text-[15px] sm:text-base leading-relaxed text-zinc-400">
                I design and ship MERN applications, neural image-verification models,
                and real-time IoT monitoring — interfaces that stay clear, and systems
                that hold up in production.
              </p>

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-canvas hover:bg-accent-dim transition-colors"
                >
                  View selected work
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-sm font-medium text-ink hover:border-accent/40 hover:text-accent transition-colors"
                >
                  Get in touch
                </a>
                <a
                  href={cvFile.href}
                  download={cvFile.filename}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-sm font-medium text-ink hover:border-accent/40 hover:text-accent transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </div>

              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-2">
                {['React', 'Node.js', 'PyTorch', 'IoT', 'MongoDB'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/8 px-3 py-1 text-xs text-mute"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-sm lg:ml-auto lg:mr-0"
            >
              <div className="absolute -inset-8 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-raised shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
                <img
                  src={profileImage}
                  alt={`${person.name}, ${person.role}`}
                  className="aspect-[4/5] w-full object-cover object-[center_12%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas via-canvas/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-canvas/70 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="text-xs text-mute">Currently</p>
                    <p className="text-sm font-medium text-ink">Building production systems</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_#5eead4]" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="work" className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
                02 — Selected work
              </p>
              <h2 className="font-display mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
                Systems in production
              </h2>
            </div>

            <div className="flex flex-wrap gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1 self-start">
              {filters.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilter(cat.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                    filter === cat.id
                      ? 'bg-accent text-canvas'
                      : 'text-mute hover:text-ink'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <SpotlightCard
                      as="button"
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-white/8 bg-raised/80 p-6 text-left backdrop-blur-sm hover:border-accent/30 hover:shadow-[0_24px_48px_-28px_rgba(94,234,212,0.45)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-display text-sm text-faint">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-canvas/40 px-2.5 py-1 text-[11px] uppercase tracking-wider text-mute">
                          <Icon className="icon-float h-3.5 w-3.5 text-accent" />
                          {project.category}
                        </span>
                      </div>

                      <h3 className="font-display mt-6 text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-mute">{project.subtitle}</p>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="mt-5 h-px w-full overflow-hidden bg-white/8">
                        <div className="rule-fill h-px w-full bg-accent" />
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="chip-rise rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-mute"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-medium text-mute hover:text-ink transition-colors"
                            >
                              Code
                            </a>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                            Details
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        <section id="about" className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 py-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
            03 — Practice
          </p>
          <h2 className="font-display mt-2 max-w-2xl text-3xl sm:text-4xl font-semibold tracking-tight">
            Three layers of the stack, one way of working.
          </h2>
          <p className="mt-4 max-w-2xl text-mute leading-relaxed">
            Whether the problem is a dashboard, a model, or a sensor, the goal is the
            same: make the system understandable, fast, and reliable.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {expertise.map((area, i) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SpotlightCard
                    as="article"
                    className="h-full overflow-hidden rounded-3xl border border-white/8 bg-raised/70 p-6 hover:border-accent/25"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-display text-sm text-accent">{area.index}</span>
                      {Icon && (
                        <span className="grid h-10 w-10 place-items-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                          <Icon className="icon-float h-4 w-4" />
                        </span>
                      )}
                    </div>
                    <h3 className="font-display mt-5 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {area.label}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mute">{area.summary}</p>
                    <div className="mt-5 h-px w-full overflow-hidden bg-white/8">
                      <div className="rule-fill h-px w-full bg-accent" />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {area.tech.map((tech) => (
                        <span
                          key={tech}
                          className="chip-rise rounded-full border border-white/8 px-2.5 py-1 text-[11px] text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 py-20 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="overflow-hidden rounded-[2rem] border border-white/8 bg-raised/80 p-8 sm:p-12"
          >
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
                  04 — Contact
                </p>
                <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
                  Let’s build something precise.
                </h2>
                <p className="mt-4 text-mute leading-relaxed">
                  Open to product work, AI pipelines, and IoT integrations. Tell me
                  what you’re trying to ship.
                </p>

                <div className="mt-8 space-y-4">
                  <button
                    type="button"
                    onClick={copyEmailToClipboard}
                    className="flex items-center gap-3 text-sm text-zinc-300 hover:text-accent transition-colors text-left group"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-accent group-hover:border-accent/40 transition-colors">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium text-ink group-hover:text-accent transition-colors">
                        {person.email}
                      </p>
                      <p className="text-xs text-mute">
                        {copied ? '✓ Copied to clipboard!' : 'Click to copy address'}
                      </p>
                    </div>
                  </button>

                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-accent">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <p className="font-medium text-ink">{person.location}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                {formStatus === 'sent' ? (
                  <div className="flex h-full min-h-[280px] flex-col items-start justify-center rounded-2xl border border-accent/20 bg-accent/5 p-8">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                    <h3 className="font-display mt-4 text-2xl font-semibold">Message sent</h3>
                    <p className="mt-2 text-sm text-mute">
                      Thanks — I’ll get back to you as soon as I can.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormStatus('idle')}
                      className="mt-6 text-sm font-medium text-accent hover:underline"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitInquiry} className="relative space-y-4" noValidate>
                    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                      <label>
                        Website
                        <input
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.website}
                          onChange={updateField}
                        />
                      </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-xs font-medium text-mute">
                        Name
                        <input
                          required
                          name="name"
                          value={form.name}
                          onChange={updateField}
                          autoComplete="name"
                          className={`${fieldClass} mt-1.5`}
                          placeholder="Your name"
                        />
                      </label>
                      <label className="block text-xs font-medium text-mute">
                        Email
                        <input
                          required
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={updateField}
                          autoComplete="email"
                          className={`${fieldClass} mt-1.5`}
                          placeholder="you@studio.com"
                        />
                      </label>
                    </div>
                    <label className="block text-xs font-medium text-mute">
                      Subject
                      <input
                        required
                        name="subject"
                        value={form.subject}
                        onChange={updateField}
                        className={`${fieldClass} mt-1.5`}
                        placeholder="What should we talk about?"
                      />
                    </label>
                    <label className="block text-xs font-medium text-mute">
                      Message
                      <textarea
                        required
                        name="message"
                        value={form.message}
                        onChange={updateField}
                        rows={5}
                        className={`${fieldClass} mt-1.5 resize-none`}
                        placeholder="A short brief is enough."
                      />
                    </label>

                    {formStatus === 'error' && (
                      <p className="flex items-start gap-2 text-sm text-red-300">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>
                          {formError}{' '}
                          <a
                            href={`mailto:${person.email}?subject=${encodeURIComponent(form.subject || 'Project inquiry')}`}
                            className="underline decoration-red-300/50 hover:text-red-200"
                          >
                            Email instead
                          </a>
                        </span>
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-canvas hover:bg-accent-dim disabled:opacity-60 transition-colors"
                    >
                      {formStatus === 'sending' ? 'Sending…' : 'Send message'}
                      {formStatus !== 'sending' && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-mute sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} {person.name}. All rights reserved.</p>
          <p>Built with React &amp; Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}