import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Input, Button } from 'antd';
import { tagStore } from 'shared/stores/tag/model/tagStore';
import { TagType } from 'shared/stores/tag/api/tagApi';

interface CreateTagModalProps {
  visible: boolean;
  setIsVisible:(arg0: boolean)=> void;
}

export const CreateTag = observer(({ visible, setIsVisible }: CreateTagModalProps) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newTag: TagType = {
        name: values.name,
      };
      await tagStore.createTag(newTag);
      form.resetFields();
      setIsVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsVisible(false);
  };

  return (
    <Modal
      title='Create Tag'
      open={visible}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input the name' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});

