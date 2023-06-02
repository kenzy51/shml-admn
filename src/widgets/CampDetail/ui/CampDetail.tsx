import { Breadcrumb, Spin, Tabs } from 'antd';
import { TabPaneProps } from 'antd';
import React, { Key, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CampType } from 'shared/stores/camp/api/campApi';
import { campStore } from 'shared/stores/camp/model/campStore';
import { ZoneType } from 'shared/stores/zone/api/zoneApi';
import { zoneStore } from 'shared/stores/zone/model/zoneStore';
import { observer } from 'mobx-react-lite';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { CampZones } from './CampZones';
import { CampInfo } from './CampInfo';

interface MyTabPaneProps extends TabPaneProps {
  children: React.ReactNode;
  key: string;
  label: string;
}

export const CampDetail = observer(() => {
  const { campId } = useParams<{ campId: any }>();
  const [camp, setCamp] = useState<CampType | null>(null);
  const [zones, setZones] = useState<ZoneType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const camp = await campStore.getCampById(campId);
        setCamp(camp);
        await zoneStore.getAllZones();
        const zones = zoneStore.zones.filter((zone: ZoneType) => camp.zone_ids.includes(zone._id));
        setZones(zones);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [campId]);

  if (!camp) {
    return <div><Spin/></div>;
  }
  const tabItems = [
    {
      key: '1',
      label: 'Информация о лагере',
      children: <CampInfo camp={camp}/> 
    },
    {
      key: '2',
      label: 'Зоны Лагеря',
      children: <CampZones loading={loading} zones={zones}/>
    },
  ];

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <AppLink to={`../../event/${camp.event_id}`}>
            Перети обратно к странице</AppLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Tabs items={tabItems}/>
    </div>
  );
});



