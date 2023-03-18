import cn from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { ReviewFormProps } from '@/components/ReviewForm/ReviewForm.props';
import {
  IReviewSetResponse,
  ReviewFormInterface,
} from '@/components/ReviewForm/ReviewForm.interface';
import { Button, Rating, TextArea, Input } from '@/components';
import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import axios from 'axios';
import { API } from '@/helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormInterface>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const onSubmit = async (formData: ReviewFormInterface) => {
    try {
      const { data } = await axios.post<IReviewSetResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что- то пошло не так..');
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните имя' },
          })}
          placeholder="Имя"
          error={errors.name}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' },
          })}
          placeholder="Заголовок отзыва"
          className={styles.titleInput}
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: 'Укажите оценку' },
            }}
            render={({ field }) => (
              <Rating
                error={errors.rating}
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
              />
            )}
          />
        </div>
        <TextArea
          {...register('description', {
            required: { value: true, message: 'Заполните отзыв' },
          })}
          className={styles.description}
          placeholder="Текст отзыва"
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.panel, styles.success)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div className={styles.successDescription}>
            Спасибо, ваш отзыв будет опубликован после проверки.
          </div>
          <CloseIcon
            className={styles.close}
            onClick={() => setIsSuccess(false)}
          />
        </div>
      )}
      {error && (
        <div className={cn(styles.panel, styles.error)}>
          Что-то пошло не так, попробуете перезагрузить страницу.
          <CloseIcon
            className={styles.close}
            onClick={() => setError(undefined)}
          />
        </div>
      )}
    </form>
  );
};
