import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  async redirects() {
    return [
      { source: '/privacy', destination: '/legal/privacy.pdf', permanent: true },
      { source: '/agreement', destination: '/legal/agreement.pdf', permanent: true },
    ]
  },
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return webpackConfig
  },
  images: {
    remotePatterns: [new URL('https://placehold.co/**')],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
