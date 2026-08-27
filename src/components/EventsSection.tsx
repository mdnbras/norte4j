import {motion} from "framer-motion";
import {ArrowRight, Calendar, Clock, MapPin} from "lucide-react";
import {Link} from "react-router-dom";

const events = [
  {
    title: "Bate-papo sobre Java/Kotlin e Spring Boot",
    slug: "bate-papo-kotlin-backend",
    date: "Em breve",
    time: "A definir",
    location: "Online",
    description: "Conversa descontraída sobre desenvolvimento backend com Java/Kotlin e Spring Boot, compartilhando experiências e boas práticas.",
    status: "soon",
  },
  {
    title: "Workshop Kotlin para Backend",
    slug: "workshop-kotlin-backend",
    date: "Em breve",
    time: "A definir",
    location: "Online",
    description: "Hands-on de desenvolvimento backend com Kotlin, multi-modules, coroutines e boas práticas.",
    status: "soon",
  },
];

const EventsSection = () => (
  <section id="eventos" className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-14"
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
      >
        <span
          className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          Agenda
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Próximos <span className="text-gradient">Eventos</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {events.map((event, i) => (
          <motion.div
            key={event.title}
            className="relative bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated transition-shadow group"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.1 * i}}
          >
            <span
              className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${
                event.status === "upcoming"
                  ? "bg-accent text-accent-foreground"
                  : event.status === "finished"
                    ? "bg-emerald-600 text-accent-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {
                event.status === "upcoming" ? "Confirmado"
                  : event.status === "finished" ? "Encerrado"
                    : "Em breve"
              }
            </span>
            <h3 className="font-display text-lg font-bold text-foreground mb-3">{event.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{event.description}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary"/>
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary"/>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary"/>
                <span>{event.location}</span>
              </div>
            </div>
            <Link
              to={`/evento/${event.slug}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Ver detalhes <ArrowRight className="w-3.5 h-3.5"/>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EventsSection;
