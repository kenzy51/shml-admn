import { useTranslation } from 'react-i18next';
import { Suspense, useEffect } from 'react';
import { observer } from 'mobx-react-lite';


import { AppRouter } from './providers/router';

import { Sidebar } from 'widgets/Sidebar';
import { Navbar } from 'widgets/Navbar';
import { withVisible } from '../shared/hocs/withVisible';
import { authStore } from '../shared/stores/auth/model/authStore';

import { AppLink } from 'shared/ui/AppLink/AppLink';
import { AppLinkTheme } from 'shared/ui/AppLink/types';
import { RoutePath } from './providers/router/config/routeConfig';
// import { SocketIoProvider } from './providers/SocketIoProvider';

const TheSidebar = withVisible(Sidebar);
const TheNavbar = withVisible(Navbar);

import './styles/index.scss';
import 'antd/dist/reset.css';

export const App = observer(() => {
  const {t} = useTranslation();
  const { isAuth, setIsAuth } = authStore;

  useEffect(() => {
    setIsAuth();
  }, [isAuth]);

  return (
    <div className='App'>
      <Suspense fallback=''>
        <TheNavbar visible={isAuth} />
        <div className='content-page' >
          {/* TODO: configure socketIO */}
          {/*<SocketIoProvider /> */}
          <TheSidebar visible={isAuth} />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
});