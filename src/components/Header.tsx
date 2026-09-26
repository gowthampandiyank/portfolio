import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "#about", num: "01" },
  { label: "Skills", href: "#skills", num: "02" },
  { label: "Experience", href: "#experience", num: "03" },
  { label: "Work", href: "#work", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection("#" + entry.target.id)),
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
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className={`sticky top-0 z-20 transition-all duration-500 ${scrolled ? "bg-background/75 backdrop-blur-xl border-b border-border/50 shadow-sm" : "bg-transparent border-b border-transparent"}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="group">
          <span className="font-display font-black text-2xl tracking-tighter text-foreground">G<span className="text-accent">P</span></span>
        </Link>

        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-1 bg-muted/50 backdrop-blur-sm rounded-full px-1.5 py-1.5 border border-border/40">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button key={link.href} onClick={() => handleNavClick(link.href)} className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-all ${isActive ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 bg-accent rounded-full" />}
                  <span className="relative z-10 flex items-center gap-1.5"><span className="text-[10px] opacity-50 font-mono">{link.num}</span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="/portfolio/gowtham-pandiyan.pdf" target="_blank" className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold hover:-translate-y-0.5 transition-all">
            Resume <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button className="md:hidden w-10 h-10 rounded-full bg-muted/50 text-foreground inline-flex items-center justify-center border border-border/40" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-30 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="container flex items-center justify-between py-4">
              <span className="font-display font-black text-2xl tracking-tighter text-foreground">G<span className="text-accent">P</span></span>
              <button className="w-10 h-10 rounded-full bg-muted/50 text-foreground inline-flex items-center justify-center border border-border/40" onClick={() => setMobileOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 flex flex-col items-start justify-center container gap-2">
              {navLinks.map((link, i) => (
                <motion.button key={link.href} onClick={() => handleNavClick(link.href)} className="group flex items-center gap-4 text-foreground hover:text-accent transition-colors bg-transparent border-none py-3 w-full text-left" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <span className="text-xs font-mono text-accent/60">{link.num}</span>
                  <span className="text-3xl font-display font-bold">{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                </motion.button>
              ))}
              <a href="/portfolio/gowtham-pandiyan.pdf" target="_blank" className="mt-8 px-8 py-3 bg-accent text-accent-foreground rounded-full text-sm font-semibold inline-flex items-center gap-2">
                Download Resume <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
