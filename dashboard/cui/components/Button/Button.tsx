/**
 * CUI Button Component
 * Accessible, flexible button with multiple variants and sizes
 */

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { ButtonVariant, ColorVariant, Size } from '../../types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Color scheme */
  color?: ColorVariant;
  /** Size of the button */
  size?: Size;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2',
      'font-medium rounded-lg',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      fullWidth && 'w-full'
    );

    // Size variants
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    // Color and variant combinations
    const variantStyles = {
      solid: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
        success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
        error: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
        warning: 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500',
        info: 'bg-info-600 text-white hover:bg-info-700 focus:ring-info-500',
        neutral: 'bg-neutral-600 text-white hover:bg-neutral-700 focus:ring-neutral-500',
      },
      outline: {
        primary: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        secondary: 'border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-50 focus:ring-secondary-500',
        success: 'border-2 border-success-600 text-success-600 hover:bg-success-50 focus:ring-success-500',
        error: 'border-2 border-error-600 text-error-600 hover:bg-error-50 focus:ring-error-500',
        warning: 'border-2 border-warning-600 text-warning-600 hover:bg-warning-50 focus:ring-warning-500',
        info: 'border-2 border-info-600 text-info-600 hover:bg-info-50 focus:ring-info-500',
        neutral: 'border-2 border-neutral-600 text-neutral-600 hover:bg-neutral-50 focus:ring-neutral-500',
      },
      ghost: {
        primary: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        secondary: 'text-secondary-600 hover:bg-secondary-50 focus:ring-secondary-500',
        success: 'text-success-600 hover:bg-success-50 focus:ring-success-500',
        error: 'text-error-600 hover:bg-error-50 focus:ring-error-500',
        warning: 'text-warning-600 hover:bg-warning-50 focus:ring-warning-500',
        info: 'text-info-600 hover:bg-info-50 focus:ring-info-500',
        neutral: 'text-neutral-600 hover:bg-neutral-50 focus:ring-neutral-500',
      },
      link: {
        primary: 'text-primary-600 hover:text-primary-700 hover:underline focus:ring-primary-500',
        secondary: 'text-secondary-600 hover:text-secondary-700 hover:underline focus:ring-secondary-500',
        success: 'text-success-600 hover:text-success-700 hover:underline focus:ring-success-500',
        error: 'text-error-600 hover:text-error-700 hover:underline focus:ring-error-500',
        warning: 'text-warning-600 hover:text-warning-700 hover:underline focus:ring-warning-500',
        info: 'text-info-600 hover:text-info-700 hover:underline focus:ring-info-500',
        neutral: 'text-neutral-600 hover:text-neutral-700 hover:underline focus:ring-neutral-500',
      },
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant][color],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
