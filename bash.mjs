import { execSync } from "node:child_process";


/**
 * Führt einen Bash-Befehl aus und gibt stdout/stderr als String zurück.
 * @param cmd {string} - Bash-Befehl
 * @returns {{ stdout: string, stderr: string, code: number }}
 */
export const bash = (cmd) => {
  try {
    const output = execSync(cmd, {
      shell: "bash",
      encoding: "utf8",
      stdio: "pipe",
      cwd: process.cwd(),
    });
    return {
        output,
        errorText: "",
        errorCode: 0
    };
  } catch (err) {
    return {
      output: err.stdout?.toString() ?? "",
      errorText: err.stderr?.toString() ?? err.message,
      errorCode: err.status ?? 1,
    };
  }
};
