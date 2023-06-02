import api from 'shared/config/axiosInstance';


export interface PostDataType {
    title: string;
    picture: {
      url: string;
      title: string;
    }[];
    description:string;
  }
  
export class postApi {
  static getAll(){
    return api.get('post')
  }
  static createPost (payload:PostDataType) {
    return api.post('post', payload);
  }
  static getPostById(id:string){
    return api.get(`post/${id}`)
  } 
  static deletePost(id:string){
    return api.delete(`post/${id}`)
  }
}




