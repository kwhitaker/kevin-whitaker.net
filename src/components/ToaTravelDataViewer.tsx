import { Copy } from "preact-feather";
import { useEffect, useState } from "preact/hooks";
import { ToALink } from "./ToALink";

export default function ToaTravelDataViewer() {
  const [loading, setLoading] = useState(true);
  const [toaData, setToaData] = useState<Record<string, unknown>>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const localData =
      localStorage.getItem("journey") || localStorage.getItem("toajourney");

    if (!localData) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(JSON.parse(localData).data);

      setError(undefined);
      setToaData(parsed);
    } catch (e) {
      console.error(e);
      setError("There was a problem parsing your data.");
      setToaData(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCopyData = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(toaData));
      alert("Data copied to clipboard");
    } catch (e) {
      console.error(e);
      setError("Failed to copy data to clipboard.");
    }
  };

  return (
    <div class="flex flex-col h-screen overflow-hidden">
      <p class="w-full text-center text-lg md:text-2xl mb-3 font-bold">
        This app has moved to <ToALink>https://toa.kevin-whitaker.net</ToALink>
      </p>
      {loading && (
        <p class="w-full md:text-lg md:text-center mb-3">
          Attempting to Load Saved Data&hellip;
        </p>
      )}
      {!loading && !toaData && (
        <p class="w-full md:text-lg md:text-center mb-3">
          You have no stored data. Please visit{" "}
          <ToALink>https://toa.kevin-whitaker.net</ToALink> to use the app.
        </p>
      )}
      {error && (
        <>
          <p class="w-full md:text-lg md:text-center mb-3 text-red-700">
            {error}
          </p>
        </>
      )}
      {toaData && (
        <>
          <p class="w-full md:text-lg mb-3 md:text-center">
            It looks like you have some previous data! Please copy the data
            below and import it at{" "}
            <ToALink>https://toa.kevin-whitaker.net</ToALink>
          </p>
          <pre class="relative w-full md:w-1/2 mx-auto p-3 grow bg-gray-200 border border-gray-500 overflow-scroll rounded text-sm">
            <button
              onClick={handleCopyData}
              class="absolute top-2 right-2 z-10 p-2 text-white bg-gray-800 rounded hover:bg-gray-600"
              title="Copy Data"
            >
              <Copy />
            </button>
            {JSON.stringify(toaData, null, 1)}
          </pre>
        </>
      )}
    </div>
  );
}
