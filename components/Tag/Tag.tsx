import { TagProps } from '@/components/Tag/Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';

export const Tag = ({
  children,
  size = 's',
  color = 'ghost',
  className,
  href,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.m]: size === 'm',
        [styles.s]: size === 's',
        [styles.ghost]: color === 'ghost',
        [styles.green]: color === 'green',
        [styles.red]: color === 'red',
        [styles.grey]: color === 'grey',
        [styles.primary]: color === 'primary',
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
