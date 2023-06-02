import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, InputNumber, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { EventData } from './types';
import { eventStore } from 'shared/stores/events/model/eventsStore';
import { UploadChangeParam } from 'antd/es/upload';
import { observer } from 'mobx-react-lite';
import cls from './EventCreation.module.scss'

interface PostCreationProps {
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
}

export const EventCreationModal: React.FC<PostCreationProps> = observer(({ isModalVisible, setIsModalVisible }) => {
  const [fileList, setFileList] = useState<Array<any>>([]);
  const [form] = Form.useForm();
  const { t } = useTranslation('events');

  const handleFileUpload = (info:any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  }
  const {createEvent} = eventStore; 
  const onFinish = (values: EventData | any) => {
    try{
      createEvent(
        values.title,
        values.start_date,
        values.end_date,
        values.count_of_visitors,
        values.org_id,
        values.description,
        values.place,
        values.speakers,
        values.sponsors,
      );
      console.log('value ', values);
      setIsModalVisible(false);
      message.open({
        type:'success',
        content:'Message was succesfully sent'
      })
    }
    catch(error){
      console.error(error)
    }
  };


  const rules = [
    { titleRule: [{ required: true, message: 'Please input the title!' }] },
    { startDateRule: [{ required: true, message: 'Please input the start date!' }] },
    { endDateRule: [{ required: false, message: 'Please input the end date!' }] },
    { countOfVisitorsRule: [{ required: true, message: 'Please input the number of visitors!' }] },
    { descriptionRule: [{ required: true, message: 'Please input the description!' }] },
    { photoUploadingRule: [{ required: true, message: 'Please upload a photo!' }] },
    { placeTitleRule: [{ required: true, message: 'Please input the place title!' }] },
    { longitudeRule: [{ required: true, message: 'Please input the longitude!' }] },
    { latitudeRule: [{ required: true, message: 'Please input the latitude!' }] },
    { orgRule: [{ required: true, message: 'Please input the organization!' }] }
  ];


  const getValueFromEvent = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  const TitleItem = () => {
    const data = t('enterTitle')
    return (
      <Form.Item
        name='title'
        label={t('title')}
        rules={rules[0].titleRule}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 248 }}
      >
        <Input placeholder={data} />
      </Form.Item>
    )
  } 

  const StartDateItem = () => {
    return (
      <Form.Item
        name='start_date'
        label={t('start_date')}
        rules={rules[1].startDateRule}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 248 }}
      >
        <Input type='date' />
      </Form.Item>
    )
  }

  const EndDateItem = () => {
    const data = t('endDate')
    return (
      <Form.Item
        name='end_date'
        label={data}
        rules={rules[2].endDateRule}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 248 }}
      >
        <Input type='date' />
      </Form.Item>
    )
  }

  const CountOfVisitorsItem = () => {
    const data = t('enterCountOfVisitors')
    return (
      <Form.Item
        name='count_of_visitors'
        label={data}
        rules={rules[3].countOfVisitorsRule}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 248 }}
      >
        <InputNumber min={1} placeholder={data} style={{ width: '100%' }} />
      </Form.Item>
    )
  }

  const DescriptionItem = () => {
    return (
      <Form.Item
        name='org_id'
        label='Description'
        rules={rules[4].descriptionRule}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 248 }}
      >
        <Input.TextArea placeholder='description'/>
      </Form.Item>
    )
  }

  const UploadPhotoItem = () =>(
    <Form.Item
      name='photo'
      label={t('photo')}
      valuePropName='fileList'
      getValueFromEvent={getValueFromEvent}
      rules={rules[5].photoUploadingRule}
      labelCol={{ span: 244 }}
      wrapperCol={{ span: 244 }}
    >
      <Upload
        fileList={fileList}
        beforeUpload={() => false}
        onChange={handleFileUpload}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </Form.Item>
  )


  const OrgItem = () => {
    const data = 'organization';
    return (
      <Form.Item
        name='description'
        label={data}
        rules={rules[6].orgRule}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 248 }}
      >
        <Input placeholder='organization'/>
      </Form.Item>
    )
  }
  const PlaceItem = () => {
    const { t } = useTranslation('events');
    const data = t('placeTitle');
    return (
      <><Form.Item
        name={['place', 'title']}
        label={data}
        rules={rules[7].titleRule}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 248 }}
      >
        <Input placeholder={data} />
      </Form.Item><Form.Item
        name={['place', 'longitude']}
        label={t('longitude')}
        rules={rules[8].longitudeRule}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 248 }}
      >
        <InputNumber />
      </Form.Item><Form.Item
        name={['place', 'latitude']}
        label={t('latitude')}
        rules={rules[9].latitudeRule}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 248 }}
      >
        <InputNumber/>
      </Form.Item></>
    );
  };
    // 
  const SpeakersItem = () => {
    const { t } = useTranslation('events');
    return (
      <>
        <Form.Item
          name={['speakers', 'full_name']}
          label={t('fullName')}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 248 }}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          name={['speakers', 'description']}
          label={t('description')}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 248 }}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={['speakers', 'picture', 'url']}
          label={t('pictureUrl')}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 248 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['speakers', 'picture', 'title']}
          label={t('pictureTitle')}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 248 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['speakers', 'contacts', 'instagram']}
          label={t('instagram')}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 248 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['speakers', 'contacts', 'phone']}
          label={t('phone')}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 248 }}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          name={['speakers', 'contacts', 'email']}
          label={t('email')}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 248 }}
        >
          <Input />
        </Form.Item> 
        <Form.Item
          name={['speakers', 'org_id']}
          label={t('org_id')}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 248 }}
        >
          <Input />
        </Form.Item>
      </>
    );
  };
    
  const Sponsors = () => {
    const { t } = useTranslation('events');
      
    return (
      <>
        <Form.Item name={['sponsors', 'full_name']} label={t('sponsors.fullName')}>
          <Input />
        </Form.Item>
          
        <Form.Item name={['sponsors', 'description']} label={t('sponsors.description')}>
          <Input.TextArea />
        </Form.Item>
          
        <Form.Item name={['sponsors', 'picture', 'url']} label={t('sponsors.picture.url')}>
          <Input />
        </Form.Item>
          
        <Form.Item name={['sponsors', 'picture', 'title']} label={t('sponsors.picture.title')}>
          <Input />
        </Form.Item>
          
        <Form.Item name={['sponsors', 'contacts', 'instagram']} label={t('sponsors.contacts.instagram')}>
          <Input />
        </Form.Item>
          
        <Form.Item name={['sponsors', 'contacts', 'phone']} label={t('sponsors.contacts.phone')}>
          <Input />
        </Form.Item>
          
        <Form.Item name={['sponsors', 'contacts', 'email']} label={t('sponsors.contacts.email')}>
          <Input />
        </Form.Item>
          
        <Form.Item name={['sponsors', 'org_id']} label={t('sponsors.orgId')}>
          <Input />
        </Form.Item>
      </>
    );
  };
  const ButtonItem =()=>{
    return(
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          {t('create')}
        </Button>
      </Form.Item>
    )
  }
  return (
    <Modal
      open={isModalVisible}
      title={t('createPost')}
      footer={null}
      onCancel={() => setIsModalVisible(false)}
      className={cls.modal}
    >
      <Form form={form} onFinish={onFinish}>
        <TitleItem />
        <StartDateItem />
        <EndDateItem />
        <CountOfVisitorsItem />
        <DescriptionItem />
        <PlaceItem />
        <OrgItem/>
        {/* <Sponsors/>
        <SpeakersItem/> */}
        <ButtonItem/>
      </Form>
    </Modal>
  );
});