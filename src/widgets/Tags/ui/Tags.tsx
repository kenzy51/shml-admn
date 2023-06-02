import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { tagStore } from 'shared/stores/tag/model/tagStore';
import cls from './Tags.module.scss';
import { CreateTag } from 'widgets/CreateTag';


export const Tags = observer(() => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [editingTag, setEditingTag] :any = useState(null);
  const { tags } = tagStore;

  useEffect(() => {
    tagStore.getAllTags();
  }, []);

  const handleCreateClick = () => {
    setIsVisible(true);
  };

  const handleEditClick = (record: any) => {
    setVisible(true);
    setEditingTag(record._id);
    form.setFieldsValue(record);
  };
  

  const handleDeleteClick = (id: string) => {
    tagStore.deleteTag(id);
    notification.success({
      message: 'Тип компаньона был успешно удален',
    });
  };

  const handleModalCancel = () => {
    form.resetFields();
    setVisible(false);
    setEditingTag(null);
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingTag) {
        tagStore.updateTag(editingTag, values);
      } 
      handleModalCancel();
      notification.success({
        message:'Тэг был успешно обновлен'
      })
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const columns = [
    {
      title: 'Тэг',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Действие',
      key: '',
      render: (record: any) => (
        <>
          <EditOutlined style={{ marginRight: 8 }} onClick={() => handleEditClick(record)} />
          <DeleteOutlined onClick={() => handleDeleteClick(record._id)} />
        </>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 4,
  };

  return (
    <div>
      <Button onClick={handleCreateClick}>Создать тэг</Button>
      <Table
        dataSource={tags}
        columns={columns}
        rowKey='_id'
        pagination={paginationConfig}
      />
      <Modal
        title={editingTag ? 'Редактирование тэга' : 'Создание тэга'}
        open={visible}
        onCancel={handleModalCancel}
        onOk={handleModalSubmit}
        className={cls.modal}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Тип' name='name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <CreateTag setIsVisible={setIsVisible} visible={isVisible} />
    </div>
  );
});
