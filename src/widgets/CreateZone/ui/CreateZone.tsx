import {  useState } from 'react';
import { Modal, Button, Form, Input, Select, UploadProps, message, Upload } from 'antd'; 
import { tagStore } from 'shared/stores/tag/model/tagStore';
import { ZoneType } from 'shared/stores/zone/api/zoneApi';
import { zoneStore } from 'shared/stores/zone/model/zoneStore';
import { UploadOutlined } from '@ant-design/icons';

export const CreateZone = ({isModalVisible, setIsModalVisible}:any) => {
  const [imageUrl, setImageUrl] = useState('');
  const [form] = Form.useForm();
  const handleCreateZone = async () => {
    const values = await form.validateFields();
    const zoneData: ZoneType = {
      title:values.title,
      description:values.description,
      tag_id:values.tag_id,
      img_url:imageUrl
    }
    await zoneStore.createZone(zoneData);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const props: UploadProps = {
    name: 'file',
    action: 'http://92.245.114.113:3009/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} файл был успешно загружен`);
        setImageUrl(info.file.response.url);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <Modal
        title='Создать зону'
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} 
      >
        <Form
          name='create-zone-form'
          onFinish={handleCreateZone}
          initialValues={{ tag_id: '' }}
          form={form}
        >
          <Form.Item
            label='Название'
            name='title'
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Описание'
            name='description'
            rules={[{ required: true, message: 'Введите описание!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='img_url' label='Фото' rules={[{ required: true, message: 'Please upload an photo' }]}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label='Tag ID'
            name='tag_id'
            rules={[{ required: true, message: 'Please enter a tag ID!' }]}
          >
            <Select>
              {tagStore.tags
                .map((tag) => (
                  <Select.Option key={tag._id} value={tag._id}>
                    {tag.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
