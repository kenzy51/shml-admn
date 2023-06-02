import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Input, Button, Select } from 'antd';
import { partnerStore } from 'shared/stores/partners/model/partnerStore';
import { tagStore } from 'shared/stores/tag/model/tagStore';

export const AssignTag = observer(({visible, setVisible}:any) => {
  const [form] = Form.useForm();
  const handleAssignTag = async (values:any) => {
    try {
      await partnerStore.assignTag(values.partner_id, values);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to assign tag', error);
    }
  };

  useEffect(() => {
    partnerStore.getAllPartners();
  }, []);


  const tagsOption = tagStore.tags.map((tag)=>(
    <Select.Option key={tag._id} value={tag._id}>
      {tag.name}
    </Select.Option>
  ));
  return (
    <>
      <Modal
        title={`Добавить тэг к партнеру`}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key='cancel' onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={() => form.submit()}>
            Assign
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleAssignTag}>
          <Form.Item
            label='Tag'
            wrapperCol={{span:24}}
            name='tag_id'
            rules={[{ required: true, message: 'Please input a tag' }]}
          >
            <Select>
              {tagsOption}
            </Select>
          </Form.Item>
          <Form.Item
            label='Partner'
            name='partner_id'
            wrapperCol={{span:24}}
            rules={[{ required: true, message: 'Please input a tag' }]}
          >
            <Select onChange={(value)=> form.setFieldsValue({partner_id:value})}>
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
