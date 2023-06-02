import { clsx } from 'clsx';
import cls from './PageLoader.module.scss';
import { Loader } from '../Loader/Loader';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={clsx(cls.PageLoader, className)}>
    <Loader />
  </div>
);
