/* eslint-disable indent */
import { Breadcrumb, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { AllAdmins } from 'widgets/AllAdmins';
import { Dictionary } from 'widgets/Dictionary';
import { SpreadSheets } from 'widgets/SpreadSheets';
import { Support } from 'widgets/Support';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const items = [
    {
      key: '1',
      label: 'Администраторы',
      children: <AllAdmins />,
    }, 
    {
      key: '2',
      label: t('support'),
      children: <Support />,
    }, 
    {
      key: '3',
      label: 'Справочник',
      children: <Dictionary />,
    },
    {
      key: '4',
      label: 'Заявка на FAQ',
      children: <SpreadSheets/>,
    },
  ];
  return (
    <><Breadcrumb>
      <Breadcrumb.Item>
        <AppLink to={'/'}>Главная</AppLink>
      </Breadcrumb.Item><Breadcrumb.Item>Профиль</Breadcrumb.Item>
    </Breadcrumb>
      <Tabs items={items} /></>
  )
  ;
};

export default ProfilePage;
