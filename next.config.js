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
  },
  swcMinify: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_SOURCE}:path*`,
      },
    ];
  },
  output: "standalone",
};
