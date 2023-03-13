import { SidebarProps } from '@/layout/Sidebar/Sidebar.props';
import styles from './Sidebar.module.css';
import { Menu } from '@/layout/Menu/Menu';
import Logo from '../logo.svg';
import cn from 'classnames';
import { Search } from '@/components';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <div>
        {' '}
        <Search />
      </div>
      <Menu />
    </div>
  );
};
