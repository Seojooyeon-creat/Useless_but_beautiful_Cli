const RESET = "\u001b[0m";
const BOLD = "\u001b[1m";

const colors = {
  cyan: "\u001b[36m",
  blue: "\u001b[34m",
  magenta: "\u001b[35m",
  yellow: "\u001b[33m",
  green: "\u001b[32m",
  gray: "\u001b[90m",
  red: "\u001b[31m"
};

const quotes = [
  "Ship less fear, more wonder.",
  "Tiny scripts, huge mood.",
  "A blinking cursor is a small sunrise.",
  "Some tools are made to feel, not finish.",
  "The terminal remembers every brave keystroke."
];

function printHelp() {
  console.log(`${BOLD}vibe${RESET} - useless but beautiful terminal moments\n`);
  console.log("Usage:");
  console.log("  vibe rain [seconds]");
  console.log("  vibe breathe [cycles]");
  console.log("  vibe quote");
  console.log("  vibe sunset [seconds]");
  console.log("  vibe noise [seconds]");
  console.log("  vibe clock [seconds]");
  console.log("  vibe stars [seconds]");
  console.log("  vibe train [seconds]");
  console.log("  vibe typewriter [text]");
}

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rain(seconds) {
  const duration = parsePositiveInt(seconds, 8) * 1000;
  const width = process.stdout.columns || 80;
  const start = Date.now();
  process.stdout.write("\u001b[?25l");

  while (Date.now() - start < duration) {
    let line = "";
    for (let i = 0; i < width; i += 1) {
      const roll = Math.random();
      if (roll > 0.96) line += `${colors.cyan}|${RESET}`;
      else if (roll > 0.94) line += `${colors.blue}.${RESET}`;
      else if (roll > 0.93) line += `${colors.gray},${RESET}`;
      else line += " ";
    }

    process.stdout.write(`\r${line}`);
    await sleep(70);
  }

  process.stdout.write(`\r${" ".repeat(width)}\r`);
  process.stdout.write("\u001b[?25h");
  console.log(`${colors.blue}rain has ended.${RESET}`);
}

async function breathe(cycles) {
  const loop = parsePositiveInt(cycles, 4);
  const phases = [
    { label: "inhale", color: colors.cyan, ms: 1400 },
    { label: "hold", color: colors.magenta, ms: 1000 },
    { label: "exhale", color: colors.green, ms: 1800 }
  ];

  for (let i = 0; i < loop; i += 1) {
    for (const phase of phases) {
      process.stdout.write(`\r${phase.color}${phase.label.padEnd(10, " ")}${RESET}`);
      await sleep(phase.ms);
    }
  }

  process.stdout.write("\r            \r");
  console.log(`${colors.yellow}done. your shell is calmer now.${RESET}`);
}

function quote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  console.log(`${colors.magenta}"${q}"${RESET}`);
}

async function sunset(seconds) {
  const duration = parsePositiveInt(seconds, 10) * 1000;
  const width = Math.max(24, Math.min(process.stdout.columns || 80, 80));
  const start = Date.now();
  const palette = [colors.blue, colors.magenta, colors.red, colors.yellow];
  let tick = 0;

  process.stdout.write("\u001b[?25l");
  while (Date.now() - start < duration) {
    const line = [];
    for (let i = 0; i < width; i += 1) {
      const ratio = i / Math.max(width - 1, 1);
      const colorIdx = Math.min(palette.length - 1, Math.floor(ratio * palette.length));
      const wave = Math.sin((i + tick) / 4);
      const glyph = wave > 0.5 ? "~" : wave > -0.2 ? "-" : ".";
      line.push(`${palette[colorIdx]}${glyph}${RESET}`);
    }
    process.stdout.write(`\r${line.join("")}`);
    tick += 1;
    await sleep(80);
  }

  process.stdout.write(`\r${" ".repeat(width)}\r`);
  process.stdout.write("\u001b[?25h");
  console.log(`${colors.yellow}sunset faded out.${RESET}`);
}

