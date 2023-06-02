import React, { ChangeEvent, useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { CampType } from 'shared/stores/camp/api/campApi';
import { campStore } from 'shared/stores/camp/model/campStore';
import { zoneStore } from 'shared/stores/zone/model/zoneStore';
import { ZoneType } from 'shared/stores/zone/api/zoneApi';
import { observer } from 'mobx-react-lite';
import cls from './AssignZone.module.scss';
const { Option } = Select;

export const AssignZone = observer(({ assignZone, setAssignZone }: any) => {

  const [campId, setCampId] = useState<string>('')
  const [zoneId, setZoneId] = useState<string>('')

  const [camps, setCamps] = useState<Array<CampType>>([])
  const [zones, setZones] = useState<Array<ZoneType>>([])

  useEffect(() => {
    const getAllCamps = () => {
      campStore.getAllCamps();
      const camps = campStore.camps;
      setCamps(camps)
    }
    const getAllZones = () => {
      zoneStore.getAllZones();
      const zones = zoneStore.zones;
      setZones(zones);
    }
    getAllCamps();
    getAllZones();
  }, [zones, camps])

  const onFinish = async (values: string) => {
    try {
      await campStore.assignZoneToCamp(campId, values);
    } catch (error) {
      console.error(error);
    }
  };
  const zonesOption = zoneStore.zones
    .map(zone => (
      <Select.Option key={zone._id} value={zone._id}>{zone.title}</Select.Option>
    ))
  const campOption = campStore.camps.map(camp => (
    <Select.Option key={camp._id} value={camp._id}>{camp.name}</Select.Option>
  ))
  return (
    <div className={cls['wrapper']}>
      <Modal
        title='Assign Zone'
        open={assignZone}
        onCancel={() => setAssignZone(false)}
        footer={null} >
        <Form layout='vertical'
          onFinish={onFinish}>
          <Form.Item
            label='Добавить зону'
            name='zone_id'>
            <div className={cls.select}>
              <Select
                className={cls.select}
              >
                {zonesOption}
              </Select>
            </div>
          </Form.Item>
          <Form.Item
            label='К данному лагерю'
            name='camp_id'>
            <div className={cls.select}>
              <Select
              >
                {campOption}
              </Select>
            </div>
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
})