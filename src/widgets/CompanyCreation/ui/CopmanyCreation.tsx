import { Button, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { observer } from 'mobx-react-lite';
import { companyStore } from 'shared/stores/company/model/companyStore';

interface CompanyType {
    name:string
}
interface EventCreationProps {
    isModalVisible: boolean;
    setIsModalVisible: (value: boolean) => void;
  }

export const CompanyCreationModal = observer(({isModalVisible, setIsModalVisible}: EventCreationProps) => {
  const [form] = useForm()
  const onFinish = async (values: CompanyType) => {
    try{
      await companyStore.createCompany(values.name);
      console.log('value ', values);
      form.resetFields();
      setIsModalVisible(false);
      message.open({
        type:'success',
        content:`Компания ${values.name} была успешно создана`
      })
    }
    catch(error){
      console.log((error))
    }
  };
  return (
    <Modal open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} 
      title={'Создайте компанию'} width={430}>
      <Form
        form={form}
        name='createPostForm'
        onFinish={onFinish}
        initialValues={{ remember: true }}
        scrollToFirstError
      >
        <Form.Item 
          label='Cоздайте компанию' 
          name='name' 
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder='company'/>
        </Form.Item>
        <Button htmlType='submit'>Отправить</Button>
      </Form>
    </Modal>
  );
}
);
