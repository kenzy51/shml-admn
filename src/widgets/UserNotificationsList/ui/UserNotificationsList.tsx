import  { useEffect, useState } from 'react';
import { Button, Table, Popconfirm } from 'antd';
import { userNotificationStore } from 'shared/stores/userNotifications/model/userNotificationStore';
import { observer } from 'mobx-react-lite';
import { DeleteOutlined } from '@ant-design/icons';

export const UserNotificationsList = observer(() => {
  useEffect(() => {
    userNotificationStore.getAlluserNotifications();
  }, []);
  
  const [deleteRecordId, setDeleteRecordId] = useState<string | undefined>(undefined);
  
  function handleDelete(recordId:string) {
    userNotificationStore.deleteUserNotification(recordId);
    setDeleteRecordId(undefined);
  }

  function handleCancelDelete() {
    setDeleteRecordId(undefined);
  }
  
  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Описание',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (_:any, record:any) => {
        console.log(record);
        return (    
          <Popconfirm
            title='Are you sure to delete this notification?'
            open={deleteRecordId === record._id}
            onConfirm={() => handleDelete(record._id)}
            onCancel={handleCancelDelete}
            okText='Yes'
            cancelText='No'
          >
            <Button onClick={() => setDeleteRecordId(record._id)} icon={<DeleteOutlined />} />
          </Popconfirm>
        );
      }
    }
  ];
  return (
    <div>
      <Table
        dataSource={userNotificationStore.userNotifications}
        columns={columns}
        rowKey='_id'
      />
    </div>
  );
})
