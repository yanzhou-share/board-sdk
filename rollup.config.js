import json from 'rollup-plugin-json'
// import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default [
  // // browser-friendly UMD build
  // {
  //   input: 'src/index.js',
  //   output: {
  //     name: 'boardSdk',
  //     file: pkg.browser,
  //     format: 'umd',
  //   },
  //   plugins: [
  //     resolve({
  //       jsnext: true,
  //       main: true,
  //     }), // so Rollup can find `ms`
  //     babel({
  //       exclude: 'node_modules/**', // compile our source code only
  //     }),
  //     commonjs(), // so Rollup can convert `ms` to an ES module
  //     json(),
  //   ],
  // },

  // browser-friendly IIFE build
  {
    input: 'src/index.js',
    output: {
      name: 'boardSdk',
      file: pkg.browser,
      format: 'iife',
    },
    plugins: [
      resolve({
        jsnext: true,
        main: true,
      }), // so Rollup can find `ms`
      //   babel({
      //     exclude: 'node_modules/**', // compile our source code only
      //   }),
      commonjs(), // so Rollup can convert `ms` to an ES module
      json(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    external: ['fabric'],
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