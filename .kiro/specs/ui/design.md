# UI Design System Design Document

## Overview

This design document outlines a comprehensive UI design system that combines Apple's Human Interface Guidelines with modern tech company aesthetics (Netflix, Next.js) to create a cohesive, accessible, and production-ready design language. The system will be implemented through Tailwind CSS configuration and documented via Storybook, serving as the foundation for consistent user experience across the entire portfolio application.

The design system follows atomic design principles, starting with design tokens (atoms) and building up to complex components (organisms), ensuring scalability and maintainability.

## Architecture

### Design Token Architecture

The design system uses a three-tier token architecture:

1. **Primitive Tokens**: Raw values (colors, sizes, durations)
2. **Semantic Tokens**: Purpose-driven tokens that reference primitives
3. **Component Tokens**: Component-specific tokens that reference semantic tokens

```
Primitive → Semantic → Component
#3B82F6 → primary-500 → button-primary-bg
```

### File Structure

```
packages/ui/
├── tokens/
│   ├── colors.ts           # Color palette and semantic tokens
│   ├── typography.ts       # Font families, sizes, weights
│   ├── spacing.ts          # Spacing scale and layout tokens
│   ├── shadows.ts          # Elevation and shadow definitions
│   ├── borders.ts          # Border radius and border tokens
│   └── animations.ts       # Duration, easing, and transition tokens
├── components/
│   ├── primitives/         # Base components (Button, Input, etc.)
│   ├── patterns/           # Composite components (Card, Modal, etc.)
│   └── layouts/            # Layout components (Container, Grid, etc.)
├── styles/
│   ├── globals.css         # Global styles and CSS custom properties
│   └── tailwind.config.ts  # Tailwind configuration with design tokens
└── stories/                # Storybook stories for all components
```

## Components and Interfaces

### Color System

#### Color Palette Structure

**Primary Colors (Blue Scale)**

- Inspired by Next.js brand and modern tech aesthetics
- 50: #EFF6FF (lightest)
- 100: #DBEAFE
- 200: #BFDBFE
- 300: #93C5FD
- 400: #60A5FA
- 500: #3B82F6 (base)
- 600: #2563EB
- 700: #1D4ED8
- 800: #1E40AF
- 900: #1E3A8A (darkest)

**Neutral Colors (Gray Scale)**

- Based on Apple's neutral palette with enhanced contrast
- 50: #F9FAFB
- 100: #F3F4F6
- 200: #E5E7EB
- 300: #D1D5DB
- 400: #9CA3AF
- 500: #6B7280
- 600: #4B5563
- 700: #374151
- 800: #1F2937
- 900: #111827

**Semantic Colors**

- Success: #10B981 (Green-500)
- Warning: #F59E0B (Amber-500)
- Error: #EF4444 (Red-500)
- Info: #3B82F6 (Blue-500)

#### Dark Mode Adaptations

Dark mode uses inverted neutral scales and adjusted semantic colors:

- Background: Gray-900 → Gray-50
- Text: Gray-50 → Gray-900
- Borders: Gray-700 → Gray-200
- Semantic colors maintain accessibility with adjusted opacity

### Typography System

#### Font Stack

**Primary (Sans-serif)**

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

**Secondary (Serif)**

```css
font-family: 'Crimson Pro', 'Georgia', 'Times New Roman', serif;
```

**Monospace**

```css
font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
```

#### Type Scale

| Token | Size | Line Height | Letter Spacing | Use Case              |
| ----- | ---- | ----------- | -------------- | --------------------- |
| xs    | 12px | 16px        | 0.05em         | Captions, labels      |
| sm    | 14px | 20px        | 0.025em        | Body small, metadata  |
| base  | 16px | 24px        | 0              | Body text, paragraphs |
| lg    | 18px | 28px        | -0.025em       | Lead text, subtitles  |
| xl    | 20px | 28px        | -0.025em       | H6, small headings    |
| 2xl   | 24px | 32px        | -0.025em       | H5                    |
| 3xl   | 30px | 36px        | -0.025em       | H4                    |
| 4xl   | 36px | 40px        | -0.025em       | H3                    |
| 5xl   | 48px | 48px        | -0.025em       | H2                    |
| 6xl   | 60px | 60px        | -0.025em       | H1, hero text         |

#### Responsive Typography

Typography scales across breakpoints:

- Mobile: Base scale
- Tablet: 1.125x scale factor
- Desktop: 1.25x scale factor

### Spacing System

#### Base Unit: 4px

The spacing system uses a 4px base unit with exponential progression:

| Token | Value | Rem     | Use Case             |
| ----- | ----- | ------- | -------------------- |
| 0     | 0px   | 0       | No spacing           |
| 1     | 4px   | 0.25rem | Tight spacing        |
| 2     | 8px   | 0.5rem  | Small gaps           |
| 3     | 12px  | 0.75rem | Compact spacing      |
| 4     | 16px  | 1rem    | Base spacing         |
| 5     | 20px  | 1.25rem | Comfortable spacing  |
| 6     | 24px  | 1.5rem  | Loose spacing        |
| 8     | 32px  | 2rem    | Section spacing      |
| 10    | 40px  | 2.5rem  | Large gaps           |
| 12    | 48px  | 3rem    | Component separation |
| 16    | 64px  | 4rem    | Layout spacing       |
| 20    | 80px  | 5rem    | Page sections        |
| 24    | 96px  | 6rem    | Hero spacing         |

### Border Radius System

#### Radius Scale

