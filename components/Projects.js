import { useState } from 'react';

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filters = ['all', 'web', 'mobile', 'design'];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      image: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      tags: ['React', 'Node.js', 'MongoDB'],
      description: 'A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
      link: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'web',
      image: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20',
      tags: ['Next.js', 'TypeScript', 'Prisma'],
      description: 'Collaborative task management with real-time updates, drag-and-drop, and team analytics.',
      link: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'Fitness Tracker',
      category: 'mobile',
      image: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      tags: ['React Native', 'Firebase', 'HealthKit'],
      description: 'Cross-platform fitness app with workout tracking, nutrition logging, and progress visualization.',
      link: '#',
      github: '#',
    },
    {
      id: 4,
      title: 'Design System',
      category: 'design',
      image: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      tags: ['Figma', 'Storybook', 'Tailwind'],
      description: 'Comprehensive design system with 50+ components, tokens, and documentation for a SaaS platform.',
      link: '#',
      github: '#',
    },
    {
      id: 5,
      title: 'AI Content Generator',
      category: 'web',
      image: 'bg-gradient-to-br from-violet-500/20 to-indigo-500/20',
      tags: ['Python', 'OpenAI', 'FastAPI'],
      description: 'AI-powered content generation tool with templates, SEO optimization, and multi-language support.',
      link: '#',
      github: '#',
    },
    {
      id: 6,
      title: 'Social Media Dashboard',
      category: 'design',
      image: 'bg-gradient-to-br from-rose-500/20 to-orange-500/20',
      tags: ['Vue.js', 'D3.js', 'REST API'],
      description: 'Analytics dashboard for social media managers with scheduling, reporting, and audience insights.',
      link: '#',
      github: '#',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Portfolio</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for building
            exceptional digital experiences.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-12 reveal">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                  : 'glass text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden glass-card reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image Placeholder */}
              <div className={`aspect-[4/3] ${project.image} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-6xl font-display font-bold text-white/10">
                  {project.title.charAt(0)}
                </div>
                {/* Hover Overlay */}
                <div className={`absolute inset-0 project-overlay flex items-end p-6 transition-opacity duration-500 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex gap-3">
                    <a
                      href={project.link}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-primary transition-colors"
                      title="View Live"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </a>
                    <a
                      href={project.github}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-primary transition-colors"
                      title="View Code"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-400 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
