import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
} from 'react';
import { RatingProps } from '@/components/Rating/RatingProps';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import cn from 'classnames';

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      error,
      setRating,
      className,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    useEffect(() => {
      constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, index: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: index < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(index + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(index + 1)}
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
                isEditable && handleSpase(index + 1, e)
              }
            />
          </span>
        );
      });
      setRatingArray(updatedArray);
    };

    const changeDisplay = (index: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(index);
    };

    const onClick = (index: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(index);
    };
    const handleSpase = (index: number, e: KeyboardEvent) => {
      if (e.code !== 'Space' || !setRating) {
        return;
      }
      setRating(index);
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn(className, styles.ratingWrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((r, index) => (
          <span key={index}>{r}</span>
        ))}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
