import { Spin, Table } from 'antd';
import React from 'react';
import { ZoneType } from 'shared/stores/zone/api/zoneApi';

interface CampZonesProps {
  zones: ZoneType[];
  loading: boolean;
}

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '_id',
    dataIndex: '_id',
    key: '_id',
  },
];

export const CampZones = ({ zones, loading }: CampZonesProps) => {
  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Table dataSource={zones} columns={columns} rowKey='_id' />
      )}
    </div>
  );
};
