import { Checkbox, DatePicker, Form, Input, Radio, Select, TimePicker } from 'antd'
import { Option } from 'antd/es/mentions';
import { useState } from 'react';
import { CampType } from 'shared/stores/camp/api/campApi';
import { speakerStore } from 'shared/stores/speaker/model/speakerStore';
// // 
const rules = [
  { textRule: [{ required: true, message: 'Please enter a title' }] },
  { speakerRule: [{ required: true, message: 'Please enter a speaker' }] },
  { descriptionRule: [{ required: true, message: 'Please enter a description' }] },
  { roomRule: [{ required: true, message: 'Please enter a room' }] },
  { dateRule: [{ required: true, message: 'Please select a date' }] },
  { startTimeRule: [{ required: true, message: 'Please select a start time' }] },
  { endTimeRule: [{ required: true, message: 'Please select an end time' }] },
  { eventIdRule: [{ required: true, message: 'Please enter an event ID' }] },
];
// 
export const Title = () => {
  return (
    <Form.Item
      label='Название'
      name='title'
      rules={rules[0].textRule}
      labelCol={{ span: 24 }}
    >
      <Input />
    </Form.Item>
  )
}

export const Speaker = ({ eventId,speakerStore }: any) => {
  return (
    <Form.Item
      label='Спикер'
      name='speaker'
      rules={[{ required: true, message: 'Please enter a speaker' }]}
      labelCol={{ span: 24 }}
    >
      <Select
        loading={!speakerStore.speakers.length}
      >
        {speakerStore.speakers
          .filter((speaker:any) => speaker.event_id === eventId)
          .map((speaker:any) => (
            <Select.Option key={speaker._id} value={speaker._id}>
              {speaker.full_name}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  )
}

export const Description = () => {
  return (
    <Form.Item
      label='Описание'
      name='description'
      rules={rules[2].descriptionRule}
      labelCol={{ span: 24 }}
    >
      <Input.TextArea />
    </Form.Item>
  )
}

export const Room = ({form}:any) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked:any) => {
    setIsChecked(checked);
  };

  return (
    <Form.Item
      label='Главный рум?'
      name='room'
      rules={rules[3].roomRule}
      labelCol={{ span: 24 }}
      valuePropName='checked'
    >
      <Radio.Group>
        <Checkbox checked={isChecked} onChange={(e) => handleCheckboxChange(e.target.checked)}>
          Да
        </Checkbox>  <Checkbox onChange={() => form.setFieldsValue({room: false})}>No</Checkbox>
      </Radio.Group>
    </Form.Item>
  )
}

export const Date = () => {
  return (
    <Form.Item
      label='Дата'
      name='date'
      rules={rules[4].dateRule}
      labelCol={{ span: 24 }}
    >
      <DatePicker />
    </Form.Item>
  )
}

export const StartTime = () => {
  return (
    <Form.Item
      label='Дата начала'
      name='start_time'
      rules={rules[5].startTimeRule}
      labelCol={{ span: 24 }}
    >
      <TimePicker format='HH:mm' />
    </Form.Item>
  )
}

export const EndTime = () => {
  return (
    <Form.Item
      label='Конец даты'
      name='end_time'
      rules={rules[6].endTimeRule}
      labelCol={{ span: 24 }}
    >
      <TimePicker format='HH:mm' />
    </Form.Item>
  )
}

export const EventId = ({ eventId }: any) => {
  return (
    <Form.Item
      label='Event ID'
      name='event_id'
      rules={rules[7].eventIdRule}
      initialValue={eventId}
      labelCol={{ span: 24 }}
    >
      <Input disabled />
    </Form.Item>
  )
}


export const CampId = ({ campStore }: any) => {
  return (
    <Form.Item
      label='Лагерь'
      name='camp_id'
      labelCol={{ span: 24 }}
    >
      <Select
        loading={!campStore.camps.length}
      >
        {campStore.camps.map((camp: CampType) => (
          <Select.Option key={camp._id} value={camp._id}>
            {camp.name}
          </Select.Option>
        ))}
      </Select>    
    </Form.Item>    
  )
}