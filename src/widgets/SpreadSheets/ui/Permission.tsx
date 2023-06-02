import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { spreadsheetsStore } from 'shared/stores/spreadsheets/model/spreadsheetsStore';

import cls from './SpreadSheets.module.scss';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const Permission = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values:any) => {
    setLoading(true);
    const { id, permissions } = values;
    try {
      await spreadsheetsStore.givePermission(id, { permissions: [permissions] });
      message.success('Permission created successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to create permission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name='permission-form'
        onFinish={onFinish}
        className={cls.form}
      >
        <h3>Дать разрешение</h3>
        <Form.Item
          label='Id документа'
          name='id'
          wrapperCol={{span:24}}
          rules={[{ required: true, message: 'Please input the spreadsheet ID' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Разрешение - email'
          name='permissions'
          wrapperCol={{span:24}}
          rules={[{ required: true, message: 'Please input the permission' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit' loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

