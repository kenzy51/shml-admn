import React from 'react';
import { Button, Input } from 'antd';
import { Form } from 'antd';
import { Rule } from 'antd/es/form';
import { useTranslation } from 'react-i18next';
import { validationSchema } from 'shared/lib/validationSchema/validationSchema';
import { FormValues } from 'widgets/LoginComponent/ui/types';
import SelectLanguage from 'shared/ui/selectLanguages/SelectLanguage';
import { observer } from 'mobx-react-lite';
import { authStore } from 'shared/stores/auth/model/authStore';

import clsx from 'clsx';
import cls from './Login.module.scss';


export const Login: React.FC = observer(() => {
  const { t } = useTranslation('main');
  const [form] = Form.useForm();
  const { sendAuth } = authStore

  const handleSubmit = async (values: FormValues) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      await sendAuth(values);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };
  const emailRules: Rule[] = [
    { type: 'email', message: t('notValidEmail') as string },
    { required: true, message: t('inputYourEmail') as string },
  ];
  
  const passwordRules = [
    { required: true, message: t('inputYourPassword') as string },
    { min: 8, message: t('rulePassword') as string },
  ];
  
  const emailFormItem = (
    <Form.Item
      name='login'
      label='E-mail'
      rules={emailRules}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Input />
    </Form.Item>
  );
  
  const passwordFormItem = (
    <Form.Item
      name='password'
      label={t('password')}
      rules={passwordRules}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Input.Password />
    </Form.Item>
  );
  
  const selectLanguageFormItem = (
    <Form.Item>
      <SelectLanguage />
    </Form.Item>
  );

  const submitButtonFormItem = (
    <Form.Item>
      <Button type='primary' htmlType='submit' >
        {t('submit')}
      </Button>
    </Form.Item>
  );

  return (
    <div className={clsx(cls.wrapper)}>
      <div className={clsx(cls.cardAuth)}>
        <h2>{t('auth')}</h2>
        <Form
          form={form}
          name='registration'
          onFinish={handleSubmit}
          initialValues={{
            remember: true,
          }}
          scrollToFirstError
          className={clsx(cls.formComponent)}
        >
          {emailFormItem}
          {passwordFormItem}
          <div className={clsx(cls.selectSubmit)}>
            {selectLanguageFormItem}
            {submitButtonFormItem}
          </div>
        </Form>
      </div>
    </div>
  );
});