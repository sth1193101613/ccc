import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { autoFixContext } from 'react-activation'
import { resolve } from 'path';

const postCssPxToRem = require("postcss-pxtorem")
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
autoFixContext(
  [require('react/jsx-runtime'), 'jsx', 'jsxs', 'jsxDEV'],
  [require('react/jsx-dev-runtime'), 'jsx', 'jsxs', 'jsxDEV']
)
export default defineConfig({
  build: {
    rollupOptions: {
      input: []
    }
  },
  optimizeDeps: {
    entries: [],
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
    // alias: {
    //   "@": path.resolve(__dirname, "src"),
    // }
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },

    ],
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    },
  },
  server: {
    port: 3002,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api': {
        target: 'https://www.kktlp.love/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    }
  },

})
