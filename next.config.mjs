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
      { source: '/o-zavode.html', destination: '/about', permanent: true },
      { source: '/o-zavode/opisanie.html', destination: '/about', permanent: true },
      {
        source: '/o-zavode/proizvodstvo-\\(czexi\\).html',
        destination: '/facilities',
        permanent: true,
      },
      { source: '/o-zavode/sertifikatyi.html', destination: '/certificates', permanent: true },
      { source: '/kontaktyi.html', destination: '/contact-us', permanent: true },
      { source: '/filialyi.html', destination: '/facilities', permanent: true },
      { source: '/uznat-czenu-ustanovki.html', destination: '/contact-us', permanent: true },
      { source: '/texnicheskie-gazy.html', destination: '/catalog/industrial-gases', permanent: true },
      {
        source: '/texnicheskie-gazy/azot.html',
        destination: '/catalog/industrial-gases/nitrogen',
        permanent: true,
      },
      {
        source: '/texnicheskie-gazy/aczetilen.html',
        destination: '/catalog/industrial-gases/acetylene',
        permanent: true,
      },
      {
        source: '/texnicheskie-gazy/kislorod.html',
        destination: '/catalog/industrial-gases/oxygen',
        permanent: true,
      },
      {
        source: '/texnicheskie-gazy/argon.html',
        destination: '/catalog/industrial-gases/argon',
        permanent: true,
      },
      {
        source: '/texnicheskie-gazy/uglekislota.html',
        destination: '/catalog/industrial-gases/carbon-dioxide',
        permanent: true,
      },
      {
        source: '/texnicheskie-gazy/gelij.html',
        destination: '/catalog/industrial-gases/helium',
        permanent: true,
      },
      {
        source: '/texnicheskie-gazy/propan.html',
        destination: '/catalog/industrial-gases/propane',
        permanent: true,
      },
      {
        source: '/texnicheskie-gazy/gazovyie-smesi.html',
        destination: '/catalog/industrial-gases/gas-mixtures',
        permanent: true,
      },
      {
        source: '/texnicheskie-gazy/chistyie.html',
        destination: '/catalog/industrial-gases/high-purity-gases',
        permanent: true,
      },
      { source: '/dlya-dostavki-gazov.html', destination: '/catalog/monoblocks', permanent: true },
      {
        source: '/dlya-dostavki-gazov/monobloki.html',
        destination: '/catalog/monoblocks',
        permanent: true,
      },
      {
        source: '/uslugi/dostavka-gazov.html',
        destination: '/shipping-and-payment',
        permanent: true,
      },
      {
        source: '/vozduhorazdelitelnye-ustanovki.html',
        destination: '/catalog/air-separation-units',
        permanent: true,
      },
      {
        source: '/vozduhorazdelitelnye-ustanovki/generatory-kisloroda.html',
        destination: '/catalog/air-separation-units/oxygen-generators',
        permanent: true,
      },
      {
        source: '/vozduhorazdelitelnye-ustanovki/generatory-azota.html',
        destination: '/catalog/air-separation-units/nitrogen-generators',
        permanent: true,
      },
      {
        source: '/vozduhorazdelitelnye-ustanovki/kislorodnyie.html',
        destination: '/catalog/air-separation-units/oxygen-production-systems',
        permanent: true,
      },
      {
        source: '/vozduhorazdelitelnye-ustanovki/azotnyie.html',
        destination: '/catalog/air-separation-units/nitrogen-production-systems',
        permanent: true,
      },
      { source: '/sitemap.html', destination: '/sitemap.xml', permanent: true },
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
