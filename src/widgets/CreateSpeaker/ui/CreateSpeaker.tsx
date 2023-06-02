import { Modal, Form, Input, Button, Checkbox, Upload, notification, UploadProps } from 'antd';
import { Speaker } from 'widgets/EventCreation/ui/types';
import { speakerStore } from 'shared/stores/speaker/model/speakerStore';
import { useState } from 'react';
interface CreatePostForEventProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  eventId: string;
}


export const CreateSpeaker = ({ isVisible, setIsVisible, eventId }: CreatePostForEventProps) => {
  const [form] = Form.useForm();
  const [pictureUrls, setPictureUrls] :any = useState('');

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      notification.success({
        message: `${info.file.name} file uploaded successfully`,
      });
      const pictureUrl = `${process.env.REACT_APP_BASE_URL}/${info.file.response.path}`
      setPictureUrls([...pictureUrls, pictureUrl]);
    } else if (info.file.status === 'error') {
      notification.error({
        message: `${info.file.name} file upload failed.`,
      });
    }
  };

  const onFinish = async (formData: Speaker ) => {
    try{
      const picture = pictureUrls.map((url: any)=> ({url, title:'Speaker picture'}))
      const formattedData :any = {...formData, picture}
      await speakerStore.createSpeaker(eventId, formattedData);
      setIsVisible(false)
    }
    catch(error){
      console.error(error)
    }
  }

  const handleCheckboxChange = (e: any) => {
    const value = e.target.checked;
    form.setFieldsValue({
      is_main_scene: value
    });
  }

  const props:UploadProps =  {  
    action:`${process.env.REACT_APP_BASE_URL}/file/upload`,
    listType:'picture',
    accept:'image/*',
    onChange:(info) => handleUpload(info)
  }


  const nameRule =[{ required: true, message: 'Please enter full name!' }]
  return (
    <Modal
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
      title='Создать спикера'
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item label='Полное имя' name='full_name' rules={nameRule}>
          <Input />
        </Form.Item>
        <Form.Item label='Описание' name='description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label='Главная сцена?' name='is_main_scene' valuePropName='checked'>
          <Checkbox onChange={handleCheckboxChange} />
        </Form.Item>
        <Form.Item>
          <Upload
            {...props}
          >
            <Button>Выберите изображения</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>Создать спикера</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}