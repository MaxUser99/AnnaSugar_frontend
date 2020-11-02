export const faqLinks = [
  { title: 'Астро', href: 'astro' },
  { title: 'Браслеты', href: 'bracelets' },
  { title: 'Четки', href: 'beads' },
  { title: 'Access bars', href: 'bars' },
];

export const catalogLinks = [
  { title: 'Браслеты', href: 'bracelets' },
  { title: 'Свечи', href: 'kindles' },
  { title: 'Четки', href: 'beads' },
  { title: 'Другое', href: 'others' },
];

export const consultLinks = [
  { title: 'Астро', href: 'astro' },
  { title: 'Таро', href: 'taro' },
  { title: 'Руны', href: 'rune' },
  { title: 'Ритуалы', href: 'ritual' },
];

export const userLinks = [
  { href: '/', title: 'Главная', isActive: (path) => path === '/'},
  { href: '/catalog', title: 'Каталог', isActive: (path) => path.includes('/catalog')},
  { href: '/consult', title: 'Консультации', isActive: (path) => path.includes('/consult')},
  { href: '/faq', title: 'Вопросы', isActive: (path) => path.includes('/faq')},
  { href: '/contact', title: 'Контакты', isActive: (path) => path.includes('/contact')},
]

export const adminLinks = [
  { title: 'Статьи', href: 'articles' },
  { title: 'Отзывы', href: 'reviews' },
  { title: 'Каталог', href: 'catalog', subLinks: catalogLinks },
  { title: 'Консультации', href: 'consult', subLinks: consultLinks },
  { title: 'FAQ', href: 'faq', subLinks: faqLinks },
];
