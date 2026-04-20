# CUI Design System - Setup Instructions

## Quick Start

The CUI design system has been implemented in both the **dashboard** and **website** projects. Follow these steps to complete the setup and start using the components.

## Installation Steps

### 1. Install Storybook Dependencies

#### For Dashboard:
```bash
cd dashboard
npm install --save-dev @storybook/react@^8.4.7 @storybook/nextjs@^8.4.7 @storybook/addon-essentials@^8.4.7 @storybook/addon-interactions@^8.4.7 @storybook/addon-links@^8.4.7 @storybook/addon-a11y@^8.4.7 storybook@^8.4.7
```

#### For Website:
```bash
cd website
npm install --save-dev @storybook/react@^8.4.7 @storybook/nextjs@^8.4.7 @storybook/addon-essentials@^8.4.7 @storybook/addon-interactions@^8.4.7 @storybook/addon-links@^8.4.7 @storybook/addon-a11y@^8.4.7 storybook@^8.4.7
```

> **Note**: The utility libraries `clsx` and `tailwind-merge` have already been installed.

### 2. Verify Installation

Check that all dependencies are correctly installed:

```bash
npm list @storybook/react @storybook/nextjs storybook clsx tailwind-merge
```

## Running the Projects

### Development Servers

#### Dashboard:
```bash
cd dashboard
npm run dev
# Opens at http://localhost:3000
```

#### Website:
```bash
cd website  
npm run dev
# Opens at http://localhost:3000
```

### Storybook (Component Library)

#### Dashboard Storybook:
```bash
cd dashboard
npm run storybook
# Opens at http://localhost:6006
```

#### Website Storybook:
```bash
cd website
npm run storybook
# Opens at http://localhost:6006
```

## What You'll See

### Dashboard (`http://localhost:3000`)
- **Sidebar navigation** with CUI components
- **Stats cards** showing metrics
- **Activity feed** with timeline
- **Quick actions form** with Input and Select components
- **Modal dialog** for creating projects
- Demonstrates CUI in a professional dashboard layout

### Website (`http://localhost:3000`)
- **Hero section** with CUI branding
- **Component showcase** cards (Buttons, Inputs, Modals)
- **Features grid** with icon cards
- **Call-to-action** section
- Demonstrates CUI in a marketing website context

### Storybook (`http://localhost:6006`)
- **Interactive component documentation**
- **All variants and states** for each component
- **Accessibility testing** with a11y addon
- **Props controls** to test different configurations
- **Stories for**: Button, Input, Card, Modal, Textarea, Select, Checkbox, Radio

## Project Structure

```
cakeanatomy/
├── dashboard/
│   ├── cui/                    # CUI Design System
│   │   ├── components/         # React components
│   │   ├── tokens/            # Design tokens
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Utilities
│   ├── app/
│   │   ├── page.tsx           # Dashboard demo page
│   │   ├── layout.tsx         # Updated layout
│   │   └── globals.css        # Clean styles
│   ├── .storybook/            # Storybook config
│   ├── tailwind.config.ts     # With CUI tokens
│   └── package.json           # With Storybook scripts
│
├── website/
│   ├── cui/                    # CUI Design System (identical)
│   ├── src/app/
│   │   ├── page.tsx           # Website demo page
│   │   ├── layout.tsx         # Updated layout
│   │   └── globals.css        # Clean styles
│   ├── .storybook/            # Storybook config
│   ├── tailwind.config.ts     # With CUI tokens
│   └── package.json           # With Storybook scripts
│
└── CUI_README.md              # Complete documentation
```

## Using CUI Components

### Import Components

```typescript
import { Button, Card, Input, Modal, Select } from '@/cui';
```

### Example Usage

```tsx
'use client';

import { useState } from 'react';
import { Button, Card, Input, Modal } from '@/cui';

export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Card>
        <Card.Header>
          <h2>Welcome</h2>
        </Card.Header>
        <Card.Body>
          <Input 
            label="Email" 
            placeholder="you@example.com"
            fullWidth
          />
          <Button 
            color="primary" 
            onClick={() => setIsOpen(true)}
            fullWidth
          >
            Open Modal
          </Button>
        </Card.Body>
      </Card>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Hello!</Modal.Header>
        <Modal.Body>
          <p>This is a modal dialog.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
```

## Available Scripts

### Dashboard & Website (both have the same scripts)

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build static Storybook
```

## Troubleshooting

### Import Errors
- Ensure TypeScript config has `@/cui` path alias configured (already done)
- Restart your IDE/editor after installing dependencies

### Styles Not Applying
- Check that `cui/**/*.{js,ts,jsx,tsx}` is in Tailwind content array (already configured)
- Clear `.next` cache: `rm -rf .next` and restart dev server

### Storybook Not Starting
- Ensure all Storybook dependencies are installed
- Check for port conflicts (default: 6006)
- Try: `npx storybook@latest upgrade`

### Component Not Found
- Verify the component is exported in `cui/components/index.ts`
- Check the component folder has an `index.ts` file

## Next Steps

1. **Install Storybook dependencies** (see commands above)
2. **Start the dev server** to see the demo pages
3. **Launch Storybook** to explore all components
4. **Read CUI_README.md** for detailed component documentation
5. **Start building** with CUI components!

## Component Reference

| Component | Variants | Sizes | Special Features |
|-----------|----------|-------|------------------|
| Button | solid, outline, ghost, link | sm, md, lg, xl | Loading state, icons |
| Input | - | sm, md, lg, xl | Error/success states, icons |
| Textarea | - | sm, md, lg, xl | Auto-resize |
| Select | - | sm, md, lg, xl | Custom options |
| Checkbox | - | sm, md, lg, xl | Label, helper text |
| Radio | - | sm, md, lg, xl | Label, helper text |
| Card | - | - | Header/Body/Footer, hoverable |
| Modal | - | sm, md, lg, xl, 2xl, 3xl, 4xl | Backdrop, ESC close, focus trap |

## Color Palette

- **primary**: Sky blue
- **secondary**: Purple
- **success**: Green
- **error**: Red
- **warning**: Amber
- **info**: Blue
- **neutral**: Gray

Each color has shades from 50 (lightest) to 950 (darkest).

## Support

For questions or issues:
1. Check the **CUI_README.md** for detailed documentation
2. Review **Storybook** for component examples
3. Examine the demo pages in both projects
4. Refer to component source code in `cui/components/`

---

**Happy Building with CUI! 🎨✨**
