import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { useState, useEffect } from "react";

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
    <ApiReferenceReact
      configuration={{
        spec: {
          url: specUrl,
        },
      }}
    />
  );
}

export default App;
