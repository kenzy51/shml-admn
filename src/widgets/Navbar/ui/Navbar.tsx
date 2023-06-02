import { useTranslation } from 'react-i18next';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { AppLinkTheme } from 'shared/ui/AppLink/types';
import { RoutePath } from 'app/providers/router/config/routeConfig';

import { clsx } from 'clsx';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className = '' }: NavbarProps) => {
  const { t } = useTranslation('main');
  return (
    <div className={clsx(cls.Navbar, {}, [className])}>
      
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        to={RoutePath.PROFILE}
        className={cls.links}
      >
        <span>
          {t('profile')}
        </span>
      </AppLink>
    </div>
  );
};


