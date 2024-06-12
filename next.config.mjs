/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
          hostname: 'www.bing.com',
          hostname: 'm.media-amazon.com',
        }],
      },
};

export default nextConfig;
