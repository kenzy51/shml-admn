import { Table, Pagination, Spin, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { AdminType } from 'shared/stores/admin/api/adminApi';
import { usersStore } from 'shared/stores/users/model/usersStore';
import cls from './AllAdmins.module.scss';
import { CreateAdmin } from 'widgets/CreateAdmin';

export const AllAdmins = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);
  const [isVisible, setIsVisible] = useState(false)
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

  const startCardIndex = (currentPage - 1) * pageSize;
  const endCardIndex = startCardIndex + pageSize;

  const columns = [
    {
      title: 'Полное имя',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Логин',
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  const data = usersStore.users
    .filter((admin: Partial<AdminType>) => admin.role === 'admin')
    .slice(startCardIndex, endCardIndex);

  return (
    <div className={cls.wrapper}>
      <Button onClick={()=> setIsVisible(true)}>Создать Админа</Button>
      {loading ? (
        <div><Spin className={cls.spin} /></div>
      ) : (
        <Table
          className={cls.table}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      )}
      <Pagination
        className={cls.pagination}
        current={currentPage}
        pageSize={pageSize}
        total={usersStore.users.filter((admin: Partial<AdminType>) => admin.role === 'admin').length}
        onChange={onPageChange}
      />
      <CreateAdmin
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </div>
  );
};
