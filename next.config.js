/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
//at building
const isProd = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  pwa: {
    disable: false,//isProd ? false : true,
    dest: 'public'
  },
  env: {
    isProd: isProd,
  },
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: config.inlineImageLimikt,
            fallback: require.resolve("file-loader"),
            publicPath: `${config.assetPrefix}/_next/static/`,
            outputPath: `${isServer ? "../" : ""}static/`,
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });
    return config;
  },
});
