import { Breadcrumb, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { postStore } from 'shared/stores/post/model/postStore';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import Slider from 'shared/ui/Slider/Slider';
import 'swiper/swiper-bundle.css';

import cls from './PostDetail.module.scss';

interface Post{
  id: string;
  text: string;
  event_id: string;
  liked_user_count: number;
  created_at: string;
  updated_at: string;
}
export const PostDetail = () => {
  const { postId } = useParams<{postId:any}>();
  const [post, setPost] = useState<Post | any >(null);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await postStore.getPostById( postId);
      setPost(post);
    };
    fetchPost();
  }, [postId]);

  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      <AppLink to='/'>Home</AppLink>
    </Breadcrumb.Item>,
    <Breadcrumb.Item key='post-detail'>{post?.text}</Breadcrumb.Item>,
  ];

  const PostCard = ({ post }: { post: Post }) => (
    <div className={cls.card}>
      <h3>{post.text}</h3>
      <p>Event ID: {post.event_id}</p>
      <p>Users liked: {post.liked_user_count}</p>
      <p>Created at: {post.created_at.slice(0, 10)}</p>
      <p>Updated at: {post.updated_at.slice(0, 10)}</p>
    </div>
  );
    
  return (
    <div className={cls.page_wrapper}>
      <Breadcrumb className={cls.breadcrumb}>{breadcrumbItems}</Breadcrumb>
      <div className={cls.wrapper}>
        {post ? (
          <>
            <div className={cls.slider}>  
              <h1>{post.text}</h1>
              <Slider post={post}/>
            </div>
            <PostCard post={post}/>
          </>
        ) : (
          <div className={cls.loading}>
            <Spin className={cls.spin}/>
          </div>
        )}
      </div>
    </div>
  );
};




