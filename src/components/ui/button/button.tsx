import React from 'react';
import s from './button.module.scss';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}

export const Button = ({ children, onClick, className }: ButtonProps) => {
	return (
		<button className={`${s.button} ${className || ''}`} onClick={onClick}>
			{children}
		</button>
	);
};
