const EXPRESS_ORIGIN = process.env.EXPRESS_ORIGIN || 'http://127.0.0.1:5000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      // Admin API is served by Express; proxying keeps the session cookie same-origin.
      {
        source: '/api/admin/:path*',
        destination: `${EXPRESS_ORIGIN}/api/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
