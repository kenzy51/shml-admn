import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import { Button } from '../../../shared/ui/Button/Button';
import { ErrorPlugProps } from './types';

import cls from './ErrorPage.module.scss';


export const ErrorPlug = ({ className }: ErrorPlugProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={clsx(cls.ErrorPage, className)}>
      <h1 className={cls.ErrorMessage}>{t('Oops!..')}</h1>
      <p className={cls.ErrorDescription}>{t('Произошла непредвиденная ошибка')}</p>
      <Button onClick={reloadPage} className={cls.ErrorButton}>{t('Обновить страницу')}</Button>
    </div>
  );
};
