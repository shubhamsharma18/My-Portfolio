
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LetsConnect from "./LetsConnect";

const links = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  // =====================================
  // SCROLL BACKGROUND EFFECT
  // =====================================

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // =====================================
  // CLOSE MOBILE MENU WITH ESCAPE
  // =====================================

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // =====================================
  // ACTIVE SECTION OBSERVER
  // =====================================

  useEffect(() => {
    const targets = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  // =====================================
  // NAVIGATION FUNCTION
  // =====================================

  const navigateTo = (href) => {
    setActive(href);
    setOpen(false);

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // =====================================
  // JSX
  // =====================================

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 transition-all duration-300 sm:px-[5vw] lg:px-[78px] ${
        scrolled
          ? "border-b border-white/10 bg-[#0a0a0a]/80 py-4 backdrop-blur-xl"
          : "py-6"
      }`}
    >
      {/* LOGO */}

      <NavLink
        to="#home"
        onClick={() => navigateTo("#home")}
        aria-label="Shubham home"
        className="relative z-[60] text-[34px] font-bold leading-none tracking-tight text-white"
      >
        S.
      </NavLink>

      {/* MOBILE MENU OVERLAY */}

      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* NAVIGATION LINKS */}

      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={`fixed right-0 top-0 z-50 flex h-screen w-[min(320px,82vw)] flex-col gap-6 border-l border-white/10 bg-[#0d0d0d] px-9 pb-10 pt-28 transition-transform duration-300 lg:absolute lg:left-1/2 lg:right-auto lg:top-auto lg:h-auto lg:w-auto lg:-translate-x-1/2 lg:flex-row lg:gap-[30px] lg:border-0 lg:bg-transparent lg:p-0 ${
          open
            ? "visible translate-x-0"
            : "invisible translate-x-full lg:visible lg:translate-x-[-50%]"
        }`}
      >
        {/* NAV LINKS */}

        {links.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            onClick={() => navigateTo(link.href)}
            className={`group relative w-fit pb-1.5 text-lg transition-colors lg:text-[15px] ${
              active === link.href
                ? "text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {link.label}

            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-full origin-left bg-white transition-transform duration-300 ${
                active === link.href
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </NavLink>
        ))}

        {/* MOBILE LET'S CONNECT */}

        <div className="mt-3 lg:hidden">
          <LetsConnect onOpen={() => setOpen(false)} />
        </div>
      </nav>

      {/* DESKTOP LET'S CONNECT */}

      <div className="hidden lg:block">
        <LetsConnect />
      </div>

      {/* MOBILE HAMBURGER */}

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-controls="main-navigation"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        className="relative z-[60] flex flex-col gap-[7px] p-2 lg:hidden"
      >
        <span
          className={`h-0.5 w-[26px] bg-white transition-transform duration-300 ${
            open ? "translate-y-[4.5px] rotate-45" : ""
          }`}
        />

        <span
          className={`h-0.5 w-[26px] bg-white transition-transform duration-300 ${
            open ? "-translate-y-[4.5px] -rotate-45" : ""
          }`}
        />
      </button>
    </header>
  );
}
