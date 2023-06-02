import React from 'react';
import { observer } from 'mobx-react-lite';
import { AdminType } from 'shared/stores/admin/api/adminApi';
import { adminStore } from 'shared/stores/admin/model/adminStore';
import { Input, Button, Form, Spin, Modal } from 'antd';
import { validationSchema } from 'shared/lib/validationSchema/validationSchema';
import { Rule } from 'antd/es/form';
import { useTranslation } from 'react-i18next';

import cls from './CreateAdmin.module.scss';

export const CreateAdmin = observer(({isVisible,setIsVisible}:any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('main');
  const handleCreateAdmin = async (values: AdminType) => {
    try {
      await validationSchema.validate(values, {abortEarly: false})
      await adminStore.createAdmin(values);
      form.resetFields();
    }
    catch (er) {
      console.error(er);

    }
  };

  const emailRules: Rule[] = [
    { type: 'email', message: t('notValidEmail') as string },
    { required: true, message: t('inputYourEmail') as string },
  ];
  
  const passwordRules = [
    { required: true, message: t('inputYourPassword') as string },
    { min: 8, message: t('rulePassword') as string },
  ];
  return (
    <Modal
      open={isVisible}
      onCancel={()=>setIsVisible(false)}
    >
      <h2>Создать Админа</h2>
      <Form form={form} onFinish={handleCreateAdmin}>
        <Form.Item
          label='Login'
          name='login'
          rules={emailRules}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={passwordRules}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>Create</Button>
        </Form.Item>
      </Form>
      {adminStore.isLoading && <Spin />}
    </Modal>
  );
});

