import { $ } from 'execa';

// Roughly based on https://github.com/tiaanduplessis/kill-port/blob/master/index.js
export default async function killPort(port: number): Promise<void> {
  if (process.platform === 'win32') {
    const { stdout } = await $`netstat -nao`;
    if (!stdout) {
      return;
    }

    const lines = stdout.split('\n');
    // The second white-space delimited column of netstat output is the local port,
    // which is the only port we care about.
    // The regex here will match only the local port column of the output
    const lineWithLocalPortRegEx = new RegExp(`^ *TCP *[^ ]*:${port}`, 'gm');
    const linesWithLocalPort = lines.filter((line) => line.match(lineWithLocalPortRegEx));

    const pids = linesWithLocalPort.reduce((acc: string[], line) => {
      const match = line.match(/(\d*)\w*(\n|$)/gm);
      return match && match[0] && !acc.includes(match[0]) ? acc.concat(match[0]) : acc;
    }, []);

    await $`TaskKill /F /PID ${pids.join(' /PID ').split(' ')}`;
    return;
  }

  const { stdout } = await $`lsof -i -P`;
  if (!stdout) {
    return;
  }
  const lines = stdout.split('\n');
  const existProccess = lines.filter((line) => line.match(new RegExp(`:*${port}`))).length > 0;
  if (!existProccess) {
    return;
  }
  await $`lsof -i tcp:${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`;
}
