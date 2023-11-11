module.exports = {
  publicRuntimeConfig: {
    site: {
      name: 'a10.fe',
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : '<public_url>',
      title: 'Capstone A-10',
      description: 'Capstone A-10',
      socialPreview: '/images/preview.png',
    },
    baseUrl: process.env.BASEURL,
    localUrl: process.env.LOCALURL
  },
  swcMinify: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  async rewrites() {
    return [
      {
        source: "/api/v2/:path*",
        destination: `${process.env.BASEURL}:path*`,
      },
    ];
  },
  output: "standalone",
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
