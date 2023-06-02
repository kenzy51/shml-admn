import { Button, message, notification, Table, Tag, Modal, Form, Input, Upload, UploadProps, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { ZoneType } from 'shared/stores/zone/api/zoneApi';
import { zoneStore } from 'shared/stores/zone/model/zoneStore';
import { observer } from 'mobx-react-lite';
import { CreateZone } from 'widgets/CreateZone';
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { tagStore } from 'shared/stores/tag/model/tagStore';

export const Zones = observer(() => {
  const [imageUrl, setImageUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingZone, setEditingZone] :any = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    zoneStore.getAllZones();
    tagStore.getAllTags();
  }, []);

  const { zones } = zoneStore;
  const { tags } = tagStore;


  const deleteZone = (zone: ZoneType) => {
    try {
      zoneStore.deleteZone(zone._id);
      notification.success({
        message: `${zone.title} была успешно удалена`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // 
  const showEditModal = (zone: any) => {
    setEditingZone(zone);
    setIsModalVisible(true);
    form.setFieldsValue(zone);
  };

  const handleEditModalCancel = () => {
    setIsModalVisible(false);
    setEditingZone(null);
    form.resetFields();
  };

  const handleEditModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      zoneStore.updateZone(editingZone._id, values);
      setIsModalVisible(false);
      setEditingZone(null);
      form.resetFields();
      notification.success({
        message: 'Зона была успешно обновлена',
      });
    } catch (error) {
      console.error(error);
    }
  };


  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
    },
    {
      title: 'Тэг',
      dataIndex: 'tag_id',
      render: (tagId: string) => {
        const tag = tags.find((tag) => tag._id === tagId);
        return tag ? <Tag color='blue'>{tag.name}</Tag> : null;
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_: any, record: ZoneType) => (
        <><EditOutlined type='link' onClick={() => showEditModal(record)}>Редактировать</EditOutlined>
          <DeleteOutlined onClick={() => deleteZone(record)} size={16} /></>
      ),
    },
  ];

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
  const data = zones.map((zone) => ({
    ...zone,
    key: zone._id,
  }));

  return (
    <>
      <Button onClick={() => setModalVisible(true)}>
        Создать зону
      </Button>
      <Table columns={columns} dataSource={data} rowKey='_id' />

      <CreateZone isModalVisible={modalVisible} setIsModalVisible={setModalVisible} />

      <Modal
        title='Edit zone'
        open={isModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalSubmit}
        destroyOnClose
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Название' name='title' rules={[{ required: true, message: 'Пожалуйста, введите название зоны' }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Описание' name='description'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name='img_url' label='Фото' rules={[{ required: true, message: 'Please upload an photo' }]}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </Form.Item>  
          <Form.Item
            label='Тэг'
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
        </Form>
      </Modal>
    </>
  );
});
