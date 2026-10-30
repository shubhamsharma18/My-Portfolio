
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCode,
  FiLayers,
  FiArrowUpRight,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiChevronRight,
  FiDownload,
  FiEye,
} from "react-icons/fi";

// ============================================
// EXPERIENCE DATA
// ============================================

const experiences = [
  {
    id: "01",
    company: "Khalsa College",
    role: "Website Developer",
    category: "Current Experience",
    period: "Jun 2026 — Present",
    location: "Amritsar, Punjab",
    description:
      "Contributing to the college website through bug fixes and small development updates.",
    responsibilities: [
      "Identify and fix bugs on the college website.",
      "Make small website improvements and development updates.",
      "Help keep website pages and features working as expected.",
    ],
    technologies: ["Website Development", "Bug Fixing"],
    icon: FiBriefcase,
    current: true,
    featured: false,
  },
  {
    id: "02",
    company: "The Outsource Pro",
    role: "Frontend Developer Intern",
    category: "Internship",
    period: "Nov 2025 — Feb 2026 (3 months)",
    location: "Internship",
    description:
      "Completed a three-month frontend development internship, gaining practical experience building and improving user interfaces.",
    responsibilities: [
      "Worked on frontend development using React.js and JavaScript.",
      "Contributed to user interface development for a learning platform.",
      "Worked with reusable components and responsive layouts.",
      "Gained exposure to real-world frontend development workflows.",
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3"],
    icon: FiCode,
    current: false,
    featured: true,
  },
  {
    id: "03",
    company: "MITS Academy",
    role: "MERN Stack Developer Trainee",
    category: "Technical Training",
    period: "Aug 2025 — Jun 2026",
    location: "MERN Stack Course",
    description:
      "Completed structured MERN Stack training focused on full-stack web development, modern JavaScript technologies and practical application building.",
    responsibilities: [
      "Learned frontend development using React.js and JavaScript.",
      "Practiced backend development using Node.js and Express.js.",
      "Worked with MongoDB for database management and CRUD operations.",
      "Developed practical understanding of REST APIs and full-stack architecture.",
    ],
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js"],
    icon: FiLayers,
    current: false,
    featured: true,
  },
];

const certificates = [
  {
    id: "mits-academy",
    title: "MERN Stack Course Certificate",
    issuer: "MITS Academy",
    file: null,
  },
  {
    id: "frontend-internship",
    title: "Frontend Developer Internship Certificate",
    issuer: "The Outsource Pro",
    file: null,
  },
];

// ============================================
// ANIMATION VARIANTS
// ============================================

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// ============================================
// EXPERIENCE CARD
// ============================================

const ExperienceCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <motion.article
      variants={fadeUp}
      className="relative pl-12 sm:pl-16 md:pl-20 pb-12 last:pb-0"
    >
      {/* Timeline marker */}
      <div className="absolute left-0 top-7 z-10 flex w-8 flex-col items-center">
        <div className="group flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 bg-[#080808] transition-all duration-500 hover:border-white">
          <span className="h-2 w-2 rounded-full bg-neutral-500 transition-all duration-500 group-hover:scale-150 group-hover:bg-white" />
        </div>

        <span className="mt-3 text-[9px] tracking-widest text-neutral-600">
          {item.id}
        </span>
      </div>

      {/* Experience Card */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.35 }}
        className="group relative overflow-hidden rounded-sm border border-neutral-800 bg-[#0c0c0c] p-5 transition-colors duration-500 hover:border-neutral-600 sm:p-7 md:p-9"
      >
        {/* Subtle hover glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-white/[0.025] blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Top section */}
        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-neutral-800 bg-[#111] text-xl text-neutral-300 transition-all duration-500 group-hover:border-neutral-500 group-hover:text-white">
              <Icon />
            </div>

            <div>
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[2.5px] text-neutral-500">
                {item.category}
              </span>

              <h3 className="text-lg font-semibold tracking-tight text-neutral-100 sm:text-xl">
                {item.company}
              </h3>
            </div>
          </div>

          {item.current && (
            <div className="flex w-fit items-center gap-2 border border-neutral-700 px-3 py-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              <span className="text-[9px] font-medium tracking-[1.5px] text-neutral-300">
                CURRENT
              </span>
            </div>
          )}
        </div>

        {/* Role */}
        <h4 className="relative mt-7 text-xl font-medium tracking-tight text-white sm:text-2xl">
          {item.role}
        </h4>

        {/* Meta information */}
        <div className="relative mt-4 flex flex-wrap gap-x-6 gap-y-3 text-[11px] text-neutral-500">
          <span className="flex items-center gap-2">
            <FiCalendar />
            {item.period}
          </span>

          <span className="flex items-center gap-2">
            <FiMapPin />
            {item.location}
          </span>
        </div>

        {/* Description */}
        <p className="relative mt-6 max-w-2xl text-sm leading-7 text-neutral-400">
          {item.description}
        </p>

        {/* Contributions */}
        <div className="relative mt-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-5 bg-neutral-600" />
            <span className="text-[9px] font-semibold tracking-[2.5px] text-neutral-500">
              KEY CONTRIBUTIONS
            </span>
          </div>

          <ul className="space-y-3">
            {item.responsibilities.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                }}
                className="flex items-start gap-3 text-xs leading-6 text-neutral-400 sm:text-[13px]"
              >
                <FiChevronRight className="mt-1 shrink-0 text-neutral-600" />
                {point}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="relative mt-8 flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="border border-neutral-800 bg-[#111] px-3 py-2 text-[10px] text-neutral-400 transition-all duration-300 hover:border-neutral-500 hover:text-white"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="relative mt-8 flex items-center justify-between border-t border-neutral-800 pt-5">
          <span className="text-[8px] tracking-[2px] text-neutral-600">
            CAREER MILESTONE / {item.id}
          </span>

          <FiArrowUpRight className="text-neutral-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
        </div>
      </motion.div>
    </motion.article>
  );
};

