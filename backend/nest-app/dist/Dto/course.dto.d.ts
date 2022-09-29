import studCourseDto from "./stud_course.dto";
export default class courseDto {
    course_id: number;
    name: string;
    desc: string;
    start_date: Date;
    end_date: Date;
    stud_cours: studCourseDto[];
}
