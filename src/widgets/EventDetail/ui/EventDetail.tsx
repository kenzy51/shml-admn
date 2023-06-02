import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { eventStore } from 'shared/stores/events/model/eventsStore';
import { Breadcrumb, Spin, TabPaneProps, Tabs } from 'antd';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { PostsList } from 'widgets/PostsList';

import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { EventDetails } from 'widgets/EventDetails/ui/EventDetails';

import { Speakers } from 'widgets/Speakers';
import { Program } from 'widgets/Program/ui/Program';
import { Location } from 'widgets/Location';
import { Camps } from 'widgets/CampEntity';
import { UserRegistration } from 'widgets/UserRegistration';
import { Zones } from 'widgets/Zones';
import { Tags } from 'widgets/Tags';

import cls from './EventDetail.module.scss'

interface MyTabPaneProps extends TabPaneProps {
  children: React.ReactNode;
  key:string;
  label:string
}

export const EventDetail = observer(() => {
  const { eventId }  = useParams<{eventId:any}>();
  const { t } = useTranslation('events')
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await eventStore.getEventById( eventId);
      setEvent(event);
    };
    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div > <Spin size='large' className={cls.spin} /></div>;
  }
  const tabItems: MyTabPaneProps[] = [
    { key: '1', label: t('details'),children: <EventDetails event={event} eventId={eventId} className={cls.eventTab} /> },
    { key: '2', label: t('location'), children: <Location/> },
    { key: '3', label: t('postsList'), children: <PostsList eventId={eventId}/> },
    { key: '4', label: t('speakers'), children: <Speakers eventId={eventId} /> },
    { key: '5', label: t('program'), children: <Program eventId={eventId}/> },
    { key: '6', label: t('camp'), children: <Camps eventId={eventId}/>},
    { key: '7', label: 'Пользователи', children: <UserRegistration eventId={eventId}/>},
    { key: '8', label: t('zones'), children: <Zones/>},
    { key: '9', label: 'Тэги', children: <Tags/>},
  ];
  const onChange = (activeKey: string) => {
    console.log(activeKey);
  };
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <AppLink to={'/'}>Events</AppLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{event.title}</Breadcrumb.Item>
        <h5>
          Дата начала: {event.start_date.slice(0, 10)}
          -
        </h5>
        <h5>
          Дата окончания: {event.end_date.slice(0, 10)}
        </h5>
      </Breadcrumb>

      <Tabs defaultActiveKey='1' tabPosition='top' onChange={onChange} items={tabItems}/>
    </div>
  );
})