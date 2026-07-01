const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const logDir = path.join(__dirname, '..', 'reports', 'logs');
const backupDir = path.join(__dirname, '..', 'reports', 'backup');
fs.mkdirSync(logDir, { recursive: true });
fs.mkdirSync(backupDir, { recursive: true });

function rotateLogs() {
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const files = fs.readdirSync(logDir).filter((file) => file.endsWith('.log'));

  files.forEach((file) => {
    const fullPath = path.join(logDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.mtimeMs < cutoff) {
      const archivedName = `${file.replace('.log', '')}-${timestamp}.log`;
      fs.renameSync(fullPath, path.join(backupDir, archivedName));
    }
  });
}

rotateLogs();

const logFile = path.join(logDir, `execution-${timestamp}.log`);
const output = fs.createWriteStream(logFile, { flags: 'a' });

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const spec = process.argv[2] || 'cypress/e2e/login.cy.js';
const fullCommand = `${command} cypress run --e2e --browser electron --spec ${spec}`;

const child = spawn(fullCommand, {
  cwd: path.join(__dirname, '..'),
  shell: true,
  stdio: ['ignore', 'pipe', 'pipe'],
});

child.stdout.on('data', (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);
  output.write(text);
});

child.stderr.on('data', (chunk) => {
  const text = chunk.toString();
  process.stderr.write(text);
  output.write(text);
});

child.on('close', (code) => {
  const summary = `[${new Date().toISOString()}] Exit code: ${code}\n`;
  output.write(summary);
  output.end();

  if (code === 0) {
    console.log(`\nExecução concluída com sucesso. Log salvo em ${logFile}`);
  } else {
    console.error(`\nExecução encerrada com falhas. Consulte ${logFile}`);
  }

  process.exit(code || 0);
});
