import { Plus, Trash2 } from "lucide-react";
import { useSpecStore } from "@/lib/spec.store";
import { Button } from "@/components/ui/button";

export function SpecList() {
    const { specs, activeSpecId, setActiveSpecId, removeSpec, addSpec } = useSpecStore();

    const handleAddSpec = () => {
        addSpec({
            name: `Spec ${specs.length + 1}`,
            type: 'url',
            value: '',
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">API Specs</h3>
                <Button variant="ghost" size="icon" onClick={handleAddSpec}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto">
                {specs.length === 0 ? (
                    <div className="text-sm text-muted-foreground py-4 flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Plus className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p>Click the + button to add your first spec</p>
                    </div>
                ) : (
                    specs.map((spec) => (
                        <div
                            key={spec.id}
                            className={`flex items-center justify-between px-3 py-2 text-sm rounded-md ${activeSpecId === spec.id
                                ? "bg-muted font-medium"
                                : "hover:bg-muted/50 cursor-pointer"
                                }`}
                            onClick={() => setActiveSpecId(spec.id)}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="truncate">{spec.name}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-50 hover:opacity-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeSpec(spec.id);
                                }}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
} 