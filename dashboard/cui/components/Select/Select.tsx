/**
 * CUI Select Component
 * Accessible dropdown select input
 */

import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Size } from '../../types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Size of the select */
  size?: Size;
  /** Error state */
  error?: boolean;
  /** Success state */
  success?: boolean;
  /** Helper text below select */
  helperText?: string;
  /** Label for the select */
  label?: string;
  /** Full width select */
  fullWidth?: boolean;
  /** Options for the select */
  options: SelectOption[];
  /** Placeholder option */
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      size = 'md',
      error = false,
      success = false,
      helperText,
      label,
      fullWidth = false,
      disabled,
      id,
      options,
      placeholder,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    // Base styles
    const baseStyles = cn(
      'block border rounded-lg',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50',
      'appearance-none bg-white',
      'cursor-pointer',
      fullWidth && 'w-full'
    );

    // Size variants
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm pr-8',
      md: 'px-4 py-2 text-base pr-10',
      lg: 'px-5 py-3 text-lg pr-12',
      xl: 'px-6 py-4 text-xl pr-14',
    };

    // State styles
    const stateStyles = error
      ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
      : success
      ? 'border-success-500 focus:border-success-500 focus:ring-success-500'
      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500';

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              baseStyles,
              sizeStyles[size],
              stateStyles,
              className
            )}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          {/* Dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {helperText && (
          <p
            id={`${selectId}-helper`}
            className={cn(
              'text-sm',
              error
                ? 'text-error-600'
                : success
                ? 'text-success-600'
                : 'text-neutral-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
