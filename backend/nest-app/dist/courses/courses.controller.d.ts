import { Course } from './course.entity';
import { CoursesService } from './courses.service';
export declare class CoursesController {
    private coursesService;
    private broker;
    private topicArray;
    private serviceName;
    constructor(coursesService: CoursesService);
    module_init(): Promise<void>;
    findAll(): Promise<Course[]>;
}
