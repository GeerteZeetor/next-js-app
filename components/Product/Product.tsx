import styles from './Product.module.css';
import cn from 'classnames';
import { ProductProps } from '@/components/Product/Product.props';
import {
  Button,
  Card,
  Divider,
  Rating,
  Review,
  ReviewForm,
  Tag,
} from '@/components';
import { declOfNum, priceRu } from '@/helpers/helpers';
import Image from 'next/image';
import { useRef, useState } from 'react';

export const Product = ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const scrollToReview = () => {
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    console.log(reviewRef.current);
  };
  return (
    <div className={className} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice && (
            <Tag className={styles.oldPrice} color="green">
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          {priceRu(product.credit)}
          <span className={styles.month}>/мес</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={product.reviewsAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map(c => (
            <Tag key={c} color="ghost" className={styles.category}>
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>Цена</div>
        <div className={styles.creditTitle}>Кредит</div>
        <div className={styles.rateTitle}>
          <a
            onClick={() => {
              setIsReviewOpened(true);
              scrollToReview();
            }}
            href="#ref"
          >
            {' '}
            {product.reviews.length ?? 0}{' '}
            {declOfNum(product.reviews.length, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map(c => (
            <div key={c.name} className={styles.characteristics}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Недостатки</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance="primary" children="Узнать подробнее" />
          <Button
            className={styles.reviewButton}
            appearance="ghost"
            children="Читать отзывы"
            arrow={isReviewOpened ? 'down' : 'right'}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          />
        </div>
      </Card>
      <Card
        ref={reviewRef}
        color="blue"
        className={cn(styles.reviews, {
          [styles.opened]: isReviewOpened,
          [styles.closed]: !isReviewOpened,
        })}
      >
        {product.reviews.map(r => (
          <div key={r._id}>
            <Review review={r} />
            <Divider />
          </div>
        ))}
        <ReviewForm productId={product._id} />
      </Card>
    </div>
  );
};
