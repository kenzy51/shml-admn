import React, { useState } from 'react';
import { Button, Empty } from 'antd';
import { EventCreationModal } from 'widgets/EventCreation';
import { useTranslation } from 'react-i18next';

import cls from './EmptyEvents.module.scss'; 

export const EmptyEvents = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation('events');

  const handleCreateEvent = () => {
    setIsModalVisible(true);
  };

  return (
    <div className={cls.empty}> 
      <Empty description={t('emptyEvents')}>
        <Button type='primary' onClick={handleCreateEvent}>{t('create')}</Button>
        <EventCreationModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
      </Empty>
    </div>
  );
}