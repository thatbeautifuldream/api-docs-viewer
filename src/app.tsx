import { SettingsDialog } from "@/components/settings-dialog";
import { Button } from "@/components/ui/button";
import { useActiveSpec, useLoadSpecsFromStorage, useSyncSpecsToStorage } from "@/lib/hooks";
import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { FileScan, FileTextIcon, LinkIcon, InfoIcon } from "lucide-react";

function App() {
  const activeSpec = useActiveSpec();

  useLoadSpecsFromStorage();
  useSyncSpecsToStorage();

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 right-4 z-10">
        <SettingsDialog />
      </div>
      {activeSpec ? (
        <ApiReferenceReact
          configuration={{
            spec: activeSpec.type === 'url'
              ? { url: activeSpec.value }
              : { content: activeSpec.value }
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
          <div className="max-w-3xl w-full flex flex-col items-center gap-8">
            <div className="text-center space-y-3">
              <div className="mx-auto flex size-16 shrink-0 items-center justify-center rounded-full border bg-background/50 mb-3">
                <FileScan className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">API Docs Viewer</h1>
              <p className="text-base text-muted-foreground max-w-2xl">
                Your personal OpenAPI documentation browser - simple, clean, and ready to use.
              </p>
              <p className="text-xs text-muted-foreground mt-2 bg-secondary/30 p-2 rounded-md max-w-md mx-auto flex text-left">
                <InfoIcon className="size-3 mr-2 shrink-0 mt-0.5" />
                <span>Your API specs are stored only in your browser. We never upload or store your data on any server.</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 w-full mt-4">
              <div className="flex flex-col p-5 bg-card rounded-lg border shadow-sm">
                <div className="bg-primary/10 p-2 rounded-md w-fit mb-3">
                  <LinkIcon className="size-4 text-primary" />
                </div>
                <h2 className="text-lg font-medium mb-2">Add spec via URL</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Link directly to your OpenAPI specification hosted online.
                  Perfect for specifications that are regularly updated.
                </p>
                <div className="text-xs text-muted-foreground mt-auto">
                  <span className="font-medium">Supported formats:</span> JSON, YAML
                </div>
              </div>

              <div className="flex flex-col p-5 bg-card rounded-lg border shadow-sm">
                <div className="bg-primary/10 p-2 rounded-md w-fit mb-3">
                  <FileTextIcon className="size-4 text-primary" />
                </div>
                <h2 className="text-lg font-medium mb-2">Paste YAML/JSON content</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Copy and paste your OpenAPI specification directly.
                  Ideal for quick viewing or testing local changes.
                </p>
                <div className="text-xs text-muted-foreground mt-auto">
                  <span className="font-medium">Supported versions:</span> OpenAPI 2.0, 3.0, 3.1
                </div>
              </div>
            </div>

            <Button
              size="default"
              className="mt-5"
              onClick={() => {
                const settingsButton = document.querySelector<HTMLButtonElement>('[aria-label="Settings"]');
                if (settingsButton) settingsButton.click();
              }}
            >
              Add API Spec
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
