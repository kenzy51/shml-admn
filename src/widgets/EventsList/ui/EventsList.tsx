import { useState, useEffect, useCallback } from 'react';
import { Button, List, Popconfirm, Spin } from 'antd';
import { EmptyEvents } from 'widgets/EmptyEvents';
import { observer } from 'mobx-react-lite';
import { eventApi } from 'shared/stores/events/api/eventApi';
import { Link } from 'react-router-dom';
import { EventCreationModal } from '../../EventCreation';
import cls from './EventsList.module.scss';


export interface EventData {
  _id: string;
  place_title: string;
  longitude: number;
  latitude: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  org_id: string;
  count_of_visitors: number;
  place: {
    title: string;
    longitude: number;
    latitude: number;
    image: string;
  };
  is_deleted: boolean;
}

const pagination = {
  pageSize: 2,
};

export const EventsList = observer(() => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventApi.getAll();
        const filteredEvents = response.data.items.filter((event: EventData) => !event.is_deleted)
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents()
  }, []);


  const deleteEvent = async (eventId: string) => {
    try {
      await eventApi.deleteEvent(eventId, { is_deleted: true });
      const updatedEvents = events.filter(event => event._id !== eventId);
      setEvents(updatedEvents)
    }
    catch (error) {
      console.error('error:', error)
    }
  }

  const src = 'https://res.cloudinary.com/eventboost/image/upload/v1594283388/website/wp/eventboost-facebook-og-home.jpg'

  const renderEvent = useCallback((event: EventData) => (
    <div>
      <List.Item key={event._id}>
        <Link to={`event/${event._id}`}>
          <div className={cls.eachCard}>
            <img
              src={src}
              className={cls.image}
              alt=''
            />
            <div className={cls.infoContent}>
              <span>{event._id}</span>
              <h4>{event.title}</h4>
              <p>{event.description.slice(0, 40)}</p>
            </div>
            <div className={cls.info2}>
              <p>Дата начала: {event.start_date.slice(0, 10)}</p>
              <p>Дата окончания: {event.end_date.slice(0, 10)}</p>
              <p>Организатор: {event.org_id.slice(0, 10)}</p>
            </div>
            <div className={cls.buttons}>
              <Button>Изменить</Button>
              <Popconfirm
                title='Delete the event'
                description='Are you sure to delete this event?'
                okText='Yes'
                onConfirm={() => deleteEvent(event._id)}
                cancelText='No'
              >
                <Button danger>Удалить</Button>
              </Popconfirm>
            </div>
          </div>
        </Link>
      </List.Item>
    </div>
  ), [])

  return (
    <div className={cls.all}>
      {loading ? (
        <div className={cls.loading}>
          <Spin size='large' className={cls.spin} />
        </div>
      ) : events.length ? (
        <div className={cls.flex}>
          <Button
            onClick={() => setIsModalVisible(true)}
            className={cls.addBtn}
          >
            Добавить событие
          </Button>
          <List
            className={cls.list}
            itemLayout='vertical'
            size='large'
            pagination={pagination}
            dataSource={events}
            renderItem={renderEvent}
          />
        </div>
      ) : (
        <EmptyEvents />
      )}
      <EventCreationModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
});