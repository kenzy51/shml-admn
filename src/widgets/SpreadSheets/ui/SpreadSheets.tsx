import React from 'react';
import { AllSpreadSheets } from './AllSpreadSheets';
import { Permission } from './Permission';
import { Tabs } from 'antd';
const items = [
  {
    key: '1',
    label: 'Все таблицы',
    children: <AllSpreadSheets/>
  },
  {
    key: '2',
    label: 'Дать разрешение',
    children: <Permission/>,
  }]
export const SpreadSheets = () => {
  return (
    <Tabs items={items}/>
  );
};
