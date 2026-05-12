import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import process from "node:process";

const port = process.env.PORT ?? "3000";
const log = createWriteStream(".next-dev.log", { flags: "a" });
const errorLog = createWriteStream(".next-dev.err", { flags: "a" });

const child = spawn(
  process.execPath,
  [".tools/package/bin/npm-cli.js", "run", "dev", "--", "--hostname", "127.0.0.1", "--port", port],
  {
    cwd: process.cwd(),
    stdio: ["pipe", "pipe", "pipe"],
    windowsHide: true
  }
);

child.stdout.pipe(log);
child.stderr.pipe(errorLog);

child.on("exit", (code, signal) => {
  log.write(`\nDev server exited: code=${code ?? ""} signal=${signal ?? ""}\n`);
  process.exit(code ?? 0);
});

process.on("SIGTERM", () => child.kill("SIGTERM"));
process.on("SIGINT", () => child.kill("SIGINT"));

setInterval(() => {
  child.stdin.write("\n");
}, 30_000);
