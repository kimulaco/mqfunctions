import pluginNodeResolve from '@rollup/plugin-node-resolve'
import pluginCommonjs from '@rollup/plugin-commonjs'
import pluginTypescript from '@rollup/plugin-typescript'
import { babel as pluginBabel } from '@rollup/plugin-babel'
import pluginTerser from '@rollup/plugin-terser'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'
import path from 'path'
import fs from 'fs'

const dirname = path.dirname(new URL(import.meta.url).pathname)
const pkg = JSON.parse(fs.readFileSync('./package.json'))
const moduleName = upperFirst(camelCase(pkg.name))

const banner = `/*!
  ${moduleName}.js v${pkg.version}
  ${pkg.homepage}
  Released under the ${pkg.license} License.
*/`

const babelrcPath = path.resolve(dirname, '.babelrc.cjs')

export default [
  {
    input: 'src/mqfunctions.ts',
    output: [
      {
        name: moduleName,
        file: pkg.browser,
        format: 'iife',
        sourcemap: 'inline',
        banner,
      },
      {
        name: moduleName,
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'iife',
        banner,
        plugins: [pluginTerser()],
      },
    ],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: babelrcPath,
      }),
      pluginNodeResolve({
        browser: true,
      }),
    ],
  },
  {
    input: `src/index.ts`,
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: 'inline',
        banner,
        exports: 'named',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginTypescript({
        compilerOptions: {
          declaration: true,
          outDir: path.dirname(pkg.browser),
        },
      }),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: babelrcPath,
      }),
    ],
  },
  {
    input: 'src/mqfunctions.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: 'inline',
        banner,
        exports: 'default',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginTypescript(),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: babelrcPath,
      }),
    ],
  },
]
