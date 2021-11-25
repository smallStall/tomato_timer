/** @type {import('next').NextConfig} */

//at building
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
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
};
