import { Button, Form, Input, Modal, notification, Upload } from 'antd';
import React, { useState } from 'react';
import { postStore } from 'shared/stores/post/model/postStore';
import cls from './CreatePostForEvent.module.scss';

interface CreatePostProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

interface CreateFormData {
  title: string;
  pictureUrl: string[];
  description: string;
}

export const CreatePostForEvent = ({ isVisible, setIsVisible }: CreatePostProps) => {
  const { createPost } = postStore;
  const [form] = Form.useForm<CreateFormData>();
  const [pictureUrls, setPictureUrls] = useState<string[]>([]);

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      notification.success({
        message: `${info.file.name} file uploaded successfully`,
      });
      const pictureUrl = `${process.env.REACT_APP_BASE_URL}/${info.file.response.path}`
      setPictureUrls([...pictureUrls, pictureUrl]);
    } else if (info.file.status === 'error') {
      notification.error({
        message: `${info.file.name} file upload failed.`,
      });
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      const picture = pictureUrls.map((url) => ({ url, title: 'Picture' }));
      const formattedData = { ...formData, picture };
      await createPost(formattedData);
      notification.success({
        type: 'success',
        message: 'Sent successfully',
      });
      setIsVisible(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Modal
      title='Создать пост'
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
      className={cls.modal}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name='title'>
          <Input placeholder='Введите текст поста' className={cls.text} />
        </Form.Item>
        <Form.Item>
          <Upload
            action={`${process.env.REACT_APP_BASE_URL}/file/upload`}
            listType='picture'
            accept='image/*'
            multiple
            onChange={handleUpload}
          >
            <Button>Выберите изображения</Button>
          </Upload>
        </Form.Item>
        <Form.Item name='description'>
          <Input placeholder='Description' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Создать пост
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

