// import json from 'rollup-plugin-json'
// import babel from 'rollup-plugin-babel'
// import resolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'BoardSDK',
      file: pkg.browser,
      format: 'umd',
    },
    // plugins: [
    //   resolve({
    //     jsnext: true,
    //     main: true,
    //     preferBuiltins: false,
    //   }), // so Rollup can find `ms`
    //   babel({
    //     exclude: 'node_modules/**', // compile our source code only
    //   }),
    //   commonjs(), // so Rollup can convert `ms` to an ES module
    //   json(),
    // ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    // plugins: [resolve({
    //     jsnext: true,
    //     main: true,
    //   }),
    //   babel({
    //     exclude: 'node_modules/**',
    //   }),
    //   commonjs(),
    //   json(),
    // ]
  },
]
