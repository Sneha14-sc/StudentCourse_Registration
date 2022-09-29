import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Course } from './course.entity';


@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course) private readonly repo: Repository<Course>,
        // @InjectRepository(Address)
      ) {}
    
      findAll(): Promise<Course[]> {
        return this.repo.find();
      }
    
      createCourse(c): Observable<Course> {
        let cours1:Course= new Course();
         cours1 = c;
        return from(this.repo.save(cours1));
      }
    
      updateCourse(c): Observable<UpdateResult> {
        let id=c[0]
        let cours2:Course =c[1]
        return from(this.repo.update(id, cours2));
      }

      deleteCourse(id: number): Observable<DeleteResult> {
        return from(this.repo.delete(id));
      }
}
