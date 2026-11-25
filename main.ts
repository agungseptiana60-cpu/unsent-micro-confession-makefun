// Unsent: The Micro-Confession Sprint — one two-part micro-confession.
// The program writes exactly one text to /output/entry.txt: a To: line
// naming who it was meant for, then the unsent message itself, one line
// written exactly as it was typed, with no explanation after it.
// The confession below is specific and honest, and its two parts need
// each other: only the little sister was grounded for the vase, so
// swapping the addressee would break the message. The reason it stayed
// in drafts is felt in the words — eleven years of carried silence —
// never stated outright. No joke, no greeting, no motivational line.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const CONFESSION =
  "To: my little sister\n" +
  "I broke Mom's blue vase the day you got grounded for it, " +
  "and I have carried that silence for eleven years.";

const OUTPUT_PATH = "/output/entry.txt";

function validate(text: string): void {
  if (text.length < 1 || text.length > 260) {
    throw new Error(`entry must be 1-260 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  if (!lines[0].startsWith("To: ")) {
    throw new Error("first line must be a To: line");
  }
  if (lines[1].length > 200) {
    throw new Error(`message line must be at most 200 characters, got ${lines[1].length}`);
  }
  if (lines[1].trim().length === 0) {
    throw new Error("message line must not be empty");
  }
  // No explanation after the message, and no trailing blank line:
  // the file holds exactly the two parts, nothing else.
  if (text !== text.trimEnd() || lines[1] !== lines[1].trimEnd()) {
    throw new Error("entry must end with the message itself, no trailing whitespace");
  }
}

validate(CONFESSION);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, CONFESSION, "utf8");
console.log(`wrote ${CONFESSION.length} characters to ${OUTPUT_PATH}`);
