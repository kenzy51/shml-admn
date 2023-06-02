import { makeAutoObservable } from 'mobx';
import { ProgramType, programApi } from '../api/programApi';

class ProgramStore {
  programs: ProgramType[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  // 
  async getAllPrograms() {
    try {
      const response = await programApi.getAll();
      const fetchedPrograms = response.data.items;
      const filteredPrograms =fetchedPrograms.filter((program:ProgramType) => !program.is_deleted)
      this.programs = filteredPrograms;
    } catch (error) {
      console.error('Failed to get programs', error);
    }
  }
  // 
  async createProgram(program: ProgramType) {
    try {
      const response = await programApi.createProgram(program);
      this.programs.push(response.data);
    } catch (error) {
      console.error('Failed to create program', error);
    }
  }
  // 
  async editProgram(program:ProgramType){
    try{
      const response = await programApi.editProgram(program._id, program);
      const editedProgram = response.data;
      const index = this.programs.findIndex(p=> p._id === editedProgram._id);
      if(index !== -1){
        this.programs[index] = editedProgram;
      }
    }
    catch(error){
      console.error('Failed to edt', error)
    }
  } 
  // 
  async getProgramById(id:string){
    try{
      const response = await programApi.getProgramByid(id)
      const eachProgram = response.data
      return  eachProgram
    }
    catch(error){
      console.error(error,`error happened with ${error}`)
    }
  }
  // 
  async deleteProgram(_id:string){
    await programApi.deleteProgram(_id);
    this.programs = this.programs.filter(program => program._id !== _id)
  }
  
}

export const programStore = new ProgramStore();
