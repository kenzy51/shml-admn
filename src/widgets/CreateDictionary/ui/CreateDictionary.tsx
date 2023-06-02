import React, { useState } from 'react';
import { Form, Input, Button, Upload, UploadProps, message } from 'antd';
import { dictionaryStore } from 'shared/stores/dictionary/model/dictionaryStore';
import { DictionaryType } from 'shared/stores/dictionary/api/dictionaryApi';

import cls from './CreateDictionary.module.scss';
import { UploadOutlined } from '@ant-design/icons';

export const CreateDictionary = () => {
  const [form] = Form.useForm();
  const [shabookLink, setshabookLink] = useState('');
  const [policyLink, setPolicyLink] = useState('');

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const newDictionary: DictionaryType = {
        shabook_link: shabookLink,
        policy_link: policyLink,
        map_link: values.map_link,
        contacts: {
          icon_url: values.icon_url,
          title: values.title,
          link: values.link,
          background_color_hex: values.background_color_hex
        }
      };
      await dictionaryStore.createDictionary(newDictionary);
    } catch (error) {
      console.error('Failed to create dictionary', error);
    }
  };

  const props: UploadProps = {
    name: 'file',
    action: `${process.env.REACT_APP_BASE_URL}/file/upload`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const shabookLink = `${process.env.REACT_APP_BASE_URL}/${info.file.response.path}`;
        setshabookLink(shabookLink);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const props2: UploadProps = {
    name: 'file',
    action: `${process.env.REACT_APP_BASE_URL}/file/upload`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const policyLink = `${process.env.REACT_APP_BASE_URL}/${info.file.response.path}`;
        setPolicyLink(policyLink);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


  return (
    <Form form={form} onFinish={handleSubmit} className={cls.form} 
      initialValues={{
        contacts: [
          { icon_url: '', title: '', link: '', background_color_hex: '' },
        ],
      }}>
      {/* <Form.Item 
        label='Shabook ссылка' 
        name='shabook_link'>
        <Input />
      </Form.Item> */}

      <Form.Item label='Shabook' name='shabook_link' rules={[{ required: true, message: 'Загрузите' }]}>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>  Загрузить</Button>
        </Upload>
      </Form.Item>

      {/* <Form.Item 
        label='Политика конфиденциальости' 
        name='policy_link'>
        <Input />
      </Form.Item> */}

      <Form.Item label='Политика конфиденциальости' name='policy_link' rules={[{ required: true, message: 'Загрузите' }]}>
        <Upload {...props2}>
          <Button icon={<UploadOutlined />}> Загрузить</Button>
        </Upload>
      </Form.Item>


      <Form.Item label='Map ссылка' name='map_link'>
        <Input />
      </Form.Item>
      <Form.List name='contacts'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Form.Item {...field} key={field.name} >
                <Input.Group compact>
                  <Form.Item name={[field.name, 'icon_url']}>
                    <Input placeholder='Icon URL' />
                  </Form.Item>
                  <Form.Item name={[field.name, 'title']} >
                    <Input placeholder='Title' />
                  </Form.Item>
                  <Form.Item name={[field.name, 'link']} >
                    <Input placeholder='Link' />
                  </Form.Item>
                  <Form.Item name={[field.name, 'background_color_hex']}>
                    <Input placeholder='Background Color Hex' />
                  </Form.Item>
                  <Button danger onClick={() => remove(field.name)}>
                    Убрать
                  </Button>
                </Input.Group>
              </Form.Item>
            ))}
            <Form.Item>
              <Button type='dashed' onClick={() => add()} >
                Добавить контакт              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Создать справочник
        </Button>
      </Form.Item>
    </Form>
  );
};

