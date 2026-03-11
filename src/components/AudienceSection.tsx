import { motion } from "framer-motion";

const audiences = [
  "Desenvolvedores Java/Kotlin",
  "Desenvolvedores Mobile",
  "Estudantes de Tecnologia",
  "Arquitetos de Software",
  "Tech Leads",
];

const AudienceSection = () => (
  <section id="meetup" className="py-24 bg-background">
    <div className="container mx-auto px-6 text-center">
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Para quem é o meetup?
      </motion.h2>
      <p className="text-muted-foreground mb-10">
        Se você se identifica com algum desses perfis, esse evento é pra você!
      </p>
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-12">
        {audiences.map((a, i) => (
          <motion.span
            key={a}
            className="bg-primary/10 text-primary font-medium px-5 py-2.5 rounded-full text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i }}
          >
            {a}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="gradient-hero rounded-2xl p-10 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
          Participação Gratuita
        </h3>
        <p className="text-primary-foreground/80 mb-6">
          Garanta sua vaga no próximo meetup Norte4j em Belém – PA.
        </p>
        <a
          href="https://norte4j.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-card text-foreground font-bold px-8 py-3.5 rounded-xl hover:shadow-elevated transition-all"
        >
          Inscreva-se Agora
        </a>
      </motion.div>
    </div>
  </section>
);

export default AudienceSection;
