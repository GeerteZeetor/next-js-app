import { Button, Htag, P, Rating, Tag } from '@/components';
import { useState } from 'react';
import { withLayout } from '@/layout/Layout';

function Home(): JSX.Element {
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
    </>
  );
}
export default withLayout(Home);
