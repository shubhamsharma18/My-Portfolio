import { motion, useReducedMotion } from "framer-motion";
import bitStreamImage from "../assets/Screenshot 2026-10-26 125708.png";
import hireMatchImage from "../assets/Screenshot 2026-10-26 125401.png";
import smartDiagnosisImage from "../assets/Screenshot 2026-10-26 125205.png";
import cineStreamImage from "../assets/projectimg03.png";

const projects = [
  {
    number: "01",
    title: "Smart Diagnosis",
    category: "AI · Healthcare",
    description:
      "A healthcare platform for uploading medical reports and receiving AI-assisted analysis in a clear, accessible experience.",
    image: smartDiagnosisImage,
    imageAlt: "Smart Diagnosis healthcare platform homepage",
    codeUrl: "https://github.com/shubhamsharma2610/Ai-Powered-Healthcare-Platform",
    demoUrl: "https://ai-powered-healthcare-platform-frontend.onrender.com/",
    stack: ["React", "AI", "Healthcare"],
  },
  {
    number: "02",
    title: "HireMatch.ai",
    category: "AI · Career tools",
    description:
      "An AI-powered interview preparation tool that uses a job description and candidate profile to build a personalized strategy.",
    image: hireMatchImage,
    imageAlt: "HireMatch.ai interview planning interface",
    codeUrl: "https://github.com/shubhamsharma18/HireMatch.ai",
    demoUrl: "https://hire-match-ai-frontend.onrender.com/",
    stack: ["React", "Node.js", "AI"],
  },
  {
    number: "03",
    title: "CineStream",
    category: "Web app · Entertainment",
    description:
      "A cinematic movie discovery experience with a bold streaming-inspired interface.",
    image: cineStreamImage,
    imageAlt: "CineStream movie discovery homepage",
    codeUrl: "https://github.com/shubhamsharma18/React-Projects/tree/main/Cine-Stream-pro",
    demoUrl: "https://cine-stream-pro-vert.vercel.app/",
    stack: ["React", "JavaScript", "CSS"],
  },
  {
    number: "04",
    title: "BitStream",
    category: "Web app · Crypto dashboard",
    description:
      "A cryptocurrency dashboard featuring a market ticker, searchable assets, and a clean trading-inspired layout.",
    image: bitStreamImage,
    imageAlt: "BitStream cryptocurrency market dashboard",
    codeUrl: "https://github.com/shubhamsharma18/React-Projects/tree/main/Bit-Stream",
    demoUrl: "https://bit-stream-seven.vercel.app/",
    stack: ["React", "JavaScript", "API"],
  },
  {
    number: "05",
    title: "JavaScript Projects",
    category: "Collection · JavaScript",
    description:
      "A collection of JavaScript projects exploring interactive interfaces, web fundamentals, and practical features.",
    artwork: "javascript",
    codeUrl: "https://github.com/shubhamsharma18/JavascriptProjects",
    stack: ["JavaScript", "HTML", "CSS"],
  },
  {
    number: "06",
    title: "React Projects",
    category: "Collection · React",
    description:
      "A growing collection of React applications and experiments, built to practice reusable components and UI patterns.",
    artwork: "react",
    codeUrl: "https://github.com/shubhamsharma18/React-Projects",
    stack: ["React", "JavaScript", "Tailwind"],
  },
  {
    number: "07",
    title: "Spotify Backend",
    category: "Backend · REST API",
    description:
      "A Spotify-inspired backend with song upload and retrieval endpoints, tested with Postman. This project is API-only; no live demo is deployed.",
    artwork: "spotify",
    codeUrl: "https://github.com/shubhamsharma18/mern-fullstack/tree/main/spotify-backend",
    stack: ["Node.js", "Express", "MongoDB", "Postman"],
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.61 1.21 3.25.92.1-.72.39-1.21.71-1.49-2.47-.28-5.06-1.24-5.06-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.28-2.6 5.22-5.08 5.49.4.35.76 1.02.76 2.06v3.12c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function ProjectArtwork({ type }) {
  if (type === "javascript") {
    return (
      <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_80%_10%,rgba(234,179,8,.2),transparent_38%),linear-gradient(135deg,#17140b,#090a0d_65%)] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-[10px] text-neutral-500">playground.js</span>
        </div>
        <div className="font-mono text-xs leading-6 sm:text-sm">
          <p className="text-neutral-500">01 <span className="ml-3 text-purple-300">const</span> <span className="text-sky-200">ideas</span> = [</p>
          <p className="text-neutral-500">02 <span className="ml-3 text-amber-200">"small experiments"</span>,</p>
          <p className="text-neutral-500">03 <span className="ml-3 text-amber-200">"useful interactions"</span>,</p>
          <p className="text-neutral-500">04 <span className="ml-3 text-amber-200">"web fundamentals"</span></p>
          <p className="text-neutral-500">05 ]<span className="ml-2 text-purple-300">.map</span>(buildSomething);</p>
        </div>
        <span className="w-fit rounded-full border border-yellow-300/20 bg-yellow-300/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-yellow-200">
          JAVASCRIPT LAB
        </span>
      </div>
    );
  }

  if (type === "react") {
    return (
      <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_75%_35%,rgba(56,189,248,.2),transparent_40%),linear-gradient(135deg,#081522,#090a0d_70%)] p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.2em] text-sky-200/80">COMPONENT PLAYGROUND</span>
          <span className="rounded-md border border-sky-300/20 px-2 py-1 font-mono text-[10px] text-sky-200">React</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {["Header", "Card", "Button", "State", "Hooks", "Layout"].map((item, index) => (
            <div
              key={item}
              className={`rounded-lg border p-2.5 font-mono text-[10px] sm:p-3 sm:text-xs ${
                index === 1
                  ? "border-sky-300/40 bg-sky-300/10 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,.12)]"
                  : "border-white/10 bg-white/[0.03] text-neutral-400"
              }`}
            >
              <span className="mb-2 block h-1 w-5 rounded bg-current opacity-50" />
              {item}
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] text-neutral-500">&lt;Build · Compose · Reuse /&gt;</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_85%_15%,rgba(34,197,94,.2),transparent_36%),linear-gradient(135deg,#07150e,#090a0d_68%)] p-5 sm:p-7">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-emerald-300/20 bg-emerald-300/10 text-sm font-bold text-emerald-300">♫</span>
        <span className="text-xs font-semibold tracking-[0.16em] text-white">SPOTIFY API</span>
      </div>
      <div className="space-y-2 font-mono text-[10px] sm:text-xs">
        {[
          ["POST", "/api/songs/upload"],
          ["GET", "/api/songs"],
          ["GET", "/api/songs/:id"],
        ].map(([method, path]) => (
          <div key={path} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2.5">
            <span className={method === "POST" ? "text-amber-300" : "text-emerald-300"}>{method}</span>
            <span className="text-neutral-300">{path}</span>
          </div>
        ))}
      </div>
      <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-emerald-200">
        POSTMAN TESTED
      </span>
    </div>
  );
}

function ProjectCard({ project, index, reduceMotion }) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: reduceMotion ? 0 : (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_24px_70px_rgba(0,0,0,.35)]"
    >
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-[#0b0b0b]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        ) : (
          <ProjectArtwork type={project.artwork} />
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-medium tracking-[0.16em] text-white/85 backdrop-blur-md">
          {project.category}
        </span>
        <span className="absolute bottom-4 right-4 font-mono text-xs text-white/65">{project.number}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="min-h-8">
          <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {project.title}
          </h3>
        </div>
        <div className="mt-3 flex min-h-[26px] flex-wrap content-start gap-2">
          {project.stack.map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-neutral-400">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-3 min-h-[72px] max-w-2xl text-sm leading-6 text-neutral-400 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#0a0a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <GithubIcon />
            View Code
          </a>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-medium text-[#0a0a0a] transition-colors duration-300 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#101010]"
            >
              Live Demo <ArrowIcon />
            </a>
          ) : (
            <span className="inline-flex min-h-10 items-center rounded-full border border-dashed border-white/15 px-4 text-xs text-neutral-500">
              No live demo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden bg-[#0a0a0a] px-5 py-24 sm:px-[5vw] sm:py-28 lg:px-[78px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-20 h-80 w-[min(80vw,900px)] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[100px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-3 text-xs tracking-[0.3em] text-neutral-500">SELECTED WORK</p>
            <h2 id="projects-heading" className="font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Projects<span className="text-neutral-500">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-neutral-400 sm:text-right">
            A selection of applications and experiments, from AI-powered tools to full-stack web projects.
          </p>
        </motion.div>

        <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
