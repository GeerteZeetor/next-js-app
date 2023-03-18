import styles from './TextArea.module.css';
import cn from 'classnames';
import { TextAreaProps } from '@/components/TextArea/TextArea.props';
import { ForwardedRef, forwardRef } from 'react';

export const TextArea = forwardRef(
  (
    { className, error, ...props }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    return (
      <div className={cn(className, styles.textAreaWrapper)}>
        <textarea
          className={cn(styles.textArea, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
