
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  primary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, primary }) => {
  const buttonClasses = [styles.button, primary ? styles.primary : ''].join(' ');

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
