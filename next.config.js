module.exports = () => ({
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME,
    CONSOLE_BACKEND_ENDPOINT: process.env.CONSOLE_BACKEND_ENDPOINT,
    CONSOLE_BACKEND_IMG_ENDPOIN: process.env.CONSOLE_BACKEND_IMG_ENDPOIN,
  },
  publicRuntimeConfig: {
    APP_ID: process.env.APP_ID,
    CONSOLE_BACKEND_ENDPOINT: process.env.CONSOLE_BACKEND_ENDPOINT,
    CONSOLE_BACKEND_IMG_ENDPOIN: process.env.CONSOLE_BACKEND_IMG_ENDPOIN,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'flagcdn.com',
      'upload.wikimedia.org',
    ],
  },
});
