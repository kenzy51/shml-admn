import React from 'react';
import { Form, Input, Button } from 'antd';
import { userNotificationStore } from 'shared/stores/userNotifications/model/userNotificationStore';
import { UserNotificationType } from 'shared/stores/userNotifications/api/userNotificationsApi';
import cls from './CreateUserNotification.module.scss';

export const CreateUserNotification = () => {
  const onFinish = async (values: UserNotificationType) => {
    try {
      await userNotificationStore.createUserNotification(values);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  const [form] = Form.useForm();

  return (
    <div>
      <Form form={form} onFinish={onFinish} className={cls.form} >
        <h1>Создать уведомление</h1>
        <Form.Item
          name='title'
          label='Название'
          wrapperCol={{ span: 24 }}
          rules={[{ required: true }]}>
          <Input />

        </Form.Item>

        <Form.Item
          name='body'
          label='Описание'
          wrapperCol={{ span: 24 }}
          rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Создать уведомление
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
