
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { SiteLayout } from "@/components/site";

const API = import.meta.env.VITE_API_URL;

const languageNames = {
    c: "c",
    cpp: "c++",
    csharp: "c#",
    java: "java",
    python: "python",
    javascript: "javascript",
    go: "go",
};

const starterCode = {
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello World");\n    return 0;\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World";\n    return 0;\n}',
    csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello World");\n    }\n}',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}',
    python: 'print("Hello World")',
    javascript: 'console.log("Hello World");',
    go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}',
};

interface ProgrammingLanguage {
    id: number;
    name: string;
    version: string;
    slug: string;
}

export default function CodeEditor() {
    const [languages, setLanguages] = useState<ProgrammingLanguage[]>([]);
    const [language, setLanguage] = useState("python");
    const [code, setCode] = useState(starterCode.python);
    const [stdin, setStdin] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/api/code/languages").then((res) => {
            setLanguages(res.data);
        }).catch((err) => {
            console.error("Language loading error:", err);
        });
    }, []);

    const changeLanguage = (value: any) => {
        setLanguage(value);
        setCode(starterCode[value] || "");
        setOutput("");
    };

    const runCode = async () => {
        setLoading(true);
        setOutput("Running...");

        try {
            const selected = languages.find(item => item.slug === language);

            if (!selected) {
                throw new Error("Language unavailable");
            }

            const { data } = await axios.post(`${API}/api/code/run`,
                {
                    code,
                    languageId: selected.id,
                    stdin,
                }
            );

            console.log(data);

            let result;

            // Poll Judge0 for completion
            for (let i = 0; i < 15; i++) {
                await new Promise(resolve =>
                    setTimeout(resolve, 1000)
                );

                const response = await axios.get(
                    `${API}/api/code/result/${data.token}`
                );

                result = response.data;

                if (result.status?.id >= 3) break;
            }

            if (!result || result.status?.id < 3) {
                setOutput("Execution timed out. Try again.");
            } else {
                setOutput(
                    result.stdout ||
                    result.compile_output ||
                    result.stderr ||
                    result.message ||
                    result.status?.description ||
                    "No output"
                );
            }
        } catch (error: any) {
            setOutput(
                error.response?.data?.message ||
                error.message ||
                "Execution failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <SiteLayout>
            <div className="min-h-[calc(100dvh-60px)] bg-[#0d1117] text-white">
                <div className="flex min-h-[inherit]">
                    <div className="flex-1 min-h-[inherit]">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between p-4 bg-[#1f1e1e] border-b-3 border-t-none border-[#353535]">

                            <select
                                value={language}
                                onChange={e => changeLanguage(e.target.value)}
                                className="bg-gray-800 p-2 rounded cursor-pointer text-sm"
                            >
                                {Object.keys(languageNames).map(lang => (
                                    <option key={lang} value={lang}>
                                        {lang.toUpperCase()}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={runCode}
                                disabled={loading}
                                className="bg-green-600 px-5 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? "Running..." : "▶ Run Code"}
                            </button>
                        </div>

                        {/* Editor */}
                        <div className="min-h-[inherit] code-editor">
                            <Editor
                                theme="vs-dark"
                                language={languageNames[language]}
                                className="min-h-[inherit] h-[calc(100dvh-60px)]"
                                value={code}
                                onChange={value => setCode(value || "")}
                                options={{
                                    fontSize: 15,
                                    minimap: { enabled: false },
                                    automaticLayout: true,
                                    wordWrap: "on",
                                    suggestOnTriggerCharacters: true,
                                    scrollBeyondLastLine: false,
                                }}
                            />
                        </div>
                    </div>
                    {/* Input */}
                    <div className="flex-1 bg-[#1f1e1e]">
                        <div className="flex items-center min-h-[72px] justify-between p-4 bg-[#1b1a1a] border-l-3 border-green-600">
                            <h3>Custom Input (stdin)</h3>
                        </div>
                        <div className="px-4 mt-4">
                            <textarea
                                value={stdin}
                                onChange={e => setStdin(e.target.value)}
                                placeholder="Enter program input..."
                                className="w-full h-20 bg-gray-800 p-3 rounded outline-none"
                            />
                        </div>
                        <div className="flex items-center min-h-[72px] justify-between p-4 bg-[#1b1a1a] border-l-3 border-green-600 mt-6">
                            <h3>Output</h3>
                        </div>
                        <div className="px-4 mt-4">
                            <pre className="bg-black p-4 rounded min-h-[380px] whitespace-pre-wrap">
                                {output || "Output will appear here..."}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}