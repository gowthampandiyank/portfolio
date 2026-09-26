import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ContactSection = () => (
  <section id="contact" className="py-24 bg-primary relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-accent blur-3xl" />
      <div className="absolute -bottom-20 left-0 w-80 h-80 rounded-full bg-primary-foreground blur-3xl" />
    </div>
    <div className="container relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal direction="left">
          <div>
            <p className="text-xs font-mono text-primary-foreground/60 mb-3">05 / CONTACT</p>
            <h2 className="text-4xl md:text-6xl font-display font-black text-primary-foreground leading-tight">
              Let's talk<br />about what's next.
            </h2>
            <p className="text-sm text-primary-foreground/70 mt-5 max-w-lg leading-relaxed">
              Open to IT support, technical support and technology-focused opportunities.
              You can also reach out about a project or collaboration.
            </p>
            <div className="mt-8 space-y-4">
              <a href="mailto:gowthampandiyan7@gmail.com" className="flex items-center gap-3 text-sm text-primary-foreground/85 hover:text-primary-foreground"><Mail className="w-5 h-5" />gowthampandiyan7@gmail.com</a>
              <a href="tel:+919884497473" className="flex items-center gap-3 text-sm text-primary-foreground/85 hover:text-primary-foreground"><Phone className="w-5 h-5" />+91 98844 97473</a>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/85"><MapPin className="w-5 h-5" />Chennai, India</div>
            </div>
            <div className="flex items-center gap-5 mt-8">
              <a href="https://www.linkedin.com/in/gowtham-pandiyan-kannan-a7474b304/" target="_blank" rel="noreferrer" className="text-primary-foreground/75 hover:text-primary-foreground"><Linkedin className="w-5 h-5" /></a>
              <a href="https://github.com/gowthampandiyank" target="_blank" rel="noreferrer" className="text-primary-foreground/75 hover:text-primary-foreground"><Github className="w-5 h-5" /></a>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-7 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-primary-foreground">Prefer email?</h3>
            <p className="text-sm text-primary-foreground/65 mt-2">Send a message directly and include the opportunity or project details.</p>
            <a href="mailto:gowthampandiyan7@gmail.com?subject=Portfolio%20Enquiry" className="mt-6 inline-flex px-6 py-3 bg-primary-foreground text-primary rounded-lg text-sm font-semibold hover:bg-primary-foreground/90 transition-colors">Email Me</a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default ContactSection;
