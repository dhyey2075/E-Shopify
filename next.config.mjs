/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.bing.com',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
          },
          {
            protocol: 'https',
            hostname: 'i.pinimg.com',
          },
          {
            protocol: 'https',
            hostname: 'www.google.com',
          },
          {
            protocol: 'https',
            hostname: 'www.google.co.in',
          },
          {
            protocol: 'https',
            hostname: 'www.google.co.uk',
          },
          {
            protocol: 'https',
            hostname: 'www.google.co.jp',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com'
          },
          {
            protocol: 'https',
            hostname: 'm.economictimes.com'
          },
          {
            protocol: 'https',
            hostname: 'images.fonearena.com'
          },
          {
            protocol: 'https',
            hostname: 'w7.pngwing.com'
          }
        ],
      },
};

export default nextConfig;
