# CurioMart Architecture

This project follows a feature-driven architecture:

- `app/`: App router / layout
- `components/ui/`: shadcn components (DO NOT MODIFY CORE)
- `components/shared/`: reusable app components
- `components/layout/`: navbar, footer, sidebar
- `features/*`: Feature-based modules (auth, product, cart, order, seller, admin)
- `hooks/`: Custom React hooks
- `lib/`: utils, axios, config
- `store/`: Redux Toolkit slices
- `types/`: TypeScript interfaces / Prop types
- `styles/`: Global styles

Please ensure all new components and features are placed in their respective domains.
