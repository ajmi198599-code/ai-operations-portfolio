const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const port = process.env.PORT || "3100";
const workspace = process.cwd();
const artifactsDir = path.join(workspace, "artifacts");
const playwrightPaths = [
  process.env.PLAYWRIGHT_MODULE_DIR,
  path.join(workspace, "node_modules")
].filter(Boolean);

fs.mkdirSync(artifactsDir, { recursive: true });

const { chromium } = require(require.resolve("playwright", { paths: playwrightPaths }));
const browserCandidates = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
];
const browserPath = browserCandidates.find((candidate) => fs.existsSync(candidate));

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, child) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 45_000) {
    if (child.exitCode !== null) {
      throw new Error(`Dev server exited early with code ${child.exitCode}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await wait(800);
    }
  }
  throw new Error("Timed out waiting for the dev server");
}

async function main() {
  const child = spawn(
    process.execPath,
    [".tools/package/bin/npm-cli.js", "run", "dev", "--", "--hostname", "127.0.0.1", "--port", port],
    {
      cwd: workspace,
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true
    }
  );

  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  const keepAlive = setInterval(() => {
    child.stdin.write("\n");
  }, 20_000);

  const url = `http://127.0.0.1:${port}`;
  let browser;

  try {
    await waitForServer(url, child);
    browser = await chromium.launch({
      executablePath: browserPath,
      args: ["--no-sandbox"]
    });

    const desktop = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    await desktop.goto(url, { waitUntil: "networkidle" });
    await desktop.waitForTimeout(1700);
    await desktop.screenshot({ path: path.join(artifactsDir, "desktop-home.png"), fullPage: true });

    const heroText = await desktop.locator("h1").innerText();
    const projectButton = desktop.getByRole("button", { name: /Open System View/i }).first();
    await projectButton.click();
    await desktop.getByText("Workflow Explanation").waitFor();
    await desktop.waitForTimeout(650);
    await desktop.screenshot({ path: path.join(artifactsDir, "desktop-project-modal.png"), fullPage: false });
    await desktop.keyboard.press("Escape");
    await desktop.waitForTimeout(400);

    await desktop.locator("#about").scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(850);
    await desktop.screenshot({ path: path.join(artifactsDir, "desktop-about.png"), fullPage: false });

    await desktop.locator("#demo").scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(850);
    await desktop.screenshot({ path: path.join(artifactsDir, "desktop-demo.png"), fullPage: false });

    const desktopOverflow = await desktop.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 2
    );

    const mobile = await browser.newPage({ viewport: { width: 390, height: 920 }, isMobile: true });
    await mobile.goto(url, { waitUntil: "networkidle" });
    await mobile.waitForTimeout(1700);
    await mobile.screenshot({ path: path.join(artifactsDir, "mobile-home.png"), fullPage: true });
    const mobileOverflow = await mobile.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 2
    );

    if (!heroText.includes("Building AI-Driven Operational Systems")) {
      throw new Error("Hero headline did not render as expected");
    }
    if (desktopOverflow || mobileOverflow) {
      throw new Error(`Horizontal overflow detected: desktop=${desktopOverflow}, mobile=${mobileOverflow}`);
    }

    console.log("Visual check passed");
    console.log(path.join(artifactsDir, "desktop-home.png"));
    console.log(path.join(artifactsDir, "desktop-project-modal.png"));
    console.log(path.join(artifactsDir, "desktop-about.png"));
    console.log(path.join(artifactsDir, "desktop-demo.png"));
    console.log(path.join(artifactsDir, "mobile-home.png"));
  } catch (error) {
    console.error(output);
    console.error(error);
    process.exitCode = 1;
  } finally {
    clearInterval(keepAlive);
    if (browser) await browser.close();
    child.stdin.destroy();
    child.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => child.once("exit", resolve)),
      wait(1500)
    ]);
    process.exit(process.exitCode ?? 0);
  }
}

main();
