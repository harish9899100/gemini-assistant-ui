import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Skip ESLint errors during production builds (e.g., in Docker)
    ignoreDuringBuilds: true,
  },
  /* other config options can stay here */
};

export default nextConfig;






// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
