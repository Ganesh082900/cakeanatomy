/**
 * CUI Card Component
 * Flexible container with header, body, and footer sections
 */

import React, { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Elevated shadow variant */
  elevated?: boolean;
  /** Bordered variant */
  bordered?: boolean;
  /** Hover effect */
  hoverable?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const Card = ({
  children,
  className,
  elevated = false,
  bordered = true,
  hoverable = false,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg',
        bordered && 'border border-neutral-200',
        elevated && 'shadow-lg',
        !elevated && 'shadow-sm',
        hoverable && 'transition-shadow hover:shadow-md cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }: CardHeaderProps) => {
  return (
    <div
      className={cn('px-6 py-4 border-b border-neutral-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardBody = ({ children, className, ...props }: CardBodyProps) => {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className, ...props }: CardFooterProps) => {
  return (
    <div
      className={cn('px-6 py-4 border-t border-neutral-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
