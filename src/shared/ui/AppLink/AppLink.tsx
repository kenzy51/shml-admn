import { Link } from 'react-router-dom';
import { FC } from 'react';
import cls from './AppLink.module.scss';
import { clsx } from 'clsx';
import { AppLinkProps, AppLinkTheme } from './types';

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={clsx(cls.AppLink, { [cls[theme]]: true }, [className])}
      {...otherProps}
    >
      {children}
    </Link>
  );
};
