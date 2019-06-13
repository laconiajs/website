/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: "Sainsbury's",
    image: "/img/users/sainsburys.jpg",
    infoLink: "https://www.sainsburys.co.uk/",
    pinned: true
  }
];

const siteConfig = {
  title: "Laconia", // Title for your website.
  tagline: "Create well-crafted serverless applications, effortlessly",
  url: "https://laconiajs.io", // Your website URL
  baseUrl: "/", // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: "website",
  organizationName: "laconiajs",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "introduction/getting-started", label: "Getting Started" },
    { doc: "api/intro", label: "API" },
    { page: "help", label: "Help" },
    { page: "users", label: "Users" }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: "img/laconia.svg",
  footerIcon: "img/laconia.svg",
  favicon: "img/favicon.png",

  /* Colors for website */
  colors: {
    primaryColor: "#23635e",
    secondaryColor: "#2bb9af"
  },
  editUrl: "https://github.com/laconiajs/website/edit/master/docs/",

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Wisen Tanasa`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "vs2015"
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: "img/docusaurus.png",
  twitterImage: "img/docusaurus.png",

  cname: "laconiajs.io",
  gaTrackingId: "UA-137047564-1",
  gaGtag: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: "https://github.com/laconiajs/laconia",
  websiteRepoUrl: "https://github.com/laconiajs/website"
};

module.exports = siteConfig;
