import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-20"
    >
      {/* Background Blobs */}
      <div className="absolute top-20 -left-20 w-72 md:w-96 h-72 md:h-96 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-20 -right-20 w-72 md:w-96 h-72 md:h-96 bg-secondary/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-[500px] h-96 md:h-[500px] bg-accent/10 rounded-full blur-3xl"></div>

      <div className="  container-custom grid md:grid-cols-2  lg:gap-16 items-center relative z-10">

        {/* ───── LEFT: Text ───── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-medium mb-4 text-base md:text-lg"
          >
            👋 Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-14 leading-tight"
          >
            Shubham
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold mb-15 h-10 sm:h-12 md:h-14 flex items-center justify-center md:justify-start"
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-red-700 pb-6 text-text-muted text-base md:text-lg mt-12 mb-15 max-w-lg mx-auto md:mx-0"
          >
            I build fast, scalable, and beautiful web applications using
            MongoDB, Express, React, and Node.js.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-15 mb-8 justify-center md:justify-start"
          >
           <button classname="">

            <button to="/projects" className=" px-3
            
            
            
            4 btn-primary mb-6">
              View Projects <FiArrowRight />
            </button></button>
            <a href="/resume.pdf" download className="btn-outline">
              <FiDownload /> Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 justify-center  md:justify-start"
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
          className="flex justify-center relative mt-8 md:mt-0"
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

            {/* Rotating Gradient Ring (Outer) */}
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

            {/* Main Photo with Gradient Ring */}
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

            {/* Floating Badge 1 - Top Right */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 -right-4 sm:top-8 sm:-right-8 glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-glow"
            >
              <p className="text-xs sm:text-sm font-bold gradient-text">2+ Years</p>
              <p className="text-[10px] sm:text-xs text-text-muted">Experience</p>
            </motion.div>

            {/* Floating Badge 2 - Bottom Left */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute bottom-4 -left-4 sm:bottom-8 sm:-left-8 glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-glow"
            >
              <p className="text-xs sm:text-sm font-bold gradient-text">15+</p>
              <p className="text-[10px] sm:text-xs text-text-muted">Projects</p>
            </motion.div>

            {/* Floating Badge 3 - Top Left (Desktop only) */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/4 -left-12 glass px-3 py-1.5 rounded-lg shadow-glow hidden lg:block"
            >
              <p className="text-xs font-semibold text-primary">⚛️ React</p>
            </motion.div>

            {/* Floating Badge 4 - Bottom Right (Desktop only) */}
            <motion.div
              animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-1/4 -right-12 glass px-3 py-1.5 rounded-lg shadow-glow hidden lg:block"
            >
              <p className="text-xs font-semibold text-secondary">🟢 Node.js</p>
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