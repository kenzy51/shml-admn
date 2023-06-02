import React, { useState } from 'react';
import { UserRegistrationType } from 'shared/stores/userRegistration/api/userRegistrationApi';
import { Button, Form, Input, Modal } from 'antd';
import { userRegistrationStore } from 'shared/stores/userRegistration/model/userRegistrationStore';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { UploadFile } from './UploadFile';
import cls from './UserRegistration.module.scss';
import { UsersList } from 'widgets/UsersList';


const rules:any = {
  nameRule:[{ required: true, message: 'Please enter your name' }],
  ticketRule:[[
    { required: true, message: 'Please enter your ticket code' },
    { min: 6, message: 'Password must be at least 6 characters long' },
  ]],
  phoneRule:[
    { required: true, message: 'Please enter your phone' },
  ]
}

export const UserRegistration = ({eventId}:any) => {
  const [form]= Form.useForm()
  const [phone,setPhone] = useState('');
  const [isVisible, setIsVisible]= useState(false);
  // 

  const handlePhoneChange = (value:string)=>{
    setPhone(value)
  }
  // 
  const handleSubmit = async ()=>{
    try{
      const values = await form.validateFields()
      const userData: UserRegistrationType ={
        full_name:values.full_name,
        phone: '+' + values.phone,
        ticket_code: values.ticket_code
      }
      await  userRegistrationStore.registerUser(userData, eventId)
      console.log(userData)
    }
    catch(error){
      console.error(error, 'error')
    }
  }
  // 
  return (
    <div className={cls.wrapper}>
      <Button onClick={()=> setIsVisible(true)}>Зарегистрировать пользователя на событие</Button>
      
      <UsersList/>
      <Modal
        style={{paddingTop:'2%'}}
        open={isVisible}
        onCancel={()=> setIsVisible(false)}
        footer={null}
      >
        <h3 style={{marginTop:'2%'}}>Регистрация пользователя на событие</h3>
        <Form form={form} onFinish={handleSubmit} className={cls.form}>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name='full_name'
            label='ФИО'
            rules={rules.nameRule}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name='phone'
            label='Номер телефона'
            rules={rules.phoneRule}
          >
            <PhoneInput
              value={phone}
              onChange={handlePhoneChange}
              inputStyle={{ width: '100%' }} />

          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name='ticket_code'
            label='Код тикета'
            rules={rules.ticketRule}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Зарегистрировать
            </Button>
          </Form.Item>
        </Form>
        <UploadFile eventId={eventId}/>
      </Modal>
    </div>
  );
};