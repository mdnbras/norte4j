import { useEffect, useState } from "react";
import { eventsApi, type EventItem } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const emptyEvent: Omit<EventItem, "id"> = {
  title: "", slug: "", date: "", time: "", location: "",
  description: "", longDescription: "", status: "soon", topics: [],
};

const CmsEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyEvent);
  const [topicsInput, setTopicsInput] = useState("");

  const load = () => eventsApi.getAll().then(setEvents);
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyEvent);
    setTopicsInput("");
    setCreating(true);
  };

  const openEdit = (event: EventItem) => {
    setCreating(false);
    setEditing(event);
    setForm(event);
    setTopicsInput(event.topics.join(", "));
  };

  const close = () => { setCreating(false); setEditing(null); };

  const handleSave = async () => {
    const data = { ...form, topics: topicsInput.split(",").map((t) => t.trim()).filter(Boolean) };
    try {
      if (editing) {
        await eventsApi.update(editing.id, data);
        toast.success("Evento atualizado!");
      } else {
        await eventsApi.create(data);
        toast.success("Evento criado!");
      }
      close();
      load();
    } catch {
      toast.error("Erro ao salvar evento");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este evento?")) return;
    await eventsApi.delete(id);
    toast.success("Evento excluído");
    load();
  };

  const showForm = creating || editing;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Eventos</h1>
        {!showForm && (
          <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" /> Novo Evento</Button>
        )}
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">
              {editing ? "Editar Evento" : "Novo Evento"}
            </h2>
            <button onClick={close} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Data</Label>
              <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="dd/mm/aaaa" />
            </div>
            <div className="space-y-2">
              <Label>Horário</Label>
              <Input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Local</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "upcoming" | "soon" })}
              >
                <option value="upcoming">Confirmado</option>
                <option value="soon">Em breve</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Descrição curta</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Descrição completa</Label>
              <Textarea value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} rows={4} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Tópicos (separados por vírgula)</Label>
              <Input value={topicsInput} onChange={(e) => setTopicsInput(e.target.value)} placeholder="Spring Boot, Kotlin, ..." />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={handleSave}>{editing ? "Salvar" : "Criar"}</Button>
            <Button variant="outline" onClick={close}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Título</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Data</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-border last:border-0">
                <td className="p-4 text-sm font-medium text-foreground">{event.title}</td>
                <td className="p-4 text-sm text-muted-foreground">{event.date}</td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    event.status === "upcoming" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                  }`}>
                    {event.status === "upcoming" ? "Confirmado" : "Em breve"}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => openEdit(event)} className="text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4 inline" /></button>
                  <button onClick={() => handleDelete(event.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4 inline" /></button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Nenhum evento cadastrado</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CmsEvents;
