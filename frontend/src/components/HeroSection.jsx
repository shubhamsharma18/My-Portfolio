import { useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import shubam from "../assets/shubhamnew-transparent.gif";

/* ------------------------------------------------------------------ */
/*  CONTENT — all real strings, unchanged from your existing project   */
/* ------------------------------------------------------------------ */
const STACK = ["React.js", "Node.js", "Express", "MongoDB"];

/* ------------------------------ icons ------------------------------ */
const ArrowRight = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Download = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-y-0.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </svg>
);

/* ----------------------------- component --------------------------- */
export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#0a0a0a] px-5 pb-0 pt-6 sm:px-[5vw] sm:pt-6 min-[800px]:flex min-[800px]:min-h-screen min-[800px]:items-center min-[800px]:px-[4vw] xl:px-[78px] min-[800px]:pb-0"
    >
      {/* Pure CSS motion: content is visible even if JavaScript never runs */}
      <style>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes lineUp {
          from { transform: translateY(105%); }
          to   { transform: none; }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 38px; }
        }
        @keyframes portraitIn {
          from {
            clip-path: inset(100% 0 0 0);
            opacity: .4;
            filter: brightness(.55);
            transform: translateY(24px);
          }
          to {
            clip-path: inset(0 0 0 0);
            opacity: 1;
            filter: none;
            transform: none;
          }
        }
        @keyframes traceDraw {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes nodeIn {
          from { opacity: 0; transform: scale(.4); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes tracePulse {
          from { transform: translateY(-120%); }
          to   { transform: translateY(420%); }
        }

        .reveal {
          opacity: 0;
          animation: rise .8s cubic-bezier(.2,.7,.2,1) forwards;
          animation-delay: var(--delay, 0ms);
        }
        .line {
          display: block;
          overflow: hidden;
          padding: .06em .08em .1em 0;
          margin: -.06em -.08em -.1em 0;
        }
        .line-in {
          display: block;
          transform: translateY(105%);
          animation: lineUp .95s cubic-bezier(.2,.7,.2,1) forwards;
          animation-delay: var(--delay, 0ms);
        }
        .eyebrow-line {
          width: 0;
          animation: lineGrow .8s ease .5s forwards;
        }
        .portrait-in {
          animation: portraitIn 1.3s cubic-bezier(.2,.7,.2,1) .25s backwards;
        }

        /* Signature: the refined luminous trace that leads into Skills */
        .trace-line {
          transform-origin: top;
          transform: scaleY(0);
          animation: traceDraw 1.1s cubic-bezier(.65,0,.35,1) 1.5s forwards;
        }
        .trace-node {
          opacity: 0;
          animation: nodeIn .6s cubic-bezier(.2,.7,.2,1) 2.5s forwards;
        }
        .trace-pulse {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 22%;
          background: linear-gradient(to bottom, transparent, #fff);
          opacity: 0;
          animation: tracePulse 2.6s ease-in-out 3.2s 3;
        }

        .bg-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
          background-size: 56px 56px;
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 70% 50%, #000 0%, transparent 75%);
                  mask-image: radial-gradient(ellipse 80% 70% at 70% 50%, #000 0%, transparent 75%);
        }

        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            100deg,
            transparent 30%,
            var(--shine, rgba(255,255,255,.25)) 50%,
            transparent 70%
          );
          transform: translateX(-120%);
          transition: transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .btn-shine:hover::after { transform: translateX(120%); }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .line-in,
          .portrait-in,
          .trace-line,
          .trace-node {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
            filter: none !important;
          }
          .eyebrow-line { animation: none !important; width: 38px !important; }
          .trace-pulse { display: none; }
          .btn-shine::after { display: none; }
        }
      `}</style>

      {/* Background: grid + soft key light behind the portrait */}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_85%,#222_0%,transparent_70%)] min-[800px]:bg-[radial-gradient(ellipse_50%_75%_at_78%_45%,#262626_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-center gap-6 min-[800px]:min-h-[calc(100vh-7rem)] min-[800px]:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] min-[800px]:gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        {/* ================= LEFT: EDITORIAL TYPOGRAPHY ================= */}
        <div className="relative z-20 max-w-[660px] min-[800px]:pb-24">
          <p
            className="reveal mb-5 flex items-center gap-4 text-sm tracking-[0.3em] text-neutral-200 sm:text-base"
            style={{ "--delay": "100ms" }}
          >
            IT PROFESSIONAL
            <span className="eyebrow-line h-px bg-neutral-500" aria-hidden="true" />
          </p>

          {/* The name is the hero: large, solid white, revealed line by line */}
          <h1
            id="hero-heading"
            className="mb-6 text-[clamp(3.75rem,17vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-white min-[800px]:text-[clamp(4rem,8.4vw,9rem)]"
          >
            <span className="line">
              <span
                className="line-in text-[0.3em] font-light leading-none tracking-[-0.01em] text-neutral-500"
                style={{ "--delay": "200ms" }}
              >
                Hi, I’m
              </span>
            </span>
            <span className="line mt-[0.08em]">
              <span className="line-in" style={{ "--delay": "330ms" }}>
                Shubham
              </span>
            </span>
          </h1>

          <h2
            className="reveal mb-4 flex min-h-[2.4em] max-w-[560px] items-center text-[clamp(1.125rem,4.6vw,2.125rem)] font-normal leading-[1.2] tracking-tight text-neutral-300"
            style={{ "--delay": "560ms" }}
          >
            {reduceMotion ? (
              "Full-Stack Developer"
            ) : (
              <TypeAnimation
                aria-label="Software Developer, AI Full-Stack Developer, Full-Stack Developer"
                sequence={[
                  "Software Developer",
                  1800,
                  "AI Full-Stack Developer",
                  1800,
                  "Full-Stack Developer",
                  1800,
                ]}
                speed={55}
                deletionSpeed={65}
                repeat={Infinity}
                cursor
                wrapper="span"
              />
            )}
          </h2>

          <p
            className="reveal mb-8 max-w-[540px] text-base font-light leading-[1.75] text-neutral-400 sm:text-lg min-[800px]:text-xl"
            style={{ "--delay": "660ms" }}
          >
            Building scalable web applications, modern digital experiences, and
            high-performance solutions that create real impact.
          </p>

          <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#projects"
              style={{ "--shine": "rgba(0,0,0,.12)", "--delay": "760ms" }}
              className="reveal btn-shine group inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-white bg-white px-6 text-base font-medium text-[#0a0a0a] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,255,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:h-14 sm:w-auto sm:px-8 sm:text-lg"
            >
              View My Work <ArrowRight />
            </a>
            <a
              href="https://drive.google.com/uc?export=download&id=19RvAVce6PZZD8R0BaZpl2m5_k1HOYkuZ"
              download
              style={{ "--delay": "860ms" }}
              className="reveal btn-shine group inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-white/55 px-6 text-base font-medium text-white transition-[transform,background-color,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#0a0a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:h-14 sm:w-auto sm:px-8 sm:text-lg"
            >
              Download Resume <Download />
            </a>
          </div>

          {/* technical motif: the stack the Skills universe maps out */}
          <ul
            aria-label="Core stack"
            className="reveal flex flex-wrap divide-x divide-white/15 font-mono text-xs text-neutral-500 sm:text-[13px]"
            style={{ "--delay": "980ms" }}
          >
            {STACK.map((t) => (
              <li key={t} className="px-3 first:pl-0 last:pr-0">
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ================= RIGHT: CINEMATIC PORTRAIT ================= */}
<div className="portrait-in relative mx-auto mt-4 w-[min(120vw,640px)] max-w-none min-[800px]:mx-0 min-[800px]:ml-auto min-[800px]:mt-0 min-[800px]:h-[min(98vh,92vw,1250px)] min-[800px]:w-fit min-[800px]:max-w-[calc(100%+4vw)] min-[800px]:-mr-[4vw] min-[800px]:self-end">
          <img
            src={shubam}
            alt="Portrait of Shubham"
            className="block h-auto w-full object-contain contrast-105 min-[800px]:h-full min-[800px]:w-auto min-[800px]:max-w-none min-[800px]:object-bottom"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, #000 85%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, #000 85%, transparent 100%)",
            }}
          />
        </div>


        {/* ================= SIGNATURE: LUMINOUS TRACE → SKILLS =================
            A single fine line that draws itself down to a node — the same
            line-and-node language the Skills universe is built from.
            Acts as the hero's signature + the scroll cue into Skills.
            Hidden on small screens; mobile keeps the horizontal eyebrow line. */}
        <a
          href="#skills"
          aria-label="Scroll to skills"
          className="group absolute bottom-0 left-0 z-30 hidden flex-col items-center gap-3 rounded-sm pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-[800px]:flex"
        >
          <span
            className="reveal text-[10px] tracking-[0.35em] text-neutral-500 transition-colors duration-300 [writing-mode:vertical-rl] group-hover:text-white"
            style={{ "--delay": "1300ms" }}
          >
            SCROLL
          </span>
          <span className="relative block h-16 w-px overflow-hidden" aria-hidden="true">
            <span className="trace-line absolute inset-0 bg-white/35" />
            <span className="trace-pulse" />
          </span>
          <span
            className="trace-node grid h-3 w-3 place-items-center rounded-full border border-white/70 bg-[#0a0a0a] transition-shadow duration-300 group-hover:shadow-[0_0_14px_rgba(255,255,255,.5)]"
            aria-hidden="true"
          >
            <i className="h-1 w-1 rounded-full bg-white" />
          </span>
        </a>
      </div>
    </section>
  );
}