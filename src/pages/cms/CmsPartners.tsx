import { useEffect, useState } from "react";
import { partnersApi, type Partner } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const CmsPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const load = () => partnersApi.getAll().then(setPartners);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setName(""); setDescription(""); setCreating(true); };
  const openEdit = (p: Partner) => { setCreating(false); setEditing(p); setName(p.name); setDescription(p.description); };
  const close = () => { setCreating(false); setEditing(null); };

  const handleSave = async () => {
    if (!name) { toast.error("Preencha o nome"); return; }
    try {
      if (editing) {
        await partnersApi.update(editing.id, { name, description });
        toast.success("Parceiro atualizado!");
      } else {
        await partnersApi.create({ name, description });
        toast.success("Parceiro adicionado!");
      }
      close(); load();
    } catch {
      toast.error("Erro ao salvar");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este parceiro?")) return;
    await partnersApi.delete(id);
    toast.success("Parceiro excluído");
    load();
  };

  const showForm = creating || editing;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Parceiros</h1>
        {!showForm && <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" /> Novo Parceiro</Button>}
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">
              {editing ? "Editar Parceiro" : "Novo Parceiro"}
            </h2>
            <button onClick={close} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleSave}>{editing ? "Salvar" : "Criar"}</Button>
            <Button variant="outline" onClick={close}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((p) => (
          <div key={p.id} className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h3 className="font-display font-bold text-foreground mb-2">{p.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
            <div className="flex gap-2">
              <button onClick={() => openEdit(p)} className="text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {partners.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">Nenhum parceiro cadastrado</div>
        )}
      </div>
    </div>
  );
};

export default CmsPartners;
