import React, {  useEffect, useState } from 'react';
import { Modal, Form, Button, Select } from 'antd';
import { CampType } from 'shared/stores/camp/api/campApi';
import { campStore } from 'shared/stores/camp/model/campStore';
import { partnerStore } from 'shared/stores/partners/model/partnerStore';
import { PartnerType } from 'shared/stores/partners/api/partnersApi';
import { observer } from 'mobx-react-lite';
import cls from './AssignPartner.module.scss';
const { Option } = Select;

export const AssignPartner = observer(({ assignPartner, setAssignPartner }: any) => {

  const [campId, setCampId] = useState<string>('')

  const [camps, setCamps] = useState<Array<CampType>>([])
  const [partners, setpartners] = useState<Array<PartnerType>>([])

  useEffect(() => {
    const getAllCamps = () => {
      campStore.getAllCamps();
      const camps = campStore.camps;
      setCamps(camps)
    }
    const getAllpartners = () => {
      partnerStore.getAllPartners();
      const partners = partnerStore.partners;
      setpartners(partners);
    }
    getAllCamps();
    getAllpartners();
  }, [partners, camps])

  const onFinish = async (values: string) => {
    try {
      await campStore.assignPartnerToCamp(campId, values);
    } catch (error) {
      console.error(error);
    }
  };
  const partnerOption = partnerStore.partners
    .map((partner:any) => (
      <Select.Option key={partner._id} value={partner._id}>{partner.title}</Select.Option>
    ))
  const campOption = campStore.camps.map(camp => (
    <Select.Option key={camp._id} value={camp._id}>{camp.name}</Select.Option>
  ))
  return (
    <div className={cls['wrapper']}>
      <Modal
        title='Привязать партнера'
        open={assignPartner}
        onCancel={() => setAssignPartner(false)}
        footer={null} >
        <Form layout='vertical'
          onFinish={onFinish}>
          <Form.Item
            label='Добавить партнера'
            wrapperCol={{span:24}}
            name='partner_id'>
            <div className={cls.select}>
              <Select
                className={cls.select}
              >
                {partnerOption}
              </Select>
            </div>
          </Form.Item>
          <Form.Item
            label='К данному лагерю'
            wrapperCol={{span:24}}
            name='camp_id'>
            <div className={cls.select}>
              <Select
              >
                {campOption}
              </Select>
            </div>
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Привязать
          </Button>
        </Form>
      </Modal>
    </div>
  );
})