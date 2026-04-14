import {motion} from "framer-motion";
import {Computer, Handshake, Heart, TabletSmartphone} from "lucide-react";
import JetbrainsLogo from "@/assets/jetbrains.svg";
import DevsNorteLogo from "@/assets/devsnorte.svg";
import StudioCodeLogo from "@/assets/studiocode.png";
import PsditLogo from "@/assets/psdit.png";

const partners = [
  {
    name: "JetBrains",
    description: "Empresa de desenvolvimento de software que apoia a comunidade com licenças gratuitas e eventos.",
    icon: () => <img src={JetbrainsLogo} alt="JetBrains" className="w-100 mb-5"/>,
    url: "https://jetbrains.com"
  },
  {
    name: "Studio Code",
    description: "Comunidade de desenvolvedores Mobile da Região Norte.",
    icon: () => <img src={StudioCodeLogo} alt="Studio Code" className="w-20 rounded-3xl ml-auto mr-auto mb-5"/>,
    url: "https://www.instagram.com/studiocodemobile/"
  },
  {
    name: "Devs Norte",
    description: "Comunidade de desenvolvedores da Região Norte que impulsiona o ecossistema tech local.",
    icon: () => <img src={DevsNorteLogo} alt="DevsNorte" className="w-2/3 ml-auto mr-auto mb-5"/>,
    url: "https://devsnorte.com"
  },
  {
    name: "PSD.IT",
    description: "Empresa de consultoria e desenvolvimento de software que apoia a comunidade com palestras e workshops.",
    icon: () => <img src={PsditLogo} alt="PSD.IT" className="w-20 ml-auto mr-auto mb-5"/>,
    url: "https://psdit.com.br"
  },
];

const partnerBenefits = [
  "Visibilidade para sua marca na comunidade tech",
  "Networking com desenvolvedores qualificados",
  "Participação ativa nos eventos e meetups",
  "Fortalecimento do ecossistema de tecnologia na Amazônia",
];

const PartnershipsSection = () => (
  <section id="parcerias" className="py-24 bg-muted/50">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-14"
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
      >
        <span
          className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
          style={{display: 'none'}}>
          <Handshake className="w-4 h-4"/>
          Parcerias
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Nossos <span className="text-gradient">Parceiros</span> e <span className="text-gradient">Apoiadores</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Empresas e comunidades que acreditam no poder da tecnologia na Região Norte.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            onClick={() => window.open(partner.url, '_blank')}
            className="bg-card rounded-2xl p-8 shadow-card border border-border text-center hover:cursor-pointer hover:shadow-elevated transition-shadow"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.1 * i}}
          >
            <partner.icon/>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{partner.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{partner.description}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA para parceiros */}
      <motion.div
        className="bg-card rounded-2xl p-10 max-w-2xl mx-auto text-center shadow-card border border-border"
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
      >
        <h3 className="font-display text-2xl font-bold text-foreground mb-4">
          Quer ser parceiro?
        </h3>
        <ul className="text-sm text-muted-foreground space-y-2 mb-6 max-w-md mx-auto text-left">
          {partnerBenefits.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {b}
            </li>
          ))}
        </ul>
        <a
          href="mailto:marcelodaniel.daniel@gmail.com"
          className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-xl transition-all hover:shadow-elevated"
        >
          Entre em Contato
        </a>
      </motion.div>
    </div>
  </section>
);

export default PartnershipsSection;
