import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Input, Button, Select, Upload, UploadProps, message } from 'antd';
import { partnerStore } from 'shared/stores/partners/model/partnerStore';
import { UploadOutlined } from '@ant-design/icons';

export const AddService = observer(({ visible, setVisible }: any) => {
  const [form] = Form.useForm();
  const [partnerId, setPartnerId] = useState('');
  const [iconUrl, setIconUrl]= useState('');

  const handleAddService = async (values:any) => {
    try {
      await partnerStore.addServiceToPartner(partnerId, {...values, icon_url:iconUrl});
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to add service', error);
    }
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
        message.success(`${info.file.name} file uploaded successfully`);
        setIconUrl(info.file.response.url);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    partnerStore.getAllPartners();
  }, []);

  return (
    <>
      <Modal
        title='Добавить сервис'
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key='cancel' onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={() => form.submit()}>
            Add
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleAddService}>
          <Form.Item name='icon_url' rules={[{ required: true, message: 'Please upload an icon' }]}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name='details'
            rules={[{ required: true, message: 'Please input a details' }]}
          >
            <Input.TextArea placeholder='details' />
          </Form.Item>
          <Form.Item
            label='Partner'
            name='partner_id'
            wrapperCol={{span:24}}
            rules={[{ required: true, message: 'Please select a partner' }]}
          >
            <Select onChange={(value: string) => setPartnerId(value)}>
              {partnerStore.partners.map((partner)=>(
                <Select.Option key={partner._id} value={partner._id}>
                  {partner.title}
                </Select.Option>
              ))}
            </Select>         
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});
