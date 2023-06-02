import { Breadcrumb, Button, Tabs } from 'antd';
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';
import React from 'react';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { CreateUserNotification } from 'widgets/CreateUserNotification';
import { UserNotificationsList } from 'widgets/UserNotificationsList';

const UserNotifications = () => {
  const items = [
    {
      key: '1',
      label: 'Уведомления',
      children: <UserNotificationsList/>,
    }, {
      key: '2',
      label: 'Создать уведомление',
      children: <CreateUserNotification/>,
    }
  ]
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <AppLink to={'/'}>
            Главная
          </AppLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Tabs items={items}/>
    </>
  );
};

export default UserNotifications;