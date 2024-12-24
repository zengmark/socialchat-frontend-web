import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue'
import {ArcoResolver} from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    })
  ],
  server: {
    port: 3001,// 端口号
  }
})
