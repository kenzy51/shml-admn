import { Breadcrumb } from 'antd';
import { SocketIoProvider } from 'app/providers/SocketIoProvider';
import { useTranslation } from 'react-i18next';
import { AppLink } from 'shared/ui/AppLink/AppLink';

export const ChatAdmin = () => {
  const {t} = useTranslation('chat')
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <AppLink to={'/'}>Main</AppLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('chat')}</Breadcrumb.Item>
      </Breadcrumb>
      <SocketIoProvider />
    </div>
  );
};
