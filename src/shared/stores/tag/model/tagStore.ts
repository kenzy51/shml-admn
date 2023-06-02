import {makeAutoObservable} from 'mobx'
import { TagType, tagApi} from '../api/tagApi'

export class TagStore{
  tags: TagType[]=[]
  constructor(){
    makeAutoObservable(this);
  }
  addtag(tag:TagType){
    this.tags.push(tag)
  }

  async getAllTags() {
    try {
      const response = await tagApi.getAll()
      const filteredtags = response.data.filter((tag:TagType)=> !tag.is_deleted)
      this.tags = filteredtags
    } catch (error) {
      console.error(error)
    }
  } 

  async createTag(tag: TagType) {
    try {
      const response = await tagApi.createTag(tag)
      this.tags.push(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteTag(_id:string){
    await tagApi.deleteTag(_id);
    this.tags = this.tags.filter(tag => tag._id !== _id)
  }
    
  async updateTag(id:string, tag:TagType){
    try{
      const response = await tagApi.updateTag(id, tag);
      const updatedTag = response.data;
      const index = this.tags.findIndex(t => t._id === updatedTag._id);
      if(index !== -1){
        this.tags[index] = updatedTag
      }
    }
    catch(error){
      console.error(error,'error')
    }
  }

}

export const tagStore = new TagStore();
