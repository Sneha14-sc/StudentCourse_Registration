import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student) private readonly repo: Repository<Student>,
        // @InjectRepository(Address)
      ) {}
    
      findAll(): Promise<Student[]> {
        return this.repo.find();  //{relations: {address: true}}--- can be used instead of eager true
      }
    
      createStudent(s:Student): Observable<Student> {
        console.log(s);
        return from(this.repo.save(s));
      }
    
      updateStudent(id: number, student: Student): Observable<UpdateResult> {
        console.log(id,student)
        return from(this.repo.update(id, student));
      }

      deleteStudent(id: number): Observable<DeleteResult> {
        return from(this.repo.delete(id));
      }
}
