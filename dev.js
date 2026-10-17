import { createServer } from 'vite';

const server = await createServer({
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      },
      '/crop_samples': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    holdUntilCrawlEnd: false,
    noDiscovery: true
  }
});

await server.listen();
server.printUrls();
