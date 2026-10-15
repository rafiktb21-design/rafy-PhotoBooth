// MOLYZ BOOTH - Button Component
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  icon,
}: ButtonProps) => {
  const baseStyles = 'arcade-btn font-bold uppercase tracking-wide flex items-center justify-center gap-2 rounded-xl transition-all duration-100';
  
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-400',
    secondary: 'bg-yellow-400 text-black hover:bg-yellow-300',
    danger: 'bg-red-500 text-white hover:bg-red-400',
    success: 'bg-green-500 text-white hover:bg-green-400',
    warning: 'bg-orange-500 text-white hover:bg-orange-400',
  };
  
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {children}
    </motion.button>
  );
};
