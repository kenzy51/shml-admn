import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Input, Modal, Upload, UploadProps, message, notification } from 'antd';
import { CampType } from 'shared/stores/camp/api/campApi';
import { campStore } from 'shared/stores/camp/model/campStore';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';

interface PropsType {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  eventId: any
}
const rules = {
  nameRule: [{ required: true, message: 'Please enter a name' }],
  descriptionRule: [{ required: true, message: 'Please enter a description' }],
  iconRule: [{ required: true, message: 'Please enter an icon URL' }],
  imgRule: [{ required: true, message: 'Please enter an image URL' }]
}

export const CampCreation = observer(({ isVisible, setIsVisible, eventId }: PropsType) => {
  const [iconUrl, setIconUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [form] = Form.useForm();
  const handleCreateCamp = async () => {
    try {
      const values = await form.validateFields();
      const campData: CampType = {
        name: values.name,
        description: values.description,
        icon_url: iconUrl,
        img_url: imageUrl,
        event_id: eventId,
        label:values.label
      };
      await campStore.createCamp(campData);
      console.log(values);
      setIsVisible(false);
      notification.success({
        message: 'Success',
        description: `The camp has been creaeted`,
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const props: UploadProps = {
    name: 'file',
    action:`${process.env.REACT_APP_BASE_URL}/file/upload`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        const iconUrl = `${process.env.REACT_APP_BASE_URL}/${info.file.response.path}`
        setIconUrl(iconUrl);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const props2: UploadProps = {
    name: 'file',
    action:`${process.env.REACT_APP_BASE_URL}/file/upload`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const imageUrl = `${process.env.REACT_APP_BASE_URL}/${info.file.response.path}`;
        setImageUrl(imageUrl);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Modal
        open={isVisible}
        title='Создать новый лагерь'
        onCancel={handleCancel}
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={() => form.submit()}
          >
            Create
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleCreateCamp}>
          <Form.Item
            label='Имя'
            name='name'
            rules={rules.nameRule}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item> 
          <Form.Item
            label='Название'
            name='label'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Описание'
            name='description'
            rules={rules.descriptionRule}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea />
          </Form.Item>
          <Form.Item name='icon_url' label='Иконка' rules={[{ required: true, message: 'Please upload an icon' }]}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </Form.Item>

          <Form.Item name='img_url' label='Фото' rules={[{ required: true, message: 'Please upload an photo' }]}>
            <Upload {...props2}>
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});