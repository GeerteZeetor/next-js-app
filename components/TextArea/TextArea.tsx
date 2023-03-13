import styles from './TextArea.module.css';
import cn from 'classnames';
import { TextAreaProps } from '@/components/TextArea/TextArea.props';

export const TextArea = ({
  className,
  ...props
}: TextAreaProps): JSX.Element => {
  return <textarea className={cn(className, styles.textArea)} {...props} />;
};
