import { execSync } from "node:child_process";


/**
 * Führt einen Bash-Befehl aus und gibt stdout/stderr als String zurück.
 * @param cmd {string} - Bash-Befehl
 * @returns {{ stdout: string, stderr: string, code: number }}
 */
export const bash = (cmd) => {
  console.log(`$ ${cmd}`);

  try {
    const stdout = execSync(cmd, {
      shell: "/usr/bin/env bash",
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { stdout, stderr: "", code: 0 };
  } catch (err) {
    return {
      output: err.stdout?.toString() ?? "",
      errorText: err.stderr?.toString() ?? err.message,
      errorCode: err.status ?? 1,
    };
  }
};
