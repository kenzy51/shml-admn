import React, { useEffect, useState } from 'react';
import { Spin, Pagination, Table } from 'antd';
import { usersStore } from 'shared/stores/users/model/usersStore';
import cls from './UsersList.module.scss';
import { observer } from 'mobx-react-lite';
import { columns } from './UserEntities';

export const UsersList = observer(() => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await usersStore.getUsers();
      } catch (error) {
        console.error('Error while fetching users: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const onPageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className={cls.wrapper}>
        <h4>Пользователи</h4>
        {loading ? (
          <div><Spin /></div>
        ) : (
          <Table
            className={cls.list}
            dataSource={usersStore.users.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            columns={columns}
            rowKey='_id'
            pagination={false}
          />
        )}
      </div>
      <Pagination
        className={cls.pagination}
        current={currentPage}
        pageSize={pageSize}
        total={usersStore.users.length}
        onChange={onPageChange}
      />
    </>
  );
});
