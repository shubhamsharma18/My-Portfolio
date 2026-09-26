import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  SiJavascript,
  SiPython,
  SiFlask,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiReact,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPostman,
  SiHtml5,
  SiTypescript,
  SiRedux,
  SiFirebase,
  SiVercel,
} from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

// ═══════════════════════════════════════
// STATIC DATA — moved outside the component
// so it isn't recreated on every render
// ═══════════════════════════════════════
const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    color: 'from-primary to-secondary',
    skills: [
      { name: 'React.js', icon: <SiReact />, color: '#61DAFB' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
      { name: 'CSS3', icon: <FaCss3Alt />, color: '#2965F1' },
      { name: 'Redux', icon: <SiRedux />, color: '#764ABC' },
    ],
  },
  {
    title: 'Backend',
    color: 'from-secondary to-accent',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#5FA04E' },
      { name: 'Express', icon: <SiExpress />, color: '#A855F7' },
      { name: 'Python', icon: <SiPython />, color: '#4B8BBE' },
      { name: 'Flask', icon: <SiFlask />, color: '#93C5FD' },
      { name: 'REST API', icon: <SiPostman />, color: '#FF6C37' },
    ],
  },
  {
    title: 'Database',
    color: 'from-accent to-primary',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
      { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
      { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
    ],
  },
  {
    title: 'Tools & Others',
    color: 'from-primary to-accent',
    skills: [
      { name: 'Git', icon: <SiGit />, color: '#F05032' },
      { name: 'GitHub', icon: <SiGithub />, color: '#C9D1D9' },
      { name: 'Postman', icon: <SiPostman />, color: '#FF6C37' },
      { name: 'Vercel', icon: <SiVercel />, color: '#E5E7EB' },
    ],
  },
]

const STATS = [
  { number: '15+', label: 'Technologies' },
  { number: '2+', label: 'Years Coding' },
  { number: '20+', label: 'Projects Built' },
  { number: '100%', label: 'Passion' },
]

function Skills() {
  const container = useRef(null)

  // ═══════════════════════════════════════
  // GSAP ANIMATIONS (once: true — no reverse)
  // useGSAP auto-cleans contexts & triggers on unmount,
  // but we also revert any ScrollTriggers scoped to this
  // container defensively (helps with HMR / route changes).
  // ═══════════════════════════════════════
  useGSAP(
    () => {
      // Section Title — Fade up
      gsap.to('.skills-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
          once: true,
        },
      })

      // Category Cards — Stagger fade up
      gsap.to('.skill-category', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Skill Items — Scale + fade
      // Targets start hidden via the `opacity-0 scale-75` Tailwind classes in JSX,
      // so there's zero flash of full-opacity content before this JS runs.
      // GSAP animates them to opacity:1/scale:1 with an inline style that
      // stays in place permanently — we do NOT clear it afterwards, because
      // clearing it would let the Tailwind `opacity-0` class take over again
      // and make everything disappear (this was the original bug).
      gsap.to('.skill-item', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
          once: true,
        },
      })

      // Stats — Fade up
      gsap.to('.skill-stat', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skill-stats',
          start: 'top 90%',
          once: true,
        },
      })

      // Refresh ScrollTrigger once layout has settled
      // (helps when icon fonts / images shift layout height)
      const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => cancelAnimationFrame(refreshId)
    },
    { scope: container }
  )

  return (
    <section
      id="skills"
      ref={container}
      className="section bg-dark relative overflow-hidden"
    >
      {/* ───── Background Blobs ───── */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* ═══════════════════════════════════════
            SECTION TITLE
        ═══════════════════════════════════════ */}
        <div className="skills-title opacity-0 translate-y-12 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
            Technologies and tools I work with to build modern web applications
          </p>
        </div>

        {/* ═══════════════════════════════════════
            SKILL CATEGORIES GRID
        ═══════════════════════════════════════ */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="skill-category opacity-0 translate-y-16 card relative overflow-hidden group"
            >
              {/* Gradient Top Border */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color}`}
                aria-hidden="true"
              />

              {/* Category Title */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} animate-pulse`}
                  aria-hidden="true"
                />
                <h3 className="text-xl md:text-2xl font-display font-semibold">
                  {category.title}
                </h3>
                <span className="ml-auto text-xs text-text-muted bg-darker/50 px-2 py-1 rounded-full">
                  {category.skills.length}
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
                {category.skills.map((skill) => (
                  // Outer div: GSAP owns this element's entrance animation (opacity/scale).
                  // Kept separate from the motion.div below so GSAP and Framer Motion
                  // never fight over the same node's inline transform/opacity styles.
                  <div
                    key={skill.name}
                    className="skill-item opacity-0 scale-75"
                    role="listitem"
                    aria-label={skill.name}
                  >
                    <motion.div
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-darker/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group/skill cursor-pointer"
                    >
                      {/* Icon — chip background keeps it visible regardless of page theme */}
                      <div
                        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg text-3xl md:text-4xl transition-all duration-300 group-hover/skill:scale-110"
                        style={{
                          color: skill.color,
                          backgroundColor: `${skill.color}1A`, // ~10% opacity fill
                        }}
                        aria-hidden="true"
                      >
                        {skill.icon}
                      </div>

                      {/* Name */}
                      <p className="text-[10px] sm:text-xs md:text-sm font-medium text-text-muted group-hover/skill:text-text-primary transition-colors text-center leading-tight">
                        {skill.name}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Hover Glow */}
              <div
                className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 pointer-events-none`}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════
            STATS ROW
        ═══════════════════════════════════════ */}
        <div className="skill-stats mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="skill-stat opacity-0 translate-y-10 text-center p-6 rounded-2xl bg-dark border border-border hover:border-primary/50 transition-all duration-300"
            >
              <p className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {stat.number}
              </p>
              <p className="text-xs md:text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills