const fs = require('fs')
const path = require('path')
const cwd = process.cwd()

const browserJsFilePath = 'dist/mqfunctions.js'
const browserJsFileAbsPath = path.resolve(cwd, browserJsFilePath)
const fixtureFileAbsPath = path.resolve(cwd, 'test/fixtures/js/mqfunctions.js')

if (!fs.existsSync(browserJsFileAbsPath)) {
  console.log(`Not found ${browserJsFileAbsPath}`)
  process.exit(1)
}

fs.copyFileSync(browserJsFileAbsPath, fixtureFileAbsPath)

console.log('E2E test is ready')
