import { Linkedin, Instagram, Send, MessageCircle } from "lucide-react";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/" },
  { icon: Send, label: "Telegram", href: "https://t.me/" },
  { icon: MessageCircle, label: "Discord", href: "https://discord.gg/" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/" },
];

const FooterSection = () => (
  <footer className="py-12 bg-foreground">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center gap-6">
        <p className="font-display text-xl font-bold text-primary-foreground">Norte4j</p>
        <p className="text-sm text-primary-foreground/60">
          Java & Kotlin Community — Região Norte · Belém – PA
        </p>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <s.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <p className="text-xs text-primary-foreground/40">
          Apoio: Studio Code · DEVs Norte
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
