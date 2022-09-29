import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Student_Courses } from './stud_cor.entity';

@Injectable()
export class StudCoursesService {
    constructor(
        @InjectRepository(Student_Courses) private readonly repo: Repository<Student_Courses>,
        // @InjectRepository(Address)
      ) {}
    
      findAll(): Promise<Student_Courses[]> {
        return this.repo.find(
          { relations:{
              student: true,
              course: true,
          }}
        );
      }
    
      createStud_cor(sc: Student_Courses): Observable<Student_Courses> {
        return from(this.repo.save(sc));
      }
    
      updateStud_cor(id: number, stud_cor: Student_Courses): Observable<UpdateResult> {
        return from(this.repo.update(id, stud_cor));
      }

      deleteStud_cor(id: number): Observable<DeleteResult> {
        return from(this.repo.delete(id));
      }
}
