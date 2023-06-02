import { Breadcrumb, Spin, Input, Button, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PartnerType } from 'shared/stores/partners/api/partnersApi';
import { partnerStore } from 'shared/stores/partners/model/partnerStore';

import cls from './PartnerDetail.module.scss';

export const PartnerDetail = () => {
  const [partner, setPartner] = useState<PartnerType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { partnerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartner = async () => {
      const result = await partnerStore.getPartnerById(partnerId);
      setPartner(result);
    };
    fetchPartner();
  }, [partnerId]);

  const handleEdit = async (values: any) => {
    const editedPartner = { ...partner, ...values };
    await partnerStore.editPartner(editedPartner);
    setIsEditing(false);
    setPartner(editedPartner);
  };

  if (!partner) {
    return <div><Spin /></div>;
  }

  return (
    <div className={cls.wrapper}>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate(-1)}>
          События
        </Breadcrumb.Item>
        <Breadcrumb.Item>{partner.title}</Breadcrumb.Item>
      </Breadcrumb>
      <h1>{isEditing ? (
        <Form onFinish={handleEdit} initialValues={partner}>
          <Form.Item 
            name='title' 
            label='Название' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item 
            name='description' 
            label='Описание' rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item> 
          <Form.Item name='background_color' label='Background' rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>Сохранить</Button>
            <Button onClick={() => setIsEditing(false)}>Отмена</Button>
          </Form.Item>
        </Form>
      ) : (
        <>
          {partner.title}
          <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
        </>
      )}</h1>
      <p>{partner.description}</p>
    </div>
  );
};

