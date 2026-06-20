import { useState, useEffect, useRef } from 'react';

function Skills() {
  const [animatedSkills, setAnimatedSkills] = useState({});
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Vue.js', level: 75 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'GraphQL', level: 78 },
        { name: 'Redis', level: 70 },
      ],
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'Git & GitHub', level: 92 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'CI/CD', level: 78 },
        { name: 'Figma', level: 85 },
      ],
    },
  ];

  const techStack = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
    'PostgreSQL', 'MongoDB', 'GraphQL', 'Docker', 'AWS',
    'Tailwind', 'Framer Motion', 'Three.js', 'Git', 'Figma',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate skills progressively
            skillCategories.forEach((cat, catIndex) => {
              cat.skills.forEach((skill, skillIndex) => {
                setTimeout(() => {
                  setAnimatedSkills((prev) => ({
                    ...prev,
                    [`${catIndex}-${skillIndex}`]: skill.level,
                  }));
                }, (catIndex * 200) + (skillIndex * 150));
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-24 sm:py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 reveal">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">My Expertise</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on experience
            across the full development stack.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="glass-card rounded-2xl p-8 reveal" style={{ transitionDelay: `${catIndex * 0.15}s` }}>
              <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm">
                  {catIndex + 1}
                </span>
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-sm text-slate-500">
                        {animatedSkills[`${catIndex}-${skillIndex}`] || 0}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary skill-bar transition-all duration-1000 ease-out"
                        style={{
                          width: `${animatedSkills[`${catIndex}-${skillIndex}`] || 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Cloud */}
        <div className="reveal">
          <h3 className="font-display text-2xl font-bold text-white text-center mb-8">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="px-5 py-2.5 rounded-full glass text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white hover:border-primary/30 border border-transparent transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
