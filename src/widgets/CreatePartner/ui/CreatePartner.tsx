import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Input, UploadProps, message, Button, Upload } from 'antd';
import { PartnerType } from 'shared/stores/partners/api/partnersApi';
import { partnerStore } from 'shared/stores/partners/model/partnerStore';
import { UploadOutlined } from '@ant-design/icons';
import { SketchPicker} from 'react-color';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface CreatePartnerProps {
  visible: boolean;
  setVisible: (ar: boolean) => void;
}

export const CreatePartner = observer(({ visible, setVisible }: CreatePartnerProps) => {

  const [form] = Form.useForm();

  const [iconUrl, setIconUrl] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newPartner: PartnerType = {
        title: values.title,
        description: values.description,
        background_color: backgroundColor,
        icon_url: iconUrl
      };
      await partnerStore.createPartner(newPartner);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to create Partner', error);
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
        const iconUrl =`${process.env.REACT_APP_BASE_URL}/${info.file.response.path}`;
        setIconUrl(iconUrl);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <Modal title='Создать партнера' open={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form {...layout} form={form}>
        <Form.Item
          label='Название'
          name='title'
          rules={[{ required: true, message: 'Введите название' }]}
          wrapperCol={{ span: 24 }}>
          <Input />
        </Form.Item>

        <Form.Item name='icon_url' label='Иконка' rules={[{ required: true, message: 'загрузите Иконку' }]}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} label='Бэкграунд:' name='background_color'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SketchPicker color={backgroundColor} onChange={(color) => setBackgroundColor(color.hex)} />
            <div style={{ width: '30px', height: '30px', backgroundColor: backgroundColor, marginLeft: '10px' }} />
          </div>
        </Form.Item>

        <Form.Item
          label='Описание'
          wrapperCol={{ span: 24 }}
          name='description'
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
});
