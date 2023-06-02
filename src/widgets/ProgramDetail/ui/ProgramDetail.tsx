import { Button, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ProgramType, programApi } from 'shared/stores/program/api/programApi';
import { programStore } from 'shared/stores/program/model/programStore';

import {observer} from 'mobx-react-lite';

import cls from './ProgramDetail.module.scss';

export const ProgramDetail = observer(() => {
  const { programId } = useParams<{ programId: any }>();
  const [program, setProgram] = useState<ProgramType | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedProgram, setEditedProgram] = useState<ProgramType | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      const program = await programStore.getProgramById(programId);
      setProgram(program);
      setEditedProgram(program);
    };
    fetchProgram();
  }, [programId]);

  const handleSave = async () => {
    try {
      if (editedProgram) {
        await programApi.editProgram(programId, editedProgram);
        setProgram(editedProgram);
        setEditing(false);
        notification.success({
          message: 'Program was successfully updated',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (field: keyof ProgramType, value: string | number) => {
    if (editedProgram) {
      setEditedProgram({ ...editedProgram, [field]: value });
    }
  };

  return (
    <div className={cls.wrapper}>
      {program ? (
        <>
          {editing ? (
            <div className={`${cls['form-wrapper']}`}>
              <h1>Изменить программу</h1>
              <Form onFinish={handleSave} layout='vertical'>
                <Form.Item label='Название'>
                  <Input
                    value={editedProgram?.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder='Enter the program title'
                  />
                </Form.Item>
                <Form.Item label='Спикер'>
                  <Input
                    value={editedProgram?.speaker.full_name}
                    onChange={(e) => handleChange('speaker', e.target.value)}
                    placeholder="Enter the speaker's name"
                  />
                </Form.Item>
                <Form.Item label='Описание'>
                  <Input.TextArea
                    value={editedProgram?.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder='Enter the program description'
                  />
                </Form.Item>
                <div className={cls['form-row']}>
                  <Form.Item label='Комната' className={cls['form-item-half']}>
                    <Input
                      value={editedProgram?.room}
                      onChange={(e) => handleChange('room', e.target.value)}
                      placeholder='Введите комнату '
                    />
                  </Form.Item>
                  <Form.Item label='Дата' className={cls['form-item-half']}>
                    <Input
                      value={editedProgram?.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      placeholder='Enter the program date'
                    />
                  </Form.Item>
                </div>
                <div className={cls['form-row']}>
                  <Form.Item label='Дата начала' className={cls['form-item-half']}>
                    <Input
                      value={editedProgram?.start_time}
                      onChange={(e) => handleChange('start_time', e.target.value)}
                      placeholder='Введите начало программы'
                    />
                  </Form.Item>
                  <Form.Item label='Время окончания' className={cls['form-item-half']}>
                    <Input
                      value={editedProgram?.end_time}
                      onChange={(e) => handleChange('end_time', e.target.value)}
                      placeholder='Enter the program end time'
                    />
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button type='primary' htmlType='submit' className={cls['form-submit-btn']}>
                    Сохранить
                  </Button>
                  <Button onClick={() => setEditing(false)} className={cls['form-cancel-btn']}>
                    Отменить
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <div className={`${cls['program-detail-wrapper']}`}>
            
              <div className={cls['program-detail']}>
                <h1 className={cls['program-title']}>{program.title}</h1>
                <p className={cls['program-description']}>{program.description}</p>
                <div className={cls['program-info-wrapper']}>
                  <p className={cls['program-info']}>Speaker: {program.speaker.full_name}</p>
                  <p className={cls['program-info']}>Room: {program.room}</p>
                  <p className={cls['program-info']}>Date: {program.date}</p>
                  <p className={cls['program-info']}>Start Time: {program.start_time}</p>
                  <p className={cls['program-info']}>End Time: {program.end_time}</p>
                </div>
                <Button onClick={() => setEditing(true)} className={cls['edit-btn']}>
                  Edit
                </Button>
              </div>
            </div>
          )
          }
        </>) : null}
    </div>
  )
})


// import React from 'react';

// export const ProgramDetail = () => {
//   return (
//     <div>
      
//     </div>
//   );
// };
