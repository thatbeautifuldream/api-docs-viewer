import { useState, useEffect, useRef } from "react";
import { Settings, LinkIcon, FileTextIcon, CopyIcon, CheckIcon, PlusCircleIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSpecStore } from "@/lib/spec.store";
import { SpecList } from "@/components/spec-list";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type InputType = 'url' | 'content';

export function SettingsDialog() {
    const { specs, activeSpecId, updateSpec, addSpec } = useSpecStore();
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState<boolean>(false);
    const urlInputRef = useRef<HTMLInputElement>(null);

    const activeSpec = specs.find(spec => spec.id === activeSpecId) || null;
    const [inputType, setInputType] = useState<InputType>(activeSpec?.type || 'url');
    const [name, setName] = useState(activeSpec?.name || '');
    const [value, setValue] = useState(activeSpec?.value || '');

    // Reset form when dialog opens or active spec changes
    const resetForm = () => {
        if (activeSpec) {
            setInputType(activeSpec.type);
            setName(activeSpec.name);
            setValue(activeSpec.value);
        } else {
            setInputType('url');
            setName('');
            setValue('');
        }
    };

    // When dialog opens or active spec changes
    useEffect(() => {
        resetForm();
    }, [open, activeSpecId, activeSpec]);

    const handleSave = () => {
        if (activeSpecId) {
            updateSpec(activeSpecId, {
                name,
                type: inputType,
                value,
            });
        }
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (newOpen) {
            resetForm();
        }
        setOpen(newOpen);
    };

    const handleCopy = () => {
        if (urlInputRef.current) {
            navigator.clipboard.writeText(urlInputRef.current.value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const handleAddNewSpec = () => {
        addSpec({
            name: "New API Spec",
            type: "url",
            value: ""
        });
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button size="icon" aria-label="Settings">
                    <Settings className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <div className="flex flex-col gap-2">
                    <DialogHeader>
                        <DialogTitle className="text-left">API Spec Settings</DialogTitle>
                        <DialogDescription className="text-left">
                            <div className="mt-2 bg-secondary/30 p-2 rounded-md text-xs flex">
                                <InfoIcon className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                                <span>Your API specs are stored only in your browser. We never upload or store your data on any server.</span>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Your API Specs</Label>
                        <SpecList />
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-full"
                            onClick={handleAddNewSpec}
                        >
                            <PlusCircleIcon className="mr-2" size={16} />
                            Add new spec
                        </Button>
                    </div>

                    {activeSpec && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="specName">Spec Name</Label>
                                <Input
                                    id="specName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter name for this spec"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Input Type</Label>
                                <div className="flex">
                                    <Button
                                        variant={inputType === 'url' ? 'default' : 'outline'}
                                        onClick={() => setInputType('url')}
                                        className="flex-1 rounded-r-none"
                                        size="sm"
                                    >
                                        <LinkIcon className="mr-2" size={14} /> URL
                                    </Button>
                                    <Button
                                        variant={inputType === 'content' ? 'default' : 'outline'}
                                        onClick={() => setInputType('content')}
                                        className="flex-1 rounded-l-none"
                                        size="sm"
                                    >
                                        <FileTextIcon className="mr-2" size={14} /> YAML/JSON
                                    </Button>
                                </div>
                            </div>

                            {inputType === 'url' ? (
                                <div className="space-y-2">
                                    <Label htmlFor="specUrl">Spec URL</Label>
                                    <div className="relative">
                                        <Input
                                            id="specUrl"
                                            ref={urlInputRef}
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder="Enter OpenAPI spec URL"
                                            className="pe-9"
                                        />
                                        {value && (
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button
                                                            onClick={handleCopy}
                                                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                                                            aria-label={copied ? "Copied" : "Copy to clipboard"}
                                                            disabled={copied}
                                                        >
                                                            <div
                                                                className={cn(
                                                                    "transition-all",
                                                                    copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                                                )}
                                                            >
                                                                <CheckIcon
                                                                    className="stroke-emerald-500"
                                                                    size={16}
                                                                    aria-hidden="true"
                                                                />
                                                            </div>
                                                            <div
                                                                className={cn(
                                                                    "absolute transition-all",
                                                                    copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                                                                )}
                                                            >
                                                                <CopyIcon size={16} aria-hidden="true" />
                                                            </div>
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="px-2 py-1 text-xs">
                                                        Copy to clipboard
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label htmlFor="specContent">Spec Content (YAML/JSON)</Label>
                                    <Textarea
                                        id="specContent"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        placeholder="Paste OpenAPI spec content here"
                                        className="min-h-[200px] font-mono text-xs"
                                    />
                                </div>
                            )}

                            <Button
                                onClick={handleSave}
                                className="w-full mt-2"
                            >
                                Save Changes
                            </Button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 