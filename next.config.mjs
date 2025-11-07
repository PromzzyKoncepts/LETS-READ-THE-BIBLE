/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "socket.io-client": "socket.io-client",
    });
    return config;
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },

  images: {
    domains: [
      "res.cloudinary.com",
      "d1ent1.loveworldcloud.com",
      "lovetoons.org",
      "lovetoons.tv",
    ],
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/:path*", // Match all routes
        destination: "https://lovetoons.org/lbrf", // Fixed redirect target
        permanent: false, // 307 Temporary redirect
      },
    ];
  },
};

export default nextConfig;
