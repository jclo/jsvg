// Title:
module.exports = {
  title: 'JSVG',
  description: 'A tiny Javascript library to create and manage SVG elements in the DOM',
}

// Theme
module.exports = {
  themeConfig: {
    // Navbar
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/jclo/jsvg' },
    ],

    // Sidebar
    sidebar: {

      // Guide
      '/guide/': [
        '',
      ],

      // fallback
      '/': [
        '',        /* / */
      ]
    },

    lastUpdated: 'Last Updated', // string | boolean
  },
}
