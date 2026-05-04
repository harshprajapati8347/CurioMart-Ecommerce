const fs = require('fs');
const path = require('path');

const dirs = [
  'src/app',
  'src/components/ui',
  'src/components/shared',
  'src/components/layout',
  'src/features/auth',
  'src/features/product',
  'src/features/cart',
  'src/features/order',
  'src/features/seller',
  'src/features/admin',
  'src/hooks',
  'src/lib',
  'src/store',
  'src/types',
  'src/styles'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created ${dir}`);
  }
});

const readmeContent = `# CurioMart Architecture

This project follows a feature-driven architecture:

- \`app/\`: App router / layout
- \`components/ui/\`: shadcn components (DO NOT MODIFY CORE)
- \`components/shared/\`: reusable app components
- \`components/layout/\`: navbar, footer, sidebar
- \`features/*\`: Feature-based modules (auth, product, cart, order, seller, admin)
- \`hooks/\`: Custom React hooks
- \`lib/\`: utils, axios, config
- \`store/\`: Redux Toolkit slices
- \`types/\`: TypeScript interfaces / Prop types
- \`styles/\`: Global styles

Please ensure all new components and features are placed in their respective domains.
`;

fs.writeFileSync('src/README.md', readmeContent);
console.log('Created src/README.md');
