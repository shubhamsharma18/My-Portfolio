import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  // blur background after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // highlight link of the section currently in view (only for sections that exist)
  useEffect(() => {
    const targets = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { threshold: 0.5 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const navigateTo = (href) => {
    setActive(href);
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 transition-all duration-300 sm:px-[5vw] lg:px-[78px] ${
        scrolled
          ? "border-b border-white/10 bg-[#0a0a0a]/80 py-4 backdrop-blur-xl"
          : "py-6"
      }`}
    >
      {/* Logo */}
      <NavLink to="#home" onClick={() => navigateTo("#home")} aria-label="Shubam home" className="text-[34px] font-bold leading-none tracking-tight text-white">
        S.
      </NavLink>

      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Links */}
      <nav
        id="main-navigation"
        aria-label="Main"
        className={`fixed right-0 top-0 z-50 flex h-screen w-[min(320px,82vw)] flex-col gap-6 border-l border-white/10 bg-[#0d0d0d] px-9 pb-10 pt-28 transition-transform duration-300 lg:absolute lg:left-1/2 lg:right-auto lg:top-auto lg:h-auto lg:w-auto lg:-translate-x-1/2 lg:flex-row lg:gap-[30px] lg:border-0 lg:bg-transparent lg:p-0 ${
          open ? "visible translate-x-0" : "invisible translate-x-full lg:visible lg:translate-x-[-50%]"
        }`}
      >
        {links.map((l) => (
          <NavLink
            key={l.href}
            to={l.href}
            onClick={() => navigateTo(l.href)}
            className={`group relative w-fit pb-1.5 text-lg transition-colors lg:text-[15px] ${
              active === l.href ? "text-white" : "text-neutral-400 hover:text-white"
            }`}
          >
            {l.label}
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-full origin-left bg-white transition-transform duration-300 ${
                active === l.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </NavLink>
        ))}

        {/* CTA inside mobile menu */}
        <NavLink
          to="#contact"
          onClick={() => navigateTo("#contact")}
          className="mt-3 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/55 px-[22px] py-3 text-[15px] font-medium text-white lg:hidden"
        >
          Let’s Connect <ArrowRight />
        </NavLink>
      </nav>

      {/* CTA desktop */}
      <NavLink
        to="#contact"
        onClick={() => navigateTo("#contact")}
        className="hidden items-center gap-2.5 rounded-full border border-white/55 px-[22px] py-3 text-[15px] font-medium text-white transition-colors hover:bg-white hover:text-[#0a0a0a] lg:inline-flex"
      >
        Let’s Connect <ArrowRight />
      </NavLink>

      {/* Hamburger */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-controls="main-navigation"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="relative z-[60] flex flex-col gap-[7px] p-2 lg:hidden"
      >
        <span className={`h-0.5 w-[26px] bg-white transition-transform ${open ? "translate-y-[4.5px] rotate-45" : ""}`} />
        <span className={`h-0.5 w-[26px] bg-white transition-transform ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`} />
      </button>
    </header>
  );
}