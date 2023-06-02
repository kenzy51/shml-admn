/* eslint-disable indent */
import { Button, Empty, Pagination, Spin, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { CreateSpeaker } from 'widgets/CreateSpeaker';
import { speakerStore } from 'shared/stores/speaker/model/speakerStore';
import { observer } from 'mobx-react-lite';

import cls from './Speakers.module.scss';

export const Speakers = observer(({ eventId }: { eventId: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const speakersPerPage = 3;

  useEffect(() => {
    async function fetchData() {
      speakerStore.clearSpeakers();
      await speakerStore.getAllSpeakers(eventId);
      setLoading(false);
    }
    fetchData();
  }, [eventId]);

  const speakers = speakerStore.speakers;
  const start = (currentPage - 1) * speakersPerPage;
  const end = start + speakersPerPage;
  const speakersToDisplay = speakers.slice(start, end);

  const columns = [
    {
      title: 'Имя спикера',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Главная сцена',
      dataIndex: 'is_main_scene',
      key: 'is_main_scene',
      render:(value:boolean) => value ? 'Да' : 'Нет'
    },
  ];

  if (loading) {
    return <Spin size='large' />;
  }

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>
        Создать спикера
      </Button>
      <div className={cls.wrapper}>
        <Table
          dataSource={speakersToDisplay} 
          columns={columns} 
          pagination={false} 
          style={{width:'100%'}}
          rowKey='_id'
          />
      </div>
      <CreateSpeaker isVisible={isVisible} setIsVisible={setIsVisible} eventId={eventId} />
      <div className={cls.pagination}>
        {speakers.length === 0 ? (
          ''
        ) : (
          <Pagination
            current={currentPage}
            pageSize={speakersPerPage}
            total={speakerStore.speakers.length}
            onChange={(page: number) => setCurrentPage(page)}
          />
        )}
      </div>
    </>
  );
});