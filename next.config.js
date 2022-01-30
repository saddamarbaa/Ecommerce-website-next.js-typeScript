/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
        NEXT_PUBLIC_AXIOX_LOGGER: process.env.NEXT_PUBLIC_AXIOX_LOGGER
      },
      images: {
        domains: ['lh3.googleusercontent.com']
      }
    };
  }

  return {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
      NEXT_PUBLIC_AXIOX_LOGGER: process.env.NEXT_PUBLIC_AXIOX_LOGGER
    }
  };
};
