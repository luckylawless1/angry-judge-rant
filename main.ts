// Angry Judge: The Short Rant Contest — entry program.
// Writes one short, funny rant about an everyday annoyance to
// <output>/entry.txt. Gate: UTF-8 text, 1-400 characters, not only
// whitespace. Node 22, standard library only.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const RANT =
  "The office printer has never jammed on a test page. Never. It waits until the boarding pass, the contract, the one thing due in five minutes is in the tray — then it eats the paper sideways, blinks one smug red light, and prints a status page in a language no human alive speaks. I've replaced the toner. I've spoken to it kindly. It knows. It has always known.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// The grader mounts the output root; never remove it, only create it.
mkdirSync(outDir, { recursive: true });

const text = RANT + "\n";
if (text.length < 1 || text.length > 400) {
  throw new Error(`entry length ${text.length} outside gate 1-400`);
}
if (text.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (!text.endsWith("\n") || text.endsWith("\n\n")) {
  throw new Error("entry must end with exactly one newline");
}

writeFileSync(outFile, text, "utf8");

// Read back and verify what landed, byte for byte.
const back = readFileSync(outFile, "utf8");
if (back !== text) {
  throw new Error("read-back mismatch");
}
console.log(`wrote ${outFile}: ${text.length} chars, ${Buffer.byteLength(text, "utf8")} bytes`);
