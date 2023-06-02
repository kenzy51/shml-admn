import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from 'antd';
import { DictionaryType } from 'shared/stores/dictionary/api/dictionaryApi';
import { dictionaryStore } from 'shared/stores/dictionary/model/dictionaryStore';

export const DictionaryList = observer(() => {
  useEffect(() => {
    dictionaryStore.getList();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Shabook Link',
      dataIndex: 'shabook_link',
      key: 'shabook_link',
      render:(text:string)=> <a href={text} target='blank'>Перейти</a>
    },
    {
      title: 'Policy link',
      dataIndex: 'policy_link',
      key: 'policy_link',
      render:(text:string)=> <a href={text} target='blank'>Перейти</a>
    },
  ];

  return (
    <Table<DictionaryType>
      columns={columns}
      dataSource={dictionaryStore.dictionaries}
      rowKey='_id'
    />
  );
});