import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { companionStore } from 'shared/stores/companions/model/companionStore';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import cls from './Companion.module.scss';
export const CompanionType = observer(() => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editingCompanionType, setEditingCompanionType] :any = useState(null);
  const { companionTypes } = companionStore;

  useEffect(() => {
    companionStore.getCompanionTypes();
  }, []);

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
    setEditingCompanionType(null);
  };

  const handleEdit = (record:any) => {
    setEditingCompanionType(record);
    form.setFieldsValue(record);
    setVisible(true);
   
  };

  const handleDelete = (id:string) => {
    companionStore.deleteCompanionType(id);
    notification.success({
      message: 'Тип компаньона был успешно удален',
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingCompanionType) {
        companionStore.updateCompanionType(editingCompanionType._id, values);
      } else {
        companionStore.createCompanionType(values);
      }
      handleCancel();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const columns = [
    {
      title: 'Тип',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Действие',
      key: '',
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
      <Button onClick={() => setVisible(true)}>Создать тип компаньона</Button>
      <Table
        dataSource={companionTypes}
        columns={columns}
        rowKey='_id'
        pagination={paginationConfig}
      />
      <Modal
        title={editingCompanionType ? 'Редактирование типа компаньона' : 'Создание типа компаньона'}
        open={visible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        className={cls.modal}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Тип' name='title' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