// ============================================
// MAIN EXPERIENCE COMPONENT
// ============================================

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#080808] px-5 py-28 text-white sm:px-8 md:px-12 lg:px-16 lg:py-36"
    >
      {/* Background details */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/[0.015] blur-[130px]" />

      <div className="relative mx-auto max-w-5xl">

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center md:mb-20"
        >
          <div className="mb-7 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-neutral-600" />

            <span className="text-[10px] font-medium uppercase tracking-[4px] text-neutral-500">
              My Journey
            </span>

            <span className="h-px w-7 bg-neutral-600" />
          </div>

          <h2 className="text-5xl font-semibold tracking-[-3px] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Experience
            <span className="text-neutral-600">.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            Every experience is a step forward — learning,
            building and growing through technology and real-world challenges.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute bottom-6 left-[15px] top-6 w-px bg-gradient-to-b from-neutral-500 via-neutral-800 to-transparent" />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {experiences.map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
              />
            ))}
          </motion.div>
        </div>

        {/* CERTIFICATES */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">
              Certificates
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Certificate files will be added soon. Preview and download will
              be available once the files are added.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="border border-neutral-800 bg-[#0c0c0c] p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-neutral-800 text-lg text-neutral-300">
                    <FiAward />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-100">
                      {certificate.title}
                    </h4>
                    <p className="mt-1 text-xs text-neutral-500">
                      {certificate.issuer}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  {certificate.file ? (
                    <>
                      <a
                        href={certificate.file}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-neutral-700 px-3 py-2 text-xs text-neutral-300 transition hover:border-neutral-500 hover:text-white"
                      >
                        <FiEye />
                        Preview
                      </a>
                      <a
                        href={certificate.file}
                        download
                        className="inline-flex items-center gap-2 border border-neutral-700 px-3 py-2 text-xs text-neutral-300 transition hover:border-neutral-500 hover:text-white"
                      >
                        <FiDownload />
                        Download
                      </a>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled
                        className="inline-flex cursor-not-allowed items-center gap-2 border border-neutral-800 px-3 py-2 text-xs text-neutral-600"
                      >
                        <FiEye />
                        Preview
                      </button>
                      <button
                        type="button"
                        disabled
                        className="inline-flex cursor-not-allowed items-center gap-2 border border-neutral-800 px-3 py-2 text-xs text-neutral-600"
                      >
                        <FiDownload />
                        Download
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* BOTTOM NOTE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex flex-col gap-5 border border-neutral-800 bg-[#0c0c0c] p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-neutral-800 text-xl text-neutral-300">
            <FiAward />
          </div>

          <div>
            <h3 className="text-base font-medium text-white sm:text-lg">
              Always learning. Always building.
            </h3>

            <p className="mt-2 text-xs leading-6 text-neutral-500 sm:text-sm">
              Focused on growing as a developer, exploring modern
              technologies and building meaningful digital experiences.
            </p>
          </div>

          <div className="hidden sm:ml-auto sm:block">
            <FiArrowUpRight className="text-2xl text-neutral-600" />
          </div>
        </motion.div>

        {/* END */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <span className="text-[9px] tracking-[4px] text-neutral-700">
            THE JOURNEY CONTINUES
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default Experience;
