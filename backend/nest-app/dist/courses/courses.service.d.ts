import { Observable } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Course } from './course.entity';
export declare class CoursesService {
    private readonly repo;
    constructor(repo: Repository<Course>);
    findAll(): Promise<Course[]>;
    createCourse(c: any): Observable<Course>;
    updateCourse(c: any): Observable<UpdateResult>;
    deleteCourse(id: number): Observable<DeleteResult>;
}
