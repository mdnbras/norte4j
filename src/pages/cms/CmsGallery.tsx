import { useEffect, useState } from "react";
import { galleryApi, type GalleryPhoto } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const CmsGallery = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [creating, setCreating] = useState(false);
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");

  const load = () => galleryApi.getAll().then(setPhotos);
  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!src || !alt) { toast.error("Preencha todos os campos"); return; }
    await galleryApi.create({ src, alt });
    toast.success("Foto adicionada!");
    setSrc(""); setAlt(""); setCreating(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta foto?")) return;
    await galleryApi.delete(id);
    toast.success("Foto excluída");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Galeria</h1>
        {!creating && <Button onClick={() => setCreating(true)}><Plus className="w-4 h-4 mr-2" /> Adicionar Foto</Button>}
      </div>

      {creating && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">Nova Foto</h2>
            <button onClick={() => setCreating(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>URL da imagem</Label>
              <Input value={src} onChange={(e) => setSrc(e.target.value)} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Descrição (alt)</Label>
              <Input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Descrição da foto" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleCreate}>Adicionar</Button>
            <Button variant="outline" onClick={() => setCreating(false)}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group bg-card rounded-xl border border-border overflow-hidden shadow-card">
            <img src={photo.src} alt={photo.alt} className="w-full aspect-video object-cover" />
            <div className="p-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground truncate">{photo.alt}</span>
              <button onClick={() => handleDelete(photo.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {photos.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">Nenhuma foto na galeria</div>
        )}
      </div>
    </div>
  );
};

export default CmsGallery;
