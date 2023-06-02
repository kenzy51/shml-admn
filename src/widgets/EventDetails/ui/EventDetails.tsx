import { Button, Input, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { eventApi } from 'shared/stores/events/api/eventApi';
import { EventType } from 'shared/stores/events/types';
import cls from './EventDetails.module.scss';

const src = 'https://res.cloudinary.com/eventboost/image/upload/v1594283388/website/wp/eventboost-facebook-og-home.jpg'

export const EventDetails = observer(({ event,eventId }:any) => {
  const { t } = useTranslation('eventDetail');
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await eventApi.updateEvent(eventId, editedEvent);
      setIsEditing(false);
      console.log('sending')
      notification.success({
        message:'Event was succesfully altered, just update the page'
      })
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleCancel = () => {
    setEditedEvent(event);
    setIsEditing(false);
  };

  const handleChange = (field:keyof EventType , value:string | number) =>{
    setEditedEvent((prev:any)=>({
      ...prev,
      [field]:value
    }))
  }

  return (
    <div className={cls.wrapper}>
      <img src={src} alt='' className={cls.img} />
      <div className={cls.card}>
        {!isEditing ? (
          <>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{t('startDate')}: {event.start_date.slice(0,10)}</p>
            <p>{t('endDate')}: {event.end_date.slice(0,10)}</p>
            <p>{t('organizer')}: {event.org_id.slice(0, 20)}</p>
            <p>Уникальный ID:{eventId}</p>
            <Button onClick={handleEdit}>{t('edit')}</Button>
          </>
        ) : (
          <>
            <h4>Название:</h4>
            <Input
              type='text'
              value={editedEvent.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
            <h4>Описание:</h4>
            <Input.TextArea
              value={editedEvent.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />

            <h4>{t('Start date:')}</h4>
            <Input
              type='text'
              value={editedEvent.start_date}
              onChange={(e) => handleChange('start_date', e.target.value)}
            />

            <h4>{t('End date:')}</h4>
            <Input
              type='text'
              value={editedEvent.end_date}
              onChange={(e) => handleChange('end_date', e.target.value)}
            />
            
            <h4>Компания:</h4>
            <Input
              type='text'
              value={editedEvent.org_id}
              onChange={(e) => handleChange('org_id', e.target.value)}
            />
            <div className={cls.buttons}>
              <Button onClick={handleSave}>{t('save')}</Button>
              <Button onClick={handleCancel}>{t('cancel')}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
});
