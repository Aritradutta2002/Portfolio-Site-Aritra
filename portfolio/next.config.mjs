/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  images: {
    unoptimized: true,
  },
  async headers() {
    const cspReportOnly = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://api.openai.com https://vitals.vercel-insights.com",
      "frame-ancestors 'self'",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'aritradutta.tech' }],
        destination: 'https://www.aritrodutta.tech/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.aritradutta.tech' }],
        destination: 'https://www.aritrodutta.tech/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'aritradutta.tech' }],
        destination: 'https://www.aritrodutta.tech/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