| Token | Value  | Use Case                  |
| ----- | ------ | ------------------------- |
| none  | 0px    | Sharp edges, data tables  |
| sm    | 2px    | Small elements, badges    |
| base  | 4px    | Buttons, inputs, cards    |
| md    | 6px    | Larger buttons, panels    |
| lg    | 8px    | Cards, modals             |
| xl    | 12px   | Large cards, containers   |
| 2xl   | 16px   | Hero sections, images     |
| 3xl   | 24px   | Large decorative elements |
| full  | 9999px | Pills, avatars, toggles   |

### Shadow System

#### Elevation Levels

| Level | Name | Box Shadow                                                | Use Case                    |
| ----- | ---- | --------------------------------------------------------- | --------------------------- |
| 0     | none | none                                                      | Flat elements               |
| 1     | sm   | 0 1px 2px rgba(0,0,0,0.05)                                | Subtle depth                |
| 2     | base | 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)     | Cards, buttons              |
| 3     | md   | 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)    | Dropdowns, tooltips         |
| 4     | lg   | 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)   | Modals, popovers            |
| 5     | xl   | 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04) | Drawers, overlays           |
| 6     | 2xl  | 0 25px 50px rgba(0,0,0,0.25)                              | Large modals, hero elements |

#### Dark Mode Shadows

Dark mode shadows use white with low opacity:

```css
box-shadow: 0 4px 6px rgba(255,255,255,0.1);
```

## Data Models

### Design Token Interface

```typescript
interface DesignTokens {
  colors: {
    primitive: Record<string, string>;
    semantic: {
      primary: ColorScale;
      neutral: ColorScale;
      success: ColorScale;
      warning: ColorScale;
      error: ColorScale;
      info: ColorScale;
    };
    surface: {
      background: string;
      foreground: string;
      muted: string;
      accent: string;
      border: string;
    };
  };
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    fontSize: Record<string, [string, string]>; // [size, lineHeight]
    fontWeight: Record<string, number>;
    letterSpacing: Record<string, string>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  boxShadow: Record<string, string>;
  animation: {
    duration: Record<string, string>;
    easing: Record<string, string>;
  };
}

interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}
```

### Component Props Interface

```typescript
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonProps extends ComponentProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  fullWidth?: boolean;
}

interface CardProps extends ComponentProps {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}
```

## Error Handling

### Design Token Validation

```typescript
const validateColorContrast = (foreground: string, background: string): boolean => {
  const contrast = calculateContrast(foreground, background);
  return contrast >= 4.5; // WCAG AA standard
};

const validateTouchTarget = (width: number, height: number): boolean => {
  return width >= 44 && height >= 44; // 44px minimum for mobile
};
```

### Fallback Strategies

1. **Color Fallbacks**: CSS custom properties with fallback values
2. **Font Fallbacks**: Web-safe font stacks for each font family
3. **Animation Fallbacks**: Respect `prefers-reduced-motion`
4. **Theme Fallbacks**: Default to light theme if system preference unavailable

## Testing Strategy

### Visual Regression Testing

1. **Storybook Visual Tests**: Chromatic integration for component screenshots
2. **Cross-browser Testing**: Chrome, Firefox, Safari, Edge
3. **Responsive Testing**: Mobile, tablet, desktop viewports
4. **Theme Testing**: Light and dark mode variations

### Accessibility Testing

1. **Automated Testing**: axe-core integration in Storybook
2. **Contrast Testing**: Automated contrast ratio validation
3. **Keyboard Testing**: Tab navigation and focus management
4. **Screen Reader Testing**: NVDA, JAWS, VoiceOver compatibility

### Component Testing

```typescript
// Example test structure
describe('Button Component', () => {
  it('meets contrast requirements', () => {
    const button = render(<Button variant="primary">Test</Button>);
    expect(getContrastRatio(button)).toBeGreaterThan(4.5);
  });

  it('has minimum touch target size', () => {
    const button = render(<Button size="sm">Test</Button>);
    expect(button).toHaveMinimumSize(44, 44);
  });

  it('supports keyboard navigation', () => {
    const button = render(<Button>Test</Button>);
    button.focus();
    expect(button).toHaveFocus();
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalled();
  });
});
```

### Performance Testing

1. **Bundle Size**: Monitor CSS and JS bundle impact
2. **Runtime Performance**: Component render performance
3. **Animation Performance**: 60fps animation validation
4. **Loading Performance**: Critical CSS extraction

## Implementation Architecture

### Tailwind CSS Configuration

The design system will extend Tailwind's default configuration:

```typescript
// tailwind.config.ts structure
export default {
  content: [...],
  darkMode: 'class',
  theme: {
    extend: {
      colors: designTokens.colors,
      fontFamily: designTokens.typography.fontFamily,
      fontSize: designTokens.typography.fontSize,
      spacing: designTokens.spacing,
      borderRadius: designTokens.borderRadius,
      boxShadow: designTokens.boxShadow,
      animation: designTokens.animation,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    customDesignSystemPlugin,
  ],
};
```

### CSS Custom Properties

CSS custom properties enable runtime theme switching:

```css
:root {
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
  /* ... */
}

[data-theme="dark"] {
  --color-primary-50: #1e3a8a;
  --color-primary-500: #3b82f6;
  --color-primary-900: #eff6ff;
  /* ... */
}
```

### Component Architecture

Components follow a consistent pattern:

1. **Base Component**: Unstyled functionality
2. **Styled Component**: Design system styles applied
3. **Variant Components**: Specific use case implementations
4. **Compound Components**: Complex multi-part components

### Storybook Integration

Each component includes comprehensive Storybook documentation:

1. **Default Story**: Basic component usage
2. **Variant Stories**: All available variants
3. **Interactive Stories**: Props playground
4. **Accessibility Stories**: Focus and keyboard navigation
5. **Documentation**: Props table, usage guidelines, design rationale
