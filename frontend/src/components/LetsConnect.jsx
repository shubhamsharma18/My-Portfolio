
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiX,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiArrowUpRight,
  FiCopy,
  FiCheck,
  FiDownload,
  FiExternalLink,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// =============================================
// SHUBHAM SHARMA - CONTACT INFORMATION
// =============================================

const CONTACT = {
  name: "Shubham Sharma",
  email: "shubhamsharma4476@gmail.com",
  github: "https://github.com/shubhamsharma18",
  linkedin: "https://www.linkedin.com/in/shubham-sharma-7b92802a8/",
  whatsapp: "https://wa.me/919878260170",
  resume: "/resume.pdf",
};

// =============================================
// ANIMATION CONFIGURATION
// =============================================

const backdropVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(12px)",
    transition: {
      duration: 0.35,
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.25,
    },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.94,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 25,
    scale: 0.96,
    transition: {
      duration: 0.25,
    },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

// =============================================
// SOCIAL LINK COMPONENT
// =============================================

const SocialCard = ({ icon: Icon, title, subtitle, href }) => {
  return (
    <motion.a
      variants={itemVariants}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        x: 5,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center justify-between border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05]"
    >
      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03] text-lg text-neutral-300 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white group-hover:text-black">
          <Icon />
        </div>

        <div>
          <h3 className="text-sm font-medium tracking-wide text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs text-neutral-500">
            {subtitle}
          </p>
        </div>

      </div>

      <FiArrowUpRight className="text-lg text-neutral-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
    </motion.a>
  );
};

// =============================================
// MAIN COMPONENT
// =============================================

const LetsConnect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // ---------------------------------------------
  // CLOSE MODAL WITH ESCAPE KEY
  // ---------------------------------------------

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ---------------------------------------------
  // COPY EMAIL FUNCTION
  // ---------------------------------------------

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  // ---------------------------------------------
  // CLOSE MODAL
  // ---------------------------------------------

  const closeModal = () => {
    setIsOpen(false);
  };

  // =============================================
  // JSX
  // =============================================

  return (
    <>
      {/* =========================================
          NAVBAR LET'S CONNECT BUTTON
      ========================================= */}

      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{
          scale: 1.04,
        }}
        whileTap={{
          scale: 0.96,
        }}
        className="group relative inline-flex items-center gap-3 overflow-hidden border border-white/30 bg-white px-5 py-3 text-xs font-medium tracking-wide text-black transition-all duration-300 hover:bg-neutral-200"
      >
        <span className="relative z-10">
          Let's Connect
        </span>

        <FiArrowUpRight
          className="relative z-10 text-base transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />

      </motion.button>

      {/* =========================================
          CONTACT MODAL
      ========================================= */}

      <AnimatePresence mode="wait">

        {isOpen && (

          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/85 px-4 py-8 backdrop-blur-xl"
          >

            {/* MODAL CONTAINER */}

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-heading"
              className="relative my-auto w-full max-w-[510px] overflow-hidden border border-white/15 bg-[#090909] shadow-[0_25px_100px_rgba(0,0,0,0.65)]"
            >

              {/* TOP ACCENT LINE */}

              <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              {/* SUBTLE BACKGROUND GLOW */}

              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/[0.035] blur-[90px]" />

              <div className="relative p-6 sm:p-9">

                {/* =================================
                    HEADER
                ================================= */}

                <div className="mb-8 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <span className="h-[1px] w-7 bg-white/70" />

                    <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-neutral-400">
                      Get in touch
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close contact modal"
                    className="flex h-9 w-9 items-center justify-center border border-white/10 text-neutral-400 transition-all duration-300 hover:border-white/40 hover:bg-white hover:text-black"
                  >
                    <FiX size={18} />
                  </button>

                </div>

                {/* =================================
                    MAIN HEADING
                ================================= */}

                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-8"
                >

                  <motion.div
                    variants={itemVariants}
                    className="mb-5 flex items-center gap-2"
                  >

                    <span className="relative flex h-2 w-2">

                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-30" />

                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />

                    </span>

                    <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                      Open to opportunities
                    </span>

                  </motion.div>

                  <motion.h2
                    id="contact-heading"
                    variants={itemVariants}
                    className="text-[38px] font-medium leading-[1.08] tracking-[-0.045em] text-white sm:text-[48px]"
                  >
                    Let's build
                    <br />

                    something

                    <span className="text-neutral-500">
                      {" "}meaningful.
                    </span>

                  </motion.h2>

                  <motion.p
                    variants={itemVariants}
                    className="mt-5 max-w-[380px] text-sm leading-7 text-neutral-400"
                  >
                    Have an idea, a project, or an opportunity?

                    <span className="text-neutral-200">
                      {" "}I'd love to hear about it.
                    </span>

                    Let's connect and create something great together.
                  </motion.p>

                </motion.div>

                {/* =================================
                    EMAIL SECTION
                ================================= */}

                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="group mb-6 border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:border-white/25"
                >

                  <div className="flex items-center justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 bg-white/[0.04] text-lg text-neutral-300">
                        <FiMail />
                      </div>

                      <div className="min-w-0">

                        <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                          Email me at
                        </p>

                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="break-all text-xs text-white transition-colors hover:text-neutral-400 sm:text-sm"
                        >
                          {CONTACT.email}
                        </a>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-neutral-400 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                    >
                      {copied ? (
                        <FiCheck size={16} />
                      ) : (
                        <FiCopy size={16} />
                      )}
                    </button>

                  </div>

                  <AnimatePresence>
                    {copied && (

                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 text-[11px] text-neutral-300"
                      >
                        Email copied successfully.
                      </motion.p>

                    )}
                  </AnimatePresence>

                </motion.div>

                {/* =================================
                    SOCIAL CONNECTIONS
                ================================= */}

                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >

                  <motion.div
                    variants={itemVariants}
                    className="mb-3 flex items-center justify-between"
                  >

                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                      Find me online
                    </span>

                    <span className="text-[10px] text-neutral-600">
                      03 PLATFORMS
                    </span>

                  </motion.div>

                  <SocialCard
                    icon={FiLinkedin}
                    title="LinkedIn"
                    subtitle="Let's connect professionally"
                    href={CONTACT.linkedin}
                  />

                  <SocialCard
                    icon={FiGithub}
                    title="GitHub"
                    subtitle="Explore my projects and code"
                    href={CONTACT.github}
                  />

                  <SocialCard
                    icon={FaWhatsapp}
                    title="WhatsApp"
                    subtitle="Let's have a quick conversation"
                    href={CONTACT.whatsapp}
                  />

                </motion.div>

                {/* =================================
                    RESUME BUTTON
                ================================= */}

                <motion.a
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  href={CONTACT.resume}
                  download="Shubham_Sharma_Resume.pdf"
                  whileHover={{
                    scale: 1.015,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group mt-6 flex w-full items-center justify-center gap-3 bg-white px-5 py-[17px] text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-neutral-200"
                >

                  <FiDownload size={16} />

                  Download Resume

                  <FiArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />

                </motion.a>

                {/* =================================
                    FOOTER
                ================================= */}

                <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-[10px] tracking-wide text-neutral-500">
                    Designed & developed by

                    <span className="ml-1 text-neutral-300">
                      {CONTACT.name}
                    </span>
                  </p>

                  <span className="text-[9px] tracking-[0.2em] text-neutral-600">
                    THANKS FOR VISITING.
                  </span>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
};

export default LetsConnect;
