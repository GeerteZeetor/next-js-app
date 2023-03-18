import styles from './Card.module.css';
import cn from 'classnames';
import { CardProps } from '@/components/Card/Card.props';
import { ForwardedRef, forwardRef } from 'react';

export const Card = forwardRef(
  (
    { children, color = 'white', className, ...props }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div
        ref={ref}
        className={cn(styles.card, className, {
          [styles.white]: color === 'white',
          [styles.blue]: color === 'blue',
        })}
        {...props}
      >
        {children}
      </div>
    );
  }
);
