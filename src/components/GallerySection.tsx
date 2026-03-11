import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import bannerImg from "@/assets/banner_norte4j.png";

const photos = [
  { src: bannerImg, alt: "Norte4j Meetup" },
  { src: bannerImg, alt: "Palestras técnicas" },
  { src: bannerImg, alt: "Comunidade Norte4j" },
  { src: bannerImg, alt: "Networking" },
  { src: bannerImg, alt: "Workshops" },
  { src: bannerImg, alt: "Evento presencial" },
];

const GallerySection = () => (
  <section id="eventos" className="py-24 bg-background">
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
