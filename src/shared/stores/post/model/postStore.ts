import { postApi, PostDataType } from '../api/postApi';
import { makeAutoObservable } from 'mobx';
export interface PictureType {
  url: string;
  title: string;
}

export interface PostType {
  _id?: string;
  title: string;
  picture: PictureType[];
  event_id?: string;
  liked_user_count?: number;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  description:string;
}

export class PostStore {
  posts: PostType[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  addPost(post: PostType) {
    this.posts.push(post);
  }
  
  async createPost(postData: PostDataType) {
    try {
      const response = await postApi.createPost(postData);
      const post: PostType = {
        title: postData.title,
        picture: postData.picture,
        description: response.data.description
      };
      this.addPost(post);
    } catch (error) {
      console.error(error);
    }
  }

  async getPosts() {
    try {
      const response = await postApi.getAll();
      const postArray= response.data.items.filter((post: PostType)=> !post.is_deleted);
      this.posts = postArray;
      return postArray
    } catch (error) {
      console.error(error);
    }
  }

  async getPostById(id: string) {
    try {
      const response = await postApi.getPostById(id);
      const postData = response.data;
      const post: PostType = {
        _id: postData._id,
        title: postData.title,
        picture: postData.picture,
        event_id: postData.event_id,
        liked_user_count: postData.liked_user_count,
        is_deleted: postData.is_deleted,
        created_at: postData.created_at,
        updated_at: postData.updated_at,
        description:postData.description
      };
      return post;
    } catch (error) {
      console.error(`error while fetching ${id}`, error);
    }
  }

  async deletePost(_id:string){
    await postApi.deletePost(_id);
    this.posts = this.posts.filter(post => post._id !== _id)
  }
}

export const postStore = new PostStore();
