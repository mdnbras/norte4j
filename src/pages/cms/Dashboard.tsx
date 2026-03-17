import { useEffect, useState } from "react";
import { Calendar, Image, Handshake, FileText } from "lucide-react";
import { eventsApi, galleryApi, partnersApi, textsApi } from "@/lib/mock-api";

const Dashboard = () => {
  const [counts, setCounts] = useState({ events: 0, gallery: 0, partners: 0, texts: 0 });

  useEffect(() => {
    Promise.all([eventsApi.getAll(), galleryApi.getAll(), partnersApi.getAll(), textsApi.getAll()]).then(
      ([events, gallery, partners, texts]) =>
        setCounts({ events: events.length, gallery: gallery.length, partners: partners.length, texts: texts.length })
    );
  }, []);

  const cards = [
    { label: "Eventos", count: counts.events, icon: Calendar, color: "text-primary" },
    { label: "Fotos", count: counts.gallery, icon: Image, color: "text-secondary" },
    { label: "Parceiros", count: counts.partners, icon: Handshake, color: "text-accent" },
    { label: "Textos", count: counts.texts, icon: FileText, color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.label} className="bg-card rounded-xl border border-border p-6 shadow-card">
            <c.icon className={`w-8 h-8 ${c.color} mb-3`} />
            <p className="text-3xl font-bold text-foreground">{c.count}</p>
            <p className="text-sm text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
