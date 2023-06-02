// import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';
import {useTranslation} from 'react-i18next';
import {clsx} from 'clsx';
import notFound from '../assets/error.svg'
import { Button } from 'antd';
import { useNavigate } from 'react-router';
interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={clsx(cls.NotFoundPage, className)}>
      <h1>OOPS...</h1>
      <h2>{t('Страница не найдена')}</h2>
      <img src={notFound} className={cls.notFound} />
      <Button onClick={()=>navigate('/')} type='primary'>Перейти на главную страницу</Button>
    </div>
  );
};
