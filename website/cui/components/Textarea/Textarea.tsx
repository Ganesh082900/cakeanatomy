'use client';
/**
 * CUI Textarea Component
 * Multi-line text input with auto-resize option
 */

import React, { forwardRef, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';
import { Size } from '../../types';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Size of the textarea */
  size?: Size;
  /** Error state */
  error?: boolean;
  /** Success state */
  success?: boolean;
  /** Helper text below textarea */
  helperText?: string;
  /** Label for the textarea */
  label?: string;
  /** Full width textarea */
  fullWidth?: boolean;
  /** Auto-resize based on content */
  autoResize?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      size = 'md',
      error = false,
      success = false,
      helperText,
      label,
      fullWidth = false,
      autoResize = false,
      disabled,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as any) || internalRef;

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [props.value, autoResize, textareaRef]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
      onChange?.(e);
    };

    // Base styles
    const baseStyles = cn(
      'block border rounded-lg',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50',
      'resize-none',
      fullWidth && 'w-full'
    );

    // Size variants
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
      xl: 'px-6 py-4 text-xl',
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
            htmlFor={textareaId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={textareaRef}
          id={textareaId}
          className={cn(
            baseStyles,
            sizeStyles[size],
            stateStyles,
            className
          )}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={helperText ? `${textareaId}-helper` : undefined}
          onChange={handleChange}
          {...props}
        />
        {helperText && (
          <p
            id={`${textareaId}-helper`}
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

Textarea.displayName = 'Textarea';

export default Textarea;
