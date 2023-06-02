import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig, routeConfigPublic } from '../config/routeConfig';
import { authStore } from 'shared/stores/auth/model/authStore';
import { observer } from 'mobx-react-lite';
import { Spin } from 'antd';
import { clsx } from 'clsx';

export const AppRouter = observer(() => {
  const { isAuth } = authStore;
  const routes = isAuth ? routeConfig : routeConfigPublic;

  return (
    <Routes>
      {Object.values(routes).map(({ element, path }, index) => (
        <Route
          key={`${path}_${index}`}
          path={path}
          element={
            <Suspense fallback={<Spin className='spin' />}>
              <div className={clsx(['page-wrapper', { 'is-auth': !isAuth }])}>
                {element}
              </div>
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
});
