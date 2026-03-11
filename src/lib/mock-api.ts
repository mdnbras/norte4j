import axios, { AxiosInstance } from "axios";

// Mock interceptor that uses localStorage instead of real API calls
const api: AxiosInstance = axios.create({ baseURL: "/api" });

function getStore<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function setStore<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// --- Types ---
export interface EventItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription: string;
  status: "upcoming" | "soon";
  topics: string[];
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
}

export interface SiteText {
  id: string;
  key: string;
  label: string;
  value: string;
}

// --- Seed data ---
const seedEvents: EventItem[] = [
  {
    id: "1",
    title: "1º Meetup Norte4j",
    slug: "1-meetup-norte4j",
    date: "11/04/2026",
    time: "08:00h",
    location: "Belém — PA",
    description: "Nosso primeiro encontro presencial com palestras sobre Spring Boot, Kotlin e arquitetura de software.",
    longDescription: "O 1º Meetup Norte4j é o marco inicial da comunidade Java & Kotlin da Região Norte.",
    status: "upcoming",
    topics: ["Spring Boot", "Kotlin", "Arquitetura de Software"],
  },
  {
    id: "2",
    title: "Workshop Kotlin para Android",
    slug: "workshop-kotlin-android",
    date: "Em breve",
    time: "A definir",
    location: "Belém — PA",
    description: "Hands-on de desenvolvimento mobile com Kotlin, Jetpack Compose e boas práticas.",
    longDescription: "Um workshop intensivo focado em desenvolvimento Android moderno com Kotlin.",
    status: "soon",
    topics: ["Kotlin", "Jetpack Compose", "Android"],
  },
  {
    id: "3",
    title: "Hackathon Norte4j",
    slug: "hackathon-norte4j",
    date: "Em breve",
    time: "A definir",
    location: "Belém — PA",
    description: "Maratona de programação com desafios reais usando tecnologias Java e Kotlin.",
    longDescription: "O Hackathon Norte4j reunirá equipes de desenvolvedores para resolver desafios reais.",
    status: "soon",
    topics: ["Java", "Kotlin", "Spring Boot"],
  },
];

const seedGallery: GalleryPhoto[] = [
  { id: "1", src: "/src/assets/banner_norte4j.png", alt: "Norte4j Meetup" },
  { id: "2", src: "/src/assets/banner_norte4j.png", alt: "Palestras técnicas" },
  { id: "3", src: "/src/assets/banner_norte4j.png", alt: "Comunidade Norte4j" },
];

const seedPartners: Partner[] = [
  { id: "1", name: "Studio Code", description: "Empresa de tecnologia parceira na organização e apoio logístico dos eventos." },
  { id: "2", name: "DEVs Norte", description: "Comunidade de desenvolvedores da Região Norte que impulsiona o ecossistema tech local." },
];

const seedTexts: SiteText[] = [
  { id: "1", key: "hero_title", label: "Título do Hero", value: "Norte4j" },
  { id: "2", key: "hero_subtitle", label: "Subtítulo do Hero", value: "Java & Kotlin Community — Região Norte" },
  { id: "3", key: "meetup_cta", label: "Texto do botão de inscrição", value: "Participação Gratuita — Inscreva-se!" },
  { id: "4", key: "about_title", label: "Título Sobre", value: "Sobre a Norte4j" },
];

// Initialize localStorage with seed data if empty
function initStore() {
  if (!localStorage.getItem("cms_events")) setStore("cms_events", seedEvents);
  if (!localStorage.getItem("cms_gallery")) setStore("cms_gallery", seedGallery);
  if (!localStorage.getItem("cms_partners")) setStore("cms_partners", seedPartners);
  if (!localStorage.getItem("cms_texts")) setStore("cms_texts", seedTexts);
}
initStore();

// --- Mock API interceptor ---
api.interceptors.request.use((config) => {
  // We'll handle everything in the response interceptor
  return config;
});

// Helper to simulate async delay
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

// --- API functions ---

// Events
export const eventsApi = {
  getAll: async (): Promise<EventItem[]> => {
    await delay();
    return getStore<EventItem>("cms_events", seedEvents);
  },
  create: async (event: Omit<EventItem, "id">): Promise<EventItem> => {
    await delay();
    const items = getStore<EventItem>("cms_events", []);
    const newItem = { ...event, id: Date.now().toString() };
    items.push(newItem);
    setStore("cms_events", items);
    return newItem;
  },
  update: async (id: string, event: Partial<EventItem>): Promise<EventItem> => {
    await delay();
    const items = getStore<EventItem>("cms_events", []);
    const idx = items.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error("Event not found");
    items[idx] = { ...items[idx], ...event };
    setStore("cms_events", items);
    return items[idx];
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    const items = getStore<EventItem>("cms_events", []).filter((e) => e.id !== id);
    setStore("cms_events", items);
  },
};

// Gallery
export const galleryApi = {
  getAll: async (): Promise<GalleryPhoto[]> => {
    await delay();
    return getStore<GalleryPhoto>("cms_gallery", seedGallery);
  },
  create: async (photo: Omit<GalleryPhoto, "id">): Promise<GalleryPhoto> => {
    await delay();
    const items = getStore<GalleryPhoto>("cms_gallery", []);
    const newItem = { ...photo, id: Date.now().toString() };
    items.push(newItem);
    setStore("cms_gallery", items);
    return newItem;
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    const items = getStore<GalleryPhoto>("cms_gallery", []).filter((p) => p.id !== id);
    setStore("cms_gallery", items);
  },
};

// Partners
export const partnersApi = {
  getAll: async (): Promise<Partner[]> => {
    await delay();
    return getStore<Partner>("cms_partners", seedPartners);
  },
  create: async (partner: Omit<Partner, "id">): Promise<Partner> => {
    await delay();
    const items = getStore<Partner>("cms_partners", []);
    const newItem = { ...partner, id: Date.now().toString() };
    items.push(newItem);
    setStore("cms_partners", items);
    return newItem;
  },
  update: async (id: string, partner: Partial<Partner>): Promise<Partner> => {
    await delay();
    const items = getStore<Partner>("cms_partners", []);
    const idx = items.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Partner not found");
    items[idx] = { ...items[idx], ...partner };
    setStore("cms_partners", items);
    return items[idx];
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    const items = getStore<Partner>("cms_partners", []).filter((p) => p.id !== id);
    setStore("cms_partners", items);
  },
};

// Site Texts
export const textsApi = {
  getAll: async (): Promise<SiteText[]> => {
    await delay();
    return getStore<SiteText>("cms_texts", seedTexts);
  },
  update: async (id: string, text: Partial<SiteText>): Promise<SiteText> => {
    await delay();
    const items = getStore<SiteText>("cms_texts", []);
    const idx = items.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Text not found");
    items[idx] = { ...items[idx], ...text };
    setStore("cms_texts", items);
    return items[idx];
  },
};

// Auth mock
export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: { email: string; name: string } }> => {
    await delay(500);
    if (email === "admin@norte4j.com" && password === "admin123") {
      const session = { token: "mock-jwt-token", user: { email, name: "Admin Norte4j" } };
      localStorage.setItem("cms_session", JSON.stringify(session));
      return session;
    }
    throw new Error("Credenciais inválidas");
  },
  logout: async (): Promise<void> => {
    await delay(100);
    localStorage.removeItem("cms_session");
  },
  getSession: (): { token: string; user: { email: string; name: string } } | null => {
    try {
      const raw = localStorage.getItem("cms_session");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};

export default api;
