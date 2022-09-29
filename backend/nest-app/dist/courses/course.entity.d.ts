import { Student_Courses } from '../Stud_Courses/stud_cor.entity';
export declare class Course {
    course_id: number;
    name: string;
    desc: string;
    start_date: Date;
    end_date: Date;
    s_courses: Student_Courses[];
}