async function noise(seconds) {
  const duration = parsePositiveInt(seconds, 6) * 1000;
  const width = Math.max(20, Math.min(process.stdout.columns || 80, 80));
  const chars = " .,:;*+=x#%@";
  const start = Date.now();
  process.stdout.write("\u001b[?25l");

  while (Date.now() - start < duration) {
    let line = "";
    for (let i = 0; i < width; i += 1) {
      const idx = Math.floor(Math.random() * chars.length);
      const ch = chars[idx];
      if (idx > chars.length - 3) line += `${colors.cyan}${ch}${RESET}`;
      else if (idx > chars.length - 5) line += `${colors.magenta}${ch}${RESET}`;
      else line += `${colors.gray}${ch}${RESET}`;
    }
    process.stdout.write(`\r${line}`);
    await sleep(65);
  }

  process.stdout.write(`\r${" ".repeat(width)}\r`);
  process.stdout.write("\u001b[?25h");
  console.log(`${colors.gray}static cleared.${RESET}`);
}

async function clock(seconds) {
  const duration = parsePositiveInt(seconds, 12) * 1000;
  const start = Date.now();

  while (Date.now() - start < duration) {
    const now = new Date();
    const value = now.toLocaleTimeString("en-US", { hour12: false });
    process.stdout.write(`\r${colors.green}${BOLD}${value}${RESET} ${colors.gray}local time${RESET}`);
    await sleep(250);
  }

  process.stdout.write("\r                      \r");
  console.log(`${colors.green}time check complete.${RESET}`);
}

async function stars(seconds) {
  const duration = parsePositiveInt(seconds, 8) * 1000;
  const width = Math.max(24, Math.min(process.stdout.columns || 80, 80));
  const chars = [" ", " ", " ", ".", "+", "*", "✦"];
  const start = Date.now();
  process.stdout.write("\u001b[?25l");

  while (Date.now() - start < duration) {
    let line = "";
    for (let i = 0; i < width; i += 1) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      if (ch === "✦") line += `${colors.yellow}${ch}${RESET}`;
      else if (ch === "*") line += `${colors.cyan}${ch}${RESET}`;
      else line += `${colors.gray}${ch}${RESET}`;
    }
    process.stdout.write(`\r${line}`);
    await sleep(90);
  }

  process.stdout.write(`\r${" ".repeat(width)}\r`);
  process.stdout.write("\u001b[?25h");
  console.log(`${colors.blue}night sky closed.${RESET}`);
}

async function train(seconds) {
  const duration = parsePositiveInt(seconds, 10) * 1000;
  const width = Math.max(30, Math.min(process.stdout.columns || 80, 80));
  const body = "<==[__]-[__]-[__]";
  const bodyLen = body.length;
  const total = width + bodyLen;
  const start = Date.now();
  let pos = -bodyLen;

  process.stdout.write("\u001b[?25l");
  while (Date.now() - start < duration) {
    let line = "";
    for (let i = 0; i < width; i += 1) {
      const src = i - pos;
      line += src >= 0 && src < bodyLen ? body[src] : " ";
    }
    process.stdout.write(`\r${colors.gray}${"-".repeat(width)}${RESET}`);
    process.stdout.write(`\r${colors.cyan}${line}${RESET}`);
    pos += 1;
    if (pos > width) pos = -bodyLen;
    await sleep(120);
  }

  process.stdout.write(`\r${" ".repeat(width)}\r`);
  process.stdout.write("\u001b[?25h");
  console.log(`${colors.green}last train departed.${RESET}`);
}

async function typewriter(inputText) {
  const text = (inputText || "The terminal writes slowly, like midnight rain.").trim();
  process.stdout.write("\n");
  for (let i = 0; i < text.length; i += 1) {
    process.stdout.write(`${colors.cyan}${text[i]}${RESET}`);
    await sleep(45 + Math.floor(Math.random() * 75));
  }
  process.stdout.write("\n");
}

export async function run(args) {
  const [command, value, ...rest] = args;

  if (!command || command === "help" || command === "--help") {
    printHelp();
    return;
  }

  if (command === "rain") {
    await rain(value);
    return;
  }

  if (command === "breathe") {
    await breathe(value);
    return;
  }

  if (command === "quote") {
    quote();
    return;
  }

  if (command === "sunset") {
    await sunset(value);
    return;
  }

  if (command === "noise") {
    await noise(value);
    return;
  }

  if (command === "clock") {
    await clock(value);
    return;
  }

  if (command === "stars") {
    await stars(value);
    return;
  }

  if (command === "train") {
    await train(value);
    return;
  }

  if (command === "typewriter") {
    const text = [value, ...rest].filter(Boolean).join(" ");
    await typewriter(text);
    return;
  }

  console.log(`${colors.yellow}Unknown command:${RESET} ${command}`);
  printHelp();
}
