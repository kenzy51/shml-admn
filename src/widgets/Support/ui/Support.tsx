import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Input, Button, List, notification} from 'antd';
import { supportStore } from 'shared/stores/support/model/supportStore';
import { FAQType } from 'shared/stores/support/api/supportApi';

import cls from './Support.module.scss';

const { TextArea } = Input;

const rules = {
  questionRule:[{ required: true, message:'Введите вопрос' }],
  answerRule:[{ required: true, message:'Введите ответ' }]
}

export const Support = observer(() => {
  const [form] = Form.useForm();
  // 
  const [updatingFAQ, setUpdatingFAQ] = useState<{ _id: string } | null>(null);
  // 
  useEffect(() => {
    supportStore.fetchFAQs();
  }, []);
  // 

  const handleSubmit = async (values: FAQType) => {
    try {
      await supportStore.createFAQ(values);
      form.resetFields();
      notification.success({
        message:'FAQ был успешно добавлен'
      })
    }
    catch(error){
      console.error(error)
    }
  };
  // 
 
  const handleUpdateFAQ = async (faqId:string, values:FAQType)=>{
    try{
      supportStore.updateFAQ(faqId, values);
      setUpdatingFAQ(null);
      notification.success({
        message: 'FAQ was successfully updated',
      });
    }
    catch(error){
      console.error(error, 'error')
    }
  }
  // 

  return (
    <div className={cls.wrapper} >
      <h1>Помощь и поддержка</h1>
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item
          label='Вопрос'
          name='question'
          rules={rules.questionRule} >
          <Input />
        </Form.Item>
        <Form.Item 
          label='Ответ' 
          name='answer' 
          rules={rules.answerRule}>
          <TextArea rows={1}/>
        </Form.Item>
        <Button 
          type='primary' 
          htmlType='submit'>
          Создать FAQ
        </Button>
      </Form>
      <List
        dataSource={supportStore.faqs}
        renderItem={(faq: FAQType) => (
          <List.Item >
            {updatingFAQ?._id === faq._id ? (
              <Form
                initialValues={{ question: faq.question, answer: faq.answer }}
                onFinish={(values) => handleUpdateFAQ(faq._id, values)}
                form={form}
              >
                <Form.Item 
                  label='Вопрос' 
                  name='question' 
                  rules={rules.questionRule}>
                  <Input />
                </Form.Item>
                <Form.Item 
                  label='Ответ' 
                  name='answer' 
                  rules={rules.answerRule}>
                  <TextArea rows={1.3} />
                </Form.Item>
                <Button type='primary' htmlType='submit'>
                  Обновить FAQ
                </Button>
                <Button onClick={() => setUpdatingFAQ(null)}>Отмена</Button>
              </Form>
            ) : (
              <div>
                <div>Вопрос: {faq.question}</div>
                <div>Ответ: {faq.answer}</div>
                <div>
                  <Button 
                    onClick={() => setUpdatingFAQ({ _id: faq._id })}>
                    Редактировать
                  </Button>
                  <Button 
                    danger 
                    onClick={() => supportStore.deleteFAQ(faq._id)}>
                    Удалить
                  </Button>
                </div>
              </div>
            )}
          </List.Item>
        )}
      />
    </div>
  );
}); 