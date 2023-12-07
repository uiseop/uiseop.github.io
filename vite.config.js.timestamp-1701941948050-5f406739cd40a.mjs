// vite.config.js
import { defineConfig } from "file:///S:/react-init/node_modules/vite/dist/node/index.js";
import react from "file:///S:/react-init/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { NodeGlobalsPolyfillPlugin } from "file:///S:/react-init/node_modules/@esbuild-plugins/node-globals-polyfill/dist/index.js";
import jotaiDebugLabel from "file:///S:/react-init/node_modules/jotai/esm/babel/plugin-debug-label.mjs";
import jotaiReactRefresh from "file:///S:/react-init/node_modules/jotai/esm/babel/plugin-react-refresh.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react({
      babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] }
    }),
    {
      name: "markdown-loader",
      transform(code, id) {
        if (id.slice(-3) === ".md") {
          return `export default ${JSON.stringify(code)};`;
        }
      }
    }
  ],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@static", replacement: "/src/static" }
    ]
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis"
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJTOlxcXFxyZWFjdC1pbml0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJTOlxcXFxyZWFjdC1pbml0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9TOi9yZWFjdC1pbml0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IE5vZGVHbG9iYWxzUG9seWZpbGxQbHVnaW4gfSBmcm9tICdAZXNidWlsZC1wbHVnaW5zL25vZGUtZ2xvYmFscy1wb2x5ZmlsbCc7XHJcbmltcG9ydCBqb3RhaURlYnVnTGFiZWwgZnJvbSAnam90YWkvYmFiZWwvcGx1Z2luLWRlYnVnLWxhYmVsJztcclxuaW1wb3J0IGpvdGFpUmVhY3RSZWZyZXNoIGZyb20gJ2pvdGFpL2JhYmVsL3BsdWdpbi1yZWFjdC1yZWZyZXNoJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0cGx1Z2luczogW1xyXG5cdFx0cmVhY3Qoe1xyXG5cdFx0XHRiYWJlbDogeyBwbHVnaW5zOiBbam90YWlEZWJ1Z0xhYmVsLCBqb3RhaVJlYWN0UmVmcmVzaF0gfSxcclxuXHRcdH0pLFxyXG5cdFx0e1xyXG5cdFx0XHRuYW1lOiAnbWFya2Rvd24tbG9hZGVyJyxcclxuXHRcdFx0dHJhbnNmb3JtKGNvZGUsIGlkKSB7XHJcblx0XHRcdFx0aWYgKGlkLnNsaWNlKC0zKSA9PT0gJy5tZCcpIHtcclxuXHRcdFx0XHRcdC8vIEZvciAubWQgZmlsZXMsIGdldCB0aGUgcmF3IGNvbnRlbnRcclxuXHRcdFx0XHRcdHJldHVybiBgZXhwb3J0IGRlZmF1bHQgJHtKU09OLnN0cmluZ2lmeShjb2RlKX07YDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdF0sXHJcblx0cmVzb2x2ZToge1xyXG5cdFx0YWxpYXM6IFtcclxuXHRcdFx0eyBmaW5kOiAnQGNvbXBvbmVudHMnLCByZXBsYWNlbWVudDogJy9zcmMvY29tcG9uZW50cycgfSxcclxuXHRcdFx0eyBmaW5kOiAnQGhvb2tzJywgcmVwbGFjZW1lbnQ6ICcvc3JjL2hvb2tzJyB9LFxyXG5cdFx0XHR7IGZpbmQ6ICdAcGFnZXMnLCByZXBsYWNlbWVudDogJy9zcmMvcGFnZXMnIH0sXHJcblx0XHRcdHsgZmluZDogJ0B1dGlscycsIHJlcGxhY2VtZW50OiAnL3NyYy91dGlscycgfSxcclxuXHRcdFx0eyBmaW5kOiAnQHN0YXRpYycsIHJlcGxhY2VtZW50OiAnL3NyYy9zdGF0aWMnIH0sXHJcblx0XHRdLFxyXG5cdH0sXHJcblx0b3B0aW1pemVEZXBzOiB7XHJcblx0XHRlc2J1aWxkT3B0aW9uczoge1xyXG5cdFx0XHQvLyBOb2RlLmpzIGdsb2JhbCB0byBicm93c2VyIGdsb2JhbFRoaXNcclxuXHRcdFx0ZGVmaW5lOiB7XHJcblx0XHRcdFx0Z2xvYmFsOiAnZ2xvYmFsVGhpcycsXHJcblx0XHRcdH0sXHJcblx0XHRcdC8vIEVuYWJsZSBlc2J1aWxkIHBvbHlmaWxsIHBsdWdpbnNcclxuXHRcdFx0cGx1Z2luczogW1xyXG5cdFx0XHRcdE5vZGVHbG9iYWxzUG9seWZpbGxQbHVnaW4oe1xyXG5cdFx0XHRcdFx0YnVmZmVyOiB0cnVlLFxyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHRdLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2TixTQUFTLG9CQUFvQjtBQUMxUCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxpQ0FBaUM7QUFDMUMsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyx1QkFBdUI7QUFHOUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLE1BQ0wsT0FBTyxFQUFFLFNBQVMsQ0FBQyxpQkFBaUIsaUJBQWlCLEVBQUU7QUFBQSxJQUN4RCxDQUFDO0FBQUEsSUFDRDtBQUFBLE1BQ0MsTUFBTTtBQUFBLE1BQ04sVUFBVSxNQUFNLElBQUk7QUFDbkIsWUFBSSxHQUFHLE1BQU0sRUFBRSxNQUFNLE9BQU87QUFFM0IsaUJBQU8sa0JBQWtCLEtBQUssVUFBVSxJQUFJLENBQUM7QUFBQSxRQUM5QztBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sRUFBRSxNQUFNLGVBQWUsYUFBYSxrQkFBa0I7QUFBQSxNQUN0RCxFQUFFLE1BQU0sVUFBVSxhQUFhLGFBQWE7QUFBQSxNQUM1QyxFQUFFLE1BQU0sVUFBVSxhQUFhLGFBQWE7QUFBQSxNQUM1QyxFQUFFLE1BQU0sVUFBVSxhQUFhLGFBQWE7QUFBQSxNQUM1QyxFQUFFLE1BQU0sV0FBVyxhQUFhLGNBQWM7QUFBQSxJQUMvQztBQUFBLEVBQ0Q7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNiLGdCQUFnQjtBQUFBO0FBQUEsTUFFZixRQUFRO0FBQUEsUUFDUCxRQUFRO0FBQUEsTUFDVDtBQUFBO0FBQUEsTUFFQSxTQUFTO0FBQUEsUUFDUiwwQkFBMEI7QUFBQSxVQUN6QixRQUFRO0FBQUEsUUFDVCxDQUFDO0FBQUEsTUFDRjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
