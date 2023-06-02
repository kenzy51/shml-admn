import React, { useEffect } from 'react';
import { Table } from 'antd';
import { spreadsheetsStore } from 'shared/stores/spreadsheets/model/spreadsheetsStore';
import { observer } from 'mobx-react-lite';

export const AllSpreadSheets = observer(() => {
  useEffect(() => {
    spreadsheetsStore.getAllTables(); 
  }, []);

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ссылка на документ',
      dataIndex: 'sheet_link',
      key: 'sheet_link',
      render:(sheetLink:string)=>(
        <a href={sheetLink} target='_blank' rel='noreferrer'>{sheetLink}</a>
      )
    },
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={spreadsheetsStore.spreadSheets}
      rowKey={(record:any) => record._id}
      loading={!spreadsheetsStore.spreadSheets.length} 
    />
  );
});