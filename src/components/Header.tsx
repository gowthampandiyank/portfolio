import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "#about", num: "01" },
  { label: "Experience", href: "#experience", num: "02" },
  { label: "Work", href: "#work", num: "03" },
  { label: "Contact", href: "#contact", num: "04" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (!isHome && href.startsWith("#")) {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className={`sticky top-0 z-20 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="group relative">
          <span className="font-display font-black text-2xl tracking-tighter text-foreground">
            G
            <span className="text-accent">P</span>
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </Link>

        {/* Desktop nav — pill style */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-1 bg-muted/50 backdrop-blur-sm rounded-full px-1.5 py-1.5 border border-border/40">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer bg-transparent border-none transition-all duration-300 ${
                    isActive
                      ? "text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-accent rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="text-[10px] opacity-50 font-mono">{link.num}</span>
                    {link.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            Resume
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button
            className="md:hidden w-10 h-10 rounded-full bg-muted/50 text-foreground inline-flex items-center justify-center cursor-pointer border border-border/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav — fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-30 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container flex items-center justify-between py-4">
              <span className="font-display font-black text-2xl tracking-tighter text-foreground">
                G<span className="text-accent">P</span>
              </span>
              <button
                className="w-10 h-10 rounded-full bg-muted/50 text-foreground inline-flex items-center justify-center cursor-pointer border border-border/40"
                onClick={() => setMobileOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-start justify-center container gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="group flex items-center gap-4 text-foreground hover:text-accent transition-colors bg-transparent border-none cursor-pointer py-3 w-full"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <span className="text-xs font-mono text-accent/60">{link.num}</span>
                  <span className="text-3xl font-display font-bold">{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.button>
              ))}

              <motion.a
                href="/resume.pdf"
                target="_blank"
                className="mt-8 px-8 py-3 bg-accent text-accent-foreground rounded-full text-sm font-semibold inline-flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Download Resume
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
