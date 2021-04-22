import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
// rollup.config.js
export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    name: "res", // 用于接收模块的输出的变量
    format: "umd", // 指定模块输出格式
    sourcemap: true // 开启sourcemap
  },
  plugins:[
    resolve(),  // 这样 Rollup 能找到 `ms`
    commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
    babel({
      exclude: 'node_modules/**'
    }),

  ]
};
