import React, { useState } from 'react';
import { Button, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { CompanyCreationModal } from 'widgets/CompanyCreation';
import { EventsList } from 'widgets/EventsList';
import { CompaniesList } from 'widgets/CompaniesList';

export const CompaniesComponent = () => {
  const { t } = useTranslation('main');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const items = [
    // {
    //   key: '2',
    //   label: t('common'),
    //   children: (
    //     <>
    //       <Button onClick={() => setIsModalVisible(true)}>
    //         Создать компанию
    //       </Button>
    //     </>
    //   ),
    // },
    {
      key: '1',
      label: t('events'),
      children: <EventsList />,
    },
    //  {
    //   key: '3',
    //   label: t('companies'),
    //   children: <CompaniesList />,
    // },
  ];
  return (
    <div>
      <Tabs defaultActiveKey='1' items={items}/>
      <CompanyCreationModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};