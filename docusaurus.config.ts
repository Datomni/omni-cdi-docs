import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Omni CDI: Private Customer Data Infrastructure',
  tagline: 'Omni CDI is a composable customer data infrastructure for full-lifecycle marketing, designed to run in your private cloud, allowing full control.',
  favicon: 'img/favicon.ico',

  // Add markdown and themes config here
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Set the production url of your site here
  url: 'https://cdi.datomni.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'datomni', // Usually your GitHub org/user name.
  projectName: 'omni-cdi', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/datomni-social-card.png',
    navbar: {
      title: 'Omni CDI',
      logo: {
        alt: 'Datomni Omni CDI Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://www.datomni.com/contact',
          label: 'Schedule a Proof of Concept setup',
          position: 'right', // or 'left' if you want it on the left side
        },
        {
          href: 'https://datomni.com',
          label: 'Datomni Home',
          position: 'right', // or 'left' if you want it on the left side
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        // {
        //   href: 'https://github.com/Datomni',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Products',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
            {
              label: 'Enterprise Solutions',
              href: 'https://datomni.com',
            },
            {
              label: 'Performance Suite',
              href: 'https://performance.datomni.com',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Infrastructure',
              to: '/docs/infrastructure/intro',
            },
            {
              label: 'Activation',
              to: '/docs/activation/intro',
            },
            {
              label: 'Reporting',
              to: '/docs/reporting/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Schedule Proof of Concept',
              href: 'https://www.datomni.com/contact',
            },
            {
              label: 'Meetup',
              href: 'https://www.meetup.com/The-10X-Data-driven-Marketing-Warsaw',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Datomni LLC, AI EATS SOFTWARE LLC, Forward Thinking Capital LLC.<br/>All rights reserved. Warsaw, Berlin, Kyiv.<br/>Leadership: Maciej Miętek (CEO) <a href="https://www.linkedin.com/in/macmietek/" target="_blank">LinkedIn</a> | <a href="https://macmietek.com" target="_blank">Website</a><br/>Built with Docusaurus.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
