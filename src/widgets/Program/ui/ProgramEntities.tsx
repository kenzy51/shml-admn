import { ProgramType } from 'shared/stores/program/api/programApi';
import { AppLink } from 'shared/ui/AppLink/AppLink';

export const columns = [
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
    render:(title:string, program:ProgramType) => (
      <AppLink to={`/program/${program._id}`}>
        {title}
      </AppLink>
    )
  },
  {
    title: 'Спикер',
    dataIndex: 'speaker',
    key: 'speaker',
    render: (speaker:any) => `${speaker.full_name}`,
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Комната',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'Date',
    dataIndex: `date`,
    key: 'date',
    render:(date:string)=> date.slice(0,10)
  },
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    key: 'start_time',
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    key: 'end_time',
  },
];