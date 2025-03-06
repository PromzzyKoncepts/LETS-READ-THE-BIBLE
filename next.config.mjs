/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["storage.googleapis.com"], // Add the allowed domain(s) here
    },
    api: {
      bodyParser: {
        sizeLimit: '200mb', // Adjust as needed
      },
    },
};

export default nextConfig;
