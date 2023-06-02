import { Button, List, Popconfirm, Spin } from 'antd';
import pagination from 'antd/es/pagination';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventApi } from 'shared/stores/events/api/eventApi';
import { eventStore } from 'shared/stores/events/model/eventsStore';
import { EmptyEvents } from 'widgets/EmptyEvents';
import { EventCreationModal } from 'widgets/EventCreation';
import { EventData } from 'widgets/EventCreation/ui/types';

import cls from './CompanyEvents.module.scss';
  interface EventProps {
    companyId: ReactNode
  }
export const CompanyEvents = ({ companyId }: EventProps) => {
  const [companyEvents, setCompanyEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventApi.getAll()
        const filteredCompanyEvents = response.data.items.filter((event: EventData) => event.org_id === companyId && !event.is_deleted)
        setCompanyEvents(filteredCompanyEvents)
      }
      catch (error) {
        console.error('error with:', error)
      }
    }
    fetchEvents();
  }, [])

  const renderEvent = useCallback((event: EventData) => (
    <div>
      <List.Item key={event._id}>
        <Link to={`../../event/${event._id}`}>
          <div className={cls.eachCard}>
            <img
              className={cls.image}
              alt=''
            />
            <div className={cls.infoContent}>
              <span>{event._id}</span>
              <h4>{event.title}</h4>
              <p>{event.description.slice(0, 40)}</p>
            </div>
            <div className={cls.info2}>
              <p>Start date: {event.start_date.slice(0, 10)}</p>
              <p>End date: {event.end_date.slice(0, 10)}</p>
              <p>Organizer: {event.org_id.slice(0, 10)}</p>
            </div>
            <div className={cls.buttons}>
              <Button>Edit</Button>
              <Popconfirm
                title='Delete the event'
                description='Are you sure to delete this event?'
                okText='Yes'
                cancelText='No'
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
          </div>
        </Link>
      
      </List.Item>
    </div>
  ),[])

  const pagination = {
    pageSize: 2,
  };
  return (
    <div className={cls.all}>
      {loading ? (
        <div className={cls.loading}>
          <Spin size='large' className={cls.spin} />
        </div>
      ) : companyEvents.length ? (
        <div className={cls.flex}>
          <Button
            onClick={() => setIsModalVisible(true)}
            className={cls.addBtn}
          >
            Add Event
          </Button>
          <List
            className={cls.list}
            itemLayout='vertical'
            size='large'
            pagination={pagination}
            dataSource={companyEvents}
            renderItem={renderEvent}
          />
        </div>
      ) : (
        <EmptyEvents />
      )}
      <EventCreationModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};
