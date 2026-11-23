self.onmessage = (event: MessageEvent) => {
    const { code } = event.data;
    const logs: string[] = [];
    try {
        // Capture console output
        const fakeConsole = {
            log: (...args: unknown[]) => {
                logs.push(args.map(String).join(" "));
            },
            error: (...args: unknown[]) => {
                logs.push("Error: " + args.map(String).join(" "));
            },
            warn: (...args: unknown[]) => {
                logs.push("Warning: " + args.map(String).join(" "));
            },
        };

        // Execute JavaScript
        const execute = new Function(
            "console",
            `"use strict";\n${code}`
        );

        execute(fakeConsole);

        self.postMessage({
            type: "result",
            success: true,
            output: logs.join("\n") || "Program executed successfully.",
        });

    } catch (error) {
        self.postMessage({
            type: "result",
            success: false,
            output: error instanceof Error
                ? error.message
                : String(error),
        });
    }
};
