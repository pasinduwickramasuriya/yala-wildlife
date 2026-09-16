/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', '@tabler/icons-react', 'react-icons', 'date-fns'],
    staleTimes: {
      dynamic: 30,
      static: 1800,
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [40, 50, 60, 65, 75],
    minimumCacheTTL: 31536000,
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/mobile',
        destination: '/',
        permanent: true,
      },
      {
        source: '/mobile/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

