import { motion } from "framer-motion";
import { Handshake, Heart, Star } from "lucide-react";

const partners = [
  {
    name: "Studio Code",
    description: "Empresa de tecnologia parceira na organização e apoio logístico dos eventos.",
    icon: Star,
  },
  {
    name: "DEVs Norte",
    description: "Comunidade de desenvolvedores da Região Norte que impulsiona o ecossistema tech local.",
    icon: Heart,
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <Handshake className="w-4 h-4" />
          Parcerias
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Nossos <span className="text-gradient">Parceiros</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Empresas e comunidades que acreditam no poder da tecnologia na Região Norte.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            className="bg-card rounded-2xl p-8 shadow-card border border-border text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
          >
            <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
              <partner.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{partner.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{partner.description}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA para parceiros */}
      <motion.div
        className="bg-card rounded-2xl p-10 max-w-2xl mx-auto text-center shadow-card border border-border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
          href="mailto:contato@norte4j.com"
          className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-xl transition-all hover:shadow-elevated"
        >
          Entre em Contato
        </a>
      </motion.div>
    </div>
  </section>
);

export default PartnershipsSection;
