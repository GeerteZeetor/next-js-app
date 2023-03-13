import React, { useState } from 'react';
import cn from 'classnames';
import { SearchProps } from '@/components/Search/Search.props';
import { Button, Input } from '@/components';
import styles from './Search.module.css';
import SearchIcon from './search.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      goToSearch();
    }
  };
  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input
        placeholder="Поиск..."
        value={search}
        onChange={event => setSearch(event.target.value)}
        className={styles.input}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};
