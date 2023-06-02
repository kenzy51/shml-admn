import { FC } from 'react';
import cls from './Button.module.scss';
import {ButtonProps, ButtonSize} from './types';
import { clsx } from 'clsx';

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    disabled,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const mods: Record<string, boolean | undefined> = {
    [cls[size]]: true,
    [cls.disabled]: disabled,
  };

  return (
    <button
      type='button'
      className={clsx(cls.Button, mods, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};
