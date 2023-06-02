import { Button, Form, Input, Modal, message } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { CompanionType } from 'shared/stores/companions/api/companionApi';
import { companionStore } from 'shared/stores/companions/model/companionStore';
import { SketchPicker } from 'react-color';

import cls from './CreateCompanion.module.scss';

export const CreateCompanion = observer(({ isVisible, setIsVisible }: any) => {
  const [form] = Form.useForm();
  const [backgroundColor, setBackgroundColor] = useState('');

  const handleSubmit = async (values: CompanionType) => {
    try {
      values.background_hex_color = backgroundColor;
      await companionStore.createCompanion(values);
      form.resetFields();
      message.success('Companion created successfully!');
    } catch (error) {
      console.error(error);
      message.error('Error creating companion.');
    }
  };

  const handleColorChange = (color:any) => {
    setBackgroundColor(color.hex);
  };

  return (
    <Modal
      title='Создать компаньона'
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      className={cls.modal}
      footer={null}
    >
      <Form onFinish={handleSubmit} form={form} layout='vertical'>
        <Form.Item label='Name' name='name' rules={[{ required: true }]}>
          <Input placeholder='Enter name' />
        </Form.Item>
        <Form.Item label='Description' name='description' rules={[{ required: true }]}>
          <Input.TextArea placeholder='Enter description' />
        </Form.Item>
        <Form.Item label='Icon URL' name='icon_url' rules={[{ required: true }]}>
          <Input placeholder='Enter icon URL' />
        </Form.Item>
        <Form.Item label='Website URL' name='website_url' rules={[{ required: true }]}>
          <Input placeholder='Enter website URL' />
        </Form.Item>
        <Form.Item label='Background Hex Color' name='background_hex_color' rules={[{ required: true }]}>
          <SketchPicker color={backgroundColor} onChange={handleColorChange} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Создать компаньона
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
});
