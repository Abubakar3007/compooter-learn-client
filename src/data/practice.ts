import type { Fun } from "./content";

export type Q = { q: string; options: string[]; answer: number };
export type QuizSet = { id: string; title: string; emoji: string; color: Fun; level: string; minutes: number; questions: Q[] };

export const quizSets: QuizSet[] = [
    {
        id: "computer-basics", title: "Computer Basics", emoji: "🖥️", color: "blue", level: "Easy", minutes: 3, questions: [
            { q: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Control Print Unit"], answer: 0 },
            { q: "Which is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], answer: 2 },
            { q: "RAM is…", options: ["Permanent storage", "Temporary memory", "A printer", "A virus"], answer: 1 },
            { q: "Which is software?", options: ["Mouse", "Windows", "Hard disk", "Keyboard"], answer: 1 },
            { q: "The 'brain' of the computer is the…", options: ["Monitor", "CPU", "Mouse", "Speaker"], answer: 1 },
        ]
    },
    {
        id: "binary", title: "Binary Numbers", emoji: "🔢", color: "cyan", level: "Medium", minutes: 3, questions: [
            { q: "Binary 1010 in decimal is…", options: ["8", "10", "12", "5"], answer: 1 },
            { q: "How many bits make a byte?", options: ["4", "8", "16", "2"], answer: 1 },
            { q: "Decimal 5 in binary is…", options: ["101", "110", "111", "100"], answer: 0 },
            { q: "Binary uses which digits?", options: ["0–9", "0 and 1", "1 and 2", "A–F"], answer: 1 },
            { q: "Binary 1111 is…", options: ["15", "16", "14", "11"], answer: 0 },
        ]
    },
    {
        id: "logic", title: "Algorithms & Logic", emoji: "🧩", color: "purple", level: "Medium", minutes: 4, questions: [
            { q: "Which shape means a decision in a flowchart?", options: ["Rectangle", "Oval", "Diamond", "Circle"], answer: 2 },
            { q: "An algorithm is…", options: ["A step-by-step plan", "A computer part", "A game", "A website"], answer: 0 },
            { q: "Repeating steps is called a…", options: ["Loop", "Bug", "Byte", "Pixel"], answer: 0 },
            { q: "A mistake in code is a…", options: ["Feature", "Bug", "Loop", "Variable"], answer: 1 },
            { q: "Oval in a flowchart means…", options: ["Process", "Start/End", "Decision", "Input"], answer: 1 },
        ]
    },
    {
        id: "web", title: "Web Basics", emoji: "🌐", color: "pink", level: "Hard", minutes: 4, questions: [
            { q: "Which language styles web pages?", options: ["HTML", "CSS", "Python", "SQL"], answer: 1 },
            { q: "HTML stands for…", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup", "Hyper Transfer"], answer: 0 },
            { q: "Which tag makes the biggest heading?", options: ["<h6>", "<p>", "<h1>", "<big>"], answer: 2 },
            { q: "JavaScript adds…", options: ["Colors only", "Interactivity", "Images only", "Fonts"], answer: 1 },
            { q: "Which makes a link?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 },
        ]
    },
];

export type Challenge = { id: string; title: string; emoji: string; color: Fun; type: "Daily" | "Weekly"; xp: number; prompt: string; answer: string; hint: string };
export const challenges: Challenge[] = [
    { id: "c1", title: "Binary Decoder", emoji: "🔢", color: "cyan", type: "Daily", xp: 30, prompt: "Convert binary 11001 to decimal.", answer: "25", hint: "16 + 8 + 1" },
    { id: "c2", title: "Pattern Finder", emoji: "🧠", color: "purple", type: "Daily", xp: 30, prompt: "What comes next? 2, 4, 8, 16, …", answer: "32", hint: "Each number doubles." },
    { id: "c3", title: "Bug Hunter", emoji: "🐞", color: "orange", type: "Daily", xp: 30, prompt: "console.log(3 + \"3\") prints what?", answer: "33", hint: "A number plus text joins them." },
    { id: "c4", title: "Byte Counter", emoji: "💾", color: "green", type: "Weekly", xp: 80, prompt: "How many bits are in 4 bytes?", answer: "32", hint: "1 byte = 8 bits." },
    { id: "c5", title: "Loop Master", emoji: "🔁", color: "blue", type: "Weekly", xp: 80, prompt: "A loop runs from 1 to 10 adding each number. What's the total?", answer: "55", hint: "1+2+…+10" },
    { id: "c6", title: "Logic Gate", emoji: "⚡", color: "yellow", type: "Weekly", xp: 80, prompt: "true AND false = ? (type true or false)", answer: "false", hint: "AND needs both true." },
];

export type Problem = { id: string; title: string; level: "Easy" | "Medium" | "Hard"; xp: number; desc: string; fn: string; starter: string; tests: { args: unknown[]; expected: unknown }[] };
export const problems: Problem[] = [
    { id: "p1", title: "Add Two Numbers", level: "Easy", xp: 20, desc: "Return the sum of a and b.", fn: "add", starter: "function add(a, b) {\n  // your code\n}", tests: [{ args: [2, 3], expected: 5 }, { args: [10, -4], expected: 6 }, { args: [0, 0], expected: 0 }] },
    { id: "p2", title: "Even or Odd", level: "Easy", xp: 20, desc: "Return \"even\" if n is even, otherwise \"odd\".", fn: "evenOdd", starter: "function evenOdd(n) {\n  \n}", tests: [{ args: [4], expected: "even" }, { args: [7], expected: "odd" }, { args: [0], expected: "even" }] },
    { id: "p3", title: "Biggest Number", level: "Medium", xp: 40, desc: "Return the largest number in the array.", fn: "biggest", starter: "function biggest(arr) {\n  \n}", tests: [{ args: [[1, 9, 3]], expected: 9 }, { args: [[-5, -2, -8]], expected: -2 }, { args: [[7]], expected: 7 }] },
    { id: "p4", title: "Reverse a Word", level: "Medium", xp: 40, desc: "Return the word written backwards.", fn: "reverse", starter: "function reverse(word) {\n  \n}", tests: [{ args: ["code"], expected: "edoc" }, { args: ["quest"], expected: "tseuq" }, { args: ["a"], expected: "a" }] },
    { id: "p5", title: "Count Vowels", level: "Hard", xp: 60, desc: "Return how many vowels (a, e, i, o, u) are in the text.", fn: "countVowels", starter: "function countVowels(text) {\n  \n}", tests: [{ args: ["hello"], expected: 2 }, { args: ["CodeQuest"], expected: 4 }, { args: ["xyz"], expected: 0 }] },
    { id: "p6", title: "Binary to Decimal", level: "Hard", xp: 60, desc: "Turn a binary string like \"101\" into a number.", fn: "toDecimal", starter: "function toDecimal(bin) {\n  \n}", tests: [{ args: ["101"], expected: 5 }, { args: ["1111"], expected: 15 }, { args: ["0"], expected: 0 }] },
];

export const certCourses = [
    { id: "computer-basics", title: "Computer Basics", needXp: 200 },
    { id: "binary", title: "Binary Numbers", needXp: 400 },
    { id: "logic", title: "Algorithms & Logic", needXp: 800 },
    { id: "web", title: "Web Basics", needXp: 1200 },
];
