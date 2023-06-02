import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Spin, Table } from 'antd';
import { programStore } from 'shared/stores/program/model/programStore';
import { columns } from './ProgramEntities';
import { ProgramType } from 'shared/stores/program/api/programApi';
import { CreateProgramModal } from 'widgets/CreateProgramModal/ui/CreateProgram';


export const Program = observer(({ eventId }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await programStore.getAllPrograms();
      } catch (error) {
        console.error('Error while fetching users: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const {programs} = programStore;

  // const filteredPrograms = programs.filter((program:any)=>(
  //   program.event._id === eventId
  // ))

  const handleTableChange = (pagination: any) => {
    setPage(pagination.current); 
    setPageSize(pagination.pageSize); 
  };


  return (
    <>
      <Button onClick={() => setIsVisible(!isVisible)}>Создать программу</Button>

      {loading ? (
        <div>
          <Spin />
        </div>
      ) : (
        <Table
          dataSource={programs}
          columns={columns}
          rowKey='_id'
          pagination={{ 
            current: page,
            pageSize: pageSize,
            total: programs.length,
            showSizeChanger: true,
            pageSizeOptions: ['4', '8', '12'],
          }}
          onChange={handleTableChange}
        />
      )}
      <CreateProgramModal isVisible={isVisible} setVisible={setIsVisible} eventId={eventId} />
    </>
  );
});

