const BASE_URL = process.env.NODE_ENV === 'development' ? '/' : '/docs/';

module.exports = {
  title: '区块链成绩系统',
  tagline: 'Polkadot does JavaScript',
  url: 'https://polkadot.js.org',
  baseUrl: BASE_URL,
  favicon: 'img/favicon.ico',
  organizationName: 'polkadot-js',
  onBrokenLinks: 'warn',
  projectName: 'docs',
  stylesheets: [],
  themeConfig: {
    navbar: {
      title: '区块链成绩系统',
      logo: {
        alt: 'polkadot{.js}',
        src: 'img/学校logo.png',
      },
      items: [
        {
          href: 'https://github.com/blockChainWustCS/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {}
  },
  presets: [
    ['@docusaurus/preset-classic', {
      docs: {
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/blockChainWustCS/docs',
        routeBasePath: '/'
      },
      blog: {
        showReadingTime: true,
        // editUrl: 'https://github.com/blockChainWustCS/docs/tree/master/docs',
        editUrl: 'https://github.com/blockChainWustCS/docs/edit/master/',

      },
      theme: {
        customCss: require.resolve('./src/css/custom.css'),
      }
    }]
  ],
  plugins: [require.resolve("@cmfcmf/docusaurus-search-local")],
};
