const userRouterPages = [
  'admin',
  'blog',
  'reviews',
  'catalog/bracelets',
  'catalog/kindles',
  'catalog/beads',
  'catalog/others',
];

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  userRouterPages.forEach(path => {
    if (page.path.match(`^\/${path}/`)) {
      page.matchPath = `/${path}/*`;
      createPage(page);
    }
  });
};
