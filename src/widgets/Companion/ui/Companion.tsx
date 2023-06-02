// import React, { useEffect, useState } from 'react';
// import { Table, Button,notification } from 'antd';
// import { observer } from 'mobx-react-lite';
// import { companionStore } from 'shared/stores/companions/model/companionStore';
// import { CreateCompanion } from 'widgets/CreateCompanion/ui/CreateCompanion';
// import { DeleteOutlined } from '@ant-design/icons';

// export const Companion = observer(() => {
//   const [isVisible, setIsVisible] = useState(false);
//   const { companions } = companionStore;

//   useEffect(() => {
//     companionStore.getAllCompanions();
//   }, [companionStore]);

//   const handleDelete = (id: string) => {
//     companionStore.deleteCompanion(id);
//     notification.success({
//       message: 'Компаньон был успешно удален',
//     });
//   };

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (record: any) => (
//         <DeleteOutlined type='link' onClick={() => handleDelete(record._id)}>
//           Delete
//         </DeleteOutlined>
//       ),
//     },
//   ];

//   const paginationConfig = {
//     pageSize: 4,
//   };

//   return (
//     <div>
//       <Button onClick={() => setIsVisible(true)}>Создать компаньона</Button>
//       <Table
//         dataSource={companions}
//         columns={columns}
//         rowKey='_id'
//         pagination={paginationConfig}
//       />
//       <CreateCompanion isVisible={isVisible} setIsVisible={setIsVisible} />
//     </div>
//   );
// });







import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { companionStore } from 'shared/stores/companions/model/companionStore';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import cls from './Companion.module.scss';
export const Companion = observer(() => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editingCompanion, setEditingCompanion] :any = useState(null);
  const { companions } = companionStore;

  useEffect(() => {
    companionStore.getAllCompanions();
  }, []);

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
    setEditingCompanion(null);
  };

  const handleEdit = (record:any) => {
    setEditingCompanion(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = (id:string) => {
    companionStore.deleteCompanion(id);
    notification.success({
      message: 'Компаньон был успешно удален',
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingCompanion) {
        companionStore.updateCompanion(editingCompanion._id, values);
      } else {
        companionStore.createCompanion(values);
      }
      handleCancel();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record:any) => (
        <>
          <EditOutlined style={{ marginRight: 8 }} onClick={() => handleEdit(record)} />
          <DeleteOutlined onClick={() => handleDelete(record._id)} />
        </>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 4,
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Создать компаньона</Button>
      <Table
        dataSource={companions}
        columns={columns}
        rowKey='_id'
        pagination={paginationConfig}
      />
      <Modal
        title={editingCompanion ? 'Редактирование компаньона' : 'Создание компаньона'}
        open={visible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        className={cls.modal}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Имя' name='name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Описание' name='description' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
