import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "29fa3af1-d7cc-4cb5-8f26-ca42d5ca5901",
        ...formData,
      }),
    })
      .then(() => {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => toast.error("Failed to send message."));
  };

  return (
    <section id="contact" className="py-20 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground leading-tight">
                Let's build<br />something.
              </h2>
              <p className="text-sm text-primary-foreground/70 mt-4 max-w-sm leading-relaxed">
                Looking for a data analyst or web developer?
                Whether it's a dashboard, a static app, or a new project,
                I'm just a message away. Reach out!
              </p>

              <div className="mt-8 space-y-4">
                <a href="mailto:gowthampandiyan7@gmail.com" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Mail className="w-6 h-6" strokeWidth={2.5} />
                  gowthampandiyan7@gmail.com
                </a>
                <a href="tel:+919884497473" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Phone className="w-6 h-6" strokeWidth={2.5} />
                  +91 98844 97473
                </a>
                <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                  <MapPin className="w-6 h-6" strokeWidth={2.5} />
                  Chennai, India
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <a href="https://www.linkedin.com/in/gowtham-pandiyan-kannan-a7474b304/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors">
                  LinkedIn
                </a>
                <a href="https://github.com/gowthampandiyank" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Form */}
          <ScrollReveal direction="right">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none focus:border-primary-foreground/50 transition-colors backdrop-blur-sm"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none focus:border-primary-foreground/50 transition-colors backdrop-blur-sm"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none focus:border-primary-foreground/50 transition-colors backdrop-blur-sm"
              />
              <textarea
                placeholder="Your Message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none focus:border-primary-foreground/50 transition-colors resize-none backdrop-blur-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-foreground text-primary rounded-lg text-sm font-semibold hover:bg-primary-foreground/90 transition-colors mt-1"
              >
                Send Message
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
