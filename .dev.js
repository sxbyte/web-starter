import { spawn } from 'child_process'
import * as fs from 'fs/promises'

const configFile = './tsconfig.server.json'
const config = JSON.parse(
  await fs.readFile(configFile, 'utf-8')
    .then((v) => v.replace(/\/\*[\s\S]*?\*\/|\/\/.*?\n/g, ''))
)
const tsc = spawn('tsc', ['-w', '-p', configFile], { stdio: 'pipe' })
let nodeProcess = null

tsc.stdout.on('data', (data) => {
  const output = data.toString()
  if (nodeProcess) {
    nodeProcess.kill('SIGINT')
  }
  if (output.includes('Found 0 errors. Watching for file changes.')) {
    console.clear()
    nodeProcess = spawn('node', [config.compilerOptions.outDir], { stdio: 'inherit' })
  } else {
    console.error(output)
  }
})
