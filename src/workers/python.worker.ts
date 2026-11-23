
let pyodideInstance: any = null;

self.onmessage = async (event: MessageEvent) => {
    const { code } = event.data;

    try {
        if (!pyodideInstance) {
            self.postMessage({
                type: "status",
                output: "Loading Python runtime..."
            });

            // Build URL at runtime so Vite does not analyze it
            const pyodideUrl = new URL(
                "/pyodide/pyodide.mjs",
                self.location.origin
            ).href;

            // @vite-ignore prevents Vite from resolving public files
            const { loadPyodide } = await import(
                /* @vite-ignore */ pyodideUrl
            );

            pyodideInstance = await loadPyodide({
                indexURL: new URL(
                    "/pyodide/",
                    self.location.origin
                ).href
            });
        }

        let output = "";

        pyodideInstance.setStdout({
            batched: (text: string) => {
                output += text + "\n";
            }
        });

        pyodideInstance.setStderr({
            batched: (text: string) => {
                output += text + "\n";
            }
        });

        await pyodideInstance.runPythonAsync(code);

        self.postMessage({
            type: "result",
            success: true,
            output: output || "Program executed successfully."
        });

    } catch (error) {
        self.postMessage({
            type: "result",
            success: false,
            output: error instanceof Error
                ? error.stack || error.message
                : String(error)
        });
    }
};