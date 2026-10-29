import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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

/* ------------------------------------------------------------------ */
/*  DATA: technologies, clusters and relationships.                    */
/*  Positions are in a 1000 x 600 coordinate space (desktop map only). */
/*  `role` describes the technology itself (no proficiency claims).    */
/*  EDGES are illustrative, conceptual relationships.                  */
/* ------------------------------------------------------------------ */
const VIEW_W = 1000
const VIEW_H = 600

const CLUSTERS = [
  {
    id: 'frontend',
    title: 'Frontend',
    caption: 'The interface',
    rect: [0, 0, 480, 320],
    skills: [
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', pos: [85, 75], role: 'The language of the web, in the browser and on the server.' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6', pos: [240, 75], role: 'JavaScript with static types for safer code.' },
      { name: 'Redux', Icon: SiRedux, color: '#764ABC', pos: [395, 75], role: 'Predictable state management for larger apps.' },
      { name: 'React.js', Icon: SiReact, color: '#61DAFB', pos: [240, 165], role: 'Component-based library for building user interfaces.' },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26', pos: [85, 255], role: 'The markup that gives a page its structure.' },
      { name: 'CSS3', Icon: FaCss3Alt, color: '#2965F1', pos: [240, 255], role: 'Styling, layout and responsive behaviour.' },
      { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4', pos: [395, 255], role: 'Utility-first CSS framework for styling.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    caption: 'Server & APIs',
    rect: [520, 0, 480, 320],
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E', pos: [760, 120], role: 'JavaScript runtime for server-side code.' },
      { name: 'Python', Icon: SiPython, color: '#4B8BBE', pos: [915, 120], role: 'General-purpose language for backend logic and scripting.' },
      { name: 'REST API', Icon: SiPostman, color: '#FF6C37', pos: [605, 165], role: 'Resource-based HTTP interface between client and server.' },
      { name: 'Express', Icon: SiExpress, color: '#A855F7', pos: [760, 210], role: 'Minimal web framework for Node.js APIs.' },
      { name: 'Flask', Icon: SiFlask, color: '#93C5FD', pos: [915, 210], role: 'Lightweight Python web framework.' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    caption: 'Where data lives',
    rect: [520, 370, 480, 230],
    skills: [
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248', pos: [605, 485], role: 'Document database that stores flexible, JSON-like data.' },
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1', pos: [760, 485], role: 'Relational database queried with SQL.' },
      { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28', pos: [915, 485], role: 'Google platform with a hosted database and authentication.' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Deployment',
    caption: 'Workflow and shipping',
    rect: [0, 370, 480, 230],
    skills: [
      { name: 'Git', Icon: SiGit, color: '#F05032', pos: [85, 445], role: 'Version control for tracking changes to code.' },
      { name: 'GitHub', Icon: SiGithub, color: '#C9D1D9', pos: [240, 445], role: 'Hosting and collaboration for Git repositories.' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37', pos: [395, 445], role: 'Tool for building and testing API requests.' },
      { name: 'Vercel', Icon: SiVercel, color: '#E5E7EB', pos: [240, 535], role: 'Platform for deploying and hosting web apps.' },
    ],
  },
]

const EDGES = [
  ['React.js', 'JavaScript'], ['React.js', 'TypeScript'], ['React.js', 'Redux'], ['JavaScript', 'TypeScript'],
  ['React.js', 'Tailwind'], ['Tailwind', 'CSS3'], ['CSS3', 'HTML5'],
  ['Node.js', 'Express'], ['Express', 'REST API'], ['Python', 'Flask'],
  ['React.js', 'REST API'], ['Postman', 'REST API'],
  ['Express', 'MongoDB'], ['Flask', 'MySQL'], ['Flask', 'Firebase'],
  ['Git', 'GitHub'], ['GitHub', 'Vercel'],
]

/* derived lookups (computed once, outside the component) */
const BY_NAME = Object.fromEntries(
  CLUSTERS.flatMap((cluster) => cluster.skills.map((skill) => [skill.name, { skill, cluster }]))
)
const NEIGHBORS = {}
EDGES.forEach(([a, b]) => {
  ;(NEIGHBORS[a] ||= []).push(b)
  ;(NEIGHBORS[b] ||= []).push(a)
})
const EDGE_PATHS = EDGES.map(([a, b]) => {
  const [x1, y1] = BY_NAME[a].skill.pos
  const [x2, y2] = BY_NAME[b].skill.pos
  return { a, b, d: `M${x1} ${y1} L${x2} ${y2}` }
})

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

const pct = (v, total) => `${(v / total) * 100}%`

const NODE_STATE = {
  idle: 'border-white/15 bg-neutral-900 text-neutral-300 hover:border-white/40 hover:text-white',
  lit: 'border-white/40 bg-neutral-900 text-white',
  dim: 'border-white/[0.07] bg-neutral-900 text-neutral-500',
  focus: 'border-white bg-neutral-800 text-white shadow-[0_0_28px_rgba(255,255,255,.22)] scale-[1.06]',
}

/* ------------------------------------------------------------------ */
/*  NODE BUTTON (shared by the desktop map and the mobile layout)      */
/* ------------------------------------------------------------------ */
const NodeButton = memo(function NodeButton({ skill, clusterTitle, state, selected, compact, onEnter, onLeave, onToggle }) {
  const { name, Icon, color } = skill
  const iconTone =
    state === 'focus'
      ? 'text-[var(--node-brand)]'
      : state === 'lit'
      ? 'text-white'
      : state === 'dim'
      ? 'text-neutral-600'
      : 'text-neutral-400 group-hover:text-[var(--node-brand)]'
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
      style={{ '--node-brand': color }} /* FIX 5: token renamed to avoid collision with Hero's accent system */
      className={`group relative inline-flex items-center whitespace-nowrap rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
        compact ? 'h-11 w-full justify-start gap-2.5 px-3.5 text-sm' : 'h-[2.8em] gap-[0.55em] px-[0.95em]'
      } ${NODE_STATE[state]} ${selected ? 'ring-1 ring-white/70 ring-offset-2 ring-offset-[#0a0a0a]' : ''}`}
    >
      <Icon aria-hidden="true" className={`shrink-0 transition-colors duration-300 ${compact ? 'h-5 w-5' : 'h-[1.25em] w-[1.25em]'} ${iconTone}`} />
      <span>{name}</span>
      {selected && <span aria-hidden="true" className="ml-0.5 h-1.5 w-1.5 rounded-full bg-white" />}
    </button>
  )
})

/* ------------------------------------------------------------------ */
/*  INFO DOCK (sticks to the bottom of the viewport while exploring)   */
/* ------------------------------------------------------------------ */
function Dock({ selectedName, category, onPick, onClear, reduceMotion }) {
  const entry = selectedName ? BY_NAME[selectedName] : null
  const cluster = category ? CLUSTERS.find((c) => c.id === category) : null
  const key = selectedName ?? category ?? 'idle'
  const chip =
    'rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80'

  return (
    /* FIX 3: sticky scoped to lg+ only — mobile pe content cover nahi karega, no jump */
    <div aria-live="polite" className="z-30 mx-auto mt-8 max-w-[980px] lg:sticky lg:bottom-4">
      <div className="min-h-[88px] rounded-2xl border border-white/10 bg-neutral-900/85 p-4 shadow-[0_20px_50px_rgba(0,0,0,.55)] backdrop-blur-md sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={key}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            {entry ? (
              <>
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-2xl"
                    style={{ color: entry.skill.color }}
                    aria-hidden="true"
                  >
                    <entry.skill.Icon />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500">{entry.cluster.title}</p>
                    <p className="text-lg font-semibold leading-tight tracking-tight text-white">{entry.skill.name}</p>
                    <p className="mt-0.5 text-sm text-neutral-400">{entry.skill.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:max-w-[320px] sm:justify-end">
                  <span className="text-xs text-neutral-500">Connects to</span>
                  {NEIGHBORS[selectedName].map((n) => (
                    <button key={n} type="button" onClick={() => onPick(n)} className={chip}>{n}</button>
                  ))}
                  <button type="button" onClick={onClear} className={`${chip} border-white/30 text-white`}>Clear</button>
                </div>
              </>
            ) : cluster ? (
              <>
                <div>
                  <p className="text-lg font-semibold tracking-tight text-white">{cluster.title}</p>
                  <p className="text-sm text-neutral-400">{cluster.caption}</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:max-w-[520px] sm:justify-end">
                  {cluster.skills.map((s) => (
                    <button key={s.name} type="button" onClick={() => onPick(s.name)} className={chip}>{s.name}</button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-neutral-400 sm:text-base">
                Select a technology to see what it connects to, or filter by cluster to focus on one area.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */
function Skills() {
  const container = useRef(null)
  const leaveTimer = useRef(0)
  const reduceMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const [selected, setSelected] = useState(null) // persistent (click / tap)
  const [hovered, setHovered] = useState(null) //   transient (hover / keyboard focus)
  const [category, setCategory] = useState(null) // cluster filter

  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  const onEnter = useCallback((name) => {
    clearTimeout(leaveTimer.current)
    setHovered(name)
  }, [])
  const onLeave = useCallback(() => {
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => setHovered(null), 70)
  }, [])
  const onToggle = useCallback((name) => setSelected((prev) => (prev === name ? null : name)), [])
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

  /* what is highlighted right now */
  const focusName = hovered ?? selected
  const { litNodes, litEdges, litCluster } = useMemo(() => {
    if (focusName) {
      const nodes = new Set([focusName, ...(NEIGHBORS[focusName] || [])])
      const edges = new Set(EDGES.flatMap(([a, b], i) => (a === focusName || b === focusName ? [i] : [])))
      return { litNodes: nodes, litEdges: edges, litCluster: BY_NAME[focusName].cluster.id }
    }
    if (category) {
      const nodes = new Set(CLUSTERS.find((c) => c.id === category).skills.map((s) => s.name))
      const edges = new Set(EDGES.flatMap(([a, b], i) => (nodes.has(a) && nodes.has(b) ? [i] : [])))
      return { litNodes: nodes, litEdges: edges, litCluster: category }
    }
    return { litNodes: null, litEdges: new Set(), litCluster: null }
  }, [focusName, category])

  const stateOf = (name) => (name === focusName ? 'focus' : litNodes ? (litNodes.has(name) ? 'lit' : 'dim') : 'idle')

  /* ---------------- GSAP: scoped, reduced-motion aware ---------------- */
  useGSAP(
    () => {
      const q = gsap.utils.selector(container)
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const once = (trigger, start) => ({ trigger, start, once: true })

        gsap.from(q('[data-intro]'), {
          y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          clearProps: 'transform,opacity', scrollTrigger: once(container.current, 'top 75%'),
        })
        gsap.from(q('[data-line]'), {
          scaleX: 0, transformOrigin: 'left center', duration: 0.8, delay: 0.35, ease: 'power2.out',
          clearProps: 'transform', scrollTrigger: once(container.current, 'top 75%'),
        })
        gsap.from(q('[data-toolbar]'), {
          y: 16, opacity: 0, duration: 0.7, delay: 0.3, ease: 'power3.out',
          clearProps: 'transform,opacity', scrollTrigger: once(container.current, 'top 70%'),
        })

        const canvas = q('[data-canvas]')[0]
        if (canvas) {
          const trig = once(canvas, 'top 80%')
          gsap.from(q('[data-zone]'), { opacity: 0, duration: 0.8, stagger: 0.12, clearProps: 'opacity', scrollTrigger: trig })
          gsap.from(q('[data-legend]'), { opacity: 0, y: 8, duration: 0.6, delay: 0.2, stagger: 0.12, clearProps: 'transform,opacity', scrollTrigger: trig })
          gsap.from(q('[data-node]'), {
            scale: 0.6, opacity: 0, duration: 0.5, delay: 0.35, ease: 'power2.out',
            stagger: { each: 0.045, from: 'center' }, clearProps: 'transform,opacity', scrollTrigger: trig,
          })
          gsap.fromTo(
            q('[data-edge]'),
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.9, delay: 0.9, ease: 'power2.inOut', stagger: 0.06,
              clearProps: 'strokeDasharray,strokeDashoffset', scrollTrigger: trig }
          )
        } else {
          q('[data-mcluster]').forEach((block) => {
            const trig = once(block, 'top 88%')
            gsap.from(block, { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: trig })
            gsap.from(block.querySelectorAll('[data-mnode]'), {
              y: 10, opacity: 0, duration: 0.4, delay: 0.15, stagger: 0.04, ease: 'power2.out',
              clearProps: 'transform,opacity', scrollTrigger: trig,
            })
          })
        }
      })

      const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => {
        cancelAnimationFrame(refreshId)
        mm.revert()
      }
    },
    { scope: container, dependencies: [isDesktop], revertOnUpdate: true }
  )

  /* FIX 2: filter buttons h-10 -> h-9 to match legend button scale */
  const filterBtn = (active) =>
    `h-9 rounded-full border px-4 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
      active ? 'border-white bg-white text-[#0a0a0a]' : 'border-white/30 text-white hover:border-white hover:bg-white/10'
    }`

  return (
    <section
      id="skills"
      ref={container}
      aria-labelledby="skills-heading"
      onKeyDown={(e) => e.key === 'Escape' && onReset()}
      className="relative overflow-clip bg-[#0a0a0a] px-5 py-20 sm:px-[5vw] sm:py-28 lg:px-[78px]"
    >
      <style>{`
        @keyframes uni-pulse { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .uni-pulse { animation: uni-pulse 2.4s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .uni-pulse { animation: none; display: none; } }
      `}</style>

      {/* Hero grid + soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 50%, #000 0%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse 80% 65% at 50% 50%, #000 0%, transparent 75%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,#1c1c1c_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        {/* ============ HEADER ============ */}
        <header className="mb-10 lg:mb-12">
          <p data-intro className="mb-3.5 flex items-center gap-4 text-sm tracking-[0.3em] text-neutral-200 sm:text-base">
            SKILLS
            <span data-line className="block h-px w-[38px] bg-neutral-500" />
          </p>
          <h2 id="skills-heading" className="mb-5 text-[clamp(2.5rem,9vw,4.5rem)] font-bold leading-[1] tracking-[-0.03em] text-white">
            <span data-intro className="block">Explore my</span>
            {/* FIX 1: gradient text -> solid white to match Hero */}
            <span data-intro className="block text-white">
              tech universe
            </span>
          </h2>
          <p data-intro className="max-w-[520px] text-base font-light leading-[1.8] text-neutral-400 sm:text-lg">
            Four clusters, one stack. Hover or tap a technology to see how it connects.
          </p>
        </header>

        {/* ============ CLUSTER FILTER ============ */}
        <div data-toolbar role="group" aria-label="Filter by cluster" className="mb-8 flex flex-wrap items-center gap-2.5 lg:mb-10">
          <button type="button" aria-pressed={!category} onClick={() => onCategory(null)} className={filterBtn(!category)}>All</button>
          {CLUSTERS.map((c) => (
            <button key={c.id} type="button" aria-pressed={category === c.id} onClick={() => onCategory(c.id)} className={filterBtn(category === c.id)}>
              {c.title}
            </button>
          ))}
          {(selected || category) && (
            <button type="button" onClick={onReset} className="h-9 px-3 text-sm text-neutral-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
              Reset
            </button>
          )}
        </div>

        {/* ============ UNIVERSE ============ */}
        {isDesktop ? (
          <div
            data-canvas
            className="relative mx-auto w-full"
            style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}`, fontSize: 'clamp(12px, 1.05vw, 15px)' }}
          >
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="pointer-events-none absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              {CLUSTERS.map((c) => {
                const [x, y, w, h] = c.rect
                const on = !litCluster || litCluster === c.id
                return (
                  <rect
                    key={c.id}
                    data-zone
                    x={x} y={y} width={w} height={h} rx="22"
                    stroke="#fff"
                    strokeDasharray="4 7"
                    style={{ strokeOpacity: on ? 0.22 : 0.07, transition: 'stroke-opacity .3s' }}
                  />
                )
              })}
              {EDGE_PATHS.map((e, i) => {
                const lit = litEdges.has(i)
                const dim = litNodes && !lit
                return (
                  <path
                    key={i}
                    data-edge
                    d={e.d}
                    pathLength="1"
                    stroke="#fff"
                    strokeLinecap="round"
                    style={{
                      strokeOpacity: lit ? 0.75 : dim ? 0.06 : 0.2,
                      strokeWidth: lit ? 1.8 : 1.2,
                      transition: 'stroke-opacity .3s, stroke-width .3s',
                    }}
                  />
                )
              })}
              {focusName &&
                [...litEdges].map((i) => (
                  <path
                    key={`p${i}`}
                    d={EDGE_PATHS[i].d}
                    pathLength="1"
                    className="uni-pulse"
                    stroke="#fff"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeDasharray="0.08 0.92"
                  />
                ))}
            </svg>

            {/* cluster labels — FIX 2: h-8 + leading-none to align with filter buttons */}
            {CLUSTERS.map((c) => (
              <div
                key={c.id}
                data-legend
                className="absolute z-20"
                style={{ left: pct(c.rect[0] + 26, VIEW_W), top: pct(c.rect[1], VIEW_H) }}
              >
                <button
                  type="button"
                  aria-pressed={category === c.id}
                  onClick={() => onCategory(c.id)}
                  className={`-translate-y-1/2 h-8 rounded-full border px-3 text-[11px] tracking-[0.2em] leading-none transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                    category === c.id
                      ? 'border-white bg-white text-[#0a0a0a]'
                      : 'border-white/25 bg-[#0a0a0a] text-neutral-300 hover:border-white hover:text-white'
                  }`}
                >
                  {c.title.toUpperCase()}
                </button>
              </div>
            ))}

            {CLUSTERS.flatMap((c) =>
              c.skills.map((skill) => (
                <div
                  key={skill.name}
                  data-node
                  className="absolute z-10"
                  style={{ left: pct(skill.pos[0], VIEW_W), top: pct(skill.pos[1], VIEW_H) }}
                >
                  <div className="w-max -translate-x-1/2 -translate-y-1/2">
                    <NodeButton
                      skill={skill}
                      clusterTitle={c.title}
                      state={stateOf(skill.name)}
                      selected={selected === skill.name}
                      onEnter={onEnter}
                      onLeave={onLeave}
                      onToggle={onToggle}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Tablet / mobile: FIX 4 — 1-col on phone, 2-col on sm+ for breathing room */
          <div className="grid gap-5 sm:grid-cols-2">
            {CLUSTERS.map((c) => (
              <section
                key={c.id}
                data-mcluster
                aria-label={c.title}
                className={`rounded-2xl border border-dashed p-4 transition-colors duration-300 sm:p-5 ${
                  !litCluster || litCluster === c.id ? 'border-white/25' : 'border-white/10'
                }`}
              >
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{c.title}</h3>
                  <p className="text-xs text-neutral-500">{c.caption}</p>
                </div>
                {/* FIX 4: single column on phones, 2-col from sm */}
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                  {c.skills.map((skill) => (
                    <li key={skill.name} data-mnode>
                      <NodeButton
                        compact
                        skill={skill}
                        clusterTitle={c.title}
                        state={stateOf(skill.name)}
                        selected={selected === skill.name}
                        onEnter={onEnter}
                        onLeave={onLeave}
                        onToggle={onToggle}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-neutral-500">
          Connections show common conceptual relationships between technologies, not a specific project architecture.
        </p>

        <Dock selectedName={selected} category={category} onPick={onPick} onClear={onClear} reduceMotion={reduceMotion} />
      </div>
    </section>
  )
}

export default Skills