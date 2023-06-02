import { clsx } from 'clsx';
import './Loader.scss';
import { LoaderProps } from './types';

export const Loader = ({ className }: LoaderProps) => (
  <div className={clsx('lds-ellipsis', className)}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
