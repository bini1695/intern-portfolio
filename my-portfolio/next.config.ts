/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
    ],
  },
  outputFileTracingIncludes: {
    '/api/download': ['./app/resume.pdf'],
  },
};

module.exports = nextConfig;