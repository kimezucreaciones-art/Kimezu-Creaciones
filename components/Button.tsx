import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 uppercase tracking-widest text-xs md:text-sm font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-kimezu-primary text-white hover:bg-kimezu-primaryHover border border-transparent shadow-sm",
    // Adding Green variant for "Checkout" or "New" actions
    secondary: "bg-kimezu-green text-white hover:bg-kimezu-greenHover border border-transparent shadow-sm",
    outline: "bg-transparent text-kimezu-title border border-kimezu-title hover:bg-kimezu-title hover:text-white",
    ghost: "bg-transparent text-kimezu-title hover:text-kimezu-pink underline-offset-4 hover:underline p-0",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};