
import { Modal, Form, Input,  Button } from 'antd';
import React, { useState } from 'react';
import { Contacts, Picture, Sponsor } from 'widgets/EventCreation/ui/types';

export const CreateSponsor = ({ isVisible, setIsVisible }: any) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>('');

  const onFinish = (values: Sponsor & Contacts & Picture) => {
    const sponsor = {
      full_name: values.full_name,
      description: values.description,
      picture: {
        url: imageUrl,
        title: values.picture?.title
      },
      contacts: {
        instagram: values.instagram,
        phone: values.phone,
        email: values.email,
      },
      org_id: values.org_id,
    };

    setIsVisible(false);
    form.resetFields();
    setImageUrl('');
  };
  return (
    <Modal    
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
      title='Создать спонсора'
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item label='Full Name' name='full_name' rules={[{ required: true, message: 'Please enter full name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label='Picture URL' name={['picture', 'url']}>
          <Input />
        </Form.Item>
        <Form.Item label='Picture Title' name={['picture', 'title']}>
          <Input />
        </Form.Item>
        <Form.Item label='Phone' name='phone'>
          <Input />
        </Form.Item>
        <Form.Item label='Email' name='email'>
          <Input />
        </Form.Item>
        <Form.Item label='Instagram' name='instagram'>
          <Input />
        </Form.Item>
        <Form.Item label='Organization ID' name='org_id'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>Create Speaker</Button>
        </Form.Item>
      </Form>
    </Modal>
  )}