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
  // ✅ Enable Turbopack (Next.js 16 default)
  turbopack: {},

  // ✅ Safe TypeScript option (still valid)
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Keep images unoptimized if you’re using custom image handling
  images: {
    unoptimized: true,
  },

  // ✅ Keep your fallback config (still works fine)
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'class-variance-authority': false,
    };
    return config;
  },
  
};

export default nextConfig;

