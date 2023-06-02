import { Avatar, Button } from 'antd';

export const columns = [
  {
    title: 'Аватар',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (avatar: string) => <Avatar src={avatar} />
  },
  {
    title: 'Полное имя',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Должность',
    dataIndex: 'job_title',
    key: 'job_title',
  },
  {
    title: 'Место работы',
    dataIndex: 'work_place',
    key: 'work_place',
  },
  {
    title: 'Роль',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Логин',
    dataIndex: 'login',
    key: 'login',
  },
];