import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
    app.use(
        '/chat',
        createProxyMiddleware({
            target: 'https://dera-backend.vercel.app',
            changeOrigin: true,
        })
    );
}