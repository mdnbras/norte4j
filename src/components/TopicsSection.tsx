import { motion } from "framer-motion";
import { Server, Smartphone, Cpu, TrendingUp } from "lucide-react";

const topics = [
  { icon: Server, title: "Backend com", highlight: "Java / Spring", desc: "APIs robustas, microsserviços e ecossistema Spring Boot." },
  { icon: Smartphone, title: "Mobile com", highlight: "Kotlin / Android", desc: "Apps nativas modernas com Jetpack Compose e Kotlin Multiplatform." },
  { icon: Cpu, title: "Arquitetura", highlight: "& Boas Práticas", desc: "Clean Architecture, DDD, design patterns e código limpo." },
  { icon: TrendingUp, title: "Performance", highlight: "& Inovação", desc: "GraalVM, Virtual Threads, reactive programming e mais." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TopicsSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold text-center mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        O que você vai encontrar
      </motion.h2>
      <p className="text-center text-muted-foreground mb-14 max-w-xl mx-auto">
        Palestras técnicas, networking e muito mais para desenvolvedores Java/Kotlin da Região Norte.
      </p>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {topics.map((t) => (
          <motion.div
            key={t.highlight}
            variants={item}
            className="gradient-card rounded-2xl p-7 shadow-card hover:shadow-elevated transition-shadow group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <t.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-1">
              {t.title} <span className="text-primary">{t.highlight}</span>
            </h3>
            <p className="text-sm text-muted-foreground">{t.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TopicsSection;
