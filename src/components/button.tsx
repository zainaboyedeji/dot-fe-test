import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  className,
  ...props
}) => {
  const baseStyles = 'py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-black';
  const buttonStyles = 'bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      className={`${baseStyles} ${buttonStyles} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="loader"></span> 
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
