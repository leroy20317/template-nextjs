// @ts-check

const name = process.env.npm_package_name;
// const { withSentryConfig } = require('@sentry/nextjs');

// const isProd = process.env.NODE_ENV === 'production';
const isProd = false;
const baseDomain = '.example.com';
const cdnHost = `cdn${baseDomain}`;

/**
 * @type {import('next').NextConfig}
 */
let nextConfig = {
  distDir: 'build',
  env: {
    BASE_DOMAIN: baseDomain,
    STATIC_HOST: isProd ? `${cdnHost}/${name}/static` : '/static',
  },

  // cdn in production and localhost for development
  assetPrefix: isProd ? `https://${cdnHost}/${name}` : undefined,

  // cdn in production and localhost for development
  // assetPrefix: isProd ? `//cdn.leroy.net.cn/${name}` : '',

  // 运行时配置(server client皆可获取)
  // publicRuntimeConfig: {
  // },
  images: {
    minimumCacheTTL: 24 * 3600,
    domains: [cdnHost],
  },
  sassOptions: {
    // 写入额外变量
    additionalData: isProd ? `$static: '//${cdnHost}/${name}/static';` : `$static: '/static';`,
    // prependData:  isProd ? `@import "@/styles/config/prod.scss";` : `@import "@/styles/config/dev.scss";`,
  },
  compiler: {
    removeConsole: !!process.env.PROD && {
      exclude: ['error'],
    },
  },
  transpilePackages: ["@ant-design/icons"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {

    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    return config;
  },

};

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  nextConfig = withBundleAnalyzer(nextConfig);
}
// const sentryWebpackPluginOptions = {
//   // silent: true, // Suppresses all logs
//   debug: true,
// };
// module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

export default nextConfig;
