const path = require('path');

module.exports = {
  /* Your site config here */
  plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: path.join(__dirname, `src`, `assets`, `images`),
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `src`,
          path: path.join(__dirname, `src`),
        },
      },
      {
        resolve: 'gatsby-plugin-react-svg',
        options: {
          rule: {
            include: /\.inline\.svg$/,
          },
        },
      },
      `gatsby-plugin-styled-components`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-react-helmet`,
  ],
}
