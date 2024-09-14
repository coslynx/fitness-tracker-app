import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  type = 'button',
  color = 'primary',
  size = 'md',
}) => {
  const buttonClasses = `
    bg-${color}-500
    hover:bg-${color}-700
    text-white
    font-bold
    py-2
    px-4
    rounded
    focus:outline-none
    focus:shadow-outline
    ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : ''}
    ${className ? className : ''}
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;