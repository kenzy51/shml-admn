import { Button, Card, Popconfirm, Pagination, Table, Avatar, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {  postStore } from 'shared/stores/post/model/postStore';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { CreatePostForEvent } from 'widgets/CreatePostForEvent';

import cls from './PostsList.module.scss';
import { DeleteOutlined } from '@ant-design/icons';

export const PostsList = observer(({eventId}:any) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);

  const {t} = useTranslation('eventDetail')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await postStore.getPosts();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete =(id:string)=>{
    try{
      postStore.deletePost(id)
      notification.success({
        message:'Новость была успешно удалена'
      })
    }
    catch(error){
      console.error(error)
    }
  }

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => <AppLink to={`../post/${record._id}`}>{text}</AppLink>,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    }, 
    {
      title: 'Действия',
      key: 'actions',
      render:(record:any)=>(
        <DeleteOutlined onClick={()=>handleDelete(record._id)}/>
      )
    },
  ];

  const posts = postStore.posts;

  const currentPosts = posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <Button onClick={() => setIsVisible(true)}>{t('createPost')}</Button>
      <div className={cls.posts}>
        <Table
          columns={columns}
          dataSource={currentPosts}
          rowKey='_id'
          pagination={false}
        />
      </div>
      <CreatePostForEvent isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className={cls.pagination}>
        <Pagination
          className={cls.pagination}
          current={currentPage}
          pageSize={pageSize}
          total={posts.length}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          }}
          showSizeChanger
          showQuickJumper
        />
      </div>
    </div>
  );
});