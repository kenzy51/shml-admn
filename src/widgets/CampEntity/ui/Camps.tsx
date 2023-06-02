import { Avatar, Button, Dropdown, List, Menu, MenuProps, notification, Space, Table, TabPaneProps, Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { CampType } from 'shared/stores/camp/api/campApi';
import { campStore } from 'shared/stores/camp/model/campStore';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { CampCreation } from 'widgets/CampCreation';
import { AssignZone } from 'widgets/AssignZone';
import { Partners } from 'widgets/Partners/ui/Partners';
import { DeleteOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import { AssignPartner } from 'widgets/AssignPartnerToCamp';
import {Companion} from 'widgets/Companion/ui/Companion';

import cls from './Camps.module.scss';
import { CompanionType } from 'widgets/CompanionType';

const CampsEntity = observer(({ eventId, camp }: any | CampType) => {
  const [isVisible, setIsVisible] = useState(false);
  const [assignZone, setAssignZone] = useState(false);
  const [assignPartner, setAssignPartner] = useState(false);

  useEffect(() => {
    campStore.getAllCamps();
  }, []);

  const deleteCamp = async (campId: string) => {
    try {
      await campStore.deleteCamp(campId);
      notification.success({
        message: 'Success',
        description: `The camp has been deleted`,
      });
      campStore.camps = campStore.camps.filter((camp) => camp._id !== campId);
    } catch (error) {
      console.error(error, 'err');
    }
  };

  const columns = [
    {
      title: 'Аватар',
      dataIndex: 'icon_url',
      render: (icon_url: string) => <Avatar src={icon_url} />,
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      render: (name: string, record: any) => (
        <AppLink to={`../../camp/${record._id}`}>{name}</AppLink>
      ),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
    },
    {
      title: '',
      dataIndex: '',
      render: (_: any, record: any) => (
        <DeleteOutlined onClick={() => deleteCamp(record._id)} />
      ),
    },
  ];
  const items: MenuProps['items']= [
    {
      key: '1',
      label:(
        <Button onClick={() => setIsVisible(true)} type='text'>
          Создать лагерь
        </Button>
      )
    }, 
    {
      key: '2',
      label:(
        <Button onClick={() => setAssignZone(true)} type='text'>
          Добавить зону к определенному лагерю
        </Button>
      )
    }, 
    {
      key: '3',
      label:(
        <Button onClick={() => setAssignPartner(true)} type='text'>
          Добавить партнера к определенному лагерю
        </Button>
      )
    },
  ];
  const dataSource = campStore.camps.filter((camp) => camp.event_id === eventId);
  return (
    <>
      <h2>Лагеря</h2>
      <div className={cls['buttons']} style={{marginBottom:'1%'}}>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Действия            
              <PlusOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <Table columns={columns} dataSource={dataSource} rowKey='_id' />
      <CampCreation isVisible={isVisible} setIsVisible={setIsVisible} eventId={eventId} />
      <AssignZone assignZone={assignZone} setAssignZone={setAssignZone} />
      <AssignPartner assignPartner={assignPartner} setAssignPartner={setAssignPartner} />
    </>
  );
});
interface MyTabPaneProps extends TabPaneProps {
  children: React.ReactNode;
  key:string;
  label:string
}

export const Camps = observer(({eventId}:any) => {
  const tabItems: MyTabPaneProps[] = [
    { key: '1', label: ('Лагеря'),children: <CampsEntity eventId={eventId}/> },
    { key: '2', label: ('Партнеры'), children: <Partners/> },
    { key: '3', label: ('Компаньоны'), children: <Companion/> },
    { key: '4', label: ('Тип компаньона'), children: <CompanionType/> },
  ];
  const onChange = (activeKey: string) => {
    console.log(activeKey);
  };
  return (
    <div>
      <Tabs defaultActiveKey='1' tabPosition='top' onChange={onChange} items={tabItems} />
    </div>
  );
})
