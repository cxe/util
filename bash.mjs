import { spawnSync } from "node:child_process";


/**
 * Führt einen Bash-Befehl aus und gibt stdout/stderr als String zurück.
 * @param cmd {string} - Bash-Befehl
 * @returns {{ stdout: string, stderr: string, code: number }}
 */
export const bash = (...parts) => {
  const input = parts.join(' ');
  const { stdout, stderr, status } = spawnSync("bash", ["-c", input], {
    encoding: "utf8",
    cwd: process.cwd(),
    env: { ...process.env, LC_ALL: "C" },
  });

  return {
    input,
    output: stdout.trimEnd(),
    errorText: stderr.trimEnd(),
    errorCode: status ?? 0,
  };
};
