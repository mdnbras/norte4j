import { useEffect, useState } from "react";
import { textsApi, type SiteText } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { toast } from "sonner";

const CmsTexts = () => {
  const [texts, setTexts] = useState<SiteText[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});

  const load = () => textsApi.getAll().then((data) => {
    setTexts(data);
    const map: Record<string, string> = {};
    data.forEach((t) => (map[t.id] = t.value));
    setEdits(map);
  });

  useEffect(() => { load(); }, []);

  const handleSave = async (id: string) => {
    await textsApi.update(id, { value: edits[id] });
    toast.success("Texto atualizado!");
    load();
  };

  const handleSaveAll = async () => {
    await Promise.all(texts.map((t) => textsApi.update(t.id, { value: edits[t.id] })));
    toast.success("Todos os textos salvos!");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Textos do Site</h1>
        <Button onClick={handleSaveAll}><Save className="w-4 h-4 mr-2" /> Salvar Todos</Button>
      </div>

      <div className="space-y-4">
        {texts.map((text) => (
          <div key={text.id} className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>{text.label}</Label>
                <p className="text-xs text-muted-foreground mb-1">Chave: {text.key}</p>
                <Input
                  value={edits[text.id] || ""}
                  onChange={(e) => setEdits({ ...edits, [text.id]: e.target.value })}
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => handleSave(text.id)}>
                <Save className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {texts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">Nenhum texto configurado</div>
        )}
      </div>
    </div>
  );
};

export default CmsTexts;
