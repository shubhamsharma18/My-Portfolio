import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navRef = useRef()

  // ───── Scroll detect — glass effect ─────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ───── Body scroll lock when mobile menu open ─────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  // ───── Close mobile menu on route change ─────
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // ───── GSAP Animations ─────
  useGSAP(() => {
    // Navbar slide down
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Logo pop in
    gsap.from('.nav-logo', {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: 0.2,
      ease: 'back.out(1.7)',
    })

    // Nav links staggered
    gsap.from('.nav-link', {
      opacity: 0,
      y: -20,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.3,
      ease: 'power2.out',
    })

    // Resume button pop in
    gsap.from('.resume-btn', {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      delay: 0.8,
      ease: 'back.out(1.7)',
    })
  }, { scope: navRef })

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Skills', to: '/skills' },
    { name: 'Projects', to: '/projects' },
    { name: 'Contact', to: '/contact' },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'glass py-3 shadow-glow' : 'py-5 bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between gap-4">

          {/* ───── LEFT: LOGO ───── */}
          <Link
            to="/"
            className="nav-logo text-2xl font-display font-bold gradient-text hover:scale-105 transition-transform duration-300 inline-block shrink-0"
          >
            &lt;TeraNaam /&gt;
          </Link>

          {/* ───── CENTER: NAV LINKS ───── */}
          <ul className="hidden md:flex items-center gap-8 mx-auto">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link relative py-2 font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-primary'
                        : 'text-text-muted hover:text-primary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeLink"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ───── RIGHT: RESUME + HAMBURGER ───── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Resume Button (Desktop) */}
            <a
              href="/resume.pdf"
              download
              className="resume-btn hidden md:inline-flex items-center gap-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ padding: '14px 32px' }}
            >
              <FiDownload className="text-base" />
              Resume
            </a>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-2xl text-text-primary hover:text-primary transition"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          MOBILE MENU
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-darker/80 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-72 max-w-[80%] bg-dark border-l border-border z-50 md:hidden p-6 pt-20"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-xl text-text-muted hover:text-primary hover:bg-primary/10 transition"
                aria-label="Close menu"
              >
                <FiX />
              </button>

              {/* Mobile Links */}
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isActive
                            ? 'text-primary bg-primary/10'
                            : 'text-text-muted hover:text-primary hover:bg-primary/10'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href="/resume.pdf"
                download
                className="w-full mt-8 inline-flex items-center justify-center gap-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow-lg transition-all duration-300"
                style={{ padding: '16px 32px' }}
              >
                <FiDownload className="text-base" />
                Download Resume
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar