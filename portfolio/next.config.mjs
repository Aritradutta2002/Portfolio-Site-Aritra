/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  images: {
    unoptimized: true,
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
        has: [{ type: 'host', value: 'aritrodutta.tech' }],
        destination: 'https://www.aritrodutta.tech/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
