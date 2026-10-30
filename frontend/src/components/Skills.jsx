import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  SiJavascript, SiPython, SiFlask, SiNodedotjs, SiMongodb, SiMysql,
  SiExpress, SiReact, SiTailwindcss, SiGit, SiGithub, SiPostman,
  SiHtml5, SiTypescript, SiRedux, SiFirebase, SiVercel,
} from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const CLUSTERS = [
  {
    id: 'frontend',
    title: 'Frontend',
    caption: 'The interface',
    accent: '#61DAFB',
    skills: [
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', role: 'The language of the web, in the browser and on the server.' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6', role: 'JavaScript with static types for safer code.' },
      { name: 'React.js', Icon: SiReact, color: '#61DAFB', role: 'Component-based library for building user interfaces.' },
      { name: 'Redux', Icon: SiRedux, color: '#764ABC', role: 'Predictable state management for larger apps.' },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26', role: 'The markup that gives a page its structure.' },
      { name: 'CSS3', Icon: FaCss3Alt, color: '#2965F1', role: 'Styling, layout and responsive behaviour.' },
      { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4', role: 'Utility-first CSS framework for styling.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    caption: 'Server & APIs',
    accent: '#A855F7',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E', role: 'JavaScript runtime for server-side code.' },
      { name: 'Python', Icon: SiPython, color: '#4B8BBE', role: 'General-purpose language for backend logic.' },
      { name: 'Express', Icon: SiExpress, color: '#A855F7', role: 'Minimal web framework for Node.js APIs.' },
      { name: 'Flask', Icon: SiFlask, color: '#93C5FD', role: 'Lightweight Python web framework.' },
      { name: 'REST API', Icon: SiPostman, color: '#FF6C37', role: 'Resource-based HTTP interface between client and server.' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    caption: 'Where data lives',
    accent: '#47A248',
    skills: [
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248', role: 'Document database that stores flexible, JSON-like data.' },
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1', role: 'Relational database queried with SQL.' },
      { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28', role: 'Google platform with hosted database and auth.' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Deployment',
    caption: 'Workflow and shipping',
    accent: '#F05032',
    skills: [
      { name: 'Git', Icon: SiGit, color: '#F05032', role: 'Version control for tracking changes to code.' },
      { name: 'GitHub', Icon: SiGithub, color: '#C9D1D9', role: 'Hosting and collaboration for Git repositories.' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37', role: 'Tool for building and testing API requests.' },
      { name: 'Vercel', Icon: SiVercel, color: '#E5E7EB', role: 'Platform for deploying and hosting web apps.' },
    ],
  },
]

const EDGES = [
  ['React.js', 'JavaScript'], ['React.js', 'TypeScript'], ['React.js', 'Redux'],
  ['JavaScript', 'TypeScript'], ['React.js', 'Tailwind'], ['Tailwind', 'CSS3'],
  ['CSS3', 'HTML5'], ['Node.js', 'Express'], ['Express', 'REST API'],
  ['Python', 'Flask'], ['React.js', 'REST API'], ['Postman', 'REST API'],
  ['Express', 'MongoDB'], ['Flask', 'MySQL'], ['Flask', 'Firebase'],
  ['Git', 'GitHub'], ['GitHub', 'Vercel'],
]

const BY_NAME = Object.fromEntries(
  CLUSTERS.flatMap((c) => c.skills.map((s) => [s.name, { skill: s, cluster: c }]))
)
const NEIGHBORS = {}
EDGES.forEach(([a, b]) => {
  ;(NEIGHBORS[a] ||= []).push(b)
  ;(NEIGHBORS[b] ||= []).push(a)
})

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/* ------------------------------------------------------------------ */
/*  SKILL NODE — the clean, elevated pill                              */
/* ------------------------------------------------------------------ */
const SkillNode = memo(function SkillNode({
  skill, clusterTitle, state, selected, onEnter, onLeave, onToggle,
}) {
  const { name, Icon, color } = skill

  const stateStyles = {
    idle: 'border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-white',
    lit: 'border-white/40 bg-white/[0.06] text-white',
    dim: 'border-white/[0.05] bg-white/[0.01] text-neutral-600',
    focus: 'border-white/80 bg-white/[0.1] text-white shadow-[0_8px_32px_rgba(255,255,255,0.15)]',
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${name}, ${clusterTitle}`}
      onClick={() => onToggle(name)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onEnter(name)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && onLeave()}
      onFocus={() => onEnter(name)}
      onBlur={onLeave}
      style={{ '--node-brand': color }}
      className={`group relative flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${stateStyles[state]} ${selected ? 'ring-1 ring-white/60 ring-offset-2 ring-offset-[#0a0a0a]' : ''}`}
    >
      <span
        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:scale-110 group-hover:border-white/20"
        style={{ color: state === 'dim' ? undefined : color }}
      >
        <Icon aria-hidden="true" className="h-4 w-4" />
      </span>
      <span className="truncate">{name}</span>
      {selected && (
        <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
      )}
    </button>
  )
})

/* ------------------------------------------------------------------ */
/*  CLUSTER CARD — 3D tilt on hover                                    */
/* ------------------------------------------------------------------ */
function ClusterCard({ cluster, activeSkill, selectedSkill, category, onEnter, onLeave, onToggle, onCategory }) {
  const cardRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const handleMouseMove = (e) => {
    if (reduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateZ(0)`
  }
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
    onLeave()
  }

  const isActiveCluster = !category || category === cluster.id
  const clusterSkills = cluster.skills
  const isFocusCluster = activeSkill ? BY_NAME[activeSkill]?.cluster.id === cluster.id : true

  return (
    <div
      data-mcluster
      className={`relative transition-opacity duration-500 ${isActiveCluster && isFocusCluster ? 'opacity-100' : 'opacity-40'}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.08)] sm:p-6"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* subtle accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at 50% 0%, ${cluster.accent}15, transparent 60%)`,
          }}
        />

        {/* header */}
        <div className="relative mb-5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => onCategory(category === cluster.id ? null : cluster.id)}
              aria-pressed={category === cluster.id}
              className="group/btn text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded"
            >
              <h3 className="text-base font-semibold tracking-tight text-white transition-colors group-hover/btn:text-white sm:text-lg">
                {cluster.title}
              </h3>
              <p className="mt-0.5 text-xs text-neutral-500 transition-colors group-hover/btn:text-neutral-400">
                {cluster.caption}
              </p>
            </button>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: cluster.accent, boxShadow: `0 0 12px ${cluster.accent}80` }}
          />
        </div>

        {/* skills grid */}
        <ul className="relative grid grid-cols-1 gap-2 sm:grid-cols-2">
          {clusterSkills.map((skill) => (
            <li key={skill.name}>
              <SkillNode
                skill={skill}
                clusterTitle={cluster.title}
                state={
                  selectedSkill === skill.name
                    ? 'focus'
                    : activeSkill
                    ? NEIGHBORS[activeSkill]?.includes(skill.name) || activeSkill === skill.name
                      ? 'lit'
                      : 'dim'
                    : 'idle'
                }
                selected={selectedSkill === skill.name}
                onEnter={onEnter}
                onLeave={onLeave}
                onToggle={onToggle}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  INFO PANEL — clean bottom bar, not jumpy                           */
/* ------------------------------------------------------------------ */
function InfoPanel({ selectedName, category, onPick, onClear, reduceMotion }) {
  const entry = selectedName ? BY_NAME[selectedName] : null
  const cluster = category ? CLUSTERS.find((c) => c.id === category) : null
  const key = selectedName ?? category ?? 'idle'

  return (
    <div aria-live="polite" className="mt-10 lg:sticky lg:bottom-6 lg:z-30">
      <div className="mx-auto max-w-[980px] rounded-2xl border border-white/[0.08] bg-[#0d0d0d]/90 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={key}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            {entry ? (
              <>
                <div className="flex min-w-0 items-center gap-3.5">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]"
                    style={{ color: entry.skill.color }}
                    aria-hidden="true"
                  >
                    <entry.skill.Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                      {entry.cluster.title}
                    </p>
                    <p className="truncate text-base font-semibold text-white">
                      {entry.skill.name}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-neutral-400">
                      {entry.skill.role}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 sm:max-w-[340px] sm:justify-end">
                  <span className="mr-1 text-[11px] uppercase tracking-wider text-neutral-600">
                    Connects
                  </span>
                  {NEIGHBORS[selectedName]?.slice(0, 4).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => onPick(n)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-300 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={onClear}
                    className="rounded-full border border-white/30 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    Clear
                  </button>
                </div>
              </>
            ) : cluster ? (
              <>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-white">{cluster.title}</p>
                  <p className="mt-0.5 text-xs text-neutral-400">{cluster.caption}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:max-w-[480px] sm:justify-end">
                  {cluster.skills.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => onPick(s.name)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-300 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-neutral-400">
                Select a technology to explore what it connects to.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */
function Skills() {
  const container = useRef(null)
  const leaveTimer = useRef(0)
  const reduceMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [category, setCategory] = useState(null)

  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  const onEnter = useCallback((name) => {
    clearTimeout(leaveTimer.current)
    setHovered(name)
  }, [])

  const onLeave = useCallback(() => {
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => setHovered(null), 100)
  }, [])

  const onToggle = useCallback(
    (name) => setSelected((prev) => (prev === name ? null : name)),
    []
  )
  const onPick = useCallback((name) => setSelected(name), [])
  const onClear = useCallback(() => setSelected(null), [])
  const onReset = useCallback(() => {
    setSelected(null)
    setCategory(null)
    setHovered(null)
  }, [])
  const onCategory = useCallback((id) => {
    setSelected(null)
    setHovered(null)
    setCategory((prev) => (id === null || prev === id ? null : id))
  }, [])

  const activeSkill = hovered ?? selected

  /* GSAP intro — scoped, reduced-motion aware */
  useGSAP(
    () => {
      const q = gsap.utils.selector(container)
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(q('[data-intro]'), {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: container.current, start: 'top 80%', once: true },
        })
        gsap.from(q('[data-mcluster]'), {
          y: 32,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: container.current, start: 'top 75%', once: true },
        })
      })

      const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => {
        cancelAnimationFrame(refreshId)
        mm.revert()
      }
    },
    { scope: container, dependencies: [isDesktop], revertOnUpdate: true }
  )

  const filterBtn = (active) =>
    `h-9 rounded-full border px-4 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
      active
        ? 'border-white bg-white text-[#0a0a0a]'
        : 'border-white/15 text-neutral-300 hover:border-white/40 hover:bg-white/[0.05] hover:text-white'
    }`

  return (
    <section
      id="skills"
      ref={container}
      aria-labelledby="skills-heading"
      onKeyDown={(e) => e.key === 'Escape' && onReset()}
      className="relative overflow-hidden bg-[#0a0a0a] px-5 py-20 sm:px-[5vw] sm:py-28 lg:px-[78px]"
    >
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, #000 0%, transparent 75%)',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, #000 0%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,#1a1a1a_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        {/* ---------- HEADER ---------- */}
        <header className="mb-12 lg:mb-16">
          <p
            data-intro
            className="mb-4 flex items-center gap-4 text-sm tracking-[0.3em] text-neutral-400 sm:text-base"
          >
            SKILLS
            <span data-line className="block h-px w-10 bg-neutral-600" />
          </p>
          <h2
            id="skills-heading"
            className="mb-5 max-w-[800px] text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white"
          >
            <span data-intro className="block">Explore my</span>
            <span data-intro className="block">
              tech universe
            </span>
          </h2>
          <p
            data-intro
            className="max-w-[540px] text-base font-light leading-[1.7] text-neutral-400 sm:text-lg"
          >
            Four clusters, one stack. Hover or tap any technology to see how it connects to the rest.
          </p>
        </header>

        {/* ---------- FILTER BAR ---------- */}
        <div
          data-intro
          role="group"
          aria-label="Filter by cluster"
          className="mb-10 flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            aria-pressed={!category}
            onClick={() => onCategory(null)}
            className={filterBtn(!category)}
          >
            All
          </button>
          {CLUSTERS.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              onClick={() => onCategory(c.id)}
              className={filterBtn(category === c.id)}
            >
              {c.title}
            </button>
          ))}
          {(selected || category) && (
            <button
              type="button"
              onClick={onReset}
              className="ml-2 h-9 px-3 text-sm text-neutral-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              Reset
            </button>
          )}
        </div>

        {/* ---------- CLUSTER CARDS GRID ---------- */}
        <div className="grid gap-5 md:grid-cols-2 xl:gap-6">
          {CLUSTERS.map((cluster) => (
            <ClusterCard
              key={cluster.id}
              cluster={cluster}
              activeSkill={activeSkill}
              selectedSkill={selected}
              category={category}
              onEnter={onEnter}
              onLeave={onLeave}
              onToggle={onToggle}
              onCategory={onCategory}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-neutral-600">
          Connections show common conceptual relationships between technologies, not a specific project architecture.
        </p>

        {/* ---------- INFO PANEL ---------- */}
        <InfoPanel
          selectedName={selected}
          category={category}
          onPick={onPick}
          onClear={onClear}
          reduceMotion={reduceMotion}
        />
      </div>
    </section>
  )
}

export default Skills