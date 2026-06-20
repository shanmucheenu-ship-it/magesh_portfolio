import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="py-32 relative bg-black border-t border-white/5 overflow-hidden">
      {/* Background cinematic fog/glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ rotateX: 25, rotateY: -15, opacity: 0, filter: "blur(20px)", scale: 0.9, y: 100 }}
          animate={inView ? { rotateX: 0, rotateY: 0, opacity: 1, filter: "blur(0px)", scale: 1, y: 0 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          className="flex flex-col md:flex-row gap-16 md:gap-24"
        >
          {/* Chapter Title - Cinematic Left Side */}
          <div className="md:w-1/3 flex flex-col">
            <span className="text-white/40 font-sans tracking-[0.3em] text-xs font-bold mb-4 uppercase">
              Chapter 06
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wide leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              The<br/>Signal
            </h2>
            <div className="w-12 h-[1px] bg-white/30 mt-8 mb-10"></div>

            <p className="text-white/60 font-sans font-light leading-relaxed mb-10 text-lg">
              Establish a connection. Whether it's a project inquiry or a strategic partnership, the lines are open.
            </p>

            {/* Cinematic Contact Details */}
            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Transmission', value: 'mahimahi05865@gmail.com', link: 'mailto:mahimahi05865@gmail.com' },
                { icon: Phone, label: 'Frequency', value: '+91 86104 42279', link: 'tel:+918610442279' },
                { icon: MapPin, label: 'Coordinates', value: 'Coimbatore, INDIA', link: null }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center gap-2">
                    <item.icon size={12} />
                    {item.label}
                  </span>
                  {item.link ? (
                    <a href={item.link} className="text-white font-medium uppercase tracking-wider text-sm hover:text-accentSilver transition-colors inline-block">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white font-medium uppercase tracking-wider text-sm">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form - Right Side */}
          <div className="md:w-2/3 flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 bg-[#050505] border border-white/10 text-center shadow-2xl"
                >
                  <div className="mb-6 animate-pulse">
                    <CheckCircle className="text-white" size={48} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">Signal Received</h3>
                  <p className="text-white/50 font-sans font-light tracking-wide text-sm">
                    Transmission confirmed. Awaiting response.
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-6 p-8 bg-[#050505] border border-white/10 shadow-2xl relative overflow-hidden group">
                  {/* Subtle sweep effect on container */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-[150%] group-hover:animate-[sweep_2.5s_ease-in-out]" />

                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    <div className="relative">
                      <input
                        type="text"
                        required
                        id="name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="peer w-full bg-transparent border-b border-white/20 text-white placeholder-transparent focus:outline-none focus:border-white py-3 transition-colors font-sans font-light"
                        placeholder="Name"
                      />
                      <label htmlFor="name" className="absolute left-0 -top-3.5 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-light peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-white">
                        Designation / Name
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        required
                        id="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="peer w-full bg-transparent border-b border-white/20 text-white placeholder-transparent focus:outline-none focus:border-white py-3 transition-colors font-sans font-light"
                        placeholder="Email"
                      />
                      <label htmlFor="email" className="absolute left-0 -top-3.5 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-light peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-white">
                        Return Frequency / Email
                      </label>
                    </div>
                  </div>

                  <div className="relative mt-2 z-10">
                    <input
                      type="text"
                      required
                      id="subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="peer w-full bg-transparent border-b border-white/20 text-white placeholder-transparent focus:outline-none focus:border-white py-3 transition-colors font-sans font-light"
                      placeholder="Subject"
                    />
                    <label htmlFor="subject" className="absolute left-0 -top-3.5 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-light peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-white">
                      Subject
                    </label>
                  </div>

                  <div className="relative mt-2 z-10">
                    <textarea
                      required
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="peer w-full bg-transparent border-b border-white/20 text-white placeholder-transparent focus:outline-none focus:border-white py-3 transition-colors resize-none font-sans font-light"
                      placeholder="Message"
                    />
                    <label htmlFor="message" className="absolute left-0 -top-3.5 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-light peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-white">
                      Transmission Data / Message
                    </label>
                  </div>

                  <div className="mt-8 z-10">
                    <button
                      type="submit"
                      className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-none font-black uppercase text-sm tracking-[0.2em] transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] w-full sm:w-auto"
                    >
                      Transmit
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

        </motion.div>
      </div>
    </section>
  )
}