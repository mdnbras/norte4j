import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import img1 from "@/assets/eventos/2026_1/1.jpg";
import img2 from "@/assets/eventos/2026_1/2.jpg";
import img3 from "@/assets/eventos/2026_1/3.jpg";
import img4 from "@/assets/eventos/2026_1/4.jpg";
import img5 from "@/assets/eventos/2026_1/5.jpg";
import img6 from "@/assets/eventos/2026_1/6.jpg";
import img7 from "@/assets/eventos/2026_1/7.jpg";
import img8 from "@/assets/eventos/2026_1/8.jpg";
import img9 from "@/assets/eventos/2026_1/9.jpg";
import img10 from "@/assets/eventos/2026_1/10.jpg";

const photos = [
  { src: img10, alt: "Norte4j Meetup 1° Evento" },
  { src: img2, alt: "Norte4j Meetup 1° Evento" },
  { src: img3, alt: "Norte4j Meetup 1° Evento" },
  { src: img4, alt: "Norte4j Meetup 1° Evento" },
  { src: img5, alt: "Norte4j Meetup 1° Evento" },
  { src: img6, alt: "Norte4j Meetup 1° Evento" },
  { src: img7, alt: "Norte4j Meetup 1° Evento" },
  { src: img8, alt: "Norte4j Meetup 1° Evento" },
  { src: img9, alt: "Norte4j Meetup 1° Evento" },
  { src: img1, alt: "Norte4j Meetup 1° Evento" },
];

const GallerySection = () => (
  <section id="galeria" className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <Camera className="w-4 h-4" />
          Galeria
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Momentos da <span className="text-gradient">Comunidade</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            className={`relative group overflow-hidden rounded-xl ${
              i === 0 ? "col-span-2 row-span-2" : ""
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * i }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end">
              <span className="text-primary-foreground text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.alt}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
