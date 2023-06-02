import { Button, Tabs } from 'antd';
import React, { useState } from 'react';
import { CreateLocation } from 'widgets/CreateLocationModal';
import { LocationList } from 'widgets/LocationList';

export const Location = () => {
  const items = [
    {
      key: '1',
      label: ('Локации События'),
      children: <LocationList/>
    },
    {
      key: '2',
      label: ('Создать Локацию'),
      children: <div className=''>
        <CreateLocation />
      </div>,
    },
  ];
  return (
    <Tabs items={items} defaultActiveKey='1'/>
  );
};
