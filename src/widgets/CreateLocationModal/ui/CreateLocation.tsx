import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, DatePicker, Form, Input, Modal, Upload, UploadProps, message, notification } from 'antd';
import { locationStore } from 'shared/stores/location/model/locationStore';
import { LocationType } from 'shared/stores/location/api/locationApi';

import cls from './CreateLocation.module.scss';
import { UploadOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
const customIcon = new Icon({
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png?20150513095621',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
export const CreateLocation: React.FC = () => {
  const [markerPosition, setMarkerPosition]: any = useState<LatLngExpression | null>(null);
  const center: LatLngExpression = [42.8746, 74.5698]; // latitude, longitude
  const [instructionCount, setInstructionCount] = useState(2);
  const [pictureUrl, setPictureUrl] = useState('');
  const [pictureInstruction,setPictureInstruction] = useState('')
  const [form] = useForm();
 
  const removeInstruction = () => {
    setInstructionCount(instructionCount - 1);
  };

  const AddMarkerOnCLick = () => {
    const map = useMapEvents({
      click: (e) => {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const handleSubmit = (values: any) => {
    const { place, date, description,address } = values;
    if (markerPosition) {
      const instructions = [...Array(instructionCount)].map((_, index) => {
        return {
          picture_url: pictureInstruction,
          description: values[`instructionDescription_${index}`],
          sort_order: index,
        };
      });

      const data: LocationType = {
        title: place,
        picture_url: pictureUrl,
        open_date: date.toISOString(),
        description: description,
        coordinates: {
          longitude: markerPosition[1],
          latitude: markerPosition[0]
        },
        instruction: instructions,
        address:address
      };
      locationStore.createLocation(data);
      form.resetFields();
      notification.success({
        message:'Локация была успешно добавлена!'
      })
    }
  };


  const props: UploadProps = {
    name: 'file',
    action: `${process.env.REACT_APP_BASE_URL}/file/upload`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const pictureUrl = `${process.env.REACT_APP_BASE_URL}${info.file.response.path}`;
        setPictureUrl(pictureUrl);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  
  const props2: UploadProps = {
    name: 'file',
    action: `${process.env.REACT_APP_BASE_URL}/file/upload`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const pictureUrl = `${process.env.REACT_APP_BASE_URL}${info.file.response.path}`;
        setPictureInstruction(pictureUrl);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className={cls.wrapper}>
      <MapContainer center={center} zoom={15} className={cls.leaflet_container}>
        <AddMarkerOnCLick />
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon}>
            <Popup>Ваша локация</Popup>
          </Marker>
        )}
      </MapContainer>
      <div className='inputBlock'>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item label='Введите название' name='place' rules={[{ required: true }]}>
            <Input placeholder='Название' height={'20px'} width={100} />
          </Form.Item>

          <Form.Item label='Введите описание' name='description' rules={[{ required: true }]}>
            <Input placeholder='Описание' height={'20px'} width={100} />
          </Form.Item>
          <Form.Item label='Введите адрес' name='address' rules={[{ required: true }]}>
            <Input placeholder='адрес' height={'20px'} width={100} />
          </Form.Item>
          <Form.Item label='Загрузите фото' name='picture' >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload> 
          </Form.Item>
          <Form.Item label='Выберите дату' name='date' rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>

          {[...Array(instructionCount)].map((_, index) => (
            <div key={`instruction-${index}`}>
              <p>Инструкция {index + 1}</p>
              <Form.Item label='Picture URL'
                name={`instructionPicture_${index}`}
                rules={[{ required: true }]}>
                <Upload {...props2}>
                  <Button icon={<UploadOutlined />}>Загрузить</Button>
                </Upload>
              </Form.Item>
              <Form.Item label='Описание'
                name={`instructionDescription_${index}`}
                rules={[{ required: true }]}>
                <Input placeholder='Описание' />
              </Form.Item>
            </div>
          ))}
          {
            instructionCount >= 2 && <Button onClick={removeInstruction} danger>Убрать инструкцию</Button>
          }
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Добавить локацию
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};