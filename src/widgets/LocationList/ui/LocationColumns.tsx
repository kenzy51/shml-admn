import { DeleteOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { locationStore } from 'shared/stores/location/model/locationStore';

const handleDelete = (_id:string) =>{
  try{
    locationStore.deletelocation(_id)
    notification.success({
      message:'Локация была успешно удалена'
    })
  }
  catch(error){
    console.error(error)
  }
}
// 1
export const columns = [
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Дата начала',
    dataIndex: 'open_date',
    key: 'open_date',
    render:(open_date:string) =>{
      return(
        <h5>{open_date.slice(0,10)}</h5>
      )
    }
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Координаты',
    dataIndex: 'coordinates',
    key: 'coordinates',
    render: (coordinates:number | any) => {
      return (
        <>
          <p>Долгота: {coordinates.latitude}</p>
          <p>Широта: {coordinates.longitude}</p>
        </>
      );
    },
  },
  {
    title: 'Действия',
    key: 'action',
    render:( record: any) => (
      <DeleteOutlined onClick={() => handleDelete(record._id)}>
        Delete
      </DeleteOutlined>
    )
  },
];