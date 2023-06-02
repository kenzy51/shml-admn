import React, { useEffect } from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react-lite';
import { locationStore } from 'shared/stores/location/model/locationStore';
import { columns } from './LocationColumns';

export const LocationList = observer(() => {
  useEffect(() => {
    locationStore.getAlllocations();
  }, []);


  const {locations} = locationStore;

  const pagination = {
    pageSize: 3,
    total: locations.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: any, range: any[]) => `${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <Table
      dataSource={locations}
      columns={columns}
      rowKey='_id'
      pagination={pagination}
    />
  );
});
