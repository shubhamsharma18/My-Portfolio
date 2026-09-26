import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import {
  FiDownload,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiSend,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiPython,
  SiMysql,
} from 'react-icons/si'

// ═══════════════════════════════════════
// BACKGROUND ANIMATION CONFIG
// Fixed (not random-per-render) so there's no
// hydration/re-render jitter — positions & timings
// are hand-picked to feel organic but stay stable.
// ═══════════════════════════════════════
const PAPER_PLANES = [
  { top: '15%', left: '-5%', rotate: 25, duration: 18, delay: 0 },
  { top: '55%', left: '-8%', rotate: 15, duration: 22, delay: 4 },
  { top: '75%', left: '-6%', rotate: 35, duration: 20, delay: 9 },
  { top: '30%', left: '-4%', rotate: 10, duration: 25, delay: 13 },
]

const LIGHT_PARTICLES = [
  { left: '8%', size: 6, duration: 9, delay: 0 },
  { left: '20%', size: 4, duration: 11, delay: 1.5 },
  { left: '35%', size: 5, duration: 8, delay: 0.5 },
  { left: '50%', size: 3, duration: 10, delay: 2.5 },
  { left: '65%', size: 6, duration: 12, delay: 1 },
  { left: '78%', size: 4, duration: 9, delay: 3 },
  { left: '90%', size: 5, duration: 10, delay: 2 },
]

function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen  flex items-center justify-center relative overflow-hidden "
    >
      {/* ═══════════════════════════════════════
          BACKGROUND: dot-grid + blobs (base layer)
      ═══════════════════════════════════════ */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Background Blobs */}
      <div className="absolute top-20 -left-20 w-72 md:w-96 h-72 md:h-96 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-20 -right-20 w-72 md:w-96 h-72 md:h-96 bg-secondary/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-[500px] h-96 md:h-[500px] bg-accent/10 rounded-full blur-3xl"></div>

      {/* ═══════════════════════════════════════
          BACKGROUND: rising light particles
          Small glowing orbs drifting upward + twinkling.
      ═══════════════════════════════════════ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {LIGHT_PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '-10%', opacity: [0, 0.8, 0.8, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-0 rounded-full bg-primary shadow-glow"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════
          BACKGROUND: floating paper planes
          Drift diagonally across the section, looping.
          Kept low-opacity so it reads as a subtle
          professional accent, not a distraction.
      ═══════════════════════════════════════ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PAPER_PLANES.map((plane, i) => (
          <motion.div
            key={i}
            initial={{ x: '-10vw', opacity: 0 }}
            animate={{ x: '120vw', opacity: [0, 0.35, 0.35, 0] }}
            transition={{
              duration: plane.duration,
              delay: plane.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute text-primary/70"
            style={{ top: plane.top, left: plane.left, rotate: `${plane.rotate}deg` }}
          >
            <FiSend className="text-2xl md:text-3xl" />
          </motion.div>
        ))}
      </div>

      <div className="container-custom grid md:grid-cols-2 lg:gap-16 items-center relative z-10">

        {/* ───── LEFT: Text ───── */}
<motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="text-center md:text-left"
>
  {/* Greeting */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="text-primary font-medium text-base md:text-lg"
  >
    👋 Hello, I'm
  </motion.p>

  {/* Name */}
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
  >
    Shubham
  </motion.h1>

  {/* Typing Animation */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold mb-2 h-10 sm:h-12 md:h-14 flex items-center justify-center md:justify-start"
  >
    <TypeAnimation
      sequence={[
        'Full Stack Developer',
        2000,
        'MERN Stack Developer',
        2000,
        'React Specialist',
        2000,
        'Problem Solver 🧠',
        2000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="gradient-text"
    />
  </motion.div>

  {/* Description */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="text-text-muted text-base md:text-lg mb-3 max-w-lg mx-auto md:mx-0 leading-relaxed"
  >
    I build fast, scalable, and beautiful web applications using
    MongoDB, Express, React, and Node.js.
  </motion.p>

  {/* CTA Buttons */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="flex flex-wrap gap-4  justify-center md:justify-start"
  >
    <Link
      to="/projects"
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow-lg hover:-translate-y-0.5 transition-all duration-300"
    >
      View Projects <FiArrowRight />
    </Link>

    <a
      href="/resume.pdf"
      download
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-border hover:border-primary text-white hover:text-primary hover:-translate-y-0.5 transition-all duration-300"
    >
      <FiDownload /> Resume
    </a>
  </motion.div>

  {/* Social Links */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="flex gap-4 justify-center md:justify-start"
  >
    {[
      { icon: <FiGithub />, href: '#' },
      { icon: <FiLinkedin />, href: '#' },
      { icon: <FiTwitter />, href: '#' },
    ].map((social, i) => (
      <motion.a
        key={i}
        href={social.href}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="w-11 h-11 md:w-12 md:h-12 glass rounded-xl flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors duration-300"
      >
        {social.icon}
      </motion.a>
    ))}
  </motion.div>
</motion.div>
        {/* ───── RIGHT: Photo with Animations ───── */}
       <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="flex justify-center relative mt-12 md:mt-0"
>
  {/* Glow Behind */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-3xl scale-90"></div>

  <div className="relative">

    {/* Rotating Dashed Ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-2 border-dashed border-primary/30"
    />

    {/* Rotating Gradient Ring */}
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border border-secondary/20"
    />

    {/* Pulsing Ring */}
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-primary/20"
    />

    {/* Main Photo */}
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1.5"
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-dark">
        <img
          src="/Shubampic.jpeg"
          alt="Shubham"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>

    {/* Orbiting Dot 1 */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 md:w-3 md:h-3 bg-primary rounded-full shadow-glow"></div>
    </motion.div>

    {/* Orbiting Dot 2 */}
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 md:w-3 md:h-3 bg-secondary rounded-full shadow-glow"></div>
    </motion.div>

    {/* Orbiting Dot 3 */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
    >
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2.5 h-2.5 md:w-3 md:h-3 bg-accent rounded-full shadow-glow"></div>
    </motion.div>

    {/* Floating Badge 1 — Experience */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute top-4 -right-4 sm:top-8 sm:-right-8 glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-glow"
    >
      <p className="text-xs sm:text-sm font-bold gradient-text">2+ Years</p>
      <p className="text-[10px] sm:text-xs text-text-muted">Experience</p>
    </motion.div>

    {/* Floating Badge 2 — Projects */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      className="absolute bottom-4 -left-4 sm:bottom-8 sm:-left-8 glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-glow"
    >
      <p className="text-xs sm:text-sm font-bold gradient-text">15+</p>
      <p className="text-[10px] sm:text-xs text-text-muted">Projects</p>
    </motion.div>

    {/* ═══════════════════════════════════════
        TECH ICONS AROUND PHOTO
    ═══════════════════════════════════════ */}

    {/* Top Left — React */}
    <motion.div
      animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      className="absolute top-0 left-0 md:-top-4 md:-left-4 glass px-3 py-2 rounded-xl shadow-glow hidden lg:flex items-center gap-2"
    >
      <SiReact className="text-lg text-[#61DAFB]" />
      <span className="text-xs font-semibold text-text-primary">React</span>
    </motion.div>

    {/* Top Right — Node.js */}
    <motion.div
      animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      className="absolute top-0 right-0 md:-top-4 md:-right-4 glass px-3 py-2 rounded-xl shadow-glow hidden lg:flex items-center gap-2"
    >
      <SiNodedotjs className="text-lg text-[#339933]" />
      <span className="text-xs font-semibold text-text-primary">Node.js</span>
    </motion.div>

    {/* Middle Left — MongoDB */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay: 0.3 }}
      className="absolute top-1/3 -left-8 md:-left-12 glass px-3 py-2 rounded-xl shadow-glow hidden lg:flex items-center gap-2"
    >
      <SiMongodb className="text-lg text-[#47A248]" />
      <span className="text-xs font-semibold text-text-primary">MongoDB</span>
    </motion.div>

    {/* Middle Right — Express */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
      className="absolute top-1/3 -right-8 md:-right-12 glass px-3 py-2 rounded-xl shadow-glow hidden lg:flex items-center gap-2"
    >
      <SiExpress className="text-lg text-[#A855F7]" />
      <span className="text-xs font-semibold text-text-primary">Express</span>
    </motion.div>

    {/* Bottom Left — Python */}
    <motion.div
      animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
      className="absolute bottom-0 left-0 md:-bottom-4 md:-left-4 glass px-3 py-2 rounded-xl shadow-glow hidden lg:flex items-center gap-2"
    >
      <SiPython className="text-lg text-[#3776AB]" />
      <span className="text-xs font-semibold text-text-primary">Python</span>
    </motion.div>

    {/* Bottom Right — MySQL */}
    <motion.div
      animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay: 1.2 }}
      className="absolute bottom-0 right-0 md:-bottom-4 md:-right-4 glass px-3 py-2 rounded-xl shadow-glow hidden lg:flex items-center gap-2"
    >
      <SiMysql className="text-lg text-[#4479A1]" />
      <span className="text-xs font-semibold text-text-primary">MySQL</span>
    </motion.div>

  </div>
</motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <p className="text-text-muted text-xs">Scroll Down</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-border rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-primary rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection