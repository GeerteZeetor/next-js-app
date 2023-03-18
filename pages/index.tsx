import axios from 'axios';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import { Button, Htag, Input, P, Rating, Tag } from '@/components';
import { withLayout } from '@/layout/Layout';
import { MenuItem } from '@/interfaces/menu.interface';
import { TextArea } from '@/components/TextArea/TextArea';
import { API } from '@/helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h1">Заголовок</Htag>
      <Button appearance="primary" arrow="right">
        Button
      </Button>
      <Button appearance="ghost" arrow="down">
        Button
      </Button>
      <P size="l">Large</P>
      <P>Medium</P>
      <P size="s">Small</P>
      <Tag>Ghost</Tag>
      <Tag size="m" color="red">
        Red
      </Tag>
      <Tag color="green">Green</Tag>
      <Tag size="m" color="grey" href="google.com">
        Grey
      </Tag>
      <Tag color="primary">Primary</Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
      <Input placeholder="Тест" />
      <TextArea placeholder="Текст отзыва" />
    </>
  );
}
export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
