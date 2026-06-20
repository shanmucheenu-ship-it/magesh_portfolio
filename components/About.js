import { useState } from 'react';

function About() {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Web Development',
      desc: 'Building fast, responsive, and scalable web applications with modern technologies.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
      title: 'UI/UX Design',
      desc: 'Creating intuitive and visually stunning interfaces that users love to interact with.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      title: 'Mobile Apps',
      desc: 'Developing cross-platform mobile applications with React Native and Flutter.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: 'Performance',
      desc: 'Optimizing applications for speed, SEO, and the best possible user experience.',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 reveal">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            Passionate About <span className="gradient-text">Creating</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            I'm a full-stack developer with a designer's eye. I bridge the gap between
            beautiful design and functional code.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side */}
          <div className="relative reveal">
            <div className="relative z-10 rounded-2xl overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                    <div className="w-full h-full rounded-full bg-darker flex items-center justify-center">
                      <span className="font-display text-6xl font-bold gradient-text">AM</span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Alex Morgan</h3>
                  <p className="text-slate-400">San Francisco, CA</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-xl -z-0" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-secondary/30 rounded-full -z-0" />
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-primary/10 rounded-lg -z-0 animate-float" />
          </div>

          {/* Content Side */}
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <h3 className="font-display text-3xl font-bold text-white mb-6">
              Turning Ideas Into Reality
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              With over 5 years of experience in web development, I've had the privilege of working
              with startups, agencies, and Fortune 500 companies. My approach combines technical
              expertise with creative problem-solving to deliver solutions that exceed expectations.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              When I'm not coding, you'll find me exploring new design trends, contributing to
              open-source projects, or mentoring aspiring developers. I believe in continuous
              learning and staying ahead of the curve.
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Name', value: 'Alex Morgan' },
                { label: 'Email', value: 'alex@example.com' },
                { label: 'Location', value: 'San Francisco, CA' },
                { label: 'Availability', value: 'Freelance / Full-time' },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-4">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-white font-medium text-sm">{item.value}</div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300"
            >
              Download Resume
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {services.map((service, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 cursor-pointer group"
              onMouseEnter={() => setHoveredService(i)}
              onMouseLeave={() => setHoveredService(null)}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                hoveredService === i
                  ? 'bg-gradient-to-br from-primary to-secondary text-white'
                  : 'bg-white/5 text-primary'
              }`}>
                {service.icon}
              </div>
              <h4 className="font-display text-lg font-semibold text-white mb-2">{service.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
