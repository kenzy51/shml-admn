import { Modal, Form, Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { programStore } from 'shared/stores/program/model/programStore';
import { ProgramType } from 'shared/stores/program/api/programApi';
import {  CampId, Date, Description, EndTime, EventId, Room, Speaker, StartTime, Title } from './FormEntities';
import { speakerStore } from 'shared/stores/speaker/model/speakerStore';
import { useEffect } from 'react';
import { campStore } from 'shared/stores/camp/model/campStore';

interface CreatePostForEventProps {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
  eventId: string
}
export const CreateProgramModal = observer(({ isVisible, setVisible, eventId }: CreatePostForEventProps) => {
  const [form] = Form.useForm();

  const handleCreateProgram = async () => {
    try {
      const values = await form.validateFields();
      const program: ProgramType = {
        title: values.title,
        speaker: values.speaker,
        description: values.description,
        is_main_room: values.room,
        date: values.date.format('YYYY-MM-DD'),
        start_time: values.start_time
          .format('HH:mm'),
        end_time: values.end_time
          .format('HH:mm'),
        event_id: eventId,
        camp_id: values.camp_id
      };
      await programStore.createProgram(program);
      // form.resetFields();
      setVisible(false);
    } catch (error) {
      console.error('Failed to create program', error);
    }
  };
  useEffect(() => {
    campStore.getAllCamps();
    const fetchSpeakers = (id:string)=>{
      speakerStore.getAllSpeakers(id);
    }
    fetchSpeakers(eventId);
  }, []);


  return (
    <>
      <Modal
        title='Создать программу'
        open={isVisible}
        onCancel={() => setVisible(false)}
        onOk={handleCreateProgram}
      >
        <Form form={form}>
          <Title />
          <Speaker eventId={eventId} speakerStore={speakerStore} />
          <Description />
          <CampId campStore={campStore} />         
          <Room form={form} />
          <Date />
          <StartTime />
          <EndTime />
        </Form>
      </Modal>
    </>
  );
})