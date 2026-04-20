# CUI (Common UI) Design System

A unified design system for consistent UI/UX across the CakeAnatomy platform, including both the dashboard and website applications.

## 📋 Overview

CUI provides a centralized component library and design tokens system built with:
- **React** & **TypeScript** for type-safe components
- **Tailwind CSS** for styling
- **Storybook** for component documentation and testing
- **Next.js** compatibility for both projects

## 🎨 Design Tokens

### Colors
- **Primary**: Sky blue palette (50-950 shades)
- **Secondary**: Purple palette (50-950 shades)
- **Neutral**: Gray palette (50-950 shades)
- **Semantic Colors**:
  - Success (Green)
  - Error (Red)
  - Warning (Amber)
  - Info (Blue)

### Typography
- **Font Families**: 
  - Sans: Inter (primary)
  - Mono: JetBrains Mono
  - Display: Cal Sans
- **Font Sizes**: xs (12px) to 7xl (72px)
- **Font Weights**: thin (100) to black (900)

### Spacing
- Consistent spacing scale from 0 to 96 (0px to 384px)
- Container max-widths: sm, md, lg, xl, 2xl

### Effects
- **Border Radius**: sm to 3xl + full
- **Box Shadows**: sm to 2xl + inner
- **Transitions**: Smooth 150ms cubic-bezier animations
- **Z-index**: Organized layer system (dropdown, modal, popover, tooltip)

## 🧩 Components

### Form Components
- **Button**: Multiple variants (solid, outline, ghost, link), colors, and sizes
- **Input**: Text inputs with label, helper text, error/success states, icons
- **Textarea**: Auto-resize option, validation states
- **Select**: Dropdown select with custom options
- **Checkbox**: Accessible checkbox with label
- **Radio**: Radio button input

### Layout Components
- **Card**: Flexible container with Header, Body, and Footer subcomponents
- **Modal**: Accessible dialog with backdrop, focus management, ESC/click-to-close

### Component Features
✅ **Accessibility**: WCAG compliant with ARIA attributes  
✅ **Responsive**: Mobile-first design  
✅ **Type-safe**: Full TypeScript support  
✅ **Customizable**: Extensive variant and size options  
✅ **Consistent**: Unified design tokens across all components  

## 📦 Installation & Usage

### In Dashboard Project

```tsx
import { Button, Card, Input, Modal } from '@/cui';

function MyComponent() {
  return (
    <Card>
      <Card.Header>
        <h2>Welcome</h2>
      </Card.Header>
      <Card.Body>
        <Input label="Email" placeholder="you@example.com" />
        <Button color="primary">Submit</Button>
      </Card.Body>
    </Card>
  );
}
```

### In Website Project

```tsx
import { Button, Card, Input, Modal } from '@/cui';

function MyPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <Card hoverable elevated>
        <Card.Body>
          <h1 className="text-2xl font-bold mb-4">Get Started</h1>
          <Button size="lg" color="primary">Learn More</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
```

## 🎭 Storybook

View and interact with all components in Storybook:

### Dashboard
```bash
cd dashboard
npm run storybook
```

### Website
```bash
cd website
npm run storybook
```

Storybook will open at `http://localhost:6006`

## 🗂️ File Structure

```
cui/
├── tokens/
│   ├── colors.ts          # Color palette definitions
│   ├── typography.ts      # Font families, sizes, weights
│   ├── spacing.ts         # Margin, padding scales
│   ├── effects.ts         # Shadows, radius, transitions
│   └── index.ts           # Token exports
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Input/
│   ├── Card/
│   ├── Modal/
│   ├── Textarea/
│   ├── Select/
│   ├── Checkbox/
│   ├── Radio/
│   └── index.ts           # Component exports
├── types/
│   └── index.ts           # Shared TypeScript types
├── utils/
│   └── cn.ts              # className utility (clsx + tailwind-merge)
└── index.ts               # Main CUI export
```

## 🎯 Design Principles

1. **Consistency**: Unified design tokens ensure visual coherence
2. **Accessibility**: WCAG 2.1 Level AA compliance
3. **Flexibility**: Extensive customization through props and Tailwind
4. **Performance**: Optimized bundle size with tree-shaking
5. **Developer Experience**: TypeScript, Storybook, clear documentation

## 🚀 Development Workflow

### Adding a New Component

1. Create component folder in `cui/components/`
2. Implement component with TypeScript
3. Add Storybook stories for documentation
4. Export from component `index.ts` and main `components/index.ts`
5. Test in both dashboard and website projects

### Updating Design Tokens

1. Modify token files in `cui/tokens/`
2. Update Tailwind config to reflect changes
3. Verify components adapt correctly
4. Update Storybook stories if needed

## 📚 Component Examples

### Button Variants

```tsx
<Button variant="solid" color="primary">Primary</Button>
<Button variant="outline" color="secondary">Secondary</Button>
<Button variant="ghost" color="success">Success</Button>
<Button variant="link" color="info">Link</Button>
```

### Button Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Input with States

```tsx
<Input 
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>

<Input 
  label="Username"
  error
  helperText="Username is already taken"
/>

<Input 
  label="Password"
  success
  helperText="Strong password!"
  type="password"
/>
```

### Card Layout

```tsx
<Card>
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here...</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </Card.Footer>
</Card>
```

### Modal Dialog

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header>Confirm Action</Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to proceed?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="outline" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button onClick={() => setIsOpen(false)}>
      Confirm
    </Button>
  </Modal.Footer>
</Modal>
```

## 🔧 Tailwind Configuration

The CUI tokens are integrated into Tailwind:

```typescript
// tailwind.config.ts
import { tokens } from './cui/tokens';

export default {
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      spacing: tokens.spacing,
      borderRadius: tokens.effects.borderRadius,
      // ... more token integrations
    },
  },
};
```

## 📖 Best Practices

1. **Always use CUI components** instead of custom implementations
2. **Reference design tokens** for colors, spacing, etc.
3. **Test accessibility** with keyboard navigation and screen readers
4. **Document component usage** in Storybook stories
5. **Keep components focused** - single responsibility principle
6. **Use TypeScript strictly** - no `any` types
7. **Follow naming conventions** - consistent prop names across components

## 🐛 Troubleshooting

### Components not found
- Ensure `@/cui` path alias is configured in `tsconfig.json`
- Check import paths match the export structure

### Styles not applying
- Verify Tailwind config includes `cui/**/*.{js,ts,jsx,tsx}` in content paths
- Ensure global CSS imports Tailwind directives

### TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Check that component props match the defined interfaces

## 📝 License

Part of the CakeAnatomy project. All rights reserved.

## 👥 Contributing

When adding or modifying components:
1. Follow existing component patterns
2. Include comprehensive Storybook stories
3. Ensure accessibility standards
4. Update this documentation
5. Test in both dashboard and website projects

---

**Built with ❤️ for consistent, accessible, and beautiful user interfaces**
