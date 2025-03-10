import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";

function SettingsDialog({
  specUrl,
  onSpecUrlChange,
}: {
  specUrl: string;
  onSpecUrlChange: (url: string) => void;
}) {
  const [tempUrl, setTempUrl] = useState(specUrl);

  const handleSave = () => {
    onSpecUrlChange(tempUrl);
    localStorage.setItem("specUrl", tempUrl);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Spec Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="specUrl">Spec URL</label>
            <Input
              id="specUrl"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="Enter OpenAPI spec URL"
            />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function App() {
  const [specUrl, setSpecUrl] = useState<string>(
    "https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.yaml"
  );

  useEffect(() => {
    const storedUrl = localStorage.getItem("specUrl");
    if (storedUrl) {
      setSpecUrl(storedUrl);
    }
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <SettingsDialog specUrl={specUrl} onSpecUrlChange={setSpecUrl} />
      </div>
      <ApiReferenceReact
        configuration={{
          spec: {
            url: specUrl,
          },
        }}
      />
    </div>
  );
}

export default App;
