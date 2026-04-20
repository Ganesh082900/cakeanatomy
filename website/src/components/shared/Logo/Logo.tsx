import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
};

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  return (
    <Link href="/" className={`font-display font-bold text-primary-600 hover:text-primary-700 transition-colors ${sizeClasses[size]} ${className}`}>
      CakeAnatomy
    </Link>
  );
}
