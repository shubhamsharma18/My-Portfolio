import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Scroll detect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Skills', to: '/skills' },
    { name: 'Projects', to: '/projects' },
    { name: 'Contact', to: '/contact' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/95 backdrop-blur-md border-b border-border py-3 shadow-glow'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-between gap-4">

          {/* LEFT: Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-display font-bold gradient-text shrink-0"
          >
            My Portfolio
          </Link>

          {/* CENTER: Links (Desktop) */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative py-2 font-medium transition-colors duration-300 ${
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

          {/* RIGHT: Resume + Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/resume.pdf"
              download
              className="hidden md:inline-flex items-center gap-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow-lg transition-all duration-300"
              style={{ padding: '12px 28px' }}
            >
              <FiDownload />
              Resume
            </a>

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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-darker/80 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-72 max-w-[80%] bg-dark border-l border-border z-50 md:hidden p-6 pt-20"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-xl text-text-muted hover:text-primary hover:bg-primary/10 transition"
                aria-label="Close menu"
              >
                <FiX />
              </button>

              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
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
                  </li>
                ))}
              </ul>

              <a
                href="/resume.pdf"
                download
                className="w-full mt-8 inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow-lg transition-all duration-300"
                style={{ padding: '14px 28px' }}
              >
                <FiDownload />
                Download Resume
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar