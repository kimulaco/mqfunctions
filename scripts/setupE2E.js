const fs = require('fs')
const path = require('path')
const cwd = process.cwd()

const browserJsFilePath = 'dist/mqfunctions.js'
const browserJsFileAbsPath = path.resolve(cwd, browserJsFilePath)

if (!fs.existsSync(browserJsFileAbsPath)) {
  console.log(`Not found ${browserJsFilePath}`)
  process.exit(1)
}

fs.copyFileSync(
  browserJsFileAbsPath,
  path.resolve(cwd, 'test/fixtures/js/mqfunctions.js'),
)

console.log('E2E test is ready')
