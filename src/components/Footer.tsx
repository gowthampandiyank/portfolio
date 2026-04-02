const Footer = () => (
  <footer className="py-10 bg-soft">
    <div className="container text-center">
      <p className="text-lg font-display font-bold text-foreground">
        Gowtham <span className="text-primary">Pandiyan</span>
      </p>
      <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
        Data Analyst & Front-End Developer merging beautiful digital
        experiences with cutting-edge data solutions.
      </p>

      <div className="flex justify-center gap-6 mt-5">
        <a href="https://www.linkedin.com/in/gowtham-pandiyan-kannan-a7474b304/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          LinkedIn
        </a>
        <a href="https://github.com/gowthampandiyank" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          GitHub
        </a>
        <a href="https://www.instagram.com/gowthampandiyank/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          Instagram
        </a>
      </div>

      <p className="text-xs text-muted-foreground/60 mt-6">
        It is build by using React , Tailwind CSS
      </p>
      <p className="text-xs text-muted-foreground/40 mt-1">
        © {new Date().getFullYear()} Gowtham Pandiyan. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
