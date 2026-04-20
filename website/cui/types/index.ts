/**
 * CUI Design System - Shared Types
 */

import { ReactNode } from 'react';

// Size variants
export type Size = 'sm' | 'md' | 'lg' | 'xl';

// Color variants
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

// Button variants
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

// Component base props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Accessible component props
export interface AccessibleComponentProps extends BaseComponentProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}
