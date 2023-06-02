import { Tabs } from 'antd';
import React from 'react';
import { CreateDictionary } from 'widgets/CreateDictionary';
import { DictionaryList } from 'widgets/DictionaryList/ui/DictionaryList';

export const Dictionary = () => {
  const items = [
    {
      key:'1',
      label:'Справочник',
      children:<DictionaryList/>
    }, 
    {
      key:'2',
      label:'Создать справочник',
      children:<CreateDictionary/>
    },
  ]
  return (
    <Tabs items={items}/>
  )
};
