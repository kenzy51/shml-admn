import React from 'react';
import {  Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

import cls from './UserRegistration.module.scss'
export const UploadFile = observer(({eventId}:any) => {

  return (
    <div className={cls.csvForm}>
      <h3>Загрузите CSV файл</h3>
      <Upload accept='.csv' action={`${process.env.REACT_APP_BASE_URL}/ticket/${eventId}`} >
        <Button icon={<UploadOutlined />}>Загрузить</Button>
      </Upload>
    </div>
  );
});
