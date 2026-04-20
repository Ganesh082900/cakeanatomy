/**
 * CUI Design System - Token Exports
 * Central export for all design tokens
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './effects';

// Re-export as a single design tokens object
import { colors } from './colors';
import { typography } from './typography';
import { spacing, containerMaxWidth } from './spacing';
import { effects } from './effects';

export const tokens = {
  colors,
  typography,
  spacing,
  containerMaxWidth,
  effects,
} as const;
