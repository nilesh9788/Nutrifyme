// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   webpack: (config, { isServer }) => {
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       'class-variance-authority': false,
//     }
//     return config
//   },
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack (default for Next.js 16)
  turbopack: {},

  // Allow TypeScript builds to continue even with minor errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable image optimization (useful for static exports or Vercel previews)
  images: {
    unoptimized: true,
  },

  // Keep minimal Webpack fallback only if certain packages require it
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'class-variance-authority': false,
    };
    return config;
  },
};

export default nextConfig;

