// rollup.config.js
import babel from 'rollup-plugin-babel';
import noderesolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';
import rollup from 'rollup';

const isProduction = process.env.NODE_ENV === 'production';

const plugins = isProduction ? [uglify()] : [];

function getOption() {
  return {
    input: './src/index.ts', // 入口文件
    output: [
      {
        file: './lib/bundle.cjs.js', // 打包后的存放文件
        format: 'cjs', // 输出格式  "amd", "cjs", "system", "es", "iife", "umd".
        name: 'bundleName', // 如果 iife, umd 需要指定一个全局变量
        sourcemap: true, // 生成 bundle.map.js 文件，方便调试
      },
      {
        file: './lib/bundle.es.js', // 打包后的存放文件
        format: 'es', // 输出格式  "amd", "cjs", "system", "es", "iife", "umd".
        name: 'bundleName', // 如果 iife, umd 需要指定一个全局变量
        sourcemap: true, // 生成 bundle.map.js 文件，方便调试
      },
      {
        file: './lib/bundle.umd.js', // 打包后的存放文件
        format: 'umd', // 输出格式  "amd", "cjs", "system", "es", "iife", "umd".
        name: 'bundleName', // 如果 iife, umd 需要指定一个全局变量
        sourcemap: true, // 生成 bundle.map.js 文件，方便调试
      },
      {
        file: './lib/bundle.esm.js', // 打包后的存放文件
        format: 'esm', // 输出格式  "amd", "cjs", "system", "es", "iife", "umd".
        name: 'bundleName', // 如果 iife, umd 需要指定一个全局变量
        sourcemap: true, // 生成 bundle.map.js 文件，方便调试
      },
    ],
    watch: {
      include: 'src/**',
    },
    plugins: [
      typescript(),
      noderesolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      terser(),
      ...plugins,
    ],
  };
}

if (process.env.NODE_ENV === 'development') {
  const watcher = rollup.watch(getOption());
  console.log('rollup is watching for file change...');

  watcher.on('event', (event) => {
    switch (event.code) {
      case 'START':
        console.log('rollup is rebuilding...');
        break;
      case 'ERROR':
      case 'FATAL':
        console.log('error in rebuilding.');
        break;
      case 'END':
        console.log('rebuild done.');
    }
  });
}

export default getOption();
