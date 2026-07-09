import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'ghost';

type AnchorProps = { href: string } & ComponentPropsWithoutRef<'a'>;
type NativeButtonProps = { href?: undefined } & ComponentPropsWithoutRef<'button'>;

type ButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
} & (AnchorProps | NativeButtonProps);

export default function Button({ variant = 'ghost', children, className = '', ...rest }: ButtonProps) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as ComponentPropsWithoutRef<'a'>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<'button'>)}>
      {children}
    </button>
  );
}
