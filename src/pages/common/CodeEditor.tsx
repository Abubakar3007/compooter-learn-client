
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

type Language = "python" | "javascript";

export default function CodeEditor() {
    const [language, setLanguage] = useState<Language>("python");

    const [code, setCode] = useState(
        'print("Hello, World!")'
    );

    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const workerRef = useRef<Worker | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function runCode() {
        // Stop previous execution
        workerRef.current?.terminate();

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setLoading(true);
        setOutput("Running...");

        const worker = language === "python"
            ? new Worker(
                new URL("../../workers/python.worker.ts", import.meta.url),
                { type: "module" }
            )
            : new Worker(
                new URL("../../workers/javascript.worker.ts", import.meta.url),
                { type: "module" }
            );

        workerRef.current = worker;

        worker.onmessage = (event) => {
            const result = event.data;

            if (result.type === "status") {
                setOutput(result.output);
                return;
            }

            setOutput(result.output);
            setLoading(false);

            worker.terminate();
            workerRef.current = null;

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };

        worker.onerror = (event) => {
            console.error("Worker error:", {
                message: event.message,
                filename: event.filename,
                line: event.lineno,
                column: event.colno,
            });

            setOutput(
                `Worker Error: ${event.message || "Unknown error"}\n` +
                `File: ${event.filename}\n` +
                `Line: ${event.lineno}`
            );

            setLoading(false);
            worker.terminate();
            workerRef.current = null;

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };

        worker.onmessageerror = (event) => {
            console.error("Worker message error:", event);

            setOutput("Unable to receive data from the worker.");
            setLoading(false);
            worker.terminate();
            workerRef.current = null;
        };


        // Prevent infinite loops from running forever
        timeoutRef.current = setTimeout(() => {
            worker.terminate();
            workerRef.current = null;
            setOutput("Execution timed out.");
            setLoading(false);
        }, 10000);

        worker.postMessage({ code });
    }

    function changeLanguage(next: Language) {
        setLanguage(next);

        setCode(
            next === "python"
                ? 'print("Hello, World!")'
                : 'console.log("Hello, World!");'
        );

        setOutput("");
    }

    return (
        <div className="py-14 bg-card text-white min-h-screen">
            <div className="max-w-[90%] mx-auto">
                <h1 className="text-2xl font-bold mb-2">💻Code Playground</h1>
                <p className="text-muted-foreground mb-8">Edit the code, press Run, and watch it come alive.</p>
                <div className="grid gap-4 lg:grid-cols-2  px-4">
                    <div className="overflow-hidden rounded-3xl border bg-card">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between bg-slate-900 p-3">

                            <select
                                value={language}
                                onChange={(e) =>
                                    changeLanguage(e.target.value as Language)
                                }
                                className="rounded bg-slate-800 p-2 text-white"
                            >
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                            </select>

                            <button
                                onClick={runCode}
                                disabled={loading}
                                className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
                            >
                                {loading ? "Running..." : "▶ Run"}
                            </button>

                        </div>

                        {/* Editor */}
                        <Editor
                            height="350px"
                            language={language}
                            value={code}
                            onChange={(value) => setCode(value ?? "")}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 15,
                                automaticLayout: true,
                                tabSize: 4,
                                scrollBeyondLastLine: false,
                                padding: { top: 12 },
                            }}
                        />
                    </div>
                    {/* Output */}
                    <div className="flex flex-col overflow-hidden rounded-3xl border bg-card">
                        <div className="border-b p-4 bg-slate-900 text-white">
                            <h3 className="font-semibold">
                                Output
                            </h3>
                        </div>
                        <div className="flex-1 overflow-auto p-4">
                            <pre className="whitespace-pre-wrap break-words text-sm">
                                {output || "Your program output will appear here."}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}