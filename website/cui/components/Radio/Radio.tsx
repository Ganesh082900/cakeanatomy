/**
 * CUI Radio Component
 * Accessible radio button input with label
 */

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Size } from '../../types';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size of the radio */
  size?: Size;
  /** Label text */
  label?: string;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      size = 'md',
      label,
      error = false,
      helperText,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    const sizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
    };

    const labelSizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={cn(
              sizeStyles[size],
              'border-neutral-300',
              'text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-error-500 focus:ring-error-500',
              className
            )}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={helperText ? `${radioId}-helper` : undefined}
            {...props}
          />
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                'font-medium text-neutral-700 cursor-pointer',
                labelSizeStyles[size],
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
        </div>
        {helperText && (
          <p
            id={`${radioId}-helper`}
            className={cn(
              'text-sm ml-7',
              error ? 'text-error-600' : 'text-neutral-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
